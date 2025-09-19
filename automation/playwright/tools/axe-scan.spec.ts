import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('A11y: login', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Login' }).click();
  const results = await new AxeBuilder({ page }).analyze();
  console.log(JSON.stringify(results, null, 2));
});

test('A11y: detalle modelo', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Overall Rating List of all').click();
  await page.locator('table tbody tr').first().click();
  const results = await new AxeBuilder({ page }).analyze();
  console.log(JSON.stringify(results, null, 2));
});
