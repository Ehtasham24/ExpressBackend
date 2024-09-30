const SalesTable = ({ salesData }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-3 px-4 border-b text-left text-gray-700">
            Product Name
          </th>
          <th className="py-3 px-4 border-b text-left text-gray-700">
            Buying Price
          </th>
          <th className="py-3 px-4 border-b text-left text-gray-700">
            Total Quantity Sold
          </th>
          <th className="py-3 px-4 border-b text-left text-gray-700">
            Avg Selling Price
          </th>
          <th className="py-3 px-4 border-b text-left text-gray-700">
            Profit/Loss Per Unit
          </th>
          <th className="py-3 px-4 border-b text-left text-gray-700">
            Overall Profit/Loss
          </th>
        </tr>
      </thead>
      <tbody>
        {salesData.map((item, index) => (
          <tr key={index} className="text-center border-b hover:bg-gray-100">
            <td className="py-2 px-4">{item.productname}</td>
            <td className="py-2 px-4">{item.buyingprice}</td>
            <td className="py-2 px-4">{item.total_quantity_sold}</td>
            <td className="py-2 px-4">{item.avg_selling_price}</td>
            <td className="py-2 px-4">
              <span>{item.profit_loss}</span>
            </td>
            <td className="py-2 px-4">
              <span
                className={
                  item.overall_profit_loss >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {item.overall_profit_loss}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SalesTable;
