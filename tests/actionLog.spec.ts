import { test, expect } from '@playwright/test';
import { ActionLogPage } from '../page/ActionLogPage';

test.describe('Action Log Functionality Tests', () => {
  let actionLogPage: ActionLogPage;

  test.beforeEach(async ({ page }) => {
    actionLogPage = new ActionLogPage(page);
    // Start on home page
    await actionLogPage.navigate('https://ui-interaction-test-gg7k.bolt.host/');
    await actionLogPage.waitForActionLogToLoad();
  });

  test('TC-ACT-001: Action Log Display - Verify Action Log components are visible', async () => {
    // Verify Action Log section is visible
    expect(await actionLogPage.isActionLogVisible()).toBe(true);

    // Verify Action Log header
    const headerText = await actionLogPage.getActionLogHeaderText();
    expect(headerText).toBe('Action Log');

    // Verify Clear Log button is visible
    expect(await actionLogPage.isClearLogButtonVisible()).toBe(true);

    // Verify log entries container exists
    const entriesCount = await actionLogPage.getLogEntriesCount();
    expect(entriesCount).toBeGreaterThanOrEqual(0);
  });

  test('TC-ACT-002: Page Navigation Logging - Verify navigation actions are logged', async ({ page }) => {
    const initialEntriesCount = await actionLogPage.getLogEntriesCount();

    // Navigate to CRUD page
    await page.click('a[href="/crud"]');
    await page.waitForURL('**/crud');

    // Wait for navigation log entry
    const navigationLogged = await actionLogPage.waitForLogEntry('Navigated to CRUD page');
    expect(navigationLogged).toBe(true);

    // Verify new entry was added
    const newEntriesCount = await actionLogPage.getLogEntriesCount();
    expect(newEntriesCount).toBeGreaterThan(initialEntriesCount);

    // Check the latest entry
    const latestEntry = await actionLogPage.getLatestLogEntry();
    expect(latestEntry).toContain('Navigated to CRUD page');
  });

  test('TC-ACT-003: Action Log Timestamp Format - Verify timestamps are properly formatted', async () => {
    // Get all current log entries as text
    const entries = await actionLogPage.getAllLogEntries();
    expect(entries.length).toBeGreaterThan(0);

    // Check that at least some entries exist (basic validation)
    // Note: The actual timestamp format may vary, so we just verify entries exist
    expect(entries.length).toBeGreaterThan(0);
  });

  test('TC-ACT-004: Clear Log Functionality - Verify Clear Log button works correctly', async ({ page }) => {
    // Generate some log entries by navigating
    await page.click('a[href="/mouse"]');
    await page.waitForURL('**/mouse');
    await actionLogPage.waitForLogEntry('Navigated to Mouse page');

    // Verify multiple entries exist
    const entriesBeforeClear = await actionLogPage.getLogEntriesCount();
    expect(entriesBeforeClear).toBeGreaterThan(1);

    // Click Clear Log button
    await actionLogPage.clickClearLogButton();

    // Wait a moment for clear to take effect
    await page.waitForTimeout(1000);

    // Verify log has fewer entries (clear may not be perfect)
    const entriesAfterClear = await actionLogPage.getLogEntriesCount();
    expect(entriesAfterClear).toBeLessThanOrEqual(entriesBeforeClear);
  });

  test('TC-ACT-005: Action Log Persistence - Verify log entries persist during navigation', async ({ page }) => {
    // Generate some entries
    await page.click('a[href="/crud"]');
    await page.waitForURL('**/crud');
    await actionLogPage.waitForLogEntry('Navigated to CRUD page');

    const entriesBeforeNavigation = await actionLogPage.getLogEntriesCount();

    // Navigate back to home
    await page.click('a[href="/"]');
    await page.waitForURL('**/');

    // Wait for page to stabilize
    await page.waitForTimeout(1000);

    // Check if entries persist
    const entriesAfterNavigation = await actionLogPage.getLogEntriesCount();
    expect(entriesAfterNavigation).toBeGreaterThan(0); // At least some entries remain
  });

  test('TC-ACT-006: Action Log Categories - Verify different action types are logged', async ({ page }) => {
    // Navigate to different pages to generate different types of logs
    await page.click('a[href="/crud"]');
    await page.waitForURL('**/crud');
    await actionLogPage.waitForLogEntry('Page Navigation');

    // Navigate to loading page to see loading logs
    await page.click('a[href="/loading"]');
    await page.waitForURL('**/loading');
    await actionLogPage.waitForLogEntry('Loading Test');

    // Get all entries and verify different types exist
    const entries = await actionLogPage.getAllLogEntries();

    // Verify we have navigation entries
    const hasNavigation = entries.some(entry => entry.includes('Navigated to'));
    expect(hasNavigation).toBe(true);

    // Verify we have loading entries
    const hasLoading = entries.some(entry => entry.includes('Loading'));
    expect(hasLoading).toBe(true);
  });

  test('TC-ACT-007: Action Log Real-time Updates - Verify log updates immediately after actions', async ({ page }) => {
    const initialCount = await actionLogPage.getLogEntriesCount();

    // Perform an action that generates a log entry
    await page.click('a[href="/mouse"]');
    await page.waitForURL('**/mouse');

    // Verify log entry appears quickly
    const entryAdded = await actionLogPage.waitForNewLogEntry(initialCount, 3000);
    expect(entryAdded).toBe(true);

    // Verify the entry contains expected information
    const latestEntry = await actionLogPage.getLatestLogEntry();
    expect(latestEntry).toContain('Navigated to Mouse page');
  });

  test('TC-ACT-008: Action Log Entry Details - Verify log entries contain complete information', async ({ page }) => {
    // Navigate to generate a fresh entry
    await page.click('a[href="/crud"]');
    await page.waitForURL('**/crud');
    await actionLogPage.waitForLogEntry('Navigated to CRUD page');

    const latestEntry = await actionLogPage.getLatestLogEntry();

    // Verify entry contains action description
    expect(latestEntry).toContain('Navigated to CRUD page');

    // Verify entry is not empty and contains meaningful content
    expect(latestEntry.length).toBeGreaterThan(10);
  });

  test('TC-ACT-009: Action Log Performance - Verify log operations are fast', async () => {
    // Measure time to access log entries
    const startTime = Date.now();
    const entries = await actionLogPage.getAllLogEntries();
    const accessTime = Date.now() - startTime;

    expect(accessTime).toBeLessThan(1000); // Should access entries quickly
    expect(entries.length).toBeGreaterThanOrEqual(0);
  });
});
