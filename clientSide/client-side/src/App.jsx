import React from "react";
import CategorieswithSidebar from "pages/CategorieswithSidebar";
import ProductList from "pages/ProductList";
import Cart from "pages/Cart";
import SalesDataComponent from "pages/Report/Report";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategorieswithSidebar />} />
        <Route path="/productlist/:prodNum" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Report" element={<SalesDataComponent />} />
      </Routes>
    </Router>
  );
}

export default App;