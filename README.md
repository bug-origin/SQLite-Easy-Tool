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

[![VSCode Version](https://img.shields.io/badge/VSCode-1.85+-blue.svg)](https://marketplace.visualstudio.com/items?itemName=Dev-Winston.sqlite-easy-tool)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/bug-origin/SQLite-Easy-Tool?style=social)](https://github.com/bug-origin/SQLite-Easy-Tool)

<!-- 在这里放置扩展的主截图或动图 -->
<!-- ![Demo](images/demo.gif) -->

## ✨ 告别命令行，拥抱可视化

**不会 SQL？没关系！** 用鼠标点点就能完成数据库操作。

- ❌ 不用背 SQL 语法
- ❌ 不用打开额外的数据库工具
- ❌ 不用在终端敲命令
- ✅ 就像编辑 Excel 表格一样简单
- ✅ 所有操作都在熟悉的 VSCode 中完成

## 🎯 核心亮点：所见即所得

### 📊 像看 Excel 一样看数据

- **点击查看** - 左侧表格列表，想看哪个点哪个
- **直观展示** - 数据以表格形式呈现，一目了然
- **智能分页** - 自动分页，大数据表也能流畅浏览
- **类型标注** - 字段类型、主键标识清晰可见 🔑

### ✏️ 像改 Excel 一样改数据

- **双击编辑** - 双击单元格直接修改，无需写 UPDATE 语句
- **点击添加** - 点击按钮添加新行，自动弹出表单
- **点击删除** - 选中行点删除，告别 DELETE 语句
- **即时保存** - 修改后自动保存，不用担心丢失

### 💻 高手模式：SQL 查询

- **内置编辑器** - 需要复杂查询？SQL 编辑器随时待命
- **一键执行** - 写完就能跑，结果立即呈现
- **结果可视化** - 查询结果同样以表格展示

## 📸 操作演示：简单到不需要教程

<!-- 在下方添加功能演示动图 -->

### 🖱️ 打开 = 双击文件

<!-- ![打开数据库](images/open-database.gif) -->

在 VSCode 中双击 `.db` 文件，扩展自动打开，数据即刻呈现。**零配置，开箱即用。**

### 👆 编辑 = 点击单元格

<!-- ![编辑数据](images/edit-data.gif) -->

**3 个步骤搞定数据编辑：**

1. 👈 点左侧表名 → 数据展示
2. 🖱️ 双击单元格 → 输入新值
3. ✅ 失焦保存 → 完成！

**添加/删除？** 点按钮就行，像操作普通应用一样自然。

### 💡 高级 = 写 SQL（可选）

<!-- ![SQL查询](images/sql-query.gif) -->

需要复杂查询？下方 SQL 编辑器随时待命。写完点「Execute」，结果马上就来。

## � 3 秒安装，开箱即用

### 方法一：VSCode 应用店（一键搞定）

1. 打开 VSCode
2. `Ctrl+Shift+X` (Mac: `Cmd+Shift+X`) 打开扩展
3. 搜索「SQLite Easy Tool」
4. 点击安装 → 完成！

🔗 直达链接：[VSCode 扩展市场](https://marketplace.visualstudio.com/items?itemName=Dev-Winston.sqlite-easy-tool)

### 从 VSIX 文件安装

```bash
code --install-extension sqlite-easy-tool-0.1.0.vsix
```

## 📖 使用方法

### 快速开始

1. 在 VSCode 中打开任意 `.db`、`.sqlite` 或 `.sqlite3` 文件
2. 扩展会自动以可视化编辑器打开数据库
3. 在左侧面板选择要查看的表
4. 开始浏览和编辑数据！

### 基本操作

#### 查看数据

- **切换表格**：点击左侧边栏的表名
- **翻页**：使用底部的"Previous"和"Next"按钮
- **查看列信息**：列标题显示字段类型，🔑 表示主键

#### 编辑数据

- **修改单元格**：双击单元格，输入新值后失焦自动保存
- **添加行**：点击"Add Row"按钮，在弹出的对话框中输入数据
- **删除行**：点击要删除的行，然后点击"Delete Row"按钮

#### SQL 查询

- 在 SQL 编辑器中输入查询语句
- 点击"Execute"按钮执行
- 查询结果会显示在下方表格中

---

## 💻 支持的文件格式

✅ `.db` ✅ `.sqlite` ✅ `.sqlite3`

> 双击这些文件，自动用可视化编辑器打开！

## 开发

### 环境要求

- Node.js 18+
- VSCode 1.85+

### 本地开发

```bash
# 安装依赖
npm install

# 编译
npm run build

# 监听模式
npm run watch
```

### 打包发布

```bash
npm run package
```

## 🔧 技术栈

- **TypeScript** - 类型安全的开发体验
- **sql.js** - 基于 WebAssembly 的 SQLite 实现，无需本地安装
- **VSCode Custom Editor API** - 原生编辑器集成
- **WebView** - 现代化的用户界面

## ❓ 常见疑问

<details>
<summary><b>Q: 会不会改坏我的数据库？</b></summary>
<br>
A: 你的编辑会直接保存到文件。<b>重要数据请先备份！</b> 💾
</details>

<details>
<summary><b>Q: 我的数据库很大，卡不卡？</b></summary>
<br>
A: 我们用了分页加载，<b>100 条/页</b>，百万级数据也不怕。但 GB 级的超大文件可能会慢一些。
</details>

<details>
<summary><b>Q: 能创建新数据库吗？</b></summary>
<br>
A: 当前版本主打<b>查看和编辑</b>。创建功能在路上了，敬请期待！ 🚀
</details>

<details>
<summary><b>Q: 不会 SQL 怎么办？</b></summary>
<br>
A: <b>这就是我们的亮点！</b> 所有操作都能用鼠标完成，SQL 只是高级选项。 👆
</details>

## 🗺️ 未来计划

我们正在让它变得更强大：

- [ ] 🎉 创建新数据库和表
- [ ] 📊 导入/导出 CSV 数据
- [ ] ✨ 高级 SQL 编辑器（语法高亮、自动补全）
- [ ] 🏛️ 数据库结构可视化
- [ ] 🎨 多主题支持
- [ ] ⚡ 性能优化（虚拟滚动）

## 🤝 一起让它变更好

有好点子？发现 Bug？欢迎贡献！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 🐛 遇到问题？

去 [GitHub Issues](https://github.com/bug-origin/SQLite-Easy-Tool/issues) 告诉我们，我们会尽快修复！

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## ⭐ 喜欢就给个星星吧！

如果这个插件帮到了你：

- 👍 在 [VSCode 市场](https://marketplace.visualstudio.com/items?itemName=Dev-Winston.sqlite-easy-tool)给个五星好评
- ⭐ 在 [GitHub](https://github.com/bug-origin/SQLite-Easy-Tool) 点个 Star
- 👋 分享给你的小伙伴

---

<div align="center">

**🎉 享受可视化操作的乐趣！**

制作不易，喜欢就点个 Star 吧 ⭐

</div>

查看 [CHANGELOG.md](CHANGELOG.md) 了解版本更新历史。
