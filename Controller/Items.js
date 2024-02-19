const mongoose=require('mongoose');
const { db } = require('../TestingConnection/Model');




const GetItems= async(req,res)=>{
    // db.collection.find({},{categories:1, names:1, id:1 });
   try{ 
    const collection = client.db("POS").collection("items");
    const result = await collection.insertOne({
    "id": "your_id_here",
    "name": "your_name_here",   
  });
  res.status(200).json({ message: "Item inserted successfully" });
  } catch (error) {
    console.error("Error inserting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports=GetItems;