const {
  getItemsById,
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
    const result = await getItemsById();
    res.send(result.rows);
  } catch (err) {
    res.status(500).send({ message: "Controller error" });
    console.log(err);
  }
};

const GetItemsById = async (req, res) => {
  const id = req.params.id;

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

// const { pool } = require('../Db');
// const { response } = require('../Routes/API/Routes');

// const PostItems=async(req,res)=>{
//   const{tableId}=req.params;
//   const{name}=req.body;
//   const{price}=req.body;

//   if(tableId == 1){
//     try{
//       const result=await pool.query('INSERT INTO "Home-appliances" (name,price) VALUES ($1, $2) RETURNING *', [name, price])
//       res.send({message: `item with name: ${name} & price ${price} inserted in Home appliances`});
//     }catch(err){
//       res.status(500).send({message:`Internal error`})
//       console.log(err);
//     }

//   }
//   else if(tableId == 2){
//     try{
//       const result=await pool.query('INSERT INTO "Kitchen-utensils" (name,price) VALUES ($1, $2) RETURNING *', [name, price])
//       res.send({message: `item with name: ${name} & price ${price} inserted in Kitchen-utensils`});
//     }catch(err){
//       res.status(500).send({message:`Internal error`})
//       console.log(err);
//     }

//   }
//   else if(tableId == 3){
//     try{
//       const result=await pool.query('INSERT INTO "Plastic-items" (name,price) VALUES ($1, $2) RETURNING *', [name, price])
//       res.send({message: `item with name: ${name} & price ${price} inserted in Plastic-items`});
//     }catch(err){
//       res.code(500).send({message:`Internal error`})
//       console.log(err);
//     }

//   }
//   else if(tableId == 4){
//     try{
//       const result=await pool.query('INSERT INTO "Kitchen-appliances" (name,price) VALUES ($1, $2) RETURNING *', [name, price])
//       res.send({message: `item with name: ${name} & price ${price} inserted in Kitchen-appliances`});
//     }catch(err){
//       res.status(500).send({message:`Internal error`})
//       console.log(err);
//     }
//   }
//   else
//     res.send({message:"tableId not defined"});

// }

// const UpdateItems=async(req,res)=>{
//   const tableId=req.params.tableId;
//   const id=req.params.id;
//   const{name}=req.body;
//   const{price}=req.body;

//   if(tableId == 1){
//     try{
//       const result=await pool.query('UPDATE "Home-appliances" SET name=$1, price=$2 WHERE id=$3 RETURNING*',[name,price,id])
//       if(result.rowCount===0){
//         res.send({message:`No item with id: ${id} found`});
//       }
//       else
//       res.send({message:`item with id: ${id} updated with name: ${name} & price: ${price} `});
//     }catch(err){
//       res.status(500).send({message:`Internal error`})
//       console.log(err);
//     }

//   }
//   else if(tableId == 2){
//     try{
//       const result=await pool.query('UPDATE "Kitchen-utensils"  SET name=$1, price=$2 WHERE id=$3 RETURNING*',[name,price,id])
//       if(result.rowCount===0){
//         res.send({message:`No item with id: ${id} found`});
//       }
//       else
//       res.send({message:`item with id: ${id} updated with name: ${name} & price: ${price} `});
//     }catch(err){
//       res.status(500).send({message:`Internal error`})
//       console.log(err);
//     }

//   }
//   else if(tableId == 3){
//     try{
//       const result=await pool.query('UPDATE "Plastic-items"  SET name=$1, price=$2 WHERE id=$3 RETURNING*',[name,price,id])
//       if(result.rowCount===0){
//         res.send({message:`No item with id: ${id} found`});
//       }
//       else
//       res.send({message:`item with id: ${id} updated with name: ${name} & price: ${price} `});
//     }catch(err){
//       res.status(500).send({message:`Internal error`})
//       console.log(err);
//     }

//   }
//   else if(tableId == 4){
//     try{
//       const result=await pool.query('UPDATE "Kitchen-appliances"  SET name=$1,  price=$2 WHERE id=$3 RETURNING*',[name,price,id])
//       if(result.rowCount===0){
//         res.send({message:`No item with id: ${id} found`});
//       }
//       else
//       res.send({message:`item with id: ${id} updated with name: ${name} & price: ${price} `});
//     }catch(err){
//       res.status(500).send({message:`Internal error`})
//       console.log(err);
//     }

//   }
//   else
//     res.send({message:"Category not defined"});

// }

// const DeleteItems=async(req,res)=>{
//   const tableId=req.params.tableId;
//   const id=req.params.id;

//   if(tableId == 1){
//     try{
//       const nameResult= await pool.query('Select name FROM "Home-appliances" WHERE id=$1',[id])
//       if(nameResult.rowCount===0){
//         res.status(404).send({message:`No items with id: ${id} found`});
//       }
//       else{
//         const name=nameResult.rows[0].name

//       const result=await pool.query('DELETE FROM "Home-appliances" WHERE id=$1', [id])
//       if(result.rowCount===0){
//         res.send({message:`No item with id: ${id} found`});
//       }
//       else
//       res.send({message:`item with id: ${id} & name: ${name} deleted`});
//     }
//   }catch(err){
//     res.status(500).send({message:`Internal error`})
//     console.log(err);
//   }

//   }
//   else if(tableId == 2){
//     try{
//       const nameResult= await pool.query('Select name FROM "Kitchen-utensils" WHERE id=$1',[id])
//       if(nameResult.rowCount===0){
//         res.status(404).send({message:`No items with id: ${id} found`});
//       }
//       else{
//         const name=nameResult.rows[0].name

//       const result=await pool.query('DELETE FROM "kitchen-utensils" WHERE id=$1', [id])
//       if(result.rowCount===0){
//         res.send({message:`No item with id: ${id} found`});
//       }
//       else
//       res.send({message:`item with id: ${id} & name: ${name} deleted`});
//     }
//     }catch(err){
//       res.status(500).send({message:`Internal error`})
//       console.log(err);
//     }
//   }
//   else if(tableId == 3){
//     try{
//       const nameResult= await pool.query('Select name FROM "Plastic-items" WHERE id=$1',[id])
//       if(nameResult.rowCount===0){
//         res.status(404).send({message:`No items with id: ${id} found`});
//       }
//       else{
//         const name=nameResult.rows[0].name

//       const result=await pool.query('DELETE FROM "Plastic-items" WHERE id=$1', [id])
//       if(result.rowCount===0){
//         res.send({message:`No item with id: ${id} found`});
//       }
//       else
//       res.send({message:`item with id: ${id} & name: ${name} deleted`});
//     }
//   }
//       catch(err){
//       res.status(500).send({message:`Internal error`})
//       console.log(err);
//     }

//   }
//   else if(tableId == 4){
//     try{
//       const nameResult= await pool.query('Select name FROM "Plastic-items" WHERE id=$1',[id])
//       if(nameResult.rowCount===0){
//         res.status(404).send({message:`No items with id: ${id} found`});
//       }
//       else{
//         const name=nameResult.rows[0].name

//       const result=await pool.query('DELETE FROM "Plastic-items" WHERE id=$1', [id])
//       if(result.rowCount===0){
//         res.send({message:`No item with id: ${id} found`});
//       }
//       else
//       res.send({message:`item with id: ${id} & name: ${name} deleted`});
//     }
//     }catch(err){
//       res.status(500).send({message:`Internal error`})
//       console.log(err);
//     }

//   }
//   else
//     response.send({message:"Category not defined"});

// }

// const GetItems=async(req,res)=>{
//   const{tableId}=req.params;

//   if(tableId==1){
//     try{
//       const result= await pool.query(`Select * From "Home-appliances"`);
//       res.send(result.rows);
//     }catch(err){
//       res.status(500).send({message:'internal error'})
//       console.log(err);
//     }

//   }
//   else if(tableId==2){
//     try{
//       const result= await pool.query(`Select * From "Kitchen-utensils"`);
//       res.send(result.rows);
//     }catch(err){
//       res.status(500).send({message:'internal error'})
//       console.log(err);
//     }

//   }
//   else if(tableId==3){
//     try{
//       const result= await pool.query(`Select * From "Plastic-items"`);
//       res.send(result.rows);
//     }catch(err){
//       res.status(500).send({message:'internal error'})
//       console.log(err);
//     }

//   }
//   else if(tableId==4){
//     try{
//       const result= await pool.query(`Select * From "Kitchen-appliances"`);
//       res.send(result.rows);
//     }catch(err){
//       res.status(500).send({message:'internal error'})
//       console.log(err);
//     }

//   }
//   else
//     res.send({message:"Category not defined"});
//   // console.log(res)

// }

// const GetItem=async(req,res)=>{
//   const tableId=req.params.tableId;
//   const id=req.params.id;
//   if(tableId == 1){
//     try{
//       const result= await pool.query(`Select * From "Home-appliances" WHERE id=$1`,[id]);
//       if(result.rows.length===0){
//         res.status(404).send({message:`Item with id ${id} not present`})
//       }
//       else
//       res.send(result.rows);
//     }catch(err){
//       res.status(500).send({message:'internal error'})
//       console.log(err);
//     }

//   }
//   else if(tableId == 2){
//     try{
//       const result= await pool.query(`Select * From "Kitchen-utensils" WHERE id=$1`,[id]);
//       res.send(result.rows);
//     }catch(err){
//       res.status(500).send({message:'internal error'})
//       console.log(err);
//     }

//   }
//   else if(tableId == 3){
//     try{
//       const result= await pool.query(`Select * From "Plastic-items" WHERE id=$1`,[id]);
//       res.send(result.rows);
//     }catch(err){
//       res.status(500).send({message:'internal error'})
//       console.log(err);
//     }

//   }
//   else if(tableId == 4){
//     try{
//       const result= await pool.query(`Select * From "Kitchen-appliances" WHERE id=$1`,[id]);
//       res.send(result.rows);
//     }catch(err){
//       res.status(500).send({message:'internal error'})
//       console.log(err);
//     }

//   }
//   else
//     res.send({message:"Category not defined"});
// }

// module.exports={GetItems,GetItem, PostItems, DeleteItems, UpdateItems};

// const UpdateItemsByName = async (req, res) => {
//     const tableId = req.params.tableId;
//     const { name, buying_price,selling_price, Quantity } = req.body;
//     console.log(tableId);
//     const tableName = tables[tableId];
//     console.log(tableName);
//     if (!tableName) {
//         return res.status(400).send({ message: 'Invalid tableId' });
//     }

//     const searchOperation = `
// `SELECT id, name, buying_price, "selling price", "Quantity"
// FROM public."${tableName}"
// WHERE name ILIKE $1`;

//     try {
//         const searchResult = await performDBOperation(tableName, searchOperation, [`%${name}%`]);

//         if (searchResult.rows.length === 0) {
//             return res.send({ message: `No item with name: ${name} found` });
//         }

//         const itemId = searchResult.rows[0].id;

//         // Update the found record
//         const updateOperation = `
// `UPDATE public."${tableName}"
// SET name = $1, buying_price = $2, "selling price" = $3, "Quantity" = $4
// WHERE id = $5`;

//         const updateResult = await performDBOperation(tableName, updateOperation, [name, buying_price,selling_price, Quantity, itemId]);

//         if (updateResult.rowCount === 0) {
//             res.send({ message: `No item with id: ${itemId} found` });
//         } else {
//             res.send({ message: `Item with id: ${itemId} updated with name: ${name} & price: ${price}` });
//         }
//     } catch (err) {
//         res.status(500).send({ message: err.message });
//     }
// };
