const DateRangeSelector = ({
  startDate,
  endDate,
  filterType,
  onStartDateChange,
  onEndDateChange,
  onFilterChange,
  fetchSalesData,
}) => {
  return (
    <div className="mb-4">
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Start Date:
        </label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={onStartDateChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          End Date:
        </label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={onEndDateChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Filter by:
        </label>
        <select
          value={filterType}
          onChange={onFilterChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="all">All Products</option>
          <option value="profit">Profitable Products</option>
          <option value="loss">Loss-Making Products</option>
        </select>
      </div>
      <button
        onClick={() => fetchSalesData(filterType)}
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Fetch Sales Data
      </button>

      {/* Hidden print version */}
      <div className="hidden print:block mt-4">
        <p>
          <strong>Start Date:</strong> {startDate}
        </p>
        <p>
          <strong>End Date:</strong> {endDate}
        </p>
        <p>
          <strong>Filter by:</strong>{" "}
          {filterType === "all"
            ? "All Products"
            : filterType === "profit"
            ? "Profitable Products"
            : "Loss-Making Products"}
        </p>
      </div>
    </div>
  );
};

export default DateRangeSelector;
