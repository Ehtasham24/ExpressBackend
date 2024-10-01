// Receipt.js
import React from "react";

const Receipt = ({ cart, subtotal }) => {
  return (
    <div className="receipt">
      <h2 className="text-lg font-medium text-gray-900">Receipt</h2>
      <div className="mt-4">
        <h3 className="text-base font-medium">Products Sold:</h3>
        <ul className="receipt-list">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.productname}</span>
              <span>
                {item.sellingQuantity} x PKR {item.sellingPrice}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-200 mt-4 pt-2">
        <div className="flex justify-between">
          <p className="font-medium">Subtotal:</p>
          <p>PKR {subtotal}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Thank you for your purchase!
        </p>
      </div>
    </div>
  );
};

export default Receipt;
