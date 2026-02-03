/**
 * newtab.js
 * Handles drag-and-drop events on the new tab page.
 * Reuses logic from popup.js for parsing .url files.
 */

const dropZone = document.getElementById('newtab-drop-zone');
const statusLog = document.getElementById('newtab-status-log');

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
        } else {
            logStatus('No valid .url files found.');
        }
    }
}
