const express=require('express');

const router=express.Router();

router.get('/user',(req,res)=>{
    res.json({
        'user':'you have hit /user api'
    })
})

module.exports=router;