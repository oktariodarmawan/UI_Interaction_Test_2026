import { test, expect } from '@playwright/test';
import { HomePage } from '../page/HomePage';
import { BASE_URL } from '../utils/constant';

test('Navigate to CRUD page', async ({ page }) => {
  const home = new HomePage(page);

  await home.navigate(BASE_URL);
  await home.goToCrud();

  expect(page.url()).toContain('/crud');
  await expect(home.crudLink).toHaveClass(/bg-blue-600/);
});


test('Navigate to Mouse page', async ({ page }) => {
  const home = new HomePage(page);

  await home.navigate(BASE_URL);
  await home.goToMouse();
  expect(page.url()).toContain('/mouse');
  await expect(home.mouseLink).toHaveClass(/bg-blue-600/);
  
});


test('Navigate to Input page', async ({ page }) => {
    const home = new HomePage(page);

    await home.navigate(BASE_URL);
    await home.goToInput();
    expect(page.url()).toContain('/input');
    await expect(home.inputLink).toHaveClass(/bg-blue-600/);
    });


test('Navigate to Loading page', async ({ page }) => {
    const home = new HomePage(page);

    await home.navigate(BASE_URL);
    await home.goToLoading();
    expect(page.url()).toContain('/loading');
    await expect(home.loadingLink).toHaveClass(/bg-blue-600/);
    }); 
    
