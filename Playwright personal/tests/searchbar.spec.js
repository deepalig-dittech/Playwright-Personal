import { test, expect } from "@playwright/test";

test("Saerch bar testing", async ({ page }) => {
  await page.goto("https://www.w3schools.com/");
  const searchBox = page.getByPlaceholder("Search our tutorials");
  await searchBox.fill("HTML");

  await page.locator("#learntocode_searchbtn").click();

  await expect(page.locator("h1")).toContainText("HTML Tutorial");
});
