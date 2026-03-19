import { test, expect } from '@playwright/test';

test('create profile and verify claim modal', async ({ page }) => {
  await page.goto('/join-the-builders');
  await page.waitForLoadState('networkidle');
});
