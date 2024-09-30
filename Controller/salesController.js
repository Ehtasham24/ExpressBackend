const { updateSalesRecord } = require("../Sevices/salesService");

const PostSales = async (req, res) => {
  const { sellingPrice, quantity, productID } = req.body;
  const { messageSend, updatedQuantity } = await updateSalesRecord(
    sellingPrice,
    quantity,
    productID
  );

  try {
    res.status(200).json({
      status: 200,
      message: "Sales data received successfully",
      data: { messageSend, updatedQuantity },
    });
  } catch (err) {
    res.status(404).json({
      status: 404,
      message: err.message,
    });
  }
};

module.exports = {
  PostSales,
};
