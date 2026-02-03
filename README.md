# Bulk Shortcut Launcher

A Chromium browser extension (Manifest V3) that allows users to drag-and-drop Windows `.url` files to open them in new tabs.

![Extension Popup](https://img.shields.io/badge/Manifest-V3-blue) ![Platform](https://img.shields.io/badge/Platform-Chrome%20%7C%20Brave%20%7C%20Edge-green)

## Description

This extension bridges the gap between local shortcut files and browser tabs. By providing a dedicated drop zone, it parses standard Windows URL shortcuts and opens their targets immediately, bypassing the default browser behavior of viewing the file content.

## Features

### Core
- **Drag & Drop Interface:** Simple, intuitive drop zone for `.url` files
- **Batch Processing:** Open multiple shortcuts simultaneously
- **Keyboard Shortcut:** Press `Ctrl+Shift+U` (Mac: `Cmd+Shift+U`) to quickly open the popup
- **Privacy-Focused:** Runs entirely locally with minimal permissions

### Customization
- **Adjustable Popup Size:** Width slider (200-800px) and height slider (150-400px)
- **Persistent Settings:** Your size preferences are saved and restored automatically

### Workflow
- **Auto-Close Tab:** Optional feature to close the current tab after opening shortcuts
- **Smart Tab Focus:** When auto-close is enabled, automatically switches to the first opened shortcut tab

### Design
- **Dark Mode:** Clean, modern dark theme using Catppuccin-inspired colors
- **Real-time Feedback:** Status messages show processing progress and results

## Installation

1. Clone this repository or download the source code
2. Open `chrome://extensions` or `brave://extensions` in your browser
3. Enable **Developer mode** (toggle in top-right)
4. Click **Load unpacked** and select the `src/` directory

## Usage

### Basic Usage
1. Click the extension icon in the toolbar (or press `Ctrl+Shift+U`)
2. Drag one or more `.url` files from Windows Explorer onto the drop zone
3. Watch as tabs open for each valid shortcut

### Customizing the Popup
- Use the **Width** slider to adjust popup width (200-800px)
- Use the **Height** slider to adjust drop zone height (150-400px)
- Settings are saved automatically

### Auto-Close Feature
- Check **"Close this tab after opening shortcuts"** to enable
- When enabled, the current tab closes and focus switches to the first opened shortcut

### Keyboard Shortcut
- Default: `Ctrl+Shift+U` (Windows/Linux) or `Cmd+Shift+U` (Mac)
- Customize in `chrome://extensions/shortcuts` or `brave://extensions/shortcuts`

## Permissions

| Permission | Purpose |
|------------|---------|
| `activeTab` | Access the current tab for auto-close feature |
| `storage` | Save your size and feature preferences |
| `tabs` | Open new tabs and manage tab focus |

## Development

```
src/
├── manifest.json    # Extension configuration
├── popup.html       # Popup structure
├── popup.js         # Drop handling and settings logic
├── style.css        # Popup styling
└── icons/           # Extension icons (16, 48, 128px)
```

## License

MIT License - see [LICENSE.md](LICENSE.md).
