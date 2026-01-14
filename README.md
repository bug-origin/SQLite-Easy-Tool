# SQLite Easy Tool

🎨 **Operate databases like Excel** - No need to memorize SQL syntax, easily manage SQLite data through an intuitive visual interface. Click, double-click, drag and drop - what you see is what you get!

[![VSCode Version](https://img.shields.io/badge/VSCode-1.85+-blue.svg)](https://marketplace.visualstudio.com/items?itemName=Dev-Winston.sqlite-easy-tool)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/bug-origin/SQLite-Easy-Tool?style=social)](https://github.com/bug-origin/SQLite-Easy-Tool)

<!-- Place main screenshot or demo GIF here -->
<!-- ![Demo](images/demo.gif) -->

## ✨ Say Goodbye to Command Line, Embrace Visualization

**Don't know SQL? No problem!** Just click with your mouse to complete database operations.

- ❌ No need to memorize SQL syntax
- ❌ No need to open external database tools
- ❌ No need to type commands in terminal
- ✅ As simple as editing Excel spreadsheets
- ✅ All operations in your familiar VSCode

## 🎯 Core Highlights: What You See Is What You Get

### 📊 View Data Like Excel

- **Click to View** - Table list on the left, click what you want to see
- **Intuitive Display** - Data presented in table format, clear at a glance
- **Smart Pagination** - Auto-pagination, smooth browsing even for large tables
- **Type Annotation** - Field types and primary key indicators clearly visible 🔑

### ✏️ Edit Data Like Excel

- **Double-Click to Edit** - Double-click cells to modify directly, no UPDATE statements needed
- **Click to Add** - Click button to add new rows, form pops up automatically
- **Click to Delete** - Select row and click delete, goodbye DELETE statements
- **Instant Save** - Auto-save after modification, no worries about data loss

### 💻 Pro Mode: SQL Query

- **Built-in Editor** - Need complex queries? SQL editor is always ready
- **One-Click Execute** - Run it right after writing, results appear instantly
- **Result Visualization** - Query results displayed in table format too

## 📸 Demo: So Simple No Tutorial Needed

<!-- Add feature demo GIFs below -->

### 🖱️ Open = Double-Click File

<!-- ![Open Database](images/open-database.gif) -->

Double-click a `.db` file in VSCode, the extension opens automatically, data appears instantly. **Zero configuration, ready to use.**

### 👆 Edit = Click Cell

<!-- ![Edit Data](images/edit-data.gif) -->

**3 steps to edit data:**

1. 👈 Click table name on left → Data displays
2. 🖱️ Double-click cell → Enter new value
3. ✅ Blur to save → Done!

**Add/Delete?** Just click buttons, as natural as any regular app.

### 💡 Advanced = Write SQL (Optional)

<!-- ![SQL Query](images/sql-query.gif) -->

Need complex queries? SQL editor is always ready below. Write it, click "Execute", results come right away.

## 📥 Install in 3 Seconds, Ready to Use

### Method 1: VSCode Marketplace (One-Click Setup)

1. Open VSCode
2. `Ctrl+Shift+X` (Mac: `Cmd+Shift+X`) to open Extensions
3. Search "SQLite Easy Tool"
4. Click Install → Done!

🔗 Direct link: [VSCode Extension Marketplace](https://marketplace.visualstudio.com/items?itemName=Dev-Winston.sqlite-easy-tool)

### Method 2: Install from VSIX

```bash
code --install-extension sqlite-easy-tool-0.1.0.vsix
```

## 🎮 Start Using in 3 Steps: Really Just 3 Steps

1. **📂 Double-Click to Open** - Double-click `.db` file in VSCode
2. **👈 Click Table Name** - Select the table you want to view on the left
3. **✨ Start Operating** - Double-click cell to edit!

> 🎉 **It's that simple! No configuration needed, no learning curve.**

---

## 📖 Operation Guide: As Intuitive As a Game

### 👀 View Data: Click to See

| What to Do        | How to Do It                                |
| ----------------- | ------------------------------------------- |
| Switch Tables     | 👈 Click table name on left                 |
| Pagination        | 👇 Click Previous/Next at bottom            |
| View Column Types | 👁️ Look at column headers, 🔑 = Primary Key |

### ✏️ Edit Data: Double-Click to Edit

| What to Do     | How to Do It                     | Tip               |
| -------------- | -------------------------------- | ----------------- |
| Modify Content | 🖱️ Double-click cell to input    | Auto-save on blur |
| Add New Row    | ➕ Click "Add Row"               | Fill out the form |
| Delete Row     | ✖️ Select and click "Delete Row" | One-click delete  |

### 💻 Execute SQL: Write and Run

1. 📝 Write statement in SQL editor below
2. ▶️ Click "Execute" button
3. 📊 Results automatically displayed in table

---

## 💻 Supported File Formats

✅ `.db` ✅ `.sqlite` ✅ `.sqlite3`

> Double-click these files, automatically opens with visual editor!

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

## ❓ FAQ

<details>
<summary><b>Q: Will it break my database?</b></summary>
<br>
A: Your edits are saved directly to the file. <b>Please backup important data first!</b> 💾
</details>

<details>
<summary><b>Q: My database is huge, will it lag?</b></summary>
<br>
A: We use pagination loading, <b>100 rows/page</b>, can handle millions of records. But GB-level super large files might be slower.
</details>

<details>
<summary><b>Q: Can I create new databases?</b></summary>
<br>
A: Current version focuses on <b>viewing and editing</b>. Creation feature is on the way, stay tuned! 🚀
</details>

<details>
<summary><b>Q: Don't know SQL, what should I do?</b></summary>
<br>
A: <b>That's our highlight!</b> All operations can be done with mouse, SQL is just an advanced option. 👆
</details>

## 🗺️ Roadmap

We're making it even better:

- [ ] 🎉 Create new databases and tables
- [ ] 📊 Import/Export CSV data
- [ ] ✨ Advanced SQL editor (syntax highlighting, auto-completion)
- [ ] 🏛️ Database schema visualization
- [ ] 🎨 Multiple theme support
- [ ] ⚡ Performance optimization (virtual scrolling)

## 🤝 Let's Make It Better Together

Got ideas? Found a bug? Contributions welcome!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Encountered a Problem?

Go to [GitHub Issues](https://github.com/bug-origin/SQLite-Easy-Tool/issues) and let us know, we'll fix it ASAP!

## 📜 License

This project is licensed under the [MIT](LICENSE) License.

## ⭐ Like It? Give Us a Star!

If this extension helps you:

- 👍 Give a 5-star review on [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=Dev-Winston.sqlite-easy-tool)
- ⭐ Star on [GitHub](https://github.com/bug-origin/SQLite-Easy-Tool)
- 👋 Share with your friends

---

<div align="center">

**🎉 Enjoy the Fun of Visual Operations!**

Made with ❤️, please Star if you like it ⭐

</div>
