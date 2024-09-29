const express = require("express");
const routes = express.Router();
const {
  PostSales,
  getSales,
  getSalesByProfitLoss,
} = require("../../Controller/salesController");

routes.post("/sales", PostSales);
routes.post("/api/Sales", getSales);
routes.post("/api/Sales/filter", getSalesByProfitLoss);

module.exports = routes;
