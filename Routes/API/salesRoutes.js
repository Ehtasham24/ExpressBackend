const express = require("express");
const routes = express.Router();
const { PostSales } = require("../../Controller/salesController");

routes.post("/sales", PostSales);

module.exports = routes;
