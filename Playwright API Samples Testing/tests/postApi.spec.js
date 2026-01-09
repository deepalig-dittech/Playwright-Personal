import { test, expect } from "@playwright/test";

test("Post - Add object", async ({ request }) => {
  const response = await request.post("https://api.restful-api.dev/objects", {
    data: {
      name: "Samsung S21 FE",
      data: {
        year: 2023,
        price: 30000.0,
        "CPU model": "Intel Core i7",
        "Hard disk size": "2 MB",
      },
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(JSON.stringify(body, null, 2));

  expect(body.name).toBe("Samsung S21 FE");
  expect(body.data.price).toBe(30000.0);
  expect(body.data.year).toBe(2023);
});
