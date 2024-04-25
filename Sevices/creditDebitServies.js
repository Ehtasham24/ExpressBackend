const { pool } = require("../Db");

const fetchAllRecords = async () => {
  try {
    const result = await pool.query(
      `SELECT * FROM public.transaction_party_info`
    );
    return result;
  } catch (err) {
    console.log("services error", err);
  }
};

const fetchRecordByName = async (name) => {
  try {
    const result = await pool.query(
      `SELECT * FROM "transaction_party_info" WHERE name ILIKE $1`,
      ["%" + name + "%"]
    );
    return result;
  } catch (err) {
    console.log("services error", err);
  }
};
const insertRecord = async (
  name,
  address,
  email,
  contactNo,
  amountPaid,
  amountRecieved,
  note
) => {
  try {
    const resultParty = await pool.query(
      `INSERT INTO "transaction_party_info"(
    name, address, email, contactNo)
  VALUES ($1, $2, $3, $4 )
`,
      [name, address, email, contactNo]
    );

    const resultSearch = await pool.query(
      `Select * FROM "trasaction_history ORDER BY id ASC"`
    );
    let totalAmount, startingStatement, date, modeOfTransaction;
    if (resultSearch.rowCount == 0) {
      totalAmount = 0;
      startingStatement = 0;
    } else {
      startingStatement = resultSearch.rowCount[0].total_amount;
      totalAmount = startingStatement + (amountPaid - amountRecieved);
      if (totalAmount > 0) {
        modeOfTransaction = `Credit`;
      } else modeOfTransaction = `Debit`;
    }
    const resultTransactionHistory = await pool.query(
      `INSERT INTO "transaction_history" (total_amount, amount_paid, amount_recieved, date, starting_statement, 
      mode_of_transaction, note, transaction_party_info) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        totalAmount,
        amountPaid,
        amountRecieved,
        date,
        startingStatement,
        modeOfTransaction,
        note,
        resultSearch.rows[0].id,
      ]
    );

    return { resultParty, resultTransactionHistory };
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

const deleteCreditByName = async (name) => {
  try {
    const result = await pool.query(
      `
            DELETE FROM public.credit
            WHERE name ILIKE $1
        `,
      [`%${name}%`]
    );
    return result;
  } catch (err) {
    console, log(`service error, ${err}`);
  }
};
const fetchDebitByName = async (name) => {
  try {
    const result = await pool.query(
      `SELECT * FROM public."debit" WHERE name ILIKE $1`,
      [name]
    );
    return result;
  } catch (err) {
    console.log("services error", err);
  }
};

const insertDebit = async (name, amount_due, amount_received) => {
  try {
    const result = await pool.query(
      `INSERT INTO public.debit(
    name, amount_due, amount_received, amount_pending, total_amount_id)
  VALUES ($1, $2, $3, $4, $5)
`,
      [name, amount_due, amount_received, amount_due - amount_received, null]
    );
    return result;
  } catch (err) {
    console.log("services error", err);
  }
};

const updateDebitByName = async (
  name,
  amount_due,
  amount_received,
  total_amount
) => {
  try {
    const result = await pool.query(
      `
  UPDATE public.debit
  SET amount_due = $2, amount_received = $3, amount_pending = $4, total_amount_id = $5
  WHERE name ILIKE $1
  RETURNING id, amount_due, amount_received, total_amount
`,
      [`%${name}%`, amount_due, amount_received, total_amount]
    );
    return result;
  } catch (err) {
    console.log("services error", err);
  }
};

const deleteDebitByName = async (name) => {
  try {
    const result = await pool.query(
      `
            DELETE FROM public.debit
            WHERE name ILIKE $1
        `,
      [`%${name}%`]
    );
    return result;
  } catch (err) {
    console.log(`service error, ${err}`);
  }
};

module.exports = {
  fetchAllRecords,
  fetchRecordByName,
  insertCredit,
  updateCreditByName,
  deleteCreditByName,
  fetchDebitByName,
  insertDebit,
  updateDebitByName,
  deleteDebitByName,
};
