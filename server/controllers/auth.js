const User=require('../models/user');

exports.createOrUpdateUser=async(req,res)=>{
    //console.log(req.user);
    
    const {email,name}=req.user;

    const user=await User.findOneAndUpdate({email},{name},{new:true});

    if(user){
        //console.log('userUpdated',user);
        res.json(user)
    }else{
        const newUser=await new User({email,name}).save();
        //console.log('new user created',newUser);
        res.json(newUser);
    }
}


exports.currentUser=async(req,res)=>{
    User.findOne({email:req.user.email}).exec((err,user)=>{
        if(err){
            throw new Error(err);
        }
        res.json(user);
    })
}


