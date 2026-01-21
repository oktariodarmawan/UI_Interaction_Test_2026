import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoadingPage extends BasePage {
  // Locators
  private reloadButton: Locator;
  private productsCountHeading: Locator;
  private actionLog: Locator;

  constructor(page: Page) {
    super(page);
    this.reloadButton = page.locator('button').filter({ hasText: 'Reload' }).first();
    this.productsCountHeading = page.locator('h3').filter({ hasText: 'Mock API Data' }).first();
    this.actionLog = page.locator('.space-y-2.max-h-96.overflow-y-auto').first();
  }

  async waitForInitialLoad() {
    await this.productItems.first().waitFor({ state: 'visible', timeout: 15000 });
  }

  async clickReload() {
    await this.reloadButton.click();
  }

  async waitForReloadComplete() {
    await this.productItems.first().waitFor({ state: 'visible', timeout: 15000 });
  }

  async getProductsCount() {
    const text = await this.productsCountHeading.textContent();
    const match = text?.match(/(\d+) products/);
    return match ? parseInt(match[1]) : 0;
  }

  async getProductItemsCount() {
    // Count actual product items by counting h4 elements (product names)
    return await this.page.locator('h4').count();
  }

  async getActionLogText() {
    return await this.actionLog.textContent();
  }

  async measureLoadTime(callback: () => Promise<void>) {
    const start = Date.now();
    await callback();
    const end = Date.now();
    return end - start;
  }
}
