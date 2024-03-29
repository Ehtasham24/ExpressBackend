const { pool } = require("../Db");

const getItemsById = async () => {
  try {
    const result = await pool.query(`SELECT * FROM public."Products"`);
    return result;
  } catch (err) {
    res.status(500).send({ message: "Service error" });
    console.log(err);
  }
};

const getItemById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM public."Products" WHERE id=$1`,
      [id]
    );
    return result;
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ message: "Service error" });
  }
};

const getItemByName = async (name) => {
  try {
    const result = await pool.query(
      `SELECT * FROM public."Products" WHERE name ILIKE $1`,
      [name]
    );
    return result;
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ message: "Service error" });
  }
};

const postItems = async (name, buying_price, Quantity, Category_id) => {
  try {
    const result = await pool.query(
      `
            INSERT INTO public."Products"(
                name, buying_price, "Quantity", "Category_id")
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, buying_price, "Quantity", "Category_id"
        `,
      [name, buying_price, Quantity, Category_id]
    );

    return result;
  } catch (err) {
    res.status(500).send({ message: "Service error" });
    console.log(err);
  }
};

const updateItems = async (name, price, Quantity, Category_id, id) => {
  try {
    const result = await pool.query(
      `UPDATE "Products" SET name=$1, buying_price=$2, "Quantity"=$3, "Category_id"=$4 WHERE id=$5 RETURNING *`,
      [name, price, Quantity, Category_id, id]
    );
    if (result.rowCount === 0) {
      res.send({ message: `No item with id: ${id} found` });
    } else {
      return result;
    }
  } catch (err) {
    res.status(500).send({ message: "servicce error" });
    console.log(err);
  }
};

const updateItemByName = async (name, buying_price, Quantity, Category_id) => {
  try {
    const result = await pool.query(
      `UPDATE public."Products"
        SET buying_price = $2, "Quantity" = $3, "Category_id" = $4
        WHERE name ILIKE $1
        RETURNING id, name, buying_price, "Quantity", "Category_id"
        `,
      [`%${name}%`, buying_price, Quantity, Category_id]
    );

    if (updateResult.rowCount === 0) {
      res.send({ message: `No item with name: ${name} found` });
    } else return result;
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getItemsById,
  getItemById,
  getItemByName,
  postItems,
  updateItems,
};
