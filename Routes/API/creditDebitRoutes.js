const express = require("express");
const routes = express.Router();
const {
  getAllRecords,
  getCreditByname,
  updateCreditByname,
  deleteCreditByname,
  postCredit,
  getDebitByname,
  postDebit,
  updateDebitByname,
  deleteDebitByname,
} = require("../../Controller/creditDebitController");

routes.get("./creditsDebits", getAllRecords);
routes.post("./credit", getCreditByname);
routes.post("./credit", postCredit);
routes.put("./credit", updateCreditByname);
routes.delete("./credit", deleteCreditByname);
routes.post("/debit/getByName", getDebitByname);
routes.post("/debit", postDebit);
routes.put("/debit", updateDebitByname);
routes.delete("/debit", deleteDebitByname);

module.exports = routes;
