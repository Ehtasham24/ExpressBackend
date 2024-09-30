const express = require("express");
const routes = express.Router();
const {
  FormSubmission,
} = require("../../../../Controller/ThirdParty/PayFast/payFastController");
const {
  handlingITN,
} = require("../../../../Sevices/ThirdParty/PayFast/payFastService");

const {
  paymentDetails,
} = require("../../../../Controller/ThirdParty/PayFast/onsitePayFastController");

//Online payment Routes
routes.post("/api/payfast", FormSubmission);
routes.post("/api/payfast/ITN", handlingITN);

//Onsite payment Routes
routes.post("/api/payfast/onsite", paymentDetails);

module.exports = routes;
