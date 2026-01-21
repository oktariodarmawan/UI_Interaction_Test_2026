import { test, expect } from '@playwright/test';
import { InputPage } from '../page/InputPage';

test.describe('Input Interactions Tests', () => {
  let inputPage: InputPage;

  test.beforeEach(async ({ page }) => {
    inputPage = new InputPage(page);
    await inputPage.navigate('https://ui-interaction-test-gg7k.bolt.host/input');
  });

  test('Type Text Input', async () => {
    const testText = 'Hello World';
    await inputPage.typeInTextInput(testText);
    const count = await inputPage.getCharacterCount();
    expect(count).toContain('11'); // Hello World is 11 chars
    const logText = await inputPage.getActionLogText();
    expect(logText).toContain('Input');
  });

  test('Clear Input', async () => {
    // Type in the text input first
    await inputPage.typeInTextInput('Some text to clear');
    // Then click the clear button
    await inputPage.clearInput();
    // Check if the text input is cleared
    const value = await inputPage.textInput.inputValue();
    expect(value).toBe('');
    const logText = await inputPage.getActionLogText();
    expect(logText).toContain('clear');
  });

  test('Select Option', async () => {
    await inputPage.selectOption('Option 1');
    const selected = await inputPage.selectDropdown.inputValue();
    expect(selected).toBe('option1');
    const logText = await inputPage.getActionLogText();
    expect(logText).toContain('Selected');
  });

  test('Change Range Slider', async () => {
    await inputPage.changeSliderValue('75');
    // Slider value display might be tricky, check log instead
    const logText = await inputPage.getActionLogText();
    expect(logText).toContain('Range slider changed to: 75');
  });

  test('Upload File', async () => {
    // Create a temporary test file
    const fs = require('fs');
    const path = require('path');
    const testFilePath = path.join(process.cwd(), 'test-file.txt');
    fs.writeFileSync(testFilePath, 'Test file content');
    await inputPage.uploadFile(testFilePath);
    const logText = await inputPage.getActionLogText();
    expect(logText).toContain('file');
    // Clean up
    fs.unlinkSync(testFilePath);
  });

  test('Type in Text Area', async () => {
    const testText = 'Multi\nLine\nText';
    await inputPage.typeInTextArea(testText);
    const value = await inputPage.textArea.inputValue();
    expect(value).toBe(testText);
    const logText = await inputPage.getActionLogText();
    expect(logText).toContain('Textarea');
  });

  test('Set Number Input', async () => {
    await inputPage.setNumberInput('42');
    const value = await inputPage.numberInput.inputValue();
    expect(value).toBe('42');
    const logText = await inputPage.getActionLogText();
    expect(logText).toContain('Number input');
  });

  test('Paste Text', async () => {
    const pasteText = 'Pasted content';
    await inputPage.pasteText(pasteText);
    const value = await inputPage.pasteInput.inputValue();
    expect(value).toBe(pasteText);
    // Paste may not log, so check value only
  });
});
