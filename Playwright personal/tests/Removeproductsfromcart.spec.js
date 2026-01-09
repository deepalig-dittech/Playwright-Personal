import { test, expect } from "@playwright/test";

test("Remove products from cart", async ({ page }) => {
  await page.goto("http://automationexercise.com");

  await expect(
    page
      .getByRole("heading", {
        name: "Full-Fledged practice website for Automation Engineers",
      })
      .first()
  ).toBeVisible();

  await page.getByRole();

  const prodOne = await page.locator(".single-products").first();
  const prodTwo = await page.locator(".single-products").nth(2);
  const prodThree = await page.locator(".single-products").last();

  await prodOne.scrollIntoViewIfNeeded();
  await prodOne.hover();
  await prodOne.getByText("Add to cart").first().click();

  await page.getByRole("button", { name: "Continue Shopping" }).click();

  await prodTwo.scrollIntoViewIfNeeded();
  await prodTwo.hover();
  await prodTwo.getByText("Add to cart").first().click();

  await page.getByRole("button", { name: "Continue Shopping" }).click();

  await prodThree.scrollIntoViewIfNeeded();
  await prodThree.hover();
  await prodThree.getByText("Add to cart").first().click();

  await page.getByRole("link", { name: "view cart" }).click();

  const cartRows = page.locator("#cart_info_table tbody tr");

  await expect(cartRows).toHaveCount(3);

  await page.locator(".cart_quantity_delete").first().click();
  await page.locator(".cart_quantity_delete").nth(1).click();
  await page.locator(".cart_quantity_delete").nth(2).click();
});
