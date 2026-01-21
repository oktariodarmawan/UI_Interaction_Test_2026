import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CrudPage extends BasePage {

  readonly url = 'https://ui-interaction-test-gg7k.bolt.host/crud';

  readonly titleField: Locator;
  readonly descriptionField: Locator;
  readonly typeDropdown: Locator;
  readonly categoryDropdown: Locator;
  readonly createButton : Locator;
  readonly searchField: Locator;
  readonly deleteButton: Locator;
  readonly inputConfirmDelete: Locator;
  readonly deleteButtonCofirm: Locator;
  readonly manageTagsButton: Locator;
  readonly tagNameField : Locator;
  readonly addTagsButton: Locator;
  readonly uploadCSVButton: Locator;
  readonly fileInput: Locator;
  readonly downloadJSONButton: Locator;
  readonly downloadCSVButton: Locator;

  constructor(page: Page) {
    super(page);

    this.titleField = page.getByPlaceholder('Title').first()
    this.descriptionField = page.getByPlaceholder('Description').first()
    this.typeDropdown = page.getByRole('combobox').first();
    this.categoryDropdown = page.getByRole('combobox').nth(1);
    this.createButton = page.getByRole('button', { name: /Create Record/i });
    
    this.searchField =  page.getByRole('textbox', { name: /Search by title or description\.\.\./i });
    this.deleteButton = page.getByRole('button').filter({ hasText: /^$/ }).nth(2);
    this.inputConfirmDelete = page.getByRole('textbox', { name: /Enter title to confirm/i });
    this.deleteButtonCofirm = page.locator('button:has-text("Delete")');
    this.manageTagsButton = page.getByText('Manage Tags', { exact: true });
    this.tagNameField = page.getByRole('textbox', { name: /Tag name/i });
    this.addTagsButton = page.getByText('Add Tag', { exact: true });
    this.uploadCSVButton = page.getByRole('button', { name: 'Upload CSV' });
    this.fileInput = page.locator('input[type="file"]'); // Inisialisasi
    this.downloadJSONButton = page.locator('button').filter({ hasText: 'JSON' });
    this.downloadCSVButton = page.locator('button').filter({ hasText: 'CSV' }).first();
  }


  async open() {
    await this.navigate(this.url);
  }

  async create(title: string, description: string, type: string, category: string) {
    await this.titleField.fill(title);
    await this.descriptionField.fill(description);
    await this.typeDropdown.selectOption(type);
    await this.categoryDropdown.selectOption(category);
    await this.createButton.click();
  }

  async deleteByTitle(text: string) {

// Cari container (div) yang memiliki span dengan teks ini
    const row = this.page.locator('div').filter({
  has: this.page.locator('span').filter({ hasText: text })
});

// Klik tombol delete (svg.lucide-trash2) di dalam container itu
await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
}

//Click Upload CSV
async uploadFile(file: string){
    await this.fileInput.setInputFiles(file);
  }

async downloadJSON() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadJSONButton.click();
    return await downloadPromise;
  }

async downloadCSV() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadCSVButton.click();
    return await downloadPromise;
  }

}


