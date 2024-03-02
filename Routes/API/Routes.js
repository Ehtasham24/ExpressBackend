const express=require('express');
const routes=express.Router();
const{GetItems,GetItemsByName,PostItems,UpdateItems,UpdateItemsByName,DeleteItems}=require('../../Controller/Items');

routes.get('/:tableId', GetItems);
routes.post('/:tableId',GetItemsByName);
routes.post('/:tableId', PostItems);
routes.delete('/:tableId/:id', DeleteItems);
routes.put('/:tableId/:id', UpdateItems);
routes.put('/tableId', UpdateItemsByName);

module.exports=routes;