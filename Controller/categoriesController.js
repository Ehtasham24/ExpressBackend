const {pool}= require('../Db');

const getCategories= async(req,res)=>{
    try{
        const result= await pool.query('SELECT * FROM public."Categories"')
        res.send(result.rows);
    }catch(err){
        console.log(err)
        res.send({message:'Internal error'});
    }
}
module.exports={getCategories};