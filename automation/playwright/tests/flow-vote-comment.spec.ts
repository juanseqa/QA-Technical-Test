import { test, expect } from '@playwright/test';
import { randomUser } from '../utils/random';

test('Login → Overall → Votar → Comentar', async ({ page }) => {
  const username = randomUser('vote');
  const password = 'P4ssw0rd!';

  await page.goto('/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByLabel(/username/i).fill(username);
  await page.getByLabel(/first name/i).fill('QA');
  await page.getByLabel(/last name/i).fill('User');
  await page.getByLabel(/^password$/i).fill(password);
  await page.getByLabel(/confirm password/i).fill(password);
  await page.getByRole('button', { name: /register/i }).click();

  // Login
  await page.getByRole('link', { name: /login/i }).click();
  await page.getByLabel(/username/i).fill(username);
  await page.getByLabel(/^password$/i).fill(password);
  await page.getByRole('button', { name: /login/i }).click();
  await expect(page.getByRole('link', { name: /logout/i })).toBeVisible();

  // Navegar a Overall Rating
  await page.getByRole('link', { name: /overall rating/i }).click();

  // Abrir primer modelo de la tabla
  const firstModel = page.locator('table tbody tr').first();
  await firstModel.click();

  // Votar (si se requiere seleccionar estrellas, intenta con el primer control)
  const voteBtn = page.getByRole('button', { name: /vote/i }).first();
  if (await voteBtn.isVisible()) {
    await voteBtn.click();
    await expect(page.getByText(/thank you for your vote|success/i)).toBeVisible({ timeout: 10000 });
  }

  // Comentar
  const commentField = page.getByRole('textbox').first();
  if (await commentField.isVisible()) {
    await commentField.fill(`Comentario automático: ${Date.now()}`);
    await page.getByRole('button', { name: /submit|add comment|save/i }).first().click();
    await expect(page.getByText(/success|added|saved/i)).toBeVisible({ timeout: 10000 });
  }
});
