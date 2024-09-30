const express = require("express");
const routes = express.Router();
const {
  GetCategories,
  GetProductsForCategories,
} = require("../../Controller/categoriesController");

routes.get("/categories", GetCategories);
routes.get("/categories/:id", GetProductsForCategories);

module.exports = routes;
