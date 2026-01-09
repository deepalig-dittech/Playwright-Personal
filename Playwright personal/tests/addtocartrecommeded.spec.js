import { test, expect } from "@playwright/test";

test("Add Recommeded products to the cart", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(
    page
      .getByRole("heading", {
        name: "Full-Fledged practice website for Automation Engineers",
      })
      .first()
  ).toBeVisible();

  await page.evaluate(() => window.scrollBy(0, 1000));

  const recommended = page.locator(
    "#recommended-item-carousel .single-products"
  );

  await recommended.nth(4).locator("a.add-to-cart").click();

  await page.getByRole("link", { name: "View Cart" }).click();

  await expect(page.locator("#cart_info_table .cart_description")).toHaveText(
    "Winter Top Women > Tops"
  );
});
