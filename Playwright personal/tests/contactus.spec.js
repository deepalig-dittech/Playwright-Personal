import { test, expect } from "@playwright/test";

test("Contact us form", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(
    page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    })
  ).toBeVisible();

  await page.getByRole("link", { name: " Contact us" }).click();

  await expect(
    page.getByRole("heading", { name: "Get In Touch" })
  ).toBeVisible();

  await page.getByPlaceholder("Name").fill("Testing purpose");

  await page.getByPlaceholder("Email").first().fill("testing@gmail.com ");

  await page.getByPlaceholder("Subject").fill("Testing Purpose");

  await page.getByPlaceholder("Your Message Here").fill("Testing website");

  await page.click("input.submit_form");

  await page.click("input.submit_form");

  await page.click("input.submit_form");
  await page.click("input.submit_form");

  await page.waitForTimeout(3000);

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Press OK to proceed!");
    await dialog.accept();
  });

  //await page.waitForTimeout(3000);

  //   await expect(
  //     page.getByText("Success! Your details have been submitted successfully.")
  //   ).toBeVisible();
});
