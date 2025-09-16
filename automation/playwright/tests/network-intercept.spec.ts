import { test, expect } from '@playwright/test';

test('Interceptar y manipular una request (demo)', async ({ page, context }) => {
  await page.route('**/*', async (route) => {
    const req = route.request();
    // Ejemplo: alterar User-Agent sólo para una llamada específica
    if (req.url().includes('/login')) {
      await route.continue({ headers: { ...req.headers(), 'X-Demo-Header': 'QA-Route' } });
    } else {
      await route.continue();
    }
  });

  await page.goto('/');
  // (Continúa con un flujo de login para observar el header en las herramientas de red)
});
