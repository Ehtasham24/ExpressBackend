const { pool } = require("../Db");

const fetchAllRecords = async () => {
  try {
    const result = await pool.query(
      `SELECT * FROM public.transaction_party_info`
    );
  } catch (err) {
    console.log("services error", err);
  }
};

const fetchRecordByName = async (name, flg) => {
  try {
    let result;
    if (flg === 1) {
      result = await pool.query(
        `
      SELECT tpi.*, th.*
      FROM "transaction_party_info" AS tpi
      LEFT JOIN "transaction_history" AS th ON tpi.id = th.transaction_party_info_id
      WHERE tpi.name ILIKE $1
      ORDER BY tpi.id, th.date DESC;
    `,
        ["%" + name + "%"]
      );
      console.log(result.rowCount);
      if (result.rowCount === 0) {
        console.log(`No name was found with name ${name}`);
        throw new Error(`No "${name}" was found with in the record`);
      }
    } else {
      result = await pool.query(
        `SELECT id FROM "transaction_party_info" WHERE name ILIKE $1 `,
        ["%" + name + "%"]
      );

      console.log(result.rows);
    }
    return result;
  } catch (err) {
    console.log("services error", err);
    throw err;
  }
};

const insertNewRecord = async (
  name,
  address,
  email,
  contactNo,
  amountPaid,
  amountReceived,
  note
) => {
  try {
    // Insert new record into transaction_party_info table
    const resultParty = await pool.query(
      `INSERT INTO public.transaction_party_info(name, address, email, contact_no)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [name, address, email, contactNo]
    );

    // Calculate total amount, starting statement, and mode of transaction
    const startingStatement = 0;
    const totalAmount = startingStatement + (amountPaid - amountReceived);
    const modeOfTransaction = totalAmount > 0 ? "Credit" : "Debit";

    // Insert new record into transaction_history table
    const currentDate = new Date().toLocaleString();
    await pool.query(
      `INSERT INTO "transaction_history" (total_amount, amount_paid, amount_received, date, starting_statement, mode_of_transaction, note, transaction_party_info_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        totalAmount,
        amountPaid,
        amountReceived,
        currentDate,
        startingStatement,
        modeOfTransaction,
        note,
        resultParty.rows[0].id,
      ]
    );

    return { resultParty, message: "Successfully inserted" };
  } catch (err) {
    console.error("Error inserting new record:", err);
    throw err;
  }
};

const insertRecord = async (
  name,
  address,
  email,
  contactNo,
  amountPaid,
  amountReceived,
  note
) => {
  try {
    // Check if any record exists in the transaction_party_info table
    const rowCheckParty = await fetchAllRecords();

    let flag;
    if (rowCheckParty.rowCount === 0) {
      // Insert new record into both tables if no record exists
      await insertNewRecord(
        name,
        address,
        email,
        contactNo,
        amountPaid,
        amountReceived,
        note
      );
      flag = 0;
    } else {
      // Check if the name is present in the transaction_party_info table
      const nameCheckParty = await fetchRecordByName(name, 0);
      if (nameCheckParty.rowCount === 0) {
        // Insert new name into both tables if not present
        await insertNewRecord(
          name,
          address,
          email,
          contactNo,
          amountPaid,
          amountReceived,
          note
        );
        flag = 1;
      } else {
        // Get the ID of the existing name
        const { id } = nameCheckParty.rows[0];
        // Insert record into transaction_history table using the existing ID
        // Calculate total amount, starting statement, and mode of transaction
        const startingStatementQuery = await pool.query(
          `Select total_amount FROM "transaction_history" WHERE transaction_party_info_id= $1`,
          [id]
        );
        console.log(startingStatementQuery);
        const startingStatement = parseInt(
          startingStatementQuery.rows[0].total_amount,
          10
        );
        if (isNaN(startingStatement)) {
          throw new Error("Starting statement is not a valid number.");
        }
        console.log(startingStatement);
        const totalAmount = startingStatement + (amountPaid - amountReceived);
        const modeOfTransaction = totalAmount > 0 ? "Credit" : "Debit";

        // Insert new record into transaction_history table
        const currentDate = new Date().toLocaleString();
        await pool.query(
          `INSERT INTO "transaction_history" (total_amount, amount_paid, amount_received, date, starting_statement, mode_of_transaction, note, transaction_party_info_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            totalAmount,
            amountPaid,
            amountReceived,
            currentDate,
            0,
            modeOfTransaction,
            note,
            id,
          ]
        );

        flag = 2;
      }
    }

    // Return the flag indicating the operation performed
    return { message: "Successfully inserted", flag };
  } catch (err) {
    console.error("Error inserting record:", err);
    throw err;
  }
};

// const updateCreditByName = async (
//   name,
//   amountdue,
//   amountrecieved,
//   total_amount
// ) => {
//   try {
//     const result = await pool.query(
//       `
//   UPDATE public.credit
//   SET amount_due = $2, amount_received = $3, amount_pending = $4, total_amount_id = $5
//   WHERE name ILIKE $1
//   RETURNING id, amount_due,amount_recieved, total_amount
// `,
//       [`%${name}%`, amountdue, amountrecieved, total_amount]
//     );
//     return result;
//   } catch (err) {
//     console.log("services error", err);
//   }
// };

// const deleteCreditByName = async (name) => {
//   try {
//     const result = await pool.query(
//       `
//             DELETE FROM public.credit
//             WHERE name ILIKE $1
//         `,
//       [`%${name}%`]
//     );
//     return result;
//   } catch (err) {
//     console, log(`service error, ${err}`);
//   }
// };
// const fetchDebitByName = async (name) => {
//   try {
//     const result = await pool.query(
//       `SELECT * FROM public."debit" WHERE name ILIKE $1`,
//       [name]
//     );
//     return result;
//   } catch (err) {
//     console.log("services error", err);
//   }
// };

// const insertDebit = async (name, amount_due, amount_received) => {
//   try {
//     const result = await pool.query(
//       `INSERT INTO public.debit(
//     name, amount_due, amount_received, amount_pending, total_amount_id)
//   VALUES ($1, $2, $3, $4, $5)
// `,
//       [name, amount_due, amount_received, amount_due - amount_received, null]
//     );
//     return result;
//   } catch (err) {
//     console.log("services error", err);
//   }
// };

// const updateDebitByName = async (
//   name,
//   amount_due,
//   amount_received,
//   total_amount
// ) => {
//   try {
//     const result = await pool.query(
//       `
//   UPDATE public.debit
//   SET amount_due = $2, amount_received = $3, amount_pending = $4, total_amount_id = $5
//   WHERE name ILIKE $1
//   RETURNING id, amount_due, amount_received, total_amount
// `,
//       [`%${name}%`, amount_due, amount_received, total_amount]
//     );
//     return result;
//   } catch (err) {
//     console.log("services error", err);
//   }
// };

// const deleteDebitByName = async (name) => {
//   try {
//     const result = await pool.query(
//       `
//             DELETE FROM public.debit
//             WHERE name ILIKE $1
//         `,
//       [`%${name}%`]
//     );
//     return result;
//   } catch (err) {
//     console.log(`service error, ${err}`);
//   }
// };

module.exports = {
  fetchAllRecords,
  fetchRecordByName,
  insertRecord,
  // updateCreditByName,
  // deleteCreditByName,
  // fetchDebitByName,
  // insertDebit,
  // updateDebitByName,
  // deleteDebitByName,
};
