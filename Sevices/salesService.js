const { pool } = require("../Db");

const updateSalesRecord = async (sellingPrice, quantity, prdouct_id) => {
  try {
    const getData = await pool.query("Select * from products where id = $1", [
      prdouct_id,
    ]);

    return getData;
  } catch (err) {
    throw Error(err.message);
  }
};

module.exports = { updateSalesRecord };
