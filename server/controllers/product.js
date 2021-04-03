const Product=require('../models/Product');
const slugify=require('slugify');

exports.create=async(req,res)=>{
    try{
        console.log('product-request-body',req.body);

        //adding slug to the req body
        req.body.slug=slugify(req.body.title);
        const newProduct=await new Product(req.body).save();
        res.json(newProduct);
    }catch(err){
        console.log('Product-create',err);
       // res.status(400).send("Product Creation failed");
        res.status(400).json({
            err:err.message
        })
    }
}

exports.read=async(req,res)=>{
    let products=await Product.find({});
    res.json(products);
}