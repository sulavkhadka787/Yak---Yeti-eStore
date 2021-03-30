const Category=require('../models/Category');
const slugify=require('slugify');

exports.create=async(req,res)=>{
    try{
        const {name}=req.body;
        //const category=await new Category({name,slug:slugify(name)}).save();
        
        res.json(await new Category({name,slug:slugify(name)}).save());
    }catch(err){
        
        res.status(400).send("Create Category Failed");
    }
}

exports.list=async(req,res)=>
    res.json(await Category.find({}).sort({createdAt:-1}).exec());

exports.read=async(req,res)=>{
    const category=await Category.findOne({slug:req.params.slug}).exec();
    res.json(category);
}

exports.update=async(req,res)=>{
    const {name}=req.body;
    try{
        const updated=await Category.findOneAndUpdate(
            {slug:req.params.slug},
            {name,slug:slugify(name)},
            {new:true}
        )
        res.json(updated);
    }catch(err){
        res.status(400).send('Category Update failed=');
    }
}

exports.remove=async(req,res)=>{
    try{
        let deleted=await Category.findOneAndDelete({slug:req.params.slug});
        console.log('deleted-category-controller',deleted);
        res.json(deleted);
    }catch(err){
        res.status(400).send("Category Delete request failed=");
    }
}