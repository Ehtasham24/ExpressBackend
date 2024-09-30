import React from "react";

const PrintableCart = React.forwardRef(({ cart, subtotal }, ref) => (
  <div ref={ref}>
    <h1>Shopping Cart Receipt</h1>
    <ul>
      {cart.map((item) => (
        <li key={item.id}>
          {item.productname}: PKR {item.sellingPrice} , quantity:{" "}
          {item.sellingQuantity}
        </li>
      ))}
    </ul>
    <h2>Subtotal: PKR {subtotal}</h2>
  </div>
));

export default PrintableCart;
