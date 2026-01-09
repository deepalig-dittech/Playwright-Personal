import { test, expect } from "@playwright/test";

test("Verify Scroll Up using Arrow", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(
    page
      .getByRole(
        "heading",
        "Full-Fledged practice website for Automation Engineers"
      )
      .first()
  ).toBeVisible();

  await page
    .getByRole("heading", { name: "Subscription" })
    .scrollIntoViewIfNeeded();

  await expect(
    page.getByRole("heading", { name: "Subscription" })
  ).toBeVisible();

  await page.locator("#scrollUp").click();

  await expect(
    page
      .getByRole(
        "heading",
        "Full-Fledged practice website for Automation Engineers"
      )
      .first()
  ).toBeVisible();
});
