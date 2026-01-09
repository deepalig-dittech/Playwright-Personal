const { Pool } = require("pg");

const pool = new Pool({
  host: "10.0.130.19",
  user: "ditech_admin",
  password: "mIHO7X80tcw6",
  database: "edirra_db",
  port: 5432,
});

module.exports = pool;
