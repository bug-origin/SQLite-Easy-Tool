# SQLite Easy Tool

A clean and easy-to-use VSCode SQLite database visual editor for viewing, editing, and querying SQLite databases directly in VSCode.

[![VSCode Version](https://img.shields.io/badge/VSCode-1.85+-blue.svg)](https://marketplace.visualstudio.com/items?itemName=Dev-Winston.sqlite-easy-tool)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/bug-origin/SQLite-Easy-Tool?style=social)](https://github.com/bug-origin/SQLite-Easy-Tool)

<!-- Place main screenshot or demo GIF here -->
<!-- ![Demo](images/demo.gif) -->

## ✨ Why SQLite Easy Tool?

During development, you often need to view and debug SQLite databases, but switching to external tools is cumbersome and interrupts your workflow. SQLite Easy Tool lets you complete all database operations directly in VSCode without installing additional software.

## 🚀 Features

- **📂 Visual Browsing** - Open `.db`, `.sqlite`, `.sqlite3` files directly in VSCode
- **🗂️ Table Navigation** - Sidebar displays all tables, click to switch
- **📄 Data Pagination** - Support for large tables with pagination (100 rows per page)
- **💻 SQL Query** - Built-in SQL editor to execute custom queries
- **✏️ Cell Editing** - Double-click cells to edit data directly
- **➕ Row Operations** - Add and delete rows
- **🔍 Column Info** - Display field types and primary key indicators
- **💾 Auto-save** - Automatically save data changes to the database file

## 📸 Demo

<!-- Add feature demo GIFs below -->

### Open Database File

<!-- ![Open Database](images/open-database.gif) -->

Simply open a SQLite file in VSCode, and the extension will automatically activate with a visual interface.

### Browse and Edit Data

<!-- ![Edit Data](images/edit-data.gif) -->

- Select table to view in the left panel
- Double-click any cell to edit
- Click "Add Row" to add new rows
- Select row and click "Delete Row" to remove

### Execute SQL Queries

<!-- ![SQL Query](images/sql-query.gif) -->

Enter query statements in the SQL editor and click "Execute" to view results.

## 📦 Installation

### From VSCode Extension Marketplace (Recommended)

1. Open VSCode
2. Press `Ctrl+Shift+X` (Mac: `Cmd+Shift+X`) to open Extensions panel
3. Search for "SQLite Easy Tool"
4. Click Install

Or visit directly: [VSCode Extension Marketplace](https://marketplace.visualstudio.com/items?itemName=Dev-Winston.sqlite-easy-tool)

### From VSIX File

```bash
code --install-extension sqlite-easy-tool-0.1.0.vsix
```

## 📖 Usage

### Quick Start

1. Open any `.db`, `.sqlite`, or `.sqlite3` file in VSCode
2. The extension will automatically open the database with a visual editor
3. Select the table to view in the left panel
4. Start browsing and editing data!

### Basic Operations

#### View Data

- **Switch Tables**: Click table name in the left sidebar
- **Pagination**: Use "Previous" and "Next" buttons at the bottom
- **View Column Info**: Column headers show field types, 🔑 indicates primary key

#### Edit Data

- **Modify Cell**: Double-click cell, enter new value, and blur to auto-save
- **Add Row**: Click "Add Row" button, enter data in the popup dialog
- **Delete Row**: Click the row to delete, then click "Delete Row" button

#### SQL Query

- Enter query statement in the SQL editor
- Click "Execute" button to run
- Query results display in the table below

### Supported Operations

| Operation     | Description                       | Shortcut |
| ------------- | --------------------------------- | -------- |
| Open Database | Click `.db/.sqlite/.sqlite3` file | -        |
| Switch Table  | Click table name in sidebar       | -        |
| Edit Cell     | Double-click cell                 | -        |
| Save Changes  | Automatic                         | -        |
| Execute Query | Click Execute                     | -        |
| Add Row       | Click Add Row                     | -        |
| Delete Row    | Select row and click Delete Row   | -        |

## 📋 Supported File Formats

| Extension  | Description                   |
| ---------- | ----------------------------- |
| `.db`      | Standard SQLite database file |
| `.sqlite`  | SQLite database file          |
| `.sqlite3` | SQLite 3 database file        |

> **Tip**: The extension automatically associates with these file types, just double-click to open.

## 👨‍💻 Development

### Requirements

- Node.js 18+
- VSCode 1.85+

### Local Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run watch
```

### Package for Release

```bash
npm run package
```

### Run Tests

```bash
npm test
```

## 🔧 Tech Stack

- **TypeScript** - Type-safe development experience
- **sql.js** - WebAssembly-based SQLite implementation, no local installation required
- **VSCode Custom Editor API** - Native editor integration
- **WebView** - Modern user interface

## 💡 FAQ

### Q: Does the extension modify my database file?

A: Yes, when you edit data, changes are saved directly to the database file. It's recommended to backup important data before editing.

### Q: Does it support large databases?

A: The extension uses pagination loading with 100 records per page, so it can handle large tables. However, the entire database file is loaded into memory, so very large files (GB-level) may affect performance.

### Q: Can I create new databases?

A: The current version is mainly for viewing and editing existing databases. Creating new databases is planned for future versions.

### Q: Are there restrictions on SQL queries?

A: Standard SQL query statements are supported. For security reasons, some system-level operations may be restricted.

## 🗺️ Roadmap

- [ ] Support creating new databases and tables
- [ ] Import/Export CSV data
- [ ] Advanced SQL editor (syntax highlighting, auto-completion)
- [ ] Database schema visualization
- [ ] Multiple theme support
- [ ] Performance optimization (virtual scrolling)

## 🤝 Contributing

Contributions are welcome! If you have good ideas or found bugs:

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Issue Reporting

If you encounter problems or have feature suggestions, please submit them on [GitHub Issues](https://github.com/bug-origin/SQLite-Easy-Tool/issues).

## 📄 License

This project is licensed under the [MIT](LICENSE) License.

## ⭐ Support the Project

If this extension helps you, please:

- Give a 5-star review on the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=Dev-Winston.sqlite-easy-tool)
- Star ⭐ on [GitHub](https://github.com/bug-origin/SQLite-Easy-Tool)
- Share with your friends

---

**Enjoy! 🎉**
