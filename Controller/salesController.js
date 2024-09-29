const {
  updateSalesRecord,
  fetchSales,
  fetchSalesByProfitLoss,
} = require("../Sevices/salesService");

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

const getSales = async (req, res) => {
  const { startDate, endDate } = req.body;
  const response = await fetchSales(startDate, endDate);
  try {
    res.status(200).send(response);
  } catch (err) {
    response.send({ error: err });
  }
};

const getSalesByProfitLoss = async (req, res) => {
  const { startDate, endDate, type } = req.body;

  if (!type || (type !== "profit" && type !== "loss")) {
    return res
      .status(400)
      .send({ error: 'Invalid type. Use "profit" or "loss".' });
  }

  try {
    const response = await fetchSalesByProfitLoss(startDate, endDate, type);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  PostSales,
  getSales,
  getSalesByProfitLoss,
};
