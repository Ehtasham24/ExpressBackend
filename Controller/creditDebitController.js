const {
  fetchAllCredits,
  fetchCreditByName,
  insertCredit,
  updateCreditByName,
} = require("../Sevices/creditDebitServies");

const getAllCredits = async (req, res) => {
  try {
    const result = await fetchAllCredits();
    res.send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const getCreditByname = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await fetchCreditByName(name);
    res.send(result.rows);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const postCredit = async (req, res) => {
  const { name, amountdue, amountrecieved, credit } = req.body;
  try {
    const result = await insertCredit(name, amountdue, amountrecieved, credit);
    res.send(`new entry inserted ${result.row}`);
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

module.exports = {
  getAllCredits,
  getCreditByname,
  postCredit,
  updateCreditByname,
};
