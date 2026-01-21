import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ActionLogPage extends BasePage {
  // Action Log locators that appear on all pages
  private actionLogSection: Locator;
  private actionLogHeader: Locator;
  private clearLogButton: Locator;
  private logEntriesContainer: Locator;
  private logEntries: Locator;

  constructor(page: Page) {
    super(page);
    this.actionLogSection = page.locator('.space-y-2.max-h-96.overflow-y-auto').locator('..').locator('..'); // Parent of the log container
    this.actionLogHeader = page.locator('h2').filter({ hasText: 'Action Log' });
    this.clearLogButton = page.locator('button').filter({ hasText: 'Clear Log' });
    this.logEntriesContainer = page.locator('.space-y-2.max-h-96.overflow-y-auto');
    this.logEntries = this.logEntriesContainer.locator('p');
  }

  async waitForActionLogToLoad() {
    await this.actionLogHeader.waitFor({ state: 'visible', timeout: 5000 });
  }

  async isActionLogVisible(): Promise<boolean> {
    return await this.actionLogSection.isVisible();
  }

  async getActionLogHeaderText(): Promise<string> {
    return await this.actionLogHeader.textContent() || '';
  }

  async isClearLogButtonVisible(): Promise<boolean> {
    return await this.clearLogButton.isVisible();
  }

  async clickClearLogButton() {
    await this.clearLogButton.click();
  }

  async getLogEntriesCount(): Promise<number> {
    return await this.logEntries.count();
  }

  async getAllLogEntries(): Promise<string[]> {
    const entries: string[] = [];
    const count = await this.getLogEntriesCount();
    for (let i = 0; i < count; i++) {
      const entryText = await this.logEntries.nth(i).textContent();
      if (entryText) {
        entries.push(entryText);
      }
    }
    return entries;
  }

  async getLatestLogEntry(): Promise<string> {
    const count = await this.getLogEntriesCount();
    if (count === 0) return '';
    return await this.logEntries.first().textContent() || '';
  }

  async waitForLogEntry(expectedText: string, timeout: number = 5000): Promise<boolean> {
    try {
      await this.page.waitForFunction(
        (text) => {
          const logEntries = document.querySelectorAll('.space-y-2.max-h-96.overflow-y-auto p');
          for (let entry of logEntries) {
            if (entry.textContent?.includes(text)) return true;
          }
          return false;
        },
        expectedText,
        { timeout }
      );
      return true;
    } catch {
      return false;
    }
  }

  async waitForNewLogEntry(previousCount: number, timeout: number = 5000): Promise<boolean> {
    try {
      await this.page.waitForFunction(
        (prevCount) => {
          const logEntries = document.querySelectorAll('.space-y-2.max-h-96.overflow-y-auto p');
          return logEntries.length > prevCount;
        },
        previousCount,
        { timeout }
      );
      return true;
    } catch {
      return false;
    }
  }

  async scrollLogToTop() {
    await this.logEntriesContainer.evaluate(el => el.scrollTo(0, 0));
  }

  async scrollLogToBottom() {
    await this.logEntriesContainer.evaluate(el => el.scrollTo(0, el.scrollHeight));
  }

  async isLogScrollable(): Promise<boolean> {
    return await this.logEntriesContainer.evaluate(el => el.scrollHeight > el.clientHeight);
  }

  async extractTimestampFromEntry(entryText: string): Promise<string> {
    // Extract timestamp from log entry (format: "HH:MM:SS AM/PM")
    // The entry text is just the timestamp part
    const timestampRegex = /^\d{1,2}:\d{2}:\d{2}\s(AM|PM)$/;
    if (timestampRegex.test(entryText.trim())) {
      return entryText.trim();
    }
    return '';
  }

  async extractCategoryFromEntry(entryText: string): Promise<string> {
    // Categories are in separate elements, not in the entry text
    // This method needs to be called differently - we'll get category from the previous sibling
    return '';
  }

  async getLogEntryWithCategory(index: number): Promise<{category: string, timestamp: string, description: string}> {
    const entries = this.logEntriesContainer.locator('div');
    const entryDiv = entries.nth(index);

    const category = await entryDiv.locator('div').first().textContent() || '';
    const timestamp = await entryDiv.locator('div').last().textContent() || '';
    const description = await entryDiv.locator('p').textContent() || '';

    return { category, timestamp, description };
  }

  async validateTimestampFormat(timestamp: string): Promise<boolean> {
    // Validate timestamp format: HH:MM:SS AM/PM
    const timestampRegex = /^\d{1,2}:\d{2}:\d{2}\s(AM|PM)$/;
    return timestampRegex.test(timestamp);
  }

  async isTimestampRecent(timestamp: string, maxMinutesAgo: number = 5): Promise<boolean> {
    try {
      // Parse the timestamp and check if it's within the last maxMinutesAgo minutes
      const now = new Date();
      const [time, period] = timestamp.split(' ');
      const [hours, minutes, seconds] = time.split(':').map(Number);

      let hour24 = hours;
      if (period === 'PM' && hours !== 12) hour24 += 12;
      if (period === 'AM' && hours === 12) hour24 = 0;

      const logTime = new Date(now);
      logTime.setHours(hour24, minutes, seconds, 0);

      const diffMinutes = (now.getTime() - logTime.getTime()) / (1000 * 60);
      return diffMinutes >= 0 && diffMinutes <= maxMinutesAgo;
    } catch {
      return false;
    }
  }
}