import { test, expect } from '@playwright/test';

test('Inyectar fila en DOM tras cargar Overall', async ({ page }) => {
  await page.goto('https://buggy.justtestit.org/');
  await page.getByText('Overall Rating List of all').click();
  await expect.poll(() => page.url()).toContain('/overall');

  // Espera que exista la tabla
  const tbody = page.locator('table tbody');
  await expect(tbody).toBeVisible();

  // Inyecta una fila al inicio del tbody
  await page.evaluate(() => {
    const tb = document.querySelector('table tbody');
    if (tb) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>QA Motors</td>
        <td>Model Z</td>
        <td>1</td>
        <td>999</td>
        <td>6.0l</td>
        <td>Demo</td>`;
      tb.prepend(tr);
    }
  });

  await expect(page.getByText('QA Motors')).toBeVisible();
});
