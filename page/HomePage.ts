import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

  readonly url = 'https://ui-interaction-test-gg7k.bolt.host/';

  readonly crudLink = this.page.getByRole('link', { name: 'CRUD', exact: true });
  readonly mouseLink = this.page.getByRole('link', { name: 'Mouse', exact: true });
  readonly inputLink = this.page.getByRole('link', { name: 'Input', exact: true });
  readonly loadingLink = this.page.getByRole('link', { name: 'Loading', exact: true });

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async getTitle() {
    return await this.page.title();
  }

  async wait(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  async goToCrud() {
    await this.crudLink.click();
  }

  async goToMouse() {
    await this.mouseLink.click();
  }

  async goToInput() {
    await this.inputLink.click();
  }

  async goToLoading() {
    await this.loadingLink.click();
  }
}
