const {
  fetchAllRecords,
  fetchRecordByName,
  insertRecord,
  updateCreditByName,
  deleteCreditByName,
} = require("../Sevices/creditDebitServies");

const getAllRecords = async (req, res) => {
  try {
    const result = await fetchAllRecords();
    res.send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getRecordByName = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await fetchRecordByName(name);
    res.send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const postRecord = async (req, res) => {
  const { name, address, email, contactNo, amountPaid, amountRecieved, note } =
    req.body;
  try {
    const result = await insertRecord(
      name,
      address,
      email,
      contactNo,
      amountPaid,
      amountRecieved,
      note
    );
    res.send(`Successfully inserted`);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const updateCreditByname = async (req, res) => {
  const { name, amountdue, amountrecieved, total_amount } = req.body;
  try {
    const result = await updateCreditByName(
      name,
      amountdue,
      amountrecieved,
      total_amount
    );
    res.send(`entry updated ${result.row}`);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const deleteCreditByname = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await deleteCreditByName(name);
    res.send(`Item with name${name} deleted ${result.rows}`);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getDebitByname = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await fetchDebitByName(name);
    res.send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const postDebit = async (req, res) => {
  const { name, amount_due, amount_received } = req.body;
  try {
    const result = await insertDebit(name, amount_due, amount_received);
    res.send(`New entry inserted: ${result.row}`);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const updateDebitByname = async (req, res) => {
  const { name, amount_due, amount_received, total_amount } = req.body;
  try {
    const result = await updateDebitByName(
      name,
      amount_due,
      amount_received,
      total_amount
    );
    res.send(`Entry updated: ${result.row}`);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const deleteDebitByname = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await deleteDebitByName(name);
    res.send(`Item with name ${name} deleted: ${result.rows}`);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = {
  getAllRecords,
  getRecordByName,
  postRecord,
  updateCreditByname,
  deleteCreditByname,
  getDebitByname,
  postDebit,
  updateDebitByname,
  deleteDebitByname,
};
