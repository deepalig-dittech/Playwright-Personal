import { test, expect } from "@playwright/test";

test("Login with incorrect credentials", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(
    page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    })
  ).toBeVisible();

  await page.getByRole("link", { name: " Signup / Login" }).click();

  await expect(page.getByText("Login to your account")).toBeVisible();

  await page
    .getByPlaceholder("Email Address")
    .nth(0)
    .fill("perthinnadar@gmail.com");

  await page.getByPlaceholder("Password").fill("pethin@27");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(
    page.getByText("Your email or password is incorrect!")
  ).toBeVisible();
});
