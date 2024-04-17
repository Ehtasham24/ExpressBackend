const { Pool } = require("pg");
const path = require("path");
require("dotenv").config({
  override: true,
  path: path.join(__dirname, "Development.env"),
});

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "POS",
  password: "ehtasham24",
  port: 5432,
  // rowMode: "array",
});

module.exports = { pool };
