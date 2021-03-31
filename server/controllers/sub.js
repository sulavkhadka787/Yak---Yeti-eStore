const Sub=require('../models/sub');
const slugify=require('slugify');

exports.create=async(req,res)=>{
    try{
        const {name,parent}=req.body;
        res.json(await new Sub({name,parent,slug:slugify(name)}).save());
    }catch(err){
        console.log('Sub-create-failed',err);
        res.status(400).send('Create sub failed');
    }
    
}

exports.list=async(req,res)=>{
    res.json(await Sub.find({}).sort({createdAt:-1}).exec());
}

exports.read=async(req,res)=>{
    let sub=await Sub.findOne({slug:req.params.slug}).exec();
    res.json(sub);
}

exports.update=async(req,res)=>{
    const {name,parent} =req.body;
    try{
        const updatedSub=await Sub.findOneAndUpdate(
            {slug:req.params.slug},
            {name,parent,slug:slugify(name)},
            {new:true}
        );
        res.json(updatedSub);
    }catch(err){
        res.status(400).send('Sub update failed');
    }
    
}

exports.remove=async(req,res)=>{
    try{
        const deletedSub=await Sub.findOneAndDelete({slug:req.params.slug});
        res.json(deletedSub);
    }catch(err){
        res.status(400).send('Sub deletion failed');
    }
}