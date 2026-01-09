import { test, expect } from "@playwright/test";
test("Verify and cart brand products", async ({ page }) => {
  await page.goto("http://automationexercise.com");

  await page.getByRole("link", { name: "Products" }).click();

  await page.locator(".brands_products h2").scrollIntoViewIfNeeded();

  await expect(page.locator(".brands_products h2")).toBeVisible();

  await page.getByRole("link", { name: "H&M" }).click();

  await expect(page).toHaveURL(/H&M/);

  await expect(page.locator(".features_items h2").first()).toBeVisible();

  await page.getByRole("link", { name: "BIBA" }).click();

  await expect(page).toHaveURL(/\/Biba/);

  await expect(page.locator(".features_items h2").first()).toBeVisible();
});
