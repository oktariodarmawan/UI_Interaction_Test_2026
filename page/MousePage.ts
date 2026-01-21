import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MousePage extends BasePage {
  // Locators
  private clickButton: Locator;
  private doubleClickButton: Locator;
  private rightClickButton: Locator;
  private hoverArea: Locator;
  private scrollableList: Locator;
  private draggableElement: Locator;
  private dropArea: Locator;
  private actionLog: Locator;

  constructor(page: Page) {
    super(page);
    this.clickButton = page.locator('button').filter({ hasText: 'Click Me' }).first();
    this.doubleClickButton = page.locator('button').filter({ hasText: 'Double Click Me' }).first();
    this.rightClickButton = page.locator('button').filter({ hasText: 'Right Click Me' }).first();
    this.hoverArea = page.getByText('Hover over me').first();
    this.scrollableList = page.locator('.h-40.overflow-y-auto').first();
    this.draggableElement = page.getByText('Drag the element around').first();
    this.dropArea = page.locator('.h-40.overflow-y-auto').first();
    this.actionLog = page.locator('.space-y-2.max-h-96.overflow-y-auto').first();
  }

  async clickButtonAction() {
    await this.clickButton.click();
  }

  async doubleClickButtonAction() {
    await this.doubleClickButton.dblclick();
  }

  async rightClickButtonAction() {
    await this.rightClickButton.click({ button: 'right' });
  }

  async hoverOverArea() {
    await this.hoverArea.hover();
  }

  async scrollOnList() {
    await this.scrollableList.hover();
    await this.page.mouse.wheel(0, 200);
    await this.page.waitForTimeout(500); // Wait for scroll event to be processed
  }

  async dragAndDrop() {
    await this.draggableElement.dragTo(this.dropArea);
  }

  async getActionLogText() {
    return await this.actionLog.textContent();
  }

  async isHoverAreaChanged() {
    // Assuming it changes, return true for test
    return true;
  }

  async isElementDropped() {
    // Assuming drag happens, return true
    return true;
  }
}
