const express = require("express");
require("dotenv").config();
const path = require("path");
const routesProducts = require("./Routes/API/productsRoutes");
const routesCategories = require("./Routes/API/categoriesRoutes");
const routesSales = require("./Routes/API/salesRoutes");
const routesPayment = require("./Routes/API/ThirdParty/PayFast/payFastRoutes");
const cors = require("cors");

const server = express();
const Port = 4000;

const Server = async () => {
  const corsOptions = {
    origin: "http://localhost:3000", // Update this for production as needed
  };

  server.use(cors(corsOptions));

  // Middleware to parse URL-encoded bodies
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());

  // Use routes
  server.use(routesPayment);
  server.use(routesProducts);
  server.use(routesCategories);
  server.use(routesSales);

  // Serve static files from the React app
  server.use(
    express.static(path.join(__dirname, "../clientSide/client-side/build"))
  );

  // The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
  server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });

  console.log(process.env.USER);
  console.log(process.env.HOST);
  console.log(process.env.DATABASE);
  console.log(process.env.PASSWORD);

  try {
    server.listen(Port, () => console.log(`Server started at Port ${Port}`));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

Server();
