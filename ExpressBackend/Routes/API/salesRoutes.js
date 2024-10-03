const express = require("express");
const routes = express.Router();
const {
  PostSales,
  getSales,
  getSalesByProfitLoss,
  getRecentSale,
  getBilledHistory,
} = require("../../Controller/salesController");

routes.get("/api/getsales", getRecentSale);
routes.get("/api/BilledHistory", getBilledHistory);
routes.post("/sales", PostSales);
routes.post("/api/Sales", getSales);
routes.post("/api/Sales/filter", getSalesByProfitLoss);

module.exports = routes;
