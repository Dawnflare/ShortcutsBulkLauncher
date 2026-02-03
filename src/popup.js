/**
 * popup.js
 * Handles drag-and-drop events, parses .url files, and opens extracted URLs in new tabs.
 */

const dropZone = document.getElementById('drop-zone');
const statusLog = document.getElementById('status-log');

/**
 * Prevents default browser behavior on dragover to allow drop.
 * @param {DragEvent} e - The dragover event.
 */
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

/**
 * Removes visual feedback when drag leaves the zone.
 * @param {DragEvent} e - The dragleave event.
 */
dropZone.addEventListener('dragleave', (e) => {
    dropZone.classList.remove('drag-over');
});

/**
 * Handles file drop, parses .url files, and opens valid URLs.
 * @param {DragEvent} e - The drop event.
 */
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    let validCount = 0;
    let processedCount = 0;

    if (files.length === 0) {
        logStatus('No files detected.');
        return;
    }

    logStatus(`Processing ${files.length} file(s)...`);

    for (const file of files) {
        // Only process .url files
        if (!file.name.toLowerCase().endsWith('.url')) {
            processedCount++;
            checkCompletion(processedCount, files.length, validCount);
            continue;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            const content = event.target.result;
            const url = extractUrl(content);

            if (url) {
                chrome.tabs.create({ url: url, active: false });
                validCount++;
            }

            processedCount++;
            checkCompletion(processedCount, files.length, validCount);
        };

        reader.onerror = () => {
            processedCount++;
            checkCompletion(processedCount, files.length, validCount);
        };

        reader.readAsText(file);
    }
});

/**
 * Extracts the URL from a Windows .url file content.
 * @param {string} content - The text content of the .url file.
 * @returns {string|null} - The extracted URL or null if not found.
 */
function extractUrl(content) {
    const match = content.match(/^URL=(.*)$/m);
    return match ? match[1].trim() : null;
}

/**
 * Logs a status message to the UI.
 * @param {string} message - The message to display.
 */
function logStatus(message) {
    statusLog.textContent = message;
}

/**
 * Checks if all files have been processed and updates the status.
 * @param {number} processed - Number of files processed so far.
 * @param {number} total - Total number of files.
 * @param {number} valid - Number of valid URLs opened.
 */
function checkCompletion(processed, total, valid) {
    if (processed === total) {
        if (valid > 0) {
            logStatus(`Opened ${valid} tab(s).`);
            // Auto-close handled after a brief delay to let user see the message
            setTimeout(() => handleAutoClose(valid), 500);
        } else {
            logStatus('No valid .url files found.');
        }
    }
}

// --- Settings: Drop Zone Size ---
const widthSlider = document.getElementById('width-slider');
const widthValue = document.getElementById('width-value');
const heightSlider = document.getElementById('height-slider');
const heightValue = document.getElementById('height-value');

// Load saved size preferences
chrome.storage.sync.get(['dropZoneWidth', 'dropZoneHeight'], (result) => {
    const width = result.dropZoneWidth || 450;
    const height = result.dropZoneHeight || 250;

    widthSlider.value = width;
    widthValue.textContent = `${width}px`;
    document.body.style.width = `${width}px`;

    heightSlider.value = height;
    heightValue.textContent = `${height}px`;
    dropZone.style.height = `${height}px`;
});

// Width slider handlers - only apply on release to prevent layout thrashing
widthSlider.addEventListener('input', () => {
    widthValue.textContent = `${widthSlider.value}px`;
});

widthSlider.addEventListener('change', () => {
    const width = parseInt(widthSlider.value);
    document.body.style.width = `${width}px`;
    chrome.storage.sync.set({ dropZoneWidth: width });
});

// Height slider handlers
heightSlider.addEventListener('input', () => {
    const height = heightSlider.value;
    heightValue.textContent = `${height}px`;
    dropZone.style.height = `${height}px`;
});

heightSlider.addEventListener('change', () => {
    chrome.storage.sync.set({ dropZoneHeight: parseInt(heightSlider.value) });
});

// --- Settings: Auto-close Tab ---
const autoCloseCheckbox = document.getElementById('auto-close-checkbox');

// Load saved auto-close preference
chrome.storage.sync.get(['autoCloseTab'], (result) => {
    autoCloseCheckbox.checked = result.autoCloseTab || false;
});

// Save preference on change
autoCloseCheckbox.addEventListener('change', () => {
    chrome.storage.sync.set({ autoCloseTab: autoCloseCheckbox.checked });
});

/**
 * Closes the current tab if auto-close is enabled and shortcuts were opened.
 * @param {number} validCount - Number of valid URLs that were opened.
 */
function handleAutoClose(validCount) {
    if (validCount > 0 && autoCloseCheckbox.checked) {
        chrome.tabs.getCurrent((tab) => {
            if (tab) {
                chrome.tabs.remove(tab.id);
            }
        });
    }
}
