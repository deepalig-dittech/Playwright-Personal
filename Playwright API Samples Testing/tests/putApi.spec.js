import { test, expect } from "@playwright/test";

test("PUT - Update Object", async ({ request }) => {
  const response = await request.put("3", {
    data: {
      name: "Apple iPhone 12 Pro Max",
      data: { color: "White", "capacity GB": 512, price: 30000 },
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(JSON.stringify(body, null, 2));

  // ✅ Correct assertions
  expect(body.name).toBe("Apple iPhone 12 Pro Max");
  expect(body.data.color).toBe("White");
  expect(body.data.price).toBe(30000);
});
