# UI Interaction Testing Suite - Test Cases

## Overview
This document contains comprehensive test cases for the UI Interaction Testing Suite application. The test cases are designed for professional QA testing and cover all major features including navigation, CRUD operations, mouse interactions, input interactions, loading states, and the Action Log functionality.

## Test Case Format
- **Test ID**: Unique identifier
- **Test Case**: Descriptive name
- **Priority**: Critical, High, Medium, Low
- **Type**: Functional, UI, Performance, Security
- **Preconditions**: Required setup
- **Test Steps**: Step-by-step instructions
- **Expected Result**: What should happen
- **Test Data**: Required input data

---

## Navigation Test Cases

### TC-NAV-001: Home Page Navigation
**Priority**: Critical  
**Type**: Functional  
**Preconditions**: Application is accessible  
**Test Steps**:
1. Navigate to https://ui-interaction-test-gg7k.bolt.host/
2. Verify page loads completely
3. Check navigation menu is visible
4. Verify all navigation links are present (Home, CRUD, Mouse, Input, Loading)
**Expected Result**: Home page displays correctly with all navigation elements  
**Test Data**: N/A

### TC-NAV-002: CRUD Page Navigation
**Priority**: High  
**Type**: Functional  
**Preconditions**: Application is accessible  
**Test Steps**:
1. Click "CRUD" link in navigation
2. Verify URL changes to /crud
3. Verify CRUD page elements load (form fields, buttons, action log)
**Expected Result**: CRUD page displays with all required elements  
**Test Data**: N/A

### TC-NAV-003: Mouse Page Navigation
**Priority**: High  
**Type**: Functional  
**Preconditions**: Application is accessible  
**Test Steps**:
1. Click "Mouse" link in navigation
2. Verify URL changes to /mouse
3. Verify mouse interaction elements are present (buttons, hover area, scroll list, drag area)
**Expected Result**: Mouse page displays with all interaction elements  
**Test Data**: N/A

### TC-NAV-004: Input Page Navigation
**Priority**: High  
**Type**: Functional  
**Preconditions**: Application is accessible  
**Test Steps**:
1. Click "Input" link in navigation
2. Verify URL changes to /input
3. Verify input elements are present (textboxes, dropdowns, sliders, file upload)
**Expected Result**: Input page displays with all input elements  
**Test Data**: N/A

### TC-NAV-005: Loading Page Navigation
**Priority**: High  
**Type**: Functional  
**Preconditions**: Application is accessible  
**Test Steps**:
1. Click "Loading" link in navigation
2. Verify URL changes to /loading
3. Verify loading page elements are present (reload button, product list area)
**Expected Result**: Loading page displays with loading elements  
**Test Data**: N/A

---

## Action Log Test Cases

### TC-ACT-001: Action Log Display
**Priority**: Critical  
**Type**: Functional  
**Preconditions**: Any page is loaded  
**Test Steps**:
1. Navigate to any page
2. Locate the Action Log section
3. Verify Action Log header is present
4. Verify Clear Log button is visible
5. Verify log entries container exists
**Expected Result**: Action Log section displays correctly on all pages  
**Test Data**: N/A

### TC-ACT-002: Page Navigation Logging
**Priority**: High  
**Type**: Functional  
**Preconditions**: Application is accessible  
**Test Steps**:
1. Start on Home page
2. Navigate to CRUD page
3. Check Action Log for navigation entry
4. Navigate to Mouse page
5. Check Action Log for navigation entry
6. Navigate to Input page
7. Check Action Log for navigation entry
8. Navigate to Loading page
9. Check Action Log for navigation entry
**Expected Result**: Each page navigation is logged with timestamp and page information  
**Test Data**: N/A

### TC-ACT-003: Action Log Timestamp Format
**Priority**: Medium  
**Type**: Functional  
**Preconditions**: Action Log has entries  
**Test Steps**:
1. Perform any action that generates a log entry
2. Check the timestamp format in the log entry
3. Verify timestamp shows time in HH:MM:SS AM/PM format
4. Verify timestamp is current/recent
**Expected Result**: Timestamps are properly formatted and accurate  
**Test Data**: N/A

### TC-ACT-004: Clear Log Functionality
**Priority**: High  
**Type**: Functional  
**Preconditions**: Action Log has multiple entries  
**Test Steps**:
1. Perform several actions to generate log entries
2. Verify multiple entries exist in Action Log
3. Click "Clear Log" button
4. Verify Action Log is empty
5. Perform another action
6. Verify new entry appears in cleared log
**Expected Result**: Clear Log button removes all entries and allows new entries  
**Test Data**: N/A

### TC-ACT-005: Action Log Persistence
**Priority**: Medium  
**Type**: Functional  
**Preconditions**: Action Log has entries  
**Test Steps**:
1. Generate several log entries
2. Refresh the page
3. Check if log entries persist after refresh
4. Navigate to different page and back
5. Check if log entries are maintained
**Expected Result**: Log entries persist during page refresh and navigation  
**Test Data**: N/A

### TC-ACT-006: Action Log Scroll Behavior
**Priority**: Medium  
**Type**: UI  
**Preconditions**: Action Log has many entries (10+)  
**Test Steps**:
1. Generate many log entries to fill the log area
2. Verify log area has scroll capability
3. Scroll to bottom of log
4. Verify all entries are accessible
5. Scroll to top of log
6. Verify oldest entries are visible
**Expected Result**: Action Log scrolls properly when content exceeds visible area  
**Test Data**: N/A

---

## CRUD Operations Test Cases

### TC-CRUD-001: Create Record - Valid Data
**Priority**: Critical  
**Type**: Functional  
**Preconditions**: On CRUD page  
**Test Steps**:
1. Enter "Test Title" in Title field
2. Enter "Test Description" in Description field
3. Select "Active" status
4. Click "Create Record" button
5. Verify record appears in the records list
6. Check Action Log for create operation entry
**Expected Result**: Record is created and logged successfully  
**Test Data**: Title: "Test Title", Description: "Test Description", Status: "Active"

### TC-CRUD-002: Create Record - Empty Fields
**Priority**: High  
**Type**: Functional  
**Preconditions**: On CRUD page  
**Test Steps**:
1. Leave all fields empty
2. Click "Create Record" button
3. Verify appropriate error message or validation
4. Check Action Log for validation failure entry
**Expected Result**: Form validation prevents empty record creation  
**Test Data**: N/A

### TC-CRUD-003: Read Records - Display
**Priority**: High  
**Type**: Functional  
**Preconditions**: Records exist in the system  
**Test Steps**:
1. Navigate to CRUD page
2. Verify records list displays existing records
3. Check record count in header
4. Verify record details are displayed correctly
**Expected Result**: All existing records are displayed properly  
**Test Data**: N/A

### TC-CRUD-004: Update Record
**Priority**: High  
**Type**: Functional  
**Preconditions**: At least one record exists  
**Test Steps**:
1. Click edit button on an existing record
2. Modify the title and description
3. Save the changes
4. Verify record is updated in the list
5. Check Action Log for update operation entry
**Expected Result**: Record is updated successfully and logged  
**Test Data**: New Title: "Updated Title", New Description: "Updated Description"

### TC-CRUD-005: Delete Record
**Priority**: High  
**Type**: Functional  
**Preconditions**: At least one record exists  
**Test Steps**:
1. Click delete button on an existing record
2. Confirm deletion if prompted
3. Verify record is removed from the list
4. Check Action Log for delete operation entry
**Expected Result**: Record is deleted successfully and logged  
**Test Data**: N/A

### TC-CRUD-006: Search Records
**Priority**: Medium  
**Type**: Functional  
**Preconditions**: Multiple records exist  
**Test Steps**:
1. Enter search term in search box
2. Verify results are filtered correctly
3. Clear search and verify all records show
4. Search for non-existent term
5. Verify no results message or empty list
**Expected Result**: Search functionality works correctly  
**Test Data**: Search Term: "Test"

---

## Mouse Interaction Test Cases

### TC-MOUSE-001: Single Click
**Priority**: Critical  
**Type**: Functional  
**Preconditions**: On Mouse page  
**Test Steps**:
1. Locate "Click Me" button
2. Click the button once
3. Check Action Log for click entry
4. Verify log shows "click" action
**Expected Result**: Click action is logged correctly  
**Test Data**: N/A

### TC-MOUSE-002: Double Click
**Priority**: High  
**Type**: Functional  
**Preconditions**: On Mouse page  
**Test Steps**:
1. Locate "Double Click Me" button
2. Double-click the button
3. Check Action Log for double click entry
4. Verify log shows "Double click detected" message
**Expected Result**: Double click action is logged correctly  
**Test Data**: N/A

### TC-MOUSE-003: Right Click
**Priority**: High  
**Type**: Functional  
**Preconditions**: On Mouse page  
**Test Steps**:
1. Locate "Right Click Me" button
2. Right-click the button
3. Check Action Log for right click entry
4. Verify log shows "Context menu triggered" message
**Expected Result**: Right click action is logged correctly  
**Test Data**: N/A

### TC-MOUSE-004: Hover Interaction
**Priority**: Medium  
**Type**: Functional  
**Preconditions**: On Mouse page  
**Test Steps**:
1. Locate "Hover over me" area
2. Move mouse cursor over the area
3. Verify visual feedback (color change)
4. Check Action Log for hover entry
5. Move mouse away and verify visual change reverts
**Expected Result**: Hover interaction works and is logged  
**Test Data**: N/A

### TC-MOUSE-005: Scroll Interaction
**Priority**: Medium  
**Type**: Functional  
**Preconditions**: On Mouse page  
**Test Steps**:
1. Locate scrollable list area
2. Use mouse wheel to scroll down
3. Verify list scrolls
4. Check Action Log for scroll entry
5. Scroll back to top
**Expected Result**: Scroll action is logged correctly  
**Test Data**: N/A

### TC-MOUSE-006: Drag and Drop
**Priority**: High  
**Type**: Functional  
**Preconditions**: On Mouse page  
**Test Steps**:
1. Locate draggable element
2. Click and hold the element
3. Drag to a different position
4. Release the mouse button
5. Verify element moved to new position
6. Check Action Log for drag completion (if logged)
**Expected Result**: Drag and drop operation completes successfully  
**Test Data**: N/A

---

## Input Interaction Test Cases

### TC-INPUT-001: Text Input
**Priority**: Critical  
**Type**: Functional  
**Preconditions**: On Input page  
**Test Steps**:
1. Locate text input field
2. Type "Hello World" into the field
3. Verify text appears in the field
4. Check character counter updates
5. Check Action Log for typing entry
**Expected Result**: Text input works and is logged  
**Test Data**: Input Text: "Hello World"

### TC-INPUT-002: Clear Input
**Priority**: Medium  
**Type**: Functional  
**Preconditions**: On Input page  
**Test Steps**:
1. Type text into the clear input field
2. Verify Clear button becomes enabled
3. Click Clear button
4. Verify field is empty and button becomes disabled
5. Check Action Log for clear action
**Expected Result**: Clear functionality works correctly  
**Test Data**: Input Text: "Test text to clear"

### TC-INPUT-003: Dropdown Selection
**Priority**: High  
**Type**: Functional  
**Preconditions**: On Input page  
**Test Steps**:
1. Click on the dropdown
2. Select "Option 2"
3. Verify selected option displays
4. Check Action Log for selection entry
**Expected Result**: Dropdown selection works and is logged  
**Test Data**: Selected Option: "Option 2"

### TC-INPUT-004: Slider Interaction
**Priority**: Medium  
**Type**: Functional  
**Preconditions**: On Input page  
**Test Steps**:
1. Locate range slider
2. Drag slider to value 75
3. Verify value display updates to 75
4. Check Action Log for slider change entry
**Expected Result**: Slider interaction works and is logged  
**Test Data**: Target Value: 75

### TC-INPUT-005: File Upload
**Priority**: Medium  
**Type**: Functional  
**Preconditions**: On Input page, test file available  
**Test Steps**:
1. Click "Choose a file" button
2. Select a test file from file dialog
3. Verify file name appears
4. Check Action Log for file upload entry
**Expected Result**: File upload works and is logged  
**Test Data**: Test file: small text or image file

### TC-INPUT-006: Paste from Clipboard
**Priority**: Medium  
**Type**: Functional  
**Preconditions**: On Input page, clipboard has content  
**Test Steps**:
1. Copy text to clipboard
2. Click in paste input field
3. Paste content (Ctrl+V)
4. Verify text appears in field
5. Check Action Log for paste entry
**Expected Result**: Paste operation works and is logged  
**Test Data**: Clipboard Content: "Pasted text content"

---

## Loading Test Cases

### TC-LOAD-001: Initial Page Load
**Priority**: Critical  
**Type**: Performance  
**Preconditions**: On Loading page  
**Test Steps**:
1. Navigate to Loading page
2. Wait for initial load to complete
3. Verify products appear (12 items)
4. Check Action Log shows "Completed loading"
5. Verify load time is reasonable (< 10 seconds)
**Expected Result**: Initial load completes successfully within time limit  
**Test Data**: N/A

### TC-LOAD-002: Reload Functionality
**Priority**: High  
**Type**: Functional  
**Preconditions**: On Loading page, initial load complete  
**Test Steps**:
1. Click "Reload" button
2. Verify button becomes disabled during load
3. Wait for reload to complete
4. Verify products reload (12 items)
5. Check Action Log shows reload completion
6. Verify load time is reasonable (< 3 seconds)
**Expected Result**: Reload works correctly and within performance limits  
**Test Data**: N/A

### TC-LOAD-003: Loading State Display
**Priority**: Medium  
**Type**: UI  
**Preconditions**: On Loading page  
**Test Steps**:
1. Click "Reload" button
2. Verify loading indicators appear
3. Verify "Reload" button is disabled
4. Wait for load completion
5. Verify loading indicators disappear
6. Verify "Reload" button is enabled
**Expected Result**: Loading states display correctly during operations  
**Test Data**: N/A

### TC-LOAD-004: Multiple Reload Performance
**Priority**: Medium  
**Type**: Performance  
**Preconditions**: On Loading page  
**Test Steps**:
1. Perform 3 consecutive reloads
2. Measure time for each reload
3. Verify average time < 3 seconds
4. Check Action Log shows all reload operations
**Expected Result**: Multiple reloads perform within acceptable time limits  
**Test Data**: N/A

---

## UI/UX Test Cases

### TC-UI-001: Dark Mode Toggle
**Priority**: Low  
**Type**: UI  
**Preconditions**: Application loaded  
**Test Steps**:
1. Locate dark mode toggle button
2. Click to switch to dark mode
3. Verify theme changes to dark
4. Click again to switch back
5. Verify theme changes to light
**Expected Result**: Dark mode toggle works correctly  
**Test Data**: N/A

### TC-UI-002: Responsive Design
**Priority**: Medium  
**Type**: UI  
**Preconditions**: Application accessible on different devices  
**Test Steps**:
1. Resize browser window to mobile size
2. Verify layout adapts correctly
3. Check navigation remains accessible
4. Resize to tablet size
5. Verify layout adapts
6. Resize to desktop size
7. Verify full layout displays
**Expected Result**: Application is responsive across screen sizes  
**Test Data**: N/A

### TC-UI-003: Accessibility - Keyboard Navigation
**Priority**: Medium  
**Type**: UI  
**Preconditions**: Application loaded  
**Test Steps**:
1. Use Tab key to navigate through interactive elements
2. Verify focus indicators are visible
3. Use Enter/Space to activate buttons
4. Verify keyboard navigation works for all interactive elements
**Expected Result**: Application is keyboard accessible  
**Test Data**: N/A

---

## Performance Test Cases

### TC-PERF-001: Page Load Performance
**Priority**: High  
**Type**: Performance  
**Preconditions**: Clean browser state  
**Test Steps**:
1. Navigate to home page
2. Measure time to fully load
3. Navigate to each page
4. Measure load time for each
5. Verify all pages load within 3 seconds
**Expected Result**: All pages load within acceptable time limits  
**Test Data**: N/A

### TC-PERF-002: Action Log Performance
**Priority**: Medium  
**Type**: Performance  
**Preconditions**: Action Log has many entries  
**Test Steps**:
1. Generate 50+ log entries
2. Verify UI remains responsive
3. Scroll through log entries
4. Verify scrolling is smooth
5. Clear log and verify operation is fast
**Expected Result**: Action Log handles large numbers of entries efficiently  
**Test Data**: N/A

---

## Security Test Cases

### TC-SEC-001: Input Validation
**Priority**: High  
**Type**: Security  
**Preconditions**: On CRUD page  
**Test Steps**:
1. Attempt to create record with malicious input
2. Try SQL injection patterns
3. Try XSS patterns
4. Verify input is properly sanitized
5. Check no malicious actions execute
**Expected Result**: Malicious input is properly handled and sanitized  
**Test Data**: Malicious Input: "<script>alert('xss')</script>", "'; DROP TABLE users; --"

### TC-SEC-002: File Upload Security
**Priority**: Medium  
**Type**: Security  
**Preconditions**: On Input page  
**Test Steps**:
1. Attempt to upload executable files
2. Try files with malicious extensions
3. Verify only safe file types are accepted
4. Check file size limits are enforced
**Expected Result**: File upload restrictions prevent malicious uploads  
**Test Data**: Test Files: .exe, .bat, oversized files</content>
<parameter name="filePath">c:\Users\KevinOktarioDarmawan\UI_Interaction_2026\test-cases.md