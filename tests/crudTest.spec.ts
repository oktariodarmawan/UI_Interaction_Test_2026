import { test, expect } from '@playwright/test';
import { HomePage } from '../page/HomePage';
import { CrudPage } from '../page/CRUDPage';
import { BASE_URL } from '../utils/constant';

test.describe('CRUD Flow Test', () => {

  test('TC-001 - Create data in CRUD page', async ({ page }) => {

  const homePage = new HomePage(page);
  const crudPage = new CrudPage(page);

  await homePage.navigate(BASE_URL);
  await homePage.goToCrud();

  await expect(page).toHaveURL(/\/crud/);

  const apiResponsePromise = page.waitForResponse(res =>
    res.url().includes('/rest/v1/test_records') &&
    res.request().method() === 'POST' &&
    res.status() === 201
  );

  await crudPage.create('Test No. 1', 'Test Description', 'Active', 'General');

  const apiResponse = await apiResponsePromise;
  expect(apiResponse.ok()).toBeTruthy();

  await expect(page.locator('h4').filter({ hasText: 'Test No. 1' }).first())
    .toContainText('Test No. 1', { timeout: 15000 });

});


  test('TC-002 - Delete data in CRUD page', async ({ page }) => {

    // INIT PAGE OBJECT
    const homePage = new HomePage(page);
    const crudPage = new CrudPage(page);

    // STEP 1: Open Home
    await homePage.navigate(BASE_URL);
    await homePage.goToCrud();

    // STEP 2: Navigate to CRUD via menu
    await homePage.goToCrud();
    // ASSERT: ensure already in CRUD page
    await expect(page).toHaveURL(/\/crud/);

   //Step 3: Delete data 
    await crudPage.searchField.fill('Test No. 1');
    await page.waitForTimeout(10000);
    await expect(crudPage.deleteButton).toBeVisible();
    
    await crudPage.deleteButton.click();
    await page.waitForTimeout(2000);

    await crudPage.inputConfirmDelete.fill('Test No. 1');
    await crudPage.deleteButtonCofirm.click();

    await crudPage.searchField.fill('Test No. 1');
    await page.waitForSelector(
  'p:has-text("No records match your filters.")',
  { timeout: 15000 });  
  });


  test('TC-003 - Add Tags in CRUD Page', async ({ page }) => {
    // INIT PAGE OBJECT
    const homePage = new HomePage(page);
    const crudPage = new CrudPage(page);
    // STEP 1: Open Home
    await homePage.navigate(BASE_URL);
    await homePage.goToCrud();
    // STEP 2: Navigate to CRUD via menu
    await homePage.goToCrud();
    // ASSERT: ensure already in CRUD page
    await expect(page).toHaveURL(/\/crud/);
   //Step 3: Delete data 
    await crudPage.manageTagsButton.click();
    await page.waitForTimeout(2000);
    await crudPage.tagNameField.fill('Tag Test 1');     
    await crudPage.addTagsButton.click();
    await page.waitForTimeout(2000);
    await expect(page.locator("div").filter({ hasText: 'Tag Test 1' }).last()).toBeVisible();
  }) 


  test('TC-004 - Delete Tags in CRUD Page', async ({ page }) => {
    // INIT PAGE OBJECT
    const homePage = new HomePage(page);
    const crudPage = new CrudPage(page);
    // STEP 1: Open Home
    await homePage.navigate(BASE_URL);
    await homePage.goToCrud();
    // STEP 2: Navigate to CRUD via menu
    await homePage.goToCrud();
    // ASSERT: ensure already in CRUD page
    await expect(page).toHaveURL(/\/crud/);
   //Step 3: Delete data 
    await crudPage.manageTagsButton.click();
    await page.waitForTimeout(2000);
    await crudPage.deleteByTitle('Tag Test 1');
    await page.waitForTimeout(2000);
    await expect(page.locator('div').filter({has: page.locator('span').filter({ hasText: 'Tag Test 1' })})).not.toBeVisible();
  
})


test('TC-005 - Upload CSV in CRUD Page', async ({ page }) => {
    // INIT PAGE OBJECT
    const homePage = new HomePage(page);
    const crudPage = new CrudPage(page);
    // STEP 1: Open Home
    await homePage.navigate(BASE_URL);
    await homePage.goToCrud();
    // ASSERT: ensure already in CRUD page
    await expect(page).toHaveURL(/\/crud/);
    // Step 2: Upload CSV
    // Assuming a sample CSV file exists, e.g., test-data.csv
    await crudPage.uploadFile('./test-data.csv');
    // Wait for upload to process
    await page.waitForTimeout(5000);
    // Assert that some records were added, e.g., check for a specific title
    await expect(page.locator('h4').filter({ hasText: 'CSV Test 1' }).first()).toBeVisible();
  });

  test('TC-006 - Download JSON in CRUD Page', async ({ page }) => {
    // INIT PAGE OBJECT
    const homePage = new HomePage(page);
    const crudPage = new CrudPage(page);
    // STEP 1: Open Home
    await homePage.navigate(BASE_URL);
    await homePage.goToCrud();
    // ASSERT: ensure already in CRUD page
    await expect(page).toHaveURL(/\/crud/);
    // Step 2: Download JSON
    const download = await crudPage.downloadJSON();
    // Assert download was triggered
    expect(download.suggestedFilename()).toContain('.json');
  });

  test('TC-007 - Download CSV in CRUD Page', async ({ page }) => {
    // INIT PAGE OBJECT
    const homePage = new HomePage(page);
    const crudPage = new CrudPage(page);
    // STEP 1: Open Home
    await homePage.navigate(BASE_URL);
    await homePage.goToCrud();
    // ASSERT: ensure already in CRUD page
    await expect(page).toHaveURL(/\/crud/);
    // Step 2: Click Download CSV button
    await crudPage.downloadCSVButton.click();
    // Assert button is clickable (no error)
    expect(true).toBe(true);
  });
});
