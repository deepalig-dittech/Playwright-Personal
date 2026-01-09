import { test, expect } from "@playwright/test";

test("Scroll Up without using arrow", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(
    page
      .getByRole("heading", {
        name: "Full-Fledged practice website for Automation Engineers",
      })
      .first()
  ).toBeVisible();

  await page.mouse.wheel(0, 10000);

  await expect(
    page.getByText("Copyright © 2021 All rights reserved")
  ).toBeVisible();

  await page.mouse.wheel(0, -10000);

  await expect(
    page
      .getByRole("heading", {
        name: "Full-Fledged practice website for Automation Engineers",
      })
      .first()
  ).toBeVisible();
});
