const express=require('express');

const router=express.Router();

router.get('/create-or-update-user',(req,res)=>{
    res.json({
        'data':'This is create and update user Api'
    })
})

module.exports=router;