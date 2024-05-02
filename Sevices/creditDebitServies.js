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
      `SELECT id FROM "transaction_party_info" WHERE name ILIKE $1 `,
      ["%" + name + "%"]
    );
    return result;
  } catch (err) {
    console.log("services error", err);
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
      const nameCheckParty = await fetchRecordByName(name);
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

// const insertQuery = async (name, address, email, contactNo) => {
//   const insertResultParty = await pool.query(
//     `INSERT INTO public.transaction_party_info(
//     name, address, email, contact_no)
//     VALUES ($1, $2, $3, $4)
//     RETURNING id`,
//     [name, address, email, contactNo]
//   );
//   console.log(name, address, email, contactNo);
//   console.log(insertResultParty.id);
//   return insertResultParty;
// };

// const insertQueryForTransaction = async (flag, name) => {
//   if (flag == 0 || flag == 1) {
//     const resultSearch = await pool.query(
//       `SELECT * FROM "transaction_history" WHERE id=$1 ORDER BY id DESC LIMIT 1`,
//       [insertQuery.rows.id]
//     );
//   } else {
//     const searchingIdForParty = await fetchRecordByName(name);
//   }

// };

// const insertRecord = async (
//   name,
//   address,
//   email,
//   contactNo,
//   amountPaid,
//   amountReceived,
//   note
// ) => {
//   try {
//     const rowCheckParty = await fetchAllRecords();
//     const nameCheckParty = await fetchRecordByName(name);
//     let flag = 0;

//     if (rowCheckParty.rowCount === 0) {
//       const insertQueryResult = await insertQuery(
//         name,
//         address,
//         email,
//         contactNo
//       );
//       flag = 0;
//     } else if (nameCheckParty.rows.name !== name) {
//       const insertQueryResult = await insertQuery(
//         name,
//         address,
//         email,
//         contactNo
//       );
//       flag = 1;
//     } else {
//       flag = 2;
//       const resultSearch = await pool.query(
//         `SELECT * FROM "transaction_history" WHERE id=$1 ORDER BY id DESC LIMIT 1`,
//         [insertQuery.rows.id]
//       );

//       let totalAmount, startingStatement, modeOfTransaction;
//       const currentDate = new Date();
//       const date = currentDate.toLocaleString();
//       if (
//         resultSearch.transaction_party_info_id !== insertQuery.rows.id ||
//         resultSearch.transaction_party_info_id !== nameCheckParty(name).rows.id
//       ) {
//         totalAmount = amountPaid - amountReceived;
//         startingStatement = 0;
//       } else {
//         const latestTransaction = resultSearch.rows[0];
//         startingStatement = latestTransaction.total_amount;
//         totalAmount = startingStatement + (amountPaid - amountReceived);
//       }

//       modeOfTransaction = totalAmount > 0 ? "Credit" : "Debit";
//       const resultTransactionHistory = await pool.query(
//         `INSERT INTO "transaction_history" (total_amount, amount_paid, amount_received, date, starting_statement,
//       mode_of_transaction, note, transaction_party_info_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
//         [
//           totalAmount,
//           amountPaid,
//           amountReceived,
//           date,
//           startingStatement,
//           modeOfTransaction,
//           note,
//           resultParty.rows[0].id,
//         ]
//       );

//       console.log(resultParty, resultTransactionHistory);

//       return { resultParty, resultTransactionHistory };
//     }
//   } catch (err) {
//     console.log("services error", err);
//     throw new Error(err);
//   }
// };

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
