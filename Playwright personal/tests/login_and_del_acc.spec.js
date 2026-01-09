import { test, expect } from "@playwright/test";

test("Login and delete acc", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(
    page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    })
  ).toBeVisible();

  await page.getByText(" Signup / Login").click();

  await expect(page.getByText("Login to your account")).toBeVisible();

  await page
    .getByPlaceholder("Email Address")
    .nth(0)
    .fill("perthinnadar@gmail.com");

  await page.getByPlaceholder("Password").fill("Perthin@27");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Logged in as Perthin Nadar")).toBeVisible();

  await page.getByText("Delete Account").click();

  await expect(page.getByText("ACCOUNT DELETED!")).toBeVisible();
});
