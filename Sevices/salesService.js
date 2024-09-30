const { pool } = require("../Db");

const insertSales = async (sellingPrice, SellingQuantity, product_id) => {
  try {
    await pool.query(
      `
      INSERT INTO sales (selling_price, quantity, product_id,sale_time)
      VALUES ($1, $2, $3,NOW())
      RETURNING *;
    `,
      [sellingPrice, SellingQuantity, product_id]
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateSalesRecord = async (sellingPrice, SellingQuantity, product_id) => {
  try {
    const { rows } = await pool.query(
      `SELECT quantity FROM products WHERE id = $1`,
      [product_id]
    );

    const getQuantity = rows[0].quantity;

    let messageSend = "";
    let updatedQuantity = 0;
    if (isNaN(getQuantity)) {
      throw new Error("Invalid quantity value retrieved from the database");
    }

    if (isNaN(SellingQuantity)) {
      throw new Error("Invalid selling quantity provided");
    }

    if (SellingQuantity > getQuantity) {
      messageSend = "Insufficient inventory to process the sale";

      return { messageSend };
    } else {
      if (getQuantity < 10) {
        messageSend = "Inventory is less than 10";
      }

      await insertSales(sellingPrice, SellingQuantity, product_id);

      updatedQuantity = getQuantity - SellingQuantity;

      await pool.query(
        `UPDATE products
         SET quantity = $1
         WHERE id = $2`,
        [updatedQuantity, product_id]
      );
      messageSend = "Sale processed successfully";
      console.log(updatedQuantity, messageSend);

      return { updatedQuantity, messageSend };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { updateSalesRecord };
