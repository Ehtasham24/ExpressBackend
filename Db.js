const { Pool } = require("pg");
const path = require("path");
require("dotenv").config({
  override: true,
  path: path.join(__dirname, "Development.env"),
});

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pos_DB",
  password: "dxtx998",
  port: 5432,
  // rowMode: "array",
});

module.exports = { pool };
