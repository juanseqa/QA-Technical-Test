import { test as base, expect } from '@playwright/test';

type AuthFixtures = {
  loginAs: (page, { username, password }: { username: string; password: string; }) => Promise<void>;
};

export const test = base.extend<AuthFixtures>({
  loginAs: async ({ page }, use) => {
    await use(async (page, { username, password }) => {
      await page.goto('/');
      await page.getByRole('link', { name: 'Register' }).click();
      // If already registered, skip; otherwise create user
    });
  }
});

export const expectEx = expect;
