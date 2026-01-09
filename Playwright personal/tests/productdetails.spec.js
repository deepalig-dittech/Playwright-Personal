import { test, expect } from "@playwright/test";
import { time } from "node:console";

test("Verify product page and product detials", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(
    page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    })
  ).toBeVisible();

  await page.getByRole("link", { name: " Products" }).click();

  await expect(page).toHaveURL(/\/products/);

  await expect(page.locator("h2.title.text-center")).toHaveText("All Products");

  await expect(page.locator(".productinfo p").first()).toBeVisible();

  await expect(page.locator(".productinfo h2").first()).toBeVisible();

  await page
    .getByRole("link", { name: "View Product" })
    .first()
    .scrollIntoViewIfNeeded();

  await page.getByRole("link", { name: "View Product" }).first().click();

  await expect(
    page.getByRole("heading", {
      name: "Blue Top",
    })
  ).toBeVisible();

  await expect(page.getByText("Category: Women > Tops")).toBeVisible();

  await expect(page.getByText("Rs. 500")).toBeVisible();

  await expect(page.getByText("Availability:")).toBeVisible();

  await expect(page.getByText("Condition:")).toBeVisible();

  await expect(page.getByText("Brand:")).toBeVisible();
});
