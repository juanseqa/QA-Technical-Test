import { test, expect } from '@playwright/test';
import { randomUser } from '../utils/random';

test('Registro -> Login', async ({ page }) => {
  const username = randomUser('user');
  const password = 'P4ssw0rd!';

  await page.goto('/');
  await page.getByRole('link', { name: 'Register' }).click();

  await page.getByLabel(/username/i).fill(username);
  await page.getByLabel(/first name/i).fill('QA');
  await page.getByLabel(/last name/i).fill('Tester');
  await page.getByLabel(/^password$/i).fill(password);
  await page.getByLabel(/confirm password/i).fill(password);
  await page.getByRole('button', { name: /register/i }).click();

  // Feedback de registro (puede variar)
  await expect(page.getByText(/registration is successful|username already exists/i)).toBeVisible();

  // Intentar login con las mismas credenciales
  await page.getByRole('link', { name: /login/i }).click();
  await page.getByLabel(/username/i).fill(username);
  await page.getByLabel(/^password$/i).fill(password);
  await page.getByRole('button', { name: /login/i }).click();

  // Estado autenticado (saludo o botón logout)
  await expect(page.getByRole('link', { name: /logout/i })).toBeVisible();
});
