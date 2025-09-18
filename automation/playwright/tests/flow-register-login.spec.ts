import { test, expect } from '@playwright/test';
import { randomUser } from '../utils/random';

test('Registro -> Login', async ({ page }) => {
  const username = randomUser('user');
  const password = 'P4ssw0rd!';

  await page.goto('/');
  await page.getByRole('link', { name: 'Register' }).click();

  await page.getByLabel('Login').fill(username);
  await page.getByRole('textbox', { name: 'First Name' }).fill('QA');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Tester');
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill(password);
  await page.getByRole('button', { name: 'Register' }).click();

  // Feedback de registro (puede variar)
  await expect(page.getByText('Registration is successful')).toBeVisible();

  // Intentar login con las mismas credenciales
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Login').fill(username);
  await page.getByRole('navigation').locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  // Estado autenticado (saludo o botón logout)
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});
