import React, { useEffect, useState } from "react";

const Receipt = () => {
  const [salesData, setSalesData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchRecentSales = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/getsales"); // Adjust the endpoint as needed
      if (!response.ok) throw new Error("Failed to fetch sales data");
      const data = await response.json();
      console.log(data);
      setSalesData(data.data.salesData || []);
      setTotalAmount(data.data.totalAmount || 0);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    fetchRecentSales();
  }, []);

  const printReceipt = () => {
    const receiptContent = `
    <html>
      <head>
        <title>Receipt</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            padding: 10px;
            width: 300px; /* Adjust for thermal printer width */
            margin: 0;
          }
          h2 {
            text-align: center;
            font-size: 20px;
            margin-bottom: 10px;
          }
          h3 {
            margin: 0;
            font-size: 16px;
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 5px;
            text-align: left;
            font-size: 14px;
          }
          th {
            background-color: #f4f4f4;
          }
          h4 {
            text-align: center;
            margin-top: 10px;
            font-size: 18px;
          }
          .thank-you {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
          }

          /* Custom styles for thermal printing */
          #thermal-print {
            width: 58mm; /* Width specific to thermal printer */
            font-size: 12px;
          }
          #thermal-print h2 {
            font-size: 18px;
          }
          #thermal-print table th, #thermal-print table td {
            font-size: 10px;
          }
        </style>
      </head>
      <body>
        <div id="thermal-print"> <!-- Unique ID for thermal print -->
          <h2>Receipt</h2>
          <h3>Recent Sales</h3>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${salesData
                .map(
                  (sale) => `
                  <tr>
                    <td>${sale.id}</td>
                    <td>${sale.productname}</td>
                    <td>$${sale.selling_price}</td>
                    <td>${sale.quantity}</td>
                    <td>$${(sale.selling_price * sale.quantity).toFixed(2)}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
          <h4>Total Amount: $${totalAmount.toFixed(2)}</h4>
          <p class="thank-you">Thank you for your purchase!</p>
        </div> <!-- End of thermal print section -->
      </body>
    </html>
  `;

    const receiptWindow = window.open("", "_blank", "width=400,height=600");
    if (receiptWindow) {
      receiptWindow.document.write(receiptContent);
      receiptWindow.document.close();
      receiptWindow.print();
      receiptWindow.close();
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-lg mx-auto">
      {" "}
      {/* Change max-w-sm to max-w-lg */}
      <h2 className="text-2xl font-bold text-center">Receipt</h2>
      <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white">
        <h3 className="text-xl font-semibold">Recent Sales</h3>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">Product ID</th>
              <th className="border border-gray-300 px-2 py-1">Product Name</th>
              <th className="border border-gray-300 px-2 py-1">Price</th>
              <th className="border border-gray-300 px-2 py-1">Quantity</th>
              <th className="border border-gray-300 px-2 py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(salesData) && salesData.length > 0 ? (
              salesData.map((sale) => (
                <tr key={sale.id}>
                  <td className="border border-gray-300 px-2 py-1">
                    {sale.id}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {sale.productname}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    ${sale.selling_price}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {sale.quantity}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    ${(sale.selling_price * sale.quantity).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="border border-gray-300 text-center py-2"
                >
                  No sales data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <h4 className="text-lg font-bold mt-4">
          Total Amount: ${totalAmount.toFixed(2)}
        </h4>
        <p className="text-center mt-2">Thank you for your purchase!</p>
      </div>
      <button
        onClick={printReceipt}
        className="mt-6 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Print Receipt
      </button>
    </div>
  );
};

export default Receipt;
