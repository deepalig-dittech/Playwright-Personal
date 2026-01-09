import { test, expect } from "@playwright/test";

test("Verify Subscription", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(
    page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    })
  ).toBeVisible();

  await page.getByText("Subscription").scrollIntoViewIfNeeded();

  await page.locator("#susbscribe_email").fill("testing@gmail.com");

  await page.locator("#subscribe").click();

  await expect(
    page.getByText("You have been successfully subscribed!")
  ).toBeVisible();
});
