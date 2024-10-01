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

const isValidDate = (date) => {
  return !isNaN(new Date(date).getTime());
};

const fetchSales = async (startDate, endDate) => {
  try {
    // Validate date inputs
    if (
      !startDate ||
      !endDate ||
      !isValidDate(startDate) ||
      !isValidDate(endDate)
    ) {
      throw new Error(
        "Invalid date inputs. Please provide valid start and end dates."
      );
    }

    // Query to fetch product sales, calculate profit/loss, include buying price, and category
    const response = await pool.query(
      `SELECT 
         p.productname,
         p.category_id,
         c.category_name,  -- Fetch category name from the categories table
         p.buyingprice,  -- Include buying price
         SUM(s.quantity) AS total_quantity_sold,
         CAST(AVG(s.selling_price) AS INT) AS avg_selling_price,  -- Cast average selling price to INT
         CAST((AVG(s.selling_price) - p.buyingprice) AS INT) AS profit_loss,  -- Profit per piece as INT
         (SUM(s.quantity) * (AVG(s.selling_price) - p.buyingprice))::BIGINT AS overall_profit_loss  -- Total profit as BIGINT
       FROM Sales s
       INNER JOIN Products p ON s.product_id = p.id
       INNER JOIN Categories c ON p.category_id = c.id  -- Join with Categories table to get category name
       WHERE s.sale_time BETWEEN $1 AND $2
       GROUP BY p.productname, p.category_id, p.buyingprice, c.category_name  -- Group by necessary columns including category name
       ORDER BY profit_loss DESC`,
      [startDate, endDate]
    );

    // Extract sales data rows
    const salesData = response.rows;

    // Calculate the overall total profit/loss for all products
    const totalProfitLoss = salesData.reduce((acc, item) => {
      return acc + parseFloat(item.overall_profit_loss); // Convert overall_profit_loss to a number
    }, 0);

    // Return both sales data and total profit/loss
    return {
      salesData, // Product-wise profit/loss with category, buying price, and overall profit
      totalProfitLoss, // Total profit/loss for the specified timeframe
    };
  } catch (err) {
    console.log(err);
    throw err; // Ensure to throw the error to be caught in your controller
  }
};

const fetchSalesByProfitLoss = async (startDate, endDate, type) => {
  try {
    // Validate date inputs
    if (
      !startDate ||
      !endDate ||
      !isValidDate(startDate) ||
      !isValidDate(endDate)
    ) {
      throw new Error(
        "Invalid date inputs. Please provide valid start and end dates."
      );
    }

    // Determine the profit condition based on the type
    let profitCondition;
    if (type === "profit") {
      profitCondition =
        "(SUM(s.quantity) * (AVG(s.selling_price) - p.buyingprice))::BIGINT > 0"; // Show only positive overall profit
    } else if (type === "loss") {
      profitCondition =
        "(SUM(s.quantity) * (AVG(s.selling_price) - p.buyingprice))::BIGINT < 0"; // Show only negative overall profit
    } else {
      throw new Error("Invalid type. Must be 'profit' or 'loss'.");
    }

    const response = await pool.query(
      `SELECT 
         p.productname,
         p.category_id,
         c.category_name,
         p.buyingprice,  -- Include buying price
         SUM(s.quantity) AS total_quantity_sold,
         CAST(AVG(s.selling_price) AS INT) AS avg_selling_price,  -- Cast average selling price to INT
         CAST((AVG(s.selling_price) - p.buyingprice) AS INT) AS profit_loss,  -- Profit per piece as INT
         (SUM(s.quantity) * (AVG(s.selling_price) - p.buyingprice))::BIGINT AS overall_profit_loss  -- Total profit as BIGINT
       FROM Sales s
       INNER JOIN Products p ON s.product_id = p.id
       INNER JOIN Categories c ON p.category_id = c.id 
       WHERE s.sale_time BETWEEN $1 AND $2
       GROUP BY p.productname, p.category_id, p.buyingprice, c.category_name  -- Group by product name and buying price
       HAVING ${profitCondition} -- Apply the profit condition for profit-only items
       ORDER BY overall_profit_loss DESC`,
      [startDate, endDate]
    );

    // Extract sales data rows
    const salesData = response.rows;

    // Calculate the overall total profit/loss for the filtered products
    const totalProfitLoss = salesData.reduce((acc, item) => {
      return acc + parseFloat(item.overall_profit_loss); // Convert overall_profit to a number
    }, 0);

    // Return both the sales data and the total profit/loss
    return {
      salesData, // Product-wise profit/loss including buying price
      totalProfitLoss, // Total profit/loss for the specified timeframe and type
    };
  } catch (err) {
    console.log(err);
    throw err; // Ensure to throw the error to be caught in your controller
  }
};

module.exports = { updateSalesRecord, fetchSales, fetchSalesByProfitLoss };
