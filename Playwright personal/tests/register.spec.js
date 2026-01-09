import { test, expect } from "@playwright/test";

test("Register User", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await page.evaluate(() => {
    document.documentElement.requestFullscreen();
  });

  await expect(
    page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    })
  ).toBeVisible();

  await page.getByText(" Signup / Login").click();

  await expect(page.getByText("New User Signup!")).toBeVisible();

  await page.getByPlaceholder("Name").fill("deepali");
  await page
    .getByPlaceholder("Email Address")
    .nth(1)
    .fill("deepali.g@edirra.com");

  await page.getByText("Signup").nth(2).click();

  await expect(page.getByText("Enter Account Information")).toBeVisible();
  await page.getByLabel("Password ").fill("November");

  await page.locator("#newsletter").check();
  await page.locator("#optin").check();

  await page.getByLabel("First name ").fill("Deepali");
  await page.getByLabel("Last name ").fill("Gupta");
  await page.getByLabel("Address ").first().fill("Thane");

  await page.getByLabel("State ").fill("Maharashtra");

  await page.locator("#city").fill("Thane");

  await page.locator("#zipcode").fill("400604");

  await page.getByLabel("Mobile Number ").fill("9898989898");

  await page.getByText("Create Account").click();

  await expect(page.getByText("ACCOUNT CREATED!")).toBeVisible();

  await page.getByText("Continue").click();

  await expect(page.getByText("Logged in as deepali")).toBeVisible();

  await page.getByText("Delete Account").click();

  await expect(page.getByText("ACCOUNT DELETED!")).toBeVisible();

  await page.getByText("Continue").click();
});
