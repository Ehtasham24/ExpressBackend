const { pool } = require("../Db");

const getItems = async () => {
  try {
    const result = await pool.query(`SELECT * FROM products`);
    return result;
  } catch (err) {
    console.log(err);
    throw new Error("Service error", err);
  }
};

const getItemById = async (id) => {
  try {
    const result = await pool.query(`SELECT * FROM products WHERE id=$1`, [id]);
    return result;
  } catch (err) {
    console.error("Error:", err);
    throw new Error("Service error", err);
  }
};

const getItemByName = async (name) => {
  try {
    const result = await pool.query(
      `SELECT * FROM products WHERE name ILIKE $1`,
      [name]
    );
    return result;
  } catch (err) {
    console.error("Error:", err);
    throw new Error("Service error", err);
  }
};

const postItems = async (name, buying_price, quantity, category_id) => {
  try {
    const result = await pool.query(
      `
            INSERT INTO products(
                productname, buyingprice, "quantity", "category_id")
            VALUES ($1, $2, $3, $4)
            RETURNING id, productname, buyingprice, quantity, category_id
        `,
      [name, buying_price, quantity, category_id]
    );

    return result;
  } catch (err) {
    if (err.code === "23505" && err.constraint === "unique_name_lower") {
      throw new Error(
        "Name already present in database. Choose a different name."
      );
    } else throw new Error(err);
  }
};

const updateItems = async (name, price, quantity, category_id, id) => {
  try {
    const result = await pool.query(
      `UPDATE "products" SET name=$1, buying_price=$2, "quantity"=$3, "category_id"=$4 WHERE id=$5 RETURNING *`,
      [name, price, quantity, category_id, id]
    );
    if (result.rowCount === 0) {
      throw new Error({ message: `No item with id: ${id} found` });
    } else {
      return result;
    }
  } catch (err) {
    throw new Error("Service error", err);
    console.log(err);
  }
};

const updateItemByName = async (name, buying_price, quantity, category_id) => {
  try {
    const result = await pool.query(
      `UPDATE "products"
        SET buying_price = $2, "quantity" = $3, "category_id" = $4
        WHERE name ILIKE $1
        RETURNING id, name, buying_price, "quantity", "category_id"
        `,
      [`%${name}%`, buying_price, quantity, category_id]
    );

    if (result.rowCount === 0) {
      throw new Error({ message: `No item with name: ${name} found` });
    } else return result;
  } catch (err) {
    console.log(err);
    throw new Error({ message: err.message });
  }
};

const deleteItemById = async (id) => {
  try {
    const nameResult = await pool.query(
      `SELECT name FROM "products" WHERE id=$1`,
      [id]
    );
    if (nameResult.rows.length === 0) {
      throw new Error(`No item with id: ${id} found`);
    }
    const name = nameResult.rows[0].name;
    const deleteResult = await pool.query(
      `DELETE FROM "products" WHERE id=$1`,
      [id]
    );
    return { name, deleteResult };
  } catch (err) {
    throw new Error(`Service error: ${err.message}`);
  }
};

const deleteItemsByName = async (name) => {
  try {
    const result = await pool.query(
      `DELETE FROM "products" WHERE name ILIKE $1`,
      [name]
    );
    if (result.rowCount === 0) {
      throw new Error({ message: `No item with name: ${name} found` });
    } else {
      return result;
    }
  } catch (err) {
    console.error(err);
    throw new Error({ message: "Services error" });
  }
};

module.exports = {
  getItems,
  getItemById,
  getItemByName,
  postItems,
  updateItems,
  updateItemByName,
  deleteItemsByName,
  deleteItemById,
};
