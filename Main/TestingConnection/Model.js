const mongoose=require('mongoose')

const Configchema=new mongoose.Schema({
    name:String,

})

module.exports=mongoose.model('items',Configchema);