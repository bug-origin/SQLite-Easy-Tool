import initSqlJs, { Database, SqlJsStatic } from 'sql.js';
import * as fs from 'fs';
import * as path from 'path';

export interface ColumnInfo {
  cid: number;
  name: string;
  type: string;
  notnull: number;
  dflt_value: any;
  pk: number;
}

export interface QueryResult {
  columns: ColumnInfo[];
  rows: Record<string, any>[];
  total?: number;
}

export interface ExecuteResult {
  success: boolean;
  changes?: number;
  error?: string;
}

export class SqliteDatabase {
  private db: Database | null = null;
  private SQL: SqlJsStatic | null = null;
  private dbPath: string = '';

  async open(filePath: string, wasmPath?: string): Promise<void> {
    const resolvedWasmPath = wasmPath || path.join(__dirname, '..', 'dist', 'sql-wasm.wasm');

    if (!fs.existsSync(filePath)) {
      throw new Error(`Database file not found: ${filePath}`);
    }

    const ext = path.extname(filePath).toLowerCase();
    if (!['.db', '.sqlite', '.sqlite3'].includes(ext)) {
      throw new Error(`Unsupported file format: ${ext}. Supported formats: .db, .sqlite, .sqlite3`);
    }

    this.SQL = await initSqlJs({ locateFile: () => resolvedWasmPath });
    const fileBuffer = fs.readFileSync(filePath);

    try {
      this.db = new this.SQL.Database(fileBuffer);
      this.dbPath = filePath;
    } catch (e: any) {
      throw new Error(`Invalid SQLite database: ${e.message}`);
    }
  }

  isOpen(): boolean {
    return this.db !== null;
  }

  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  save(): void {
    if (this.db && this.dbPath) {
      const data = this.db.export();
      fs.writeFileSync(this.dbPath, Buffer.from(data));
    }
  }

  getTables(): string[] {
    if (!this.db) throw new Error('Database not open');
    const result = this.queryAll("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name");
    return result.map(r => r.name);
  }

  getTableInfo(tableName: string): ColumnInfo[] {
    if (!this.db) throw new Error('Database not open');
    this.validateTableName(tableName);
    return this.queryAll(`PRAGMA table_info("${tableName}")`) as ColumnInfo[];
  }

  getTableData(tableName: string, page: number = 0, pageSize: number = 100): QueryResult {
    if (!this.db) throw new Error('Database not open');
    this.validateTableName(tableName);

    const columns = this.getTableInfo(tableName);
    const totalResult = this.queryAll(`SELECT COUNT(*) as count FROM "${tableName}"`);
    const total = totalResult[0]?.count || 0;
    const rows = this.queryAll(`SELECT rowid, * FROM "${tableName}" LIMIT ? OFFSET ?`, [pageSize, page * pageSize]);

    return { columns, rows, total };
  }

  queryAll(sql: string, params: any[] = []): Record<string, any>[] {
    if (!this.db) throw new Error('Database not open');

    const stmt = this.db.prepare(sql);
    if (params.length) stmt.bind(params);

    const rows: Record<string, any>[] = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
    return rows;
  }

  execute(sql: string, params: any[] = []): ExecuteResult {
    if (!this.db) throw new Error('Database not open');

    try {
      this.db.run(sql, params);
      return { success: true, changes: this.db.getRowsModified() };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }

  executeSQL(sql: string): QueryResult | ExecuteResult {
    if (!this.db) throw new Error('Database not open');

    const trimmed = sql.trim().toLowerCase();
    const isQuery = trimmed.startsWith('select') || trimmed.startsWith('pragma') || trimmed.startsWith('explain');

    if (isQuery) {
      const rows = this.queryAll(sql);
      const columns = rows.length > 0
        ? Object.keys(rows[0]).map(name => ({ cid: 0, name, type: '', notnull: 0, dflt_value: null, pk: 0 }))
        : [];
      return { columns, rows };
    } else {
      const result = this.execute(sql);
      if (result.success) {
        this.save();
      }
      return result;
    }
  }

  updateCell(tableName: string, rowid: number, column: string, value: any): ExecuteResult {
    if (!this.db) throw new Error('Database not open');
    this.validateTableName(tableName);
    this.validateColumnName(column);

    const result = this.execute(`UPDATE "${tableName}" SET "${column}" = ? WHERE rowid = ?`, [value, rowid]);
    if (result.success) {
      this.save();
    }
    return result;
  }

  deleteRow(tableName: string, rowid: number): ExecuteResult {
    if (!this.db) throw new Error('Database not open');
    this.validateTableName(tableName);

    const result = this.execute(`DELETE FROM "${tableName}" WHERE rowid = ?`, [rowid]);
    if (result.success) {
      this.save();
    }
    return result;
  }

  insertRow(tableName: string, data: Record<string, any>): ExecuteResult {
    if (!this.db) throw new Error('Database not open');
    this.validateTableName(tableName);

    const columns = Object.keys(data);
    columns.forEach(c => this.validateColumnName(c));

    const values = Object.values(data);
    const placeholders = columns.map(() => '?').join(', ');
    const sql = `INSERT INTO "${tableName}" (${columns.map(c => `"${c}"`).join(', ')}) VALUES (${placeholders})`;

    const result = this.execute(sql, values);
    if (result.success) {
      this.save();
    }
    return result;
  }

  private validateTableName(name: string): void {
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name) && !/^"[^"]+"$/.test(name)) {
      // Allow quoted identifiers or simple names
      if (name.includes('"') || name.includes("'") || name.includes(';')) {
        throw new Error(`Invalid table name: ${name}`);
      }
    }
  }

  private validateColumnName(name: string): void {
    if (name.includes('"') || name.includes("'") || name.includes(';')) {
      throw new Error(`Invalid column name: ${name}`);
    }
  }
}
