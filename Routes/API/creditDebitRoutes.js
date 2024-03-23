const express = require("express");
const routes = express.Router();
const {
  getAllCredits,
  getCreditByname,
  updateCreditByname,
  deleteCreditByname,
  postCredit,
} = require("../../Controller/creditDebitController");

routes.get("./creditsDebit", getAllCredits);
routes.post("./creditDebit", getCreditByname);
routes.post("./creditsDebit", postCredit);
routes.put("./creditDebit", updateCreditByname);
routes.delete("./creditDebit", deleteCreditByname);

module.exports = routes;
