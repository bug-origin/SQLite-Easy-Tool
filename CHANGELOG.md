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

## [0.1.3] - 2026-01-14

### Fixed

- 🐛 Fixed "Add Row" functionality error caused by webview sandbox restrictions
- 🐛 Fixed scroll position reset issue when editing data - now maintains scroll position after operations
- 🔧 Improved user experience with custom modal dialog for adding new rows

### Changed

- ✨ Replaced browser prompt dialogs with elegant custom modal interface
- 🌍 Changed all UI text to English for international users
- 📝 Updated documentation with visual operation focus
- 🎨 Enhanced modal styling to match VSCode theme

### Technical Details

- Implemented scroll position preservation across re-renders
- Added custom modal component for data input
- Removed reliance on browser modal dialogs (prompt/alert)
- Improved webview state management

## [0.1.2] - 2026-01-14

### Changed

- 📝 Updated extension description and documentation
- 🌐 Improved README with better feature highlights
- 🎯 Enhanced marketing copy to emphasize visual operation

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
