# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- Create new databases and tables
- Import/Export CSV data
- Advanced SQL editor with syntax highlighting and auto-completion
- Database schema visualization
- Multiple theme support
- Performance optimization with virtual scrolling

## [0.1.0] - 2025-01-11

### Added

- 🎉 Initial release
- ✅ Support for `.db`, `.sqlite`, `.sqlite3` file formats
- ✅ Visual table browser with sidebar navigation
- ✅ Data pagination (100 rows per page)
- ✅ Built-in SQL query editor with execution support
- ✅ Inline cell editing (double-click to edit)
- ✅ Add new rows to tables
- ✅ Delete rows from tables
- ✅ Column type and primary key display
- ✅ Auto-save on data modification
- ✅ WebAssembly-based SQLite (no native dependencies)

### Technical Details

- Built with TypeScript and VSCode Custom Editor API
- Uses sql.js for SQLite operations
- Modern webview-based UI
- Zero external dependencies for end users
