const express = require("express");
const routesProducts = require("./Routes/API/productsRoutes");
const routesCategories = require("./Routes/API/categoriesRoutes");
const routesSales = require("./Routes/API/salesRoutes");
const cors = require("cors");
const server = express();
const Port = 4000;

const Server = async () => {
  const corsOptions = {
    origin: "http://localhost:3000",
  };

  server.use(cors(corsOptions)); // Corrected from app.use to server.use

  try {
    server.use(express.json());
    server.use(routesProducts);
    server.use(routesCategories);
    server.use(routesSales);
    server.listen(Port, () => console.log(`Server started at Port ${Port}`));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

Server();
