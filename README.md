# SQLite Easy Tool

一个简洁易用的 VSCode SQLite 数据库可视化编辑器。

![VSCode Version](https://img.shields.io/badge/VSCode-1.85+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

<!-- 在这里放置扩展的主截图或动图 -->
<!-- ![Demo](images/demo.gif) -->

## 功能特性

- **可视化浏览** - 直接在 VSCode 中打开 `.db`、`.sqlite`、`.sqlite3` 文件
- **表格导航** - 侧边栏显示所有数据表，点击即可切换
- **数据分页** - 支持大数据表分页浏览，每页100条记录
- **SQL 查询** - 内置 SQL 编辑器，执行自定义查询语句
- **单元格编辑** - 双击单元格即可直接修改数据
- **行操作** - 支持新增行和删除行
- **列信息** - 显示字段类型和主键标识

## 演示

<!-- 在下方添加功能演示动图 -->

### 打开数据库
<!-- ![打开数据库](images/open-database.gif) -->

### 编辑数据
<!-- ![编辑数据](images/edit-data.gif) -->

### SQL 查询
<!-- ![SQL查询](images/sql-query.gif) -->

## 安装

### 从 VSCode 扩展市场安装
1. 打开 VSCode
2. 按 `Ctrl+Shift+X` (Mac: `Cmd+Shift+X`) 打开扩展面板
3. 搜索 "SQLite Easy Tool"
4. 点击安装

### 从 VSIX 文件安装
```bash
code --install-extension sqlite-easy-tool-0.1.0.vsix
```

## 使用方法

1. 在 VSCode 中打开任意 `.db`、`.sqlite` 或 `.sqlite3` 文件
2. 扩展会自动以可视化编辑器打开数据库
3. 在左侧面板选择要查看的表
4. 双击单元格编辑数据，修改会自动保存

## 支持的文件格式

| 扩展名 | 说明 |
|--------|------|
| `.db` | SQLite 数据库文件 |
| `.sqlite` | SQLite 数据库文件 |
| `.sqlite3` | SQLite 3 数据库文件 |

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

## 技术栈

- TypeScript
- sql.js (WebAssembly SQLite)
- VSCode Custom Editor API

## 许可证

[MIT](LICENSE)

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解版本更新历史。
