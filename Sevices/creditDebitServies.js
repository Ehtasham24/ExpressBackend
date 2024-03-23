const { pool } = require("../../Db");

const fetchAllCredits = async () => {
  try {
    const result = await pool.query(`SELECT * FROM public."credit"`);
    return result;
  } catch (err) {
    console.log("services error", err);
  }
};

const fetchCreditByName = async (name) => {
  try {
    const result = await pool.query(
      `SELECT * FROM public."credit" WHERE name ILIKE $1`,
      [name]
    );
    return result;
  } catch (err) {
    console.log("services error", err);
  }
};
const insertCredit = async (name, amountdue, amountrecieved, credit) => {
  try {
    const result = await pool.query(
      `INSERT INTO public.credit(
    name, amount_due, amount_received, amount_pending, total_amount_id)
  VALUES ($1, $2, $3, $4, $5,)
`,
      [name, amountdue, amountrecieved, credit]
    );
    return result;
  } catch (err) {
    console.log("services error", err);
  }
};

const updateCreditByName = async (
  name,
  amountdue,
  amountrecieved,
  total_amount
) => {
  try {
    const result = await pool.query(
      `
  UPDATE public.credit
  SET amount_due = $2, amount_received = $3, amount_pending = $4, total_amount_id = $5
  WHERE name ILIKE $1
  RETURNING id, amount_due,amount_recieved, total_amount
`,
      [`%${name}%`, amountdue, amountrecieved, total_amount]
    );
    return result;
  } catch (err) {
    console.log("services error", err);
  }
};

module.exports = {
  fetchAllCredits,
  fetchCreditByName,
  insertCredit,
  updateCreditByName,
};
