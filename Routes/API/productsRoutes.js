const express = require("express");
const routes = express.Router();
const {
  GetItems,
  GetItemsById,
  GetItemsByName,
  PostItems,
  UpdateItems,
  UpdateItemsByName,
  DeleteItems,
  DeleteItemsByName,
} = require("../../Controller/productsController");

routes.get("/products", GetItems);
routes.get("/product/:id", GetItemsById);
routes.post("/products", GetItemsByName);
routes.post("/product", PostItems);
routes.delete("/product/:id", DeleteItems);
routes.delete("/product", DeleteItemsByName);
routes.put("/products/:id", UpdateItems);
routes.put("/products", UpdateItemsByName);

// routes.get('/:tableId', GetItems);
// routes.post('/:tableId',GetItemsByName);
// routes.post('/:tableId', PostItems);
// routes.delete('/:tableId/:id', DeleteItems);
// routes.put('/:tableId/:id', UpdateItems);
// routes.put('/:tableId', UpdateItemsByName);

module.exports = routes;
