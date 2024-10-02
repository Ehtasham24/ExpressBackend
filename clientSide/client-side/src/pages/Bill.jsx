import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import { Helmet } from "react-helmet";
const Receipt = () => {
  const [salesData, setSalesData] = useState([]); // Initialize as an empty array for multiple sales
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchRecentSales = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/getsales");
      if (!response.ok) throw new Error("Failed to fetch sales data");
      const data = await response.json();
      console.log(data);

      // Access the sales data array
      const salesArray = data.data.data.salesData; // Correctly access the salesData array
      console.log(salesArray);
      console.log(salesArray[0]["product_id"]);

      // Check if there are sales data and set the latest sale
      if (salesArray.length > 0) {
        setSalesData(salesArray); // Set all sales data
        // Calculate total amount from salesArray
        const total = salesArray.reduce(
          (acc, sale) => acc + sale.selling_price * sale.quantity,
          0
        );
        setTotalAmount(total);
      } else {
        setSalesData([]); // Set to an empty array if no sales
        setTotalAmount(0);
      }
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
          margin-bottom: 5px;
        }
        h3 {
          margin: 0;
          font-size: 16px;
          text-align: center;
        }
        h4 {
          text-align: center;
          margin-top: 10px;
          font-size: 18px;
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
        .thank-you {
          text-align: center;
          margin-top: 20px;
          font-size: 14px;
        }
        .no-return {
          text-align: center;
          margin-top: 10px;
          font-size: 12px;
          font-weight: bold;
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
      <div id="thermal-print">
        <h2 style="font-weight: bold;">Pak Home and Kitchen Appliances</h2>
        <h2>Receipt</h2>

        <table>
          <thead>
            <tr>
              <th>Sale ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${
              salesData.length > 0
                ? salesData
                    .map(
                      (sale) => `
              <tr>
              <td>${sale.id}</td>
                <td>${sale.product_id}</td>
                <td>${sale.productname}</td>
                <td>${sale.selling_price}</td>
                <td>${sale.quantity}</td>
                <td>Rs.${(sale.selling_price * sale.quantity).toFixed(2)}</td>
              </tr>
              `
                    )
                    .join("") // Join all rows into a single string
                : `<tr><td colspan="5" class="text-center">No sale data available</td></tr>`
            }
          </tbody>
        </table>
        <h4>Total Amount: Rs.${totalAmount.toFixed(2)}</h4>
        <p class="thank-you">Thank you for your purchase!</p>
        <p class="no-return">No purchased item will be returned or exchanged.</p>
        <p class="no-return">خریدا ہوا مال واپسی یہ تبدیل نہیں ہوگا۔</p>
      </div>
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
    <>
      <Helmet>
        <title>POS system</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full bg-white-A700">
        <Header className="flex flex-row justify-between items-center w-full p-6 sm:p-5 bg-white-A700" />
        <div className="flex flex-col items-center justify-start w-full mt-[31px] gap-[51px] md:px-5 max-w-[1632px]">
          {/* Closing tag for the flex row */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-lg mx-auto mt-5">
            <h2 className="text-2xl font-bold text-center">Receipt</h2>
            <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white">
              <h3 className="text-xl font-semibold">Recent Sales</h3>
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-2 py-1">
                      Sale ID
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      Product ID
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      Product Name
                    </th>
                    <th className="border border-gray-300 px-2 py-1">Price</th>
                    <th className="border border-gray-300 px-2 py-1">
                      Quantity
                    </th>
                    <th className="border border-gray-300 px-2 py-1">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.length > 0 ? (
                    salesData.map((sale) => (
                      <tr key={sale.id}>
                        <td className="border border-gray-300 px-2 py-1">
                          {sale.id}
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {sale.product_id}
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {sale.productname}
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {sale.selling_price}
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {sale.quantity}
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {(sale.selling_price * sale.quantity).toFixed(2)}
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
                Total Amount: Rs.{totalAmount.toFixed(2)}
              </h4>
              <p className="text-center mt-2">Thank you for your purchase!</p>
            </div>
            <button
              onClick={printReceipt}
              className="mt-6 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Print Receipt
            </button>
          </div>{" "}
          {/* Closing tag for the receipt div */}
        </div>{" "}
        {/* Closing tag for the main flex container */}
      </div>{" "}
      {/* Closing tag for the outer div */}
    </>
  );
};

export default Receipt;

// import React, { useEffect, useState } from "react";
// import {
//   Br,
//   Cut,
//   Line,
//   Printer,
//   Text,
//   Row,
//   render,
// } from "react-thermal-printer"; // Import the required components

// const Receipt = () => {
//   const [salesData, setSalesData] = useState([]); // Initialize as an empty array for multiple sales
//   const [totalAmount, setTotalAmount] = useState(0);

//   const fetchRecentSales = async () => {
//     try {
//       const response = await fetch("http://localhost:4000/api/getsales");
//       if (!response.ok) throw new Error("Failed to fetch sales data");
//       const data = await response.json();
//       console.log(data);

//       // Access the sales data array
//       const salesArray = data.data.data.salesData; // Correctly access the salesData array
//       console.log(salesArray);

//       // Check if there are sales data and set the latest sale
//       if (salesArray.length > 0) {
//         setSalesData(salesArray); // Set all sales data
//         // Calculate total amount from salesArray
//         const total = salesArray.reduce(
//           (acc, sale) => acc + sale.selling_price * sale.quantity,
//           0
//         );
//         setTotalAmount(total);
//       } else {
//         setSalesData([]); // Set to an empty array if no sales
//         setTotalAmount(0);
//       }
//     } catch (error) {
//       console.error("Error fetching sales data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRecentSales();
//   }, []);

//   const printReceipt = () => {
//     const receipt = (
//       <Printer type="epson" width={42} characterSet="utf-8">
//         {" "}
//         {/* Set up the printer */}
//         <Text size={{ width: 2, height: 2 }}>Receipt</Text>
//         <Text align="center">Recent Sales</Text>
//         <Br />
//         <Line />
//         <Row left="Product ID" right="Product Name" />
//         <Row left="Price" right="Quantity" />
//         <Row left="Total" right="" />
//         <Line />
//         {salesData.length > 0 ? (
//           salesData.map((sale) => (
//             <Row
//               key={sale.id}
//               left={`${sale.id} ${sale.productname}`} // Use backticks for template literals
//               right={`$${sale.selling_price} x ${sale.quantity}`} // Same here
//             />
//           ))
//         ) : (
//           <Text>No sales data available</Text>
//         )}
//         <Line />
//         <Text bold={true}>Total Amount: ${totalAmount.toFixed(2)}</Text>
//         <Br />
//         <Text className="thank-you">Thank you for your purchase!</Text>
//         <Cut />
//       </Printer>
//     );

//     render(receipt); // Print the receipt
//   };

//   return (
//     <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold text-center">Receipt</h2>
//       <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white">
//         <h3 className="text-xl font-semibold">Recent Sales</h3>
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 px-2 py-1">Product ID</th>
//               <th className="border border-gray-300 px-2 py-1">Product Name</th>
//               <th className="border border-gray-300 px-2 py-1">Price</th>
//               <th className="border border-gray-300 px-2 py-1">Quantity</th>
//               <th className="border border-gray-300 px-2 py-1">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {salesData.length > 0 ? (
//               salesData.map((sale) => (
//                 <tr key={sale.id}>
//                   <td className="border border-gray-300 px-2 py-1">
//                     {sale.id}
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     {sale.productname}
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     ${sale.selling_price}
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     {sale.quantity}
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     ${(sale.selling_price * sale.quantity).toFixed(2)}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={5}
//                   className="border border-gray-300 text-center py-2"
//                 >
//                   No sales data available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         <h4 className="text-lg font-bold mt-4">
//           Total Amount: ${totalAmount.toFixed(2)}
//         </h4>
//         <p className="text-center mt-2">Thank you for your purchase!</p>
//       </div>
//       <button
//         onClick={printReceipt}
//         className="mt-6 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//       >
//         Print Receipt
//       </button>
//     </div>
//   );
// };

// export default Receipt;
