import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import store from "./store/store";
import { Provider } from "react-redux";
import "./styles/font.css";
import SalesDataComponent from "pages/Report/Report";
// import PaymentForm from "./components/ThirdParty/payFast/onsitePaymentForm";
import Reciept from "./pages/Bill";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
  // <Reciept />
);
