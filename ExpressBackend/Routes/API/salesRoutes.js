const express = require("express");
const routes = express.Router();
const {
  PostSales,
  getSales,
  getSalesByProfitLoss,
  getRecentSale,
} = require("../../Controller/salesController");

routes.get("/api/getsales", getRecentSale);
routes.post("/sales", PostSales);
routes.post("/api/Sales", getSales);
routes.post("/api/Sales/filter", getSalesByProfitLoss);

module.exports = routes;
