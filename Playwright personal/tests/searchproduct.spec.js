import { test, expect } from "@playwright/test";

test("Search Product", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(
    page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    })
  ).toBeVisible();

  await page.getByRole("link", { name: " Products" }).click();

  await expect(page).toHaveURL(/\/products/);

  await expect(page.locator("h2.title.text-center")).toHaveText("All Products");

  await page.locator("#search_product").fill("Lace Top For Women");

  await page.locator("#submit_search").click();

  await page.getByText("Lace Top For Women").nth(1).scrollIntoViewIfNeeded();

  await expect(page.getByText("Lace Top For Women").nth(1)).toBeVisible();
});
