const {
  getItems,
  getItemById,
  getItemByName,
  postItems,
  updateItems,
  updateItemByName,
} = require("../Sevices/productsService");

const { GetItem } = require("./categoriesController");

const GetItems = async (req, res) => {
  const categories = await GetItem;
  try {
    const result = await getItems();
    res.send(result.rows);
  } catch (err) {
    res.status(500).send({ message: "Controller error" });
    console.log(err);
  }
};

const GetItemsById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getItemById(id);
    res.send(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ message: "Controller error" });
  }
};

const GetItemsByName = async (req, res) => {
  const { name } = req.body;

  try {
    const result = await getItemByName(name);
    res.send(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ message: "Controller error" });
  }
};

const PostItems = async (req, res) => {
  const { name, buying_price, Quantity, Category_id } = req.body;
  console.log(req.body);
  try {
    const result = await postItems(name, buying_price, Quantity, Category_id);

    res.send(result.rows);
  } catch (err) {
    res.status(500).send({ message: "Controller error" });
    console.log(err);
  }
};

const UpdateItems = async (req, res) => {
  const id = req.params.id;
  const { name, price, Quantity, Category_id } = req.body;
  try {
    const result = await updateItems(name, price, Quantity, Category_id, id);
    res.send({
      message: `Item with id: ${id} updated with name: ${name} & price: ${price} and Quantity: ${Quantity}`,
    });
  } catch (err) {
    res.status(500).send({ message: "Controller error" });
    console.log(err);
  }
};

const DeleteItems = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query(`DELETE FROM "Products" WHERE id=$1`, [id]);
    if (result.rowCount === 0) {
      res.send({ message: `No item with id: ${id} found` });
    } else {
      res.send({ message: `Item with id: ${id} deleted` });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal error" });
    console.log(err);
  }
};

const DeleteItemsByName = async (req, res) => {
  const { name } = req.body;

  try {
    const result = await pool.query(
      `DELETE FROM "Products" WHERE name ILIKE $1`,
      [name]
    );
    if (result.rowCount === 0) {
      res.send({ message: `No item with name: ${name} found` });
    } else {
      res.send({ message: `Item with name: ${name} deleted` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal error" });
  }
};

const UpdateItemsByName = async (req, res) => {
  const { name, buying_price, Quantity, Category_id } = req.body;
  try {
    const result = await updateItemByName(
      name,
      buying_price,
      Quantity,
      Category_id
    );
    res.send({ message: "updated successfully" });
  } catch (err) {
    console.error(err);

    res.status(500).send({ message: "controller error" });
  }
};

module.exports = {
  PostItems,
  UpdateItems,
  DeleteItems,
  GetItems,
  GetItemsByName,
  GetItemsById,
  UpdateItemsByName,
  DeleteItemsByName,
};
