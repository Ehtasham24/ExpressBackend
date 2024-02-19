const express=require('express');
const routes=express('Routes');
const mongoose=require('mongoose');
const{GetItems}=require('../../Controller/Items');
// mongoose.connect('mongodb+srv://admin:ehtasham24@cluster0.j7cztou.mongodb.net/?retryWrites=true&w=majority')
// const items=require('./TestingConnections/Model')

const getItems={
    schema:{
        response:{
            200:{
                type:'array',
                items:{
                    type:'object',
                    properties:{
                        categories:{type:'string'}
                    },
                    items:{
                    types:'array',
                    items:{
                    types:'objetct',
                    properties:{
                        id:{type:'integer'},
                        name:{type:'string'},
                        price:{type:'integer'},
                        }
                    }
                }
            }
        }
    }
},
handler:GetItems
}


routes.get('/items', (req, res)=>{res.send(items,getItems);})

module.exports=routes;