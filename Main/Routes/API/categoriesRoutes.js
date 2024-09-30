const express=require('express');
const routes=express.Router();
const {getCategories}=require('../../Controller/categoriesController')

routes.get('/categories',getCategories);

module.exports=routes