const { pool } = require("../Db");

const getCategories = async () => {
  try {
    const result = await pool.query('SELECT * FROM "categories"');
    return result;
  } catch (err) {
    console.log(err);
    res.send({ message: "Internal error" });
  }
};

const getProductsForCategory = async (id) => {
  try {
    const query = `
      SELECT p.*
      FROM "products" p
      JOIN "categories" c ON p."category_id" = c.id
      WHERE c.id = $1 ORDER BY productname;
    `;
    const result = await pool.query(query, [id]);
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Internal error");
  }
};

module.exports = { getCategories, getProductsForCategory };
