import { test, expect } from '@playwright/test';
import { randomUser } from '../utils/random';

test('Login → Overall → Votar → Comentar', async ({ page }) => {
  const username = randomUser('vote');
  const password = 'P4ssw0rd!';

  await page.goto('/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByLabel('Login').fill(username);
  await page.getByRole('textbox', { name: 'First Name' }).fill('QA');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Tester');
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill(password);
  await page.getByRole('button', { name: 'Register' }).click();

  await page.waitForTimeout(3000); // Esperar un momento para evitar problemas de sincronización

  // Login
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Login').fill(username);
  await page.getByRole('navigation').locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();

  // Navegar a Overall Rating
  await page.getByRole('link', { name: 'Buggy Rating' }).click();
  await page.getByText('Overall Rating List of all').click();

  // Abrir primer modelo de la tabla
  const firstModel = page.getByRole('link', { name: 'View more' }).first();
  await firstModel.click();

  await page.waitForTimeout(3000); // Esperar un momento para evitar problemas de sincronización

  // Comentar
  const commentField = page.getByRole('textbox', { name: 'Your Comment (optional)' });
  await commentField.fill(`Comentario automático: ${Date.now()}`);

  // Votar si es posible
  const voteBtn = page.getByRole('button', { name: 'Vote' }).first();
  await voteBtn.click();
  await expect(page.getByText('Thank you for your vote!')).toBeVisible({ timeout: 10000 });

});
