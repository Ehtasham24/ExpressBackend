import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div
      style={{
        height: "100vh",
        padding: "20px",
        backgroundColor: "#232323",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Homepage</h1>

      <ul style={{ listStyle: "none", padding: "0" }}>
        <li style={{ marginBottom: "10px" }}>
          <Link
            to="/categorieswithsidebar"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            CategorieswithSidebar
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link
            to="/productlist"
            style={{ color: "#87CEFA", textDecoration: "none" }}
          >
            ProductList
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/cart" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Cart
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
