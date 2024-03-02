const express = require('express');
const routes=require('./Routes/API/Routes');
const server=express();
const Port=6000;
   

const Server= async()=>{

try{
     await server.use(express.json());
     await server.use(routes);
     await server.listen(Port, ()=> console.log(`Server started at Port ${Port}`));

}catch (err){
  console.log(err)
  process.exit(1);

}

}

Server();
