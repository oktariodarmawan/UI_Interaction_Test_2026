import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InputPage extends BasePage {
  // Locators
  private textInput: Locator;
  private characterCount: Locator;
  private clearTextInput: Locator;
  private clearButton: Locator;
  private selectDropdown: Locator;
  private pasteInput: Locator;
  private rangeSlider: Locator;
  private sliderValue: Locator;
  private fileUploadInput: Locator;
  private textArea: Locator;
  private numberInput: Locator;
  private actionLog: Locator;

  constructor(page: Page) {
    super(page);
    this.textInput = page.locator('input[placeholder="Start typing..."]').first();
    this.characterCount = page.locator('p').filter({ hasText: 'Characters:' }).first();
    this.clearTextInput = page.locator('input[placeholder="Text will appear here"]').first();
    this.clearButton = page.locator('button').filter({ hasText: 'Clear' }).first();
    this.selectDropdown = page.locator('select').first();
    this.pasteInput = page.locator('input[placeholder*="Paste something here"]').first();
    this.rangeSlider = page.locator('input[type="range"]').first();
    this.sliderValue = page.locator('div').filter({ hasText: 'Value:' }).locator('xpath=following-sibling::*').first();
    this.fileUploadInput = page.locator('input[type="file"]').first();
    this.textArea = page.locator('textarea').first();
    this.numberInput = page.locator('input[type="number"]').first();
    this.actionLog = page.locator('.space-y-2.max-h-96.overflow-y-auto').first();
  }

  async typeInTextInput(text: string) {
    await this.textInput.fill(text);
  }

  async getCharacterCount() {
    return await this.characterCount.textContent();
  }

  async clearInput() {
    await this.clearButton.click();
  }

  async selectOption(option: string) {
    await this.selectDropdown.selectOption(option);
  }

  async pasteText(text: string) {
    await this.pasteInput.fill(text);
  }

  async changeSliderValue(value: string) {
    await this.rangeSlider.fill(value);
  }

  async getSliderValue() {
    return await this.sliderValue.textContent();
  }

  async uploadFile(filePath: string) {
    await this.fileUploadInput.setInputFiles(filePath);
  }

  async typeInTextArea(text: string) {
    await this.textArea.fill(text);
  }

  async setNumberInput(value: string) {
    await this.numberInput.fill(value);
  }

  async getActionLogText() {
    return await this.actionLog.textContent();
  }
}
