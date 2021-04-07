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

exports.listAll=async(req,res)=>{
    let products=await Product.find({})
        .limit(parseInt(req.params.count))
        .populate('category')
        .populate('subs')
        .sort([['createdAt',"desc"]])
        .exec();
    res.json(products);
}

exports.remove=async(req,res)=>{
    try{
        const deleted=await Product.findOneAndRemove({slug:req.params.slug}).exec();
        console.log('product-delete-controller',deleted);
        res.json(deleted);
    }
    catch(err){
        console.log('Product-delete-err',err);
       return res.status(400).send('Product Delete Failed');
    }
}

exports.read=async(req,res)=>{
    const product=await Product.findOne({slug:req.params.slug})
                            .populate('category')
                            .populate('subs')
                            .exec();
    res.json(product);
}

exports.update=async(req,res)=>{
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title);
        }
        const updated=await Product.findOneAndUpdate(
            {slug:req.params.slug},
            req.body,
            {new:true}
        ).exec();
        res.send(updated);
    }catch(err){
        console.log("PRODUCT UPDATE ERROR---->",err);
        return res.status(400).send({
            err:err.message
        });
    }
}