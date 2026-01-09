import { test, expect } from "@playwright/test";

test("verify test cases", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(
    page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    })
  ).toBeVisible();

  await page.getByRole("link", { name: " Test Cases" }).first().click();

  await expect(page.locator("b")).toBeVisible();
});
