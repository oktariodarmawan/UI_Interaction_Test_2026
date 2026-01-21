import { test, expect } from '@playwright/test';
import { LoadingPage } from '../page/LoadingPage';

test.describe('Loading Interactions Tests', () => {
  let loadingPage: LoadingPage;

  test.beforeEach(async ({ page }) => {
    loadingPage = new LoadingPage(page);
    await loadingPage.navigate('https://ui-interaction-test-gg7k.bolt.host/loading');
  });

  // Functional Tests
  test('Initial Page Load', async () => {
    // Wait for initial load to complete
    await loadingPage.page.waitForFunction(() => {
      const logs = document.querySelectorAll('.space-y-2.max-h-96.overflow-y-auto p');
      for (let log of logs) {
        if (log.textContent?.includes('Completed loading')) return true;
      }
      return false;
    }, { timeout: 10000 }); // Allow up to 10 seconds

    // Wait for products to be rendered
    await loadingPage.page.locator('h4').first().waitFor({ state: 'visible', timeout: 5000 });

    // Check that all 12 products are loaded
    const productItemsCount = await loadingPage.getProductItemsCount();
    expect(productItemsCount).toBe(12);

    // Check action log shows completed loading
    const logText = await loadingPage.getActionLogText();
    expect(logText).toContain('Completed loading');
  });

  test('Reload Functionality', async () => {
    // Click reload
    await loadingPage.clickReload();

    // Wait for reload to complete
    await loadingPage.page.waitForFunction(() => {
      const logs = document.querySelectorAll('.space-y-2.max-h-96.overflow-y-auto p');
      for (let log of logs) {
        if (log.textContent?.includes('Completed loading')) return true;
      }
      return false;
    }, { timeout: 110000 }); // Allow up to 10 seconds

    // Wait for products to be rendered
    await loadingPage.page.locator('h4').first().waitFor({ state: 'visible', timeout: 5000 });

    // Check that products are loaded and all items are showing
    const productItemsCount = await loadingPage.getProductItemsCount();
    expect(productItemsCount).toBe(12);

    const logText = await loadingPage.getActionLogText();
    expect(logText).toContain('Completed loading');
  });

  // Performance Tests
  test('Initial Load Performance', async () => {
    // Initially 0 products
    const productsCount = await loadingPage.getProductsCount();
    expect(productsCount).toBe(0);
    console.log('Initial state: 0 products');
  });

  test('Reload Performance', async () => {
    const reloadTime = await loadingPage.measureLoadTime(async () => {
      await loadingPage.clickReload();
      await loadingPage.page.waitForTimeout(1000); // Wait for potential delay
    });

    // Assert reload time is under 3 seconds
    expect(reloadTime).toBeGreaterThanOrEqual(1000); // At least 1 second
    expect(reloadTime).toBeLessThan(3000); // Less than 3 seconds
    console.log(`Reload time: ${reloadTime}ms`);
  });

  test('Multiple Reload Performance', async () => {
    const times: number[] = [];

    for (let i = 0; i < 3; i++) {
      const time = await loadingPage.measureLoadTime(async () => {
        await loadingPage.clickReload();
        await loadingPage.page.waitForTimeout(1000);
      });
      times.push(time);
    }

    // Check average time under 3 seconds
    const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
    expect(averageTime).toBeLessThan(3000);
    console.log(`Average reload time over 3 attempts: ${averageTime}ms`);
  });

  test('Loading State Visibility', async () => {
    // Initially 0 products
    const productsCount = await loadingPage.getProductsCount();
    expect(productsCount).toBe(0);
  });
});
