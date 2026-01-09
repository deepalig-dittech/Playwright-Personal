import { test, expect } from "@playwright/test";
test("Purchase Product & Download Invoice", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(
    page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    })
  ).toBeVisible();

  await page.getByText("Winter Top").nth(1).scrollIntoViewIfNeeded();

  await page.getByText("Winter Top").nth(1).hover();

  await page.getByText("Add to cart").nth(3).click();
});
