import { test, expect } from "@playwright/test";

test("Login with existing user", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(
    page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    })
  ).toBeVisible();

  await page.getByRole("link", { name: " Signup / Login" }).click();

  await expect(page.getByText("New User Signup!")).toBeVisible();

  await page.getByPlaceholder("name").fill("deepali");

  await page
    .getByPlaceholder("Email Address")
    .nth(1)
    .fill("deepali.g@edirra.com");

  await page.getByRole("button", { name: "Signup" }).click();

  await expect(page.getByText("Email Address already exist!")).toBeVisible();
});
