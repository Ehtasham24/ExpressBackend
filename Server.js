const express = require('express');
const routes=require('./Routes/API/Routes');
const server=express();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://User1:ehtasham24@cluster0.j7cztou.mongodb.net/POS?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

   
const Server= async()=>{

try{
    await server.register(routes);
     server.listen(PORT, ()=> console.log(`Server started`));

}catch (err){

}
}
