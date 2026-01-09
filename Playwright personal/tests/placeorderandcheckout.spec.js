import { test, expect } from "@playwright/test";
import { TIMEOUT } from "node:dns";

test("Place an order anc checkout", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(
    page
      .getByRole("heading", {
        name: "Full-Fledged practice website for Automation Engineers",
      })
      .first()
  ).toBeVisible();

  const productOne = await page.locator(".single-products").nth(5);
  await productOne.scrollIntoViewIfNeeded();
  await productOne.hover();

  await productOne.getByText("Add to cart").first().click();

  await page.getByRole("button", { name: "Continue Shopping" }).click();

  const productTwo = await page.locator(".single-products").nth(8);
  await productTwo.scrollIntoViewIfNeeded();
  await productTwo.hover();

  await productTwo.getByText("Add to cart").first().click();

  await page.getByRole("link", { name: "View Cart" }).click();

  const cartRow = page.locator("#cart_info_table tbody tr");

  await expect(cartRow).toHaveCount(2);

  const productOneCart = cartRow.nth(0);

  await expect(productOneCart.locator(".cart_description h4 a")).toHaveText(
    "Summer White Top"
  );

  await expect(productOneCart.locator(".cart_price")).toHaveText("Rs. 400");

  await expect(productOneCart.locator(".cart_quantity")).toHaveText("1");
  await expect(productOneCart.locator(".cart_total")).toHaveText("Rs. 400");

  const productTwoCart = cartRow.nth(1);

  await expect(productTwoCart.locator(".cart_description h4 a")).toHaveText(
    "Sleeves Printed Top - White"
  );
  await expect(productTwoCart.locator(".cart_price")).toHaveText("Rs. 499");
  await expect(productTwoCart.locator(".cart_quantity")).toHaveText("1");
  await expect(productTwoCart.locator(".cart_total")).toHaveText("Rs. 499");

  await page.getByText("Proceed To Checkout").click();

  await page.getByRole("link", { name: "Register / Login" }).click();

  await expect(page).toHaveURL(/\/login/);

  await page
    .getByPlaceholder("Email Address")
    .first()
    .fill("deepali.g@edirra.com");

  await page.getByPlaceholder("Password").fill("Deepali@94");

  await page.getByRole("button", { name: "Login" }).click();

  await page.getByRole("link", { name: " Cart" }).click();

  await page.getByText("Proceed To Checkout").click();

  await expect(page).toHaveURL(/\/checkout/);

  const checkoutProductOne = page.locator("#product-6");

  const checkoutProductTwo = page.locator("#product-11");

  await checkoutProductOne.scrollIntoViewIfNeeded();

  await expect(checkoutProductOne.locator(".cart_description h4 a")).toHaveText(
    "Summer White Top"
  );

  await expect(checkoutProductTwo.locator(".cart_description h4 a")).toHaveText(
    "Sleeves Printed Top - White"
  );

  await page.getByRole("link", { name: "Place Order" }).click();

  await expect(page).toHaveURL(/\/payment/);

  await page.locator('[data-qa="name-on-card"]').fill("Deepali Gupta");

  await page.locator('[data-qa="card-number"]').fill("4111111111111111");

  await page.getByPlaceholder("ex. 311").fill("235");

  await page.getByPlaceholder("MM").fill("08");

  await page.getByPlaceholder("YYYY").fill("2030");

  await page.locator("#submit").click();

  await expect(
    page.getByText("Congratulations! Your order has been confirmed!")
  ).toBeVisible();

  await page.getByRole("link", { name: "Download Invoice" }).click();

  await page.getByRole("link", { name: "Logout" }).click();

  await page.setDefaultTimeout(3000);

  await expect(page.getByText("Login to your account")).toBeVisible();
});
