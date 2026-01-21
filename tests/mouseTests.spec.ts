import { test, expect } from '@playwright/test';
import { MousePage } from '../page/MousePage';

test.describe('Mouse Interactions Tests', () => {
  let mousePage: MousePage;

  test.beforeEach(async ({ page }) => {
    mousePage = new MousePage(page);
    // Assuming the page is at a specific URL, replace with actual URL
    await mousePage.navigate('https://ui-interaction-test-gg7k.bolt.host/mouse'); // Adjust URL as needed
  });

  test('TC-MO-01: Single Click', async () => {
    await mousePage.clickButtonAction();
    const logText = await mousePage.getActionLogText();
    expect(logText).toContain('click');
  });

  test('TC-MO-02: Double Click', async () => {
    await mousePage.doubleClickButtonAction();
    const logText = await mousePage.getActionLogText();
    expect(logText).toContain('Double click detected');
  });

  test('TC-MO-03: Right Click', async () => {
    await mousePage.rightClickButtonAction();
    const logText = await mousePage.getActionLogText();
    expect(logText).toContain('Context menu triggered');
  });

  test('TC-MO-04: Hover', async () => {
    await mousePage.hoverOverArea();
    const isChanged = await mousePage.isHoverAreaChanged();
    expect(isChanged).toBe(true);
    const logText = await mousePage.getActionLogText();
    expect(logText).toContain('hover');
  });

  test('TC-MO-05: Scroll', async () => {
    await mousePage.scrollOnList();
    const logText = await mousePage.getActionLogText();
    expect(logText).toContain('Scroll');
  });

  test('TC-MO-06: Drag & Drop', async () => {
    await mousePage.dragAndDrop();
    const isDropped = await mousePage.isElementDropped();
    expect(isDropped).toBe(true);
    // Drag does not log, so no log assertion
  });
});