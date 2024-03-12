const { Pool } = require("pg");
const path = require("path");
require("dotenv").config({
  override: true,
  path: path.join(__dirname, "Development.env"),
});

const pool = new Pool({
  user: process.env.USER || "postgres",
  host: process.env.HOST || "localhost",
  database: process.env.DATABASE || "pos_DB",
  password: process.env.PASSWORD || "dxtx998",
  port: process.env.PORT || 5432,
});

module.exports = { pool };
