import SalesTable from "./SalesTable";

const GroupedSalesData = ({ groupedData }) => {
  return Object.keys(groupedData).map((categoryId) => {
    const sampleItem = groupedData[categoryId][0];
    return (
      <div key={categoryId} className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Category:{" "}
          <span className="text-blue-600">{sampleItem.category_name}</span>
        </h2>
        <SalesTable salesData={groupedData[categoryId]} />
      </div>
    );
  });
};

export default GroupedSalesData;
