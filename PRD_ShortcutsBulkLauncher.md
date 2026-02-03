# **Product Requirements Document (PRD): Shortcuts Bulk Launcher Extension**

| Project Name | Bulk Shortcut Launcher (Browser Extension) |
| :---- | :---- |
| **Target Platform** | Brave Browser (Chromium-based) |
| **Version** | 1.0 (MVP) |
| **Status** | Planning Phase |
| **Date** | February 1, 2026 |

## **1\. Executive Summary**

The **Bulk Shortcut Launcher** is a browser extension designed to bridge the gap between local Windows .url shortcut files and the browser's tab management system. It provides a dedicated "Drop Zone" interface that parses local shortcut files and executes their target URLs in separate tabs, bypassing the default browser behavior of simply displaying the local file path.

## **2\. Problem Statement**

**The Pain Point:**

Users storing Internet Shortcuts (.url files) on their local hard drive face significant friction when attempting to open multiple links simultaneously.

1. **Windows Limitations:** Windows Explorer often fails to execute "Open" commands for large batches of shortcuts.  
2. **Browser Limitations:** Dragging and dropping .url files directly into a browser window results in the browser rendering the file as a text document (viewing the file path) rather than navigating to the URL contained within.  
3. **Inefficiency:** Users are currently forced to double-click files one by one to open them correctly.

## **3\. Goals & Objectives**

* **Primary Goal:** Allow users to drag-and-drop a selection of multiple .url files into the extension and have them immediately open as active web pages in individual tabs.  
* **Secondary Goal:** Eliminate the need for Bookmark Manager import/export for temporary browsing sessions.  
* **UX Goal:** Provide a visual interface that confirms files have been received and are being processed.

## **4\. User Stories**

* **US 1.0:** As a user, I want to select a specific subset of files (e.g., 5 out of 20\) in Windows Explorer and drag them to the extension to open only those specific links.  
* **US 2.0:** As a user, I want to drag files onto a "Drop Zone" without the browser trying to display the file text.  
* **US 3.0:** As a user, I want the extension to filter out invalid files (e.g., if I accidentally drop a .jpg or .txt file) and only open the valid internet shortcuts.

## **5\. Functional Requirements**

### **5.1 The Drop Zone (UI)**

* **FR 1:** The extension shall provide a GUI (Popup or Page) that serves as a target for drag-and-drop actions.  
* **FR 2:** The Drop Zone shall visually indicate when files are hovering over it (e.g., change background color or border style).

### **5.2 File Parsing (Logic)**

* **FR 3:** The extension must intercept the default browser drop event to prevent the local file path from loading.  
* **FR 4:** The extension must utilize the FileReader API to read the text content of the dropped files.  
* **FR 5:** The system must parse the content of standard Windows .url files using Regex to locate the URL= parameter.  
  * *Standard Format:* \[InternetShortcut\] URL=https://example.com

### **5.3 URL Execution (Action)**

* **FR 6:** For every valid URL extracted, the extension must trigger chrome.tabs.create() to open a new background tab.  
* **FR 7:** The extension should ignore files that do not contain a valid URL string.

## **6\. Technical Specifications**

### **6.1 Architecture**

* **Manifest Version:** V3  
* **Core Permissions:**  
  * activeTab (To interact with the current context if needed).  
  * No broad host permissions required (privacy-centric).

### **6.2 File Structure**

1. manifest.json: Configuration and permission declaration.  
2. popup.html: The HTML skeleton containing the drop zone div.  
3. popup.js: The logic handling the drag events, file reading, and regex parsing.  
4. style.css: Basic styling to make the drop zone large and distinct.

### **6.3 Data Flow**

1. **User Action:** User drags files from OS \-\> Drops on Extension Popup.  
2. **Event Handler:** Javascript ondrop triggers \-\> e.preventDefault().  
3. **Iteration:** Loop through e.dataTransfer.files.  
4. **Read:** FileReader.readAsText(file).  
5. **Parse:** Regex match ^URL=(.\*)$.  
6. **Output:** chrome.tabs.create({url: match\[1\]}).

## **7\. User Interface (UI) Mockup Description**

* **View:** Browser Toolbar Popup (Small window that appears when clicking the extension icon).  
* **Layout:**  
  * **Header:** "Bulk Opener"  
  * **Main Area:** A large, dashed-border box centered in the popup.  
  * **Text Overlay:** "Drag Shortcut Files Here"  
  * **Feedback:** When files are dropped, a small status log appears below: *"Opening 5 tabs..."*

## **8\. Constraints & Assumptions**

* **Constraint:** The Extension Popup closes if the user clicks away from it. The file processing must be fast enough to queue the tabs before the user dismisses the window.  
* **Assumption:** The user is utilizing standard Windows .url files. (Mac .webloc files use XML and would require a different Regex parser, though this can be added in v1.1).  
* **Browser Security:** Modern browsers limit how many tabs can be "bombarded" at once to prevent crashes. If a user drops 100 files, the browser may ask for confirmation ("Do you want to open 100 tabs?"). This is acceptable behavior.

## **9\. Future Improvements (Post-MVP)**

* **Mac Support:** Add parsing logic for macOS .webloc files.  
* **History/Logs:** A "Recent Batches" list to re-open a previously dropped group of files.  
* **Tab Grouping:** Automatically put the newly opened tabs into a Brave "Tab Group" named after the folder they were dragged from.