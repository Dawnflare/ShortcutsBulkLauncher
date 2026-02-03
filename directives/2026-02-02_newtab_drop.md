# Directive: New Tab Page Drop Zone

## 1. Objective
Allow users to drag `.url` files directly onto the browser's **new tab page** to open them, without needing to open the extension popup.

## 2. Context & Research
- Chrome/Brave extensions can inject content scripts into specific pages
- The new tab page URL varies by browser (e.g., `chrome://newtab`, `brave://newtab`)
- Content scripts cannot run on `chrome://` pages directly due to security restrictions
- **Alternative approach:** Override the new tab page with an extension-provided HTML page

## 3. Planning & Risk Assessment
**Risk Level:** MEDIUM
- Multi-file changes
- New permissions required (`storage`)
- New content/override page

## 4. Execution Steps
1. Add `storage` permission to `manifest.json`
2. Add `chrome_url_overrides` for newtab to `manifest.json`
3. Create `newtab.html` with drop zone UI
4. Create `newtab.js` with drop handling logic
5. Add settings toggle to popup for enabling/disabling this feature
6. Store user preference in `chrome.storage.sync`

## 5. Validation Standard
- Load extension, open new tab, verify drop zone appears
- Toggle setting off, verify new tab reverts to default
- Drag `.url` files onto new tab, verify tabs open

## 6. Expected Deliverables
- Updated `manifest.json`
- New `newtab.html` and `newtab.js`
- Updated `popup.html` and `popup.js` with settings toggle
- Feature branch: `feature/newtab-drop`

## 7. Failure Handling
- If `chrome_url_overrides` causes issues, fall back to content script approach
- User can disable feature via settings if unwanted
