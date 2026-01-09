import { test, expect } from "@playwright/test";

test("Add a Product in a cart", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(
    page.getByRole("heading", {
      name: "Full-Fledged practice website for Automation Engineers",
    })
  ).toBeVisible();

  await page.getByRole("link", { name: " Products" }).click();

  // First product
  const firstProduct = page.locator(".single-products").first();
  await firstProduct.scrollIntoViewIfNeeded();
  await firstProduct.hover();

  await firstProduct.getByText("Add to cart").first().click();

  await page.getByRole("button", { name: "Continue Shopping" }).click();

  // Second product
  const secondProduct = page.locator(".single-products").nth(1);
  await secondProduct.scrollIntoViewIfNeeded();
  await secondProduct.hover();

  await secondProduct.getByText("Add to cart").nth(1).click();

  await page.getByRole("link", { name: "View Cart" }).click();

  const cartRows = page.locator("#cart_info_table tbody tr");

  await expect(cartRows).toHaveCount(2);

  const firstCartProduct = cartRows.nth(0);

  // Name
  await expect(firstCartProduct.locator(".cart_description h4 a")).toHaveText(
    "Blue Top"
  );

  // Price
  await expect(firstCartProduct.locator(".cart_price")).toHaveText("Rs. 500");

  // Quantity
  await expect(firstCartProduct.locator(".cart_quantity")).toHaveText("1");

  // Total
  await expect(firstCartProduct.locator(".cart_total")).toHaveText("Rs. 500");

  const secondCartProduct = cartRows.nth(1);

  // Name
  await expect(secondCartProduct.locator(".cart_description h4 a")).toHaveText(
    "Men Tshirt"
  );

  // Price
  await expect(secondCartProduct.locator(".cart_price")).toHaveText("Rs. 400");

  // Quantity
  await expect(secondCartProduct.locator(".cart_quantity")).toHaveText("1");

  // Total
  await expect(secondCartProduct.locator(".cart_total")).toHaveText("Rs. 400");
});
