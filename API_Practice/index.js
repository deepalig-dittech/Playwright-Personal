const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.status(200).json({
    message: "Hello from get api",
  });
});

app.post("/api/user", (req, res) => {
  const userData = req.body;
  res.status(201).json({
    message: "User created successfully",
    data: userData,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
