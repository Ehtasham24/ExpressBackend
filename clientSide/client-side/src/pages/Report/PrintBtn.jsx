const PrintButton = ({ handlePrint }) => {
  return (
    <div className="mb-4">
      <button
        onClick={handlePrint}
        className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-500"
      >
        Print Sales Data
      </button>
    </div>
  );
};

export default PrintButton;
