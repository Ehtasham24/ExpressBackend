const express = require("express");
require("dotenv").config();
const routesProducts = require("./Routes/API/productsRoutes");
const routesCategories = require("./Routes/API/categoriesRoutes");
const routesSales = require("./Routes/API/salesRoutes");
const routesPayment = require("./Routes/API/ThirdParty/PayFast/payFastRoutes");
// const generateSignature = require("./Sevices/ThirdParty/PayFast/generateSignatureService");
const cors = require("cors");
// const getRawBody = require("raw-body");

const server = express();
const Port = 4000;

const Server = async () => {
  const corsOptions = {
    origin: "http://localhost:3000",
  };

  server.use(cors(corsOptions));

  // Middleware to capture raw body for specific routes
  // server.use("/api/payfast/ITN", async (req, res, next) => {
  //   try {
  //     req.rawBody = await getRawBody(req);
  //     next();
  //   } catch (err) {
  //     next(err);
  //   }
  // });

  // Middleware to parse URL-encoded bodies
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  // console.log(process.env.USER);
  // console.log(process.env.PASSWORD);
  // Middleware to parse JSON bodies
  // server.use("/api/payfast/onsite", (req, res, next) => {
  //   console.log("Received payload:", req.body);
  //   next();
  // });
  // server.use((req, res, next) => {
  //   console.log("Request Headers:", req.headers);
  //   console.log("Request Body:", req.body);
  //   next();
  // });

  // server.post("/api/payfast/onsite", (req, res) => {
  //   try {
  //     // Handle the request as needed
  //     res.send("Payload received");
  //   } catch (error) {
  //     res.status(500).send("Error processing the request");
  //   }
  // });

  server.use(routesPayment);
  server.use(routesProducts);
  server.use(routesCategories);
  server.use(routesSales);

  try {
    server.listen(Port, () => console.log(`Server started at Port ${Port}`));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

Server();
