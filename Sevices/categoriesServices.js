const { pool } = require("../Db");

const getCategories = async () => {
  try {
    const result = await pool.query('SELECT * FROM public."categories"');
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
      FROM public."products" p
      JOIN public."categories" c ON p."category_id" = c.id
      WHERE c.id = $1;
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
