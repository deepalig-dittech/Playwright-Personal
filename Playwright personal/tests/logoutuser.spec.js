import { test, expect } from "@playwright/test";

test("login and logout", async ({ page }) => {
  page.goto("https://automationexercise.com/");

  await expect(
    page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    })
  ).toBeVisible();

  await page.getByRole("link", { name: " Signup / Login" }).click();

  await expect(page.getByText("Login to your account")).toBeVisible();

  await page
    .getByPlaceholder("Email Address")
    .first()
    .fill("deepali.g@edirra.com");

  await page.getByPlaceholder("Password").fill("Deepali@94");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Logged in as deepali")).toBeVisible();

  await page.getByRole("link", { name: "Logout" }).click();

  await page.waitForTimeout(5000);

  await expect(page.getByText("Login to your account")).toBeVisible();
});
