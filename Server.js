const express = require('express');
const routesProducts=require('./Routes/API/productsRoutes');
const routesCategories=require('./Routes/API/categoriesRoutes');
const server=express();
const Port=6000;
   

const Server= async()=>{

try{
     await server.use(express.json());
     await server.use(routesProducts);
     await server.use(routesCategories);
     await server.listen(Port, ()=> console.log(`Server started at Port ${Port}`));

}catch (err){
  console.log(err)
  process.exit(1);

}

}

Server();
