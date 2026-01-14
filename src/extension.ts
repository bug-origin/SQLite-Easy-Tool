import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import initSqlJs, { Database } from "sql.js";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      "sqliteEditor.editor",
      new SqliteEditorProvider(context),
      { webviewOptions: { retainContextWhenHidden: true } }
    )
  );
}

class SqliteEditorProvider
  implements vscode.CustomEditorProvider<vscode.CustomDocument>
{
  constructor(private readonly context: vscode.ExtensionContext) {}

  async openCustomDocument(uri: vscode.Uri): Promise<vscode.CustomDocument> {
    return { uri, dispose: () => {} };
  }

  async resolveCustomEditor(
    document: vscode.CustomDocument,
    webviewPanel: vscode.WebviewPanel
  ): Promise<void> {
    webviewPanel.webview.options = { enableScripts: true };

    const dbPath = document.uri.fsPath;
    let db: Database | null = null;

    const saveDb = () => {
      if (db) {
        const data = db.export();
        fs.writeFileSync(dbPath, Buffer.from(data));
      }
    };

    try {
      const wasmPath = path.join(__dirname, "sql-wasm.wasm");
      const SQL = await initSqlJs({ locateFile: () => wasmPath });
      const fileBuffer = fs.readFileSync(dbPath);
      db = new SQL.Database(fileBuffer);
    } catch (e) {
      webviewPanel.webview.html = `<html><body><h2>Failed to open database: ${e}</h2></body></html>`;
      return;
    }

    const queryAll = (sql: string, params: any[] = []): any[] => {
      const stmt = db!.prepare(sql);
      if (params.length) stmt.bind(params);
      const rows: any[] = [];
      while (stmt.step()) {
        const row = stmt.getAsObject();
        rows.push(row);
      }
      stmt.free();
      return rows;
    };

    const runSql = (sql: string, params: any[] = []): number => {
      db!.run(sql, params);
      return db!.getRowsModified();
    };

    const sendData = () => {
      if (!db) return;
      const tables = queryAll(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
      );
      webviewPanel.webview.postMessage({
        type: "init",
        tables: tables.map((t) => t.name),
        dbPath,
      });
    };

    webviewPanel.webview.html = this.getHtml(webviewPanel.webview);

    webviewPanel.webview.onDidReceiveMessage(async (msg) => {
      if (!db) return;

      try {
        switch (msg.type) {
          case "ready":
            sendData();
            break;

          case "getTableData": {
            const { table, page = 0, pageSize = 100 } = msg;
            const columns = queryAll(`PRAGMA table_info("${table}")`);
            const totalResult = queryAll(
              `SELECT COUNT(*) as count FROM "${table}"`
            );
            const total = totalResult[0]?.count || 0;
            const rows = queryAll(
              `SELECT rowid, * FROM "${table}" LIMIT ? OFFSET ?`,
              [pageSize, page * pageSize]
            );
            webviewPanel.webview.postMessage({
              type: "tableData",
              table,
              columns,
              rows,
              total,
              page,
              pageSize,
            });
            break;
          }

          case "executeSQL": {
            const { sql } = msg;
            const trimmed = sql.trim().toLowerCase();
            if (trimmed.startsWith("select") || trimmed.startsWith("pragma")) {
              const rows = queryAll(sql);
              const columns =
                rows.length > 0
                  ? Object.keys(rows[0]).map((name) => ({
                      name,
                      type: "",
                      pk: 0,
                    }))
                  : [];
              webviewPanel.webview.postMessage({
                type: "sqlResult",
                columns,
                rows,
                success: true,
              });
            } else {
              const changes = runSql(sql);
              saveDb();
              webviewPanel.webview.postMessage({
                type: "sqlResult",
                success: true,
                changes,
              });
              sendData();
            }
            break;
          }

          case "updateCell": {
            const { table, rowid, column, value } = msg;
            runSql(`UPDATE "${table}" SET "${column}" = ? WHERE rowid = ?`, [
              value,
              rowid,
            ]);
            saveDb();
            webviewPanel.webview.postMessage({ type: "updateSuccess" });
            break;
          }

          case "deleteRow": {
            const { table, rowid } = msg;
            runSql(`DELETE FROM "${table}" WHERE rowid = ?`, [rowid]);
            saveDb();
            webviewPanel.webview.postMessage({ type: "deleteSuccess" });
            break;
          }

          case "insertRow": {
            const { table, data } = msg;
            const columns = Object.keys(data);
            const values = Object.values(data);
            const placeholders = columns.map(() => "?").join(", ");
            runSql(
              `INSERT INTO "${table}" (${columns
                .map((c) => `"${c}"`)
                .join(", ")}) VALUES (${placeholders})`,
              values
            );
            saveDb();
            webviewPanel.webview.postMessage({ type: "insertSuccess" });
            break;
          }
        }
      } catch (e: any) {
        webviewPanel.webview.postMessage({ type: "error", message: e.message });
      }
    });

    webviewPanel.onDidDispose(() => {
      db?.close();
    });
  }

  private getHtml(webview: vscode.Webview): string {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --bg: #1e1e1e; --bg2: #252526; --bg3: #2d2d30; --border: #3c3c3c;
      --text: #cccccc; --text2: #858585; --accent: #0e639c; --accent2: #1177bb;
      --success: #4ec9b0; --error: #f14c4c;
    }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); height: 100vh; overflow: hidden; }

    .container { display: flex; flex-direction: column; height: 100vh; }

    /* SQL Editor */
    .sql-panel { background: var(--bg2); border-bottom: 1px solid var(--border); padding: 12px; }
    .sql-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .sql-header span { font-size: 12px; color: var(--text2); text-transform: uppercase; letter-spacing: 0.5px; }
    .sql-input { display: flex; gap: 8px; }
    .sql-input textarea { flex: 1; background: var(--bg); border: 1px solid var(--border); color: var(--text); padding: 8px 12px; border-radius: 4px; font-family: 'Fira Code', Consolas, monospace; font-size: 13px; resize: vertical; min-height: 60px; }
    .sql-input textarea:focus { outline: none; border-color: var(--accent); }
    .btn { background: var(--accent); color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 13px; transition: background 0.2s; }
    .btn:hover { background: var(--accent2); }
    .btn-sm { padding: 4px 8px; font-size: 12px; }
    .btn-danger { background: #5a1d1d; }
    .btn-danger:hover { background: #6e2424; }

    /* Main Content */
    .main { display: flex; flex: 1; overflow: hidden; }

    /* Sidebar */
    .sidebar { width: 200px; background: var(--bg2); border-right: 1px solid var(--border); overflow-y: auto; }
    .sidebar-header { padding: 12px; font-size: 11px; color: var(--text2); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--border); }
    .table-item { padding: 8px 12px; cursor: pointer; font-size: 13px; display: flex; align-items: center; gap: 8px; }
    .table-item:hover { background: var(--bg3); }
    .table-item.active { background: var(--accent); }
    .table-item::before { content: ''; width: 14px; height: 14px; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23858585'%3E%3Cpath d='M3 3h18v18H3V3zm16 2H5v14h14V5zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z'/%3E%3C/svg%3E") center/contain no-repeat; }

    /* Data Grid */
    .content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .toolbar { padding: 8px 12px; background: var(--bg2); border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 12px; }
    .toolbar-title { font-size: 14px; font-weight: 500; }
    .toolbar-info { font-size: 12px; color: var(--text2); margin-left: auto; }

    .grid-wrapper { flex: 1; overflow: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th { background: var(--bg2); padding: 8px 12px; text-align: left; font-weight: 500; border-bottom: 1px solid var(--border); position: sticky; top: 0; white-space: nowrap; }
    th.pk { color: var(--success); }
    td { padding: 6px 12px; border-bottom: 1px solid var(--border); max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    tr:hover td { background: var(--bg3); }
    td input { background: var(--bg); border: 1px solid var(--accent); color: var(--text); padding: 4px 8px; width: 100%; font-size: 13px; border-radius: 2px; }
    td input:focus { outline: none; }
    .row-actions { display: flex; gap: 4px; }

    /* Pagination */
    .pagination { padding: 8px 12px; background: var(--bg2); border-top: 1px solid var(--border); display: flex; align-items: center; gap: 8px; }
    .pagination button { background: var(--bg3); border: 1px solid var(--border); color: var(--text); padding: 4px 12px; border-radius: 4px; cursor: pointer; }
    .pagination button:hover:not(:disabled) { background: var(--accent); border-color: var(--accent); }
    .pagination button:disabled { opacity: 0.5; cursor: not-allowed; }

    /* Messages */
    .message { padding: 8px 12px; font-size: 12px; border-radius: 4px; margin: 8px 12px; }
    .message.error { background: rgba(241, 76, 76, 0.2); color: var(--error); }
    .message.success { background: rgba(78, 201, 176, 0.2); color: var(--success); }

    /* Empty State */
    .empty { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--text2); gap: 12px; }
    .spinner { width: 24px; height: 24px; border: 2px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    
    /* Modal */
    .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal { background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 20px; min-width: 400px; max-width: 600px; max-height: 80vh; overflow-y: auto; }
    .modal-header { font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
    .modal-body { margin-bottom: 16px; }
    .modal-field { margin-bottom: 12px; }
    .modal-field label { display: block; font-size: 12px; color: var(--text2); margin-bottom: 4px; }
    .modal-field input { width: 100%; background: var(--bg); border: 1px solid var(--border); color: var(--text); padding: 8px 12px; border-radius: 4px; font-size: 13px; }
    .modal-field input:focus { outline: none; border-color: var(--accent); }
    .modal-footer { display: flex; gap: 8px; justify-content: flex-end; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    const vscode = acquireVsCodeApi();

    let state = {
      tables: [],
      currentTable: null,
      columns: [],
      rows: [],
      total: 0,
      page: 0,
      pageSize: 100,
      sql: '',
      sqlResult: null,
      message: null,
      editingCell: null,
      dbPath: '',
      loading: true,
      addRowForm: null,
      scrollTop: 0
    };

    function render() {
      const root = document.getElementById('root');
      
      // Save scroll position before render
      const gridWrapper = document.querySelector('.grid-wrapper');
      if (gridWrapper) {
        state.scrollTop = gridWrapper.scrollTop;
      }
      
      if (state.loading) {
        root.innerHTML = '<div class="empty"><div class="spinner"></div>Loading...</div>';
        return;
      }
      root.innerHTML = \`
        <div class="container">
          <div class="sql-panel">
            <div class="sql-header"><span>SQL Query</span></div>
            <div class="sql-input">
              <textarea id="sqlInput" placeholder="SELECT * FROM table_name...">\${state.sql}</textarea>
              <button class="btn" onclick="runSQL()">Run</button>
            </div>
          </div>

          \${state.message ? \`<div class="message \${state.message.type}">\${state.message.text}</div>\` : ''}

          <div class="main">
            <div class="sidebar">
              <div class="sidebar-header">Tables (\${state.tables.length})</div>
              \${state.tables.map(t => \`
                <div class="table-item \${state.currentTable === t ? 'active' : ''}" onclick="selectTable('\${t}')">\${t}</div>
              \`).join('')}
            </div>

            <div class="content">
              \${state.currentTable ? renderTable() : (state.sqlResult ? renderSqlResult() : '<div class="empty">Select a table or run a query</div>')}
            </div>
          </div>
        </div>
        
        \${state.addRowForm ? renderAddRowModal() : ''}
      \`;

      const textarea = document.getElementById('sqlInput');
      if (textarea) {
        textarea.addEventListener('input', (e) => { state.sql = e.target.value; });
        textarea.addEventListener('keydown', (e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') runSQL();
        });
      }
      
      // Restore scroll position after render
      setTimeout(() => {
        const gridWrapper = document.querySelector('.grid-wrapper');
        if (gridWrapper && state.scrollTop > 0) {
          gridWrapper.scrollTop = state.scrollTop;
        }
      }, 0);
    }

    function renderTable() {
      const { columns, rows, total, page, pageSize, currentTable } = state;
      const totalPages = Math.ceil(total / pageSize);

      return \`
        <div class="toolbar">
          <span class="toolbar-title">\${currentTable}</span>
          <button class="btn btn-sm" onclick="addRow()">+ Add Row</button>
          <span class="toolbar-info">\${total} rows</span>
        </div>
        <div class="grid-wrapper">
          <table>
            <thead>
              <tr>
                <th style="width:80px">Actions</th>
                \${columns.map(c => \`<th class="\${c.pk ? 'pk' : ''}">\${c.name} <small style="color:var(--text2)">\${c.type}</small></th>\`).join('')}
              </tr>
            </thead>
            <tbody>
              \${rows.map((row, i) => \`
                <tr>
                  <td class="row-actions">
                    <button class="btn btn-sm btn-danger" onclick="deleteRow(\${row.rowid || i})">Del</button>
                  </td>
                  \${columns.map(c => {
                    const key = \`\${i}-\${c.name}\`;
                    const isEditing = state.editingCell === key;
                    const val = row[c.name];
                    let display;
                    if (val === null) display = '<i style="color:var(--text2)">NULL</i>';
                    else if (val instanceof Uint8Array || (val && val.type === 'Buffer')) display = '<i style="color:var(--text2)">[BLOB ' + (val.length || val.data?.length || 0) + ' bytes]</i>';
                    else if (typeof val === 'object') display = '<code style="color:#ce9178">' + JSON.stringify(val).substring(0,100) + '</code>';
                    else display = String(val);
                    return isEditing
                      ? \`<td><input type="text" value="\${val === null ? '' : String(val).replace(/"/g, '&quot;')}" onblur="saveCell(\${row.rowid || i}, '\${c.name}', this.value)" onkeydown="if(event.key==='Enter')this.blur();if(event.key==='Escape'){state.editingCell=null;render();}" autofocus></td>\`
                      : \`<td ondblclick="editCell('\${key}')" title="\${String(val).replace(/"/g, '&quot;')}">\${display}</td>\`;
                  }).join('')}
                </tr>
              \`).join('')}
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <button onclick="goPage(0)" \${page === 0 ? 'disabled' : ''}>First</button>
          <button onclick="goPage(\${page - 1})" \${page === 0 ? 'disabled' : ''}>Prev</button>
          <span>Page \${page + 1} of \${totalPages || 1}</span>
          <button onclick="goPage(\${page + 1})" \${page >= totalPages - 1 ? 'disabled' : ''}>Next</button>
          <button onclick="goPage(\${totalPages - 1})" \${page >= totalPages - 1 ? 'disabled' : ''}>Last</button>
        </div>
      \`;
    }

    function renderSqlResult() {
      const { sqlResult } = state;
      if (!sqlResult) return '';
      if (sqlResult.changes !== undefined) {
        return \`<div class="empty">Query executed. \${sqlResult.changes} row(s) affected.</div>\`;
      }
      const { columns, rows } = sqlResult;
      return \`
        <div class="toolbar">
          <span class="toolbar-title">Query Result</span>
          <span class="toolbar-info">\${rows.length} rows</span>
        </div>
        <div class="grid-wrapper">
          <table>
            <thead><tr>\${columns.map(c => \`<th>\${c.name}</th>\`).join('')}</tr></thead>
            <tbody>
              \${rows.map(row => \`<tr>\${columns.map(c => \`<td>\${row[c.name] === null ? '<i style="color:var(--text2)">NULL</i>' : row[c.name]}</td>\`).join('')}</tr>\`).join('')}
            </tbody>
          </table>
        </div>
      \`;
    }
    
    function renderAddRowModal() {
      return \`
        <div class="modal-overlay" onclick="if(event.target===this)cancelAddRow()">
          <div class="modal">
            <div class="modal-header">Add New Row to \${state.currentTable}</div>
            <div class="modal-body">
              \${state.addRowForm.columns.map(c => \`
                <div class="modal-field">
                  <label>\${c.name} <small style="color:var(--text2)">(\${c.type})</small></label>
                  <input 
                    type="text" 
                    placeholder="Leave empty for NULL"
                    oninput="state.addRowForm.data['\${c.name}'] = this.value || null"
                  />
                </div>
              \`).join('')}
            </div>
            <div class="modal-footer">
              <button class="btn" onclick="cancelAddRow()">Cancel</button>
              <button class="btn" onclick="submitAddRow()">Add Row</button>
            </div>
          </div>
        </div>
      \`;
    }

    function selectTable(name) {
      state.currentTable = name;
      state.sqlResult = null;
      state.page = 0;
      vscode.postMessage({ type: 'getTableData', table: name, page: 0, pageSize: state.pageSize });
    }

    function goPage(p) {
      state.page = p;
      vscode.postMessage({ type: 'getTableData', table: state.currentTable, page: p, pageSize: state.pageSize });
    }

    function runSQL() {
      const sql = state.sql.trim();
      if (!sql) return;
      state.currentTable = null;
      vscode.postMessage({ type: 'executeSQL', sql });
    }

    function editCell(key) {
      state.editingCell = key;
      render();
    }

    function saveCell(rowid, column, value) {
      state.editingCell = null;
      vscode.postMessage({ type: 'updateCell', table: state.currentTable, rowid, column, value: value || null });
      setTimeout(() => selectTable(state.currentTable), 100);
    }

    function deleteRow(rowid) {
      if (confirm('Delete this row?')) {
        vscode.postMessage({ type: 'deleteRow', table: state.currentTable, rowid });
        setTimeout(() => selectTable(state.currentTable), 100);
      }
    }

    function addRow() {
      console.log('addRow called');
      console.log('Current table:', state.currentTable);
      console.log('Columns:', state.columns);
      
      if (!state.currentTable || !state.columns || state.columns.length === 0) {
        showMessage('error', 'No table selected or no columns found');
        return;
      }
      
      const nonPkColumns = state.columns.filter(c => !c.pk);
      
      console.log('Non-PK columns:', nonPkColumns);
      
      if (nonPkColumns.length === 0) {
        showMessage('error', 'This table has no non-primary-key columns to insert');
        return;
      }
      
      // Show input form
      state.addRowForm = { columns: nonPkColumns, data: {} };
      render();
    }
    
    function submitAddRow() {
      const data = state.addRowForm.data;
      console.log('Sending insertRow message with data:', data);
      vscode.postMessage({ type: 'insertRow', table: state.currentTable, data });
      state.addRowForm = null;
      setTimeout(() => selectTable(state.currentTable), 100);
    }
    
    function cancelAddRow() {
      state.addRowForm = null;
      render();
    }
    
    function showMessage(type, text) {
      state.message = { type, text };
      render();
    }

    window.addEventListener('message', (e) => {
      const msg = e.data;
      state.message = null;

      switch (msg.type) {
        case 'init':
          state.tables = msg.tables;
          state.dbPath = msg.dbPath;
          state.loading = false;
          break;
        case 'tableData':
          state.columns = msg.columns;
          state.rows = msg.rows;
          state.total = msg.total;
          state.page = msg.page;
          break;
        case 'sqlResult':
          state.sqlResult = msg;
          break;
        case 'error':
          state.message = { type: 'error', text: msg.message };
          break;
        case 'updateSuccess':
        case 'deleteSuccess':
        case 'insertSuccess':
          state.message = { type: 'success', text: 'Operation successful' };
          break;
      }
      render();
    });

    render();
    vscode.postMessage({ type: 'ready' });
  </script>
</body>
</html>`;
  }

  saveCustomDocument(): Thenable<void> {
    return Promise.resolve();
  }
  saveCustomDocumentAs(): Thenable<void> {
    return Promise.resolve();
  }
  revertCustomDocument(): Thenable<void> {
    return Promise.resolve();
  }
  backupCustomDocument(): Thenable<vscode.CustomDocumentBackup> {
    return Promise.resolve({ id: "", delete: () => {} });
  }

  private readonly _onDidChangeCustomDocument = new vscode.EventEmitter<
    vscode.CustomDocumentEditEvent<vscode.CustomDocument>
  >();
  readonly onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;
}

export function deactivate() {}
