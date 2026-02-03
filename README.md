# Bulk Shortcut Launcher

A Chromium browser extension (Manifest V3) that allows users to drag-and-drop Windows `.url` files to open them in new tabs.

## Description
This extension bridges the gap between local shortcut files and browser tabs. By providing a dedicated drop zone, it parses standard Windows URL shortcuts and opens their targets immediately, bypassing the default browser behavior of viewing the file content.

## Features
- **Drag & Drop Interface:** Simple drop zone for `.url` files.
- **Batch Processing:** Open multiple shortcuts simultaneously.
- **Privacy-Focused:** Runs entirely locally with minimal permissions (`activeTab`).
- **Dark Mode:** Clean, modern dark theme.

## Installation
1. Clone this repository.
2. Open `chrome://extensions` or `brave://extensions` in your browser.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the `src/` directory.

## Usage
1. Click the extension icon in the toolbar.
2. Drag one or more `.url` files from Windows Explorer onto the "Drop Shortcut Files Here" zone.
3. Watch as tabs open for each valid shortcut.

## License
MIT License - see [LICENSE.md](LICENSE.md).
