# SQLite Easy Tool

一个简洁易用的 VSCode SQLite 数据库可视化编辑器，让你在 VSCode 中轻松查看、编辑和查询 SQLite 数据库。

[![VSCode Version](https://img.shields.io/badge/VSCode-1.85+-blue.svg)](https://marketplace.visualstudio.com/items?itemName=Dev-Winston.sqlite-easy-tool)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/bug-origin/SQLite-Easy-Tool?style=social)](https://github.com/bug-origin/SQLite-Easy-Tool)

<!-- 在这里放置扩展的主截图或动图 -->
<!-- ![Demo](images/demo.gif) -->

## ✨ 为什么选择 SQLite Easy Tool？

在开发过程中，经常需要查看和调试 SQLite 数据库，但切换到外部工具既麻烦又打断工作流程。SQLite Easy Tool 让你直接在 VSCode 中完成所有数据库操作，无需安装额外软件。

## 🚀 功能特性

- **📂 可视化浏览** - 直接在 VSCode 中打开 `.db`、`.sqlite`、`.sqlite3` 文件
- **🗂️ 表格导航** - 侧边栏显示所有数据表，点击即可切换
- **📄 数据分页** - 支持大数据表分页浏览，每页 100 条记录
- **💻 SQL 查询** - 内置 SQL 编辑器，执行自定义查询语句
- **✏️ 单元格编辑** - 双击单元格即可直接修改数据
- **➕ 行操作** - 支持新增行和删除行
- **🔍 列信息** - 显示字段类型和主键标识
- **💾 自动保存** - 数据修改后自动保存到数据库文件

## 📸 演示

<!-- 在下方添加功能演示动图 -->

### 打开数据库文件

<!-- ![打开数据库](images/open-database.gif) -->

只需在 VSCode 中打开 SQLite 文件，扩展会自动激活并显示可视化界面。

### 浏览和编辑数据

<!-- ![编辑数据](images/edit-data.gif) -->

- 在左侧选择要查看的表
- 双击任意单元格即可编辑
- 点击"Add Row"添加新行
- 选择行后点击"Delete Row"删除

### 执行 SQL 查询

<!-- ![SQL查询](images/sql-query.gif) -->

在 SQL 编辑器中输入查询语句，点击"Execute"查看结果。

## 📦 安装

### 从 VSCode 扩展市场安装（推荐）

1. 打开 VSCode
2. 按 `Ctrl+Shift+X` (Mac: `Cmd+Shift+X`) 打开扩展面板
3. 搜索 "SQLite Easy Tool"
4. 点击安装

或者直接访问：[VSCode 扩展市场](https://marketplace.visualstudio.com/items?itemName=Dev-Winston.sqlite-easy-tool)

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

### 支持的操作

| 操作       | 说明                             | 快捷方式 |
| ---------- | -------------------------------- | -------- |
| 打开数据库 | 点击 `.db/.sqlite/.sqlite3` 文件 | -        |
| 切换表格   | 点击左侧表名                     | -        |
| 编辑单元格 | 双击单元格                       | -        |
| 保存更改   | 自动保存                         | -        |
| 执行查询   | 点击 Execute                     | -        |
| 添加行     | 点击 Add Row                     | -        |
| 删除行     | 选中后点击 Delete Row            | -        |

## 📋 支持的文件格式

| 扩展名     | 说明                   |
| ---------- | ---------------------- |
| `.db`      | 标准 SQLite 数据库文件 |
| `.sqlite`  | SQLite 数据库文件      |
| `.sqlite3` | SQLite 3 数据库文件    |

> **提示**：扩展会自动关联这些文件类型，双击即可打开。

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

## 💡 常见问题

### Q: 扩展是否会修改我的数据库文件？

A: 是的，当你编辑数据后，更改会直接保存到数据库文件中。建议在编辑前备份重要数据。

### Q: 支持大型数据库吗？

A: 扩展使用分页加载，每页 100 条记录，可以处理大型数据表。但整个数据库文件会加载到内存，超大文件（GB 级）可能会影响性能。

### Q: 可以创建新的数据库吗？

A: 当前版本主要用于查看和编辑现有数据库。创建新数据库功能计划在未来版本中添加。

### Q: SQL 查询有限制吗？

A: 支持标准 SQL 查询语句。出于安全考虑，某些系统级操作可能受限。

## 🗺️ 路线图

- [ ] 支持创建新数据库和表
- [ ] 导入/导出 CSV 数据
- [ ] 高级 SQL 编辑器（语法高亮、自动补全）
- [ ] 数据库结构可视化
- [ ] 多主题支持
- [ ] 性能优化（虚拟滚动）

## 🤝 贡献

欢迎贡献代码！如果你有好的想法或发现了 bug：

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 🐛 问题反馈

如果遇到问题或有功能建议，请在 [GitHub Issues](https://github.com/bug-origin/SQLite-Easy-Tool/issues) 提交。

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## ⭐ 支持项目

如果这个扩展对你有帮助，请：

- 在 [VSCode 市场](https://marketplace.visualstudio.com/items?itemName=Dev-Winston.sqlite-easy-tool)给个五星好评
- 在 [GitHub](https://github.com/bug-origin/SQLite-Easy-Tool) 点个 Star ⭐
- 分享给你的朋友

---

**Enjoy! 🎉**

查看 [CHANGELOG.md](CHANGELOG.md) 了解版本更新历史。
