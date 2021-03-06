const Product=require('../models/Product');
const slugify=require('slugify');
const User = require('../models/user');
const { aggregate } = require('../models/Product');



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
        .populate("category")
        .populate("subs")
        .sort([["createAt","desc"]])
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
        .populate("category")
        .populate("subs")
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

//without pagination
// exports.list=async(req,res)=>{
//     try{
//         const {sort,order,limit}=req.body;
//         const products=await Product.find({})
//         .populate('category')
//         .populate('subs')
//         .sort([[sort,order]])
//         .limit(limit)
//         .exec()
//         res.json(products);
        
//     }catch(err){
//         console.log(err);
//     }   
// }


//with pagination
exports.list=async(req,res)=>{
    try{
        //createdat,descending,pagenumber
        const {sort,order,page}=req.body;
        console.log('page=page====',req.body.page);
        const currentPage=page || 0;
        const perPage=3;

        const products=await Product.find({})
                        .skip((currentPage)*perPage)
                        .populate('category')
                        .populate('subs')
                        .sort([[sort,order]])
                        .limit(perPage)
                        .exec();
        // console.log('list-produsct',products);
        res.json(products);
    }
    catch(err){
        console.log('pagination controller err',err);
    }
}



// exports.productsCount=async(req,res)=>{
//     let total=await Product.find({}).estimatedDocumentCount().exec();
//     res.json(total);
// }

exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
};

exports.productStar=async(req,res)=>{
    const product=await Product.findById(req.params.productId).exec();
    const user=await User.findOne({email:req.user.email}).exec();
    const {star}=req.body;
   //console.log('req-body-star',star);

    //who is updating
    //check if currently logged in user have already added rating to this product?
    let existingRatingObject=product.ratings.find((ele)=>ele.postedBy.toString()===user._id.toString());

    //if user haven't left rating yet,push it
    if(existingRatingObject===undefined){
           let ratingAdded= await Product.findByIdAndUpdate(product._id,{
                $push:{ratings:{star,postedBy:user._id}}
            },{new:true}
        ).exec();
        //console.log('ratingAdded',ratingAdded,'product',product.ratings);
        res.json(ratingAdded);
    }else{
        //if user has already left a rating, update it
        const ratingUpdated=await Product.updateOne(
            {ratings:{$elemMatch:existingRatingObject}},
            {$set:{"ratings.$.star":star}},
            {new:true}
        ).exec();
        //console.log('ratingUpdated',ratingUpdated,'product',product.ratings);
        res.json(ratingUpdated);
    }
}

const handleQuery=async(req,res,query)=>{
    const products=await Product.find({$text:{$search:query}})
        .populate('category',"_id name")
        .populate('subs',"_id name")
        .populate('postedBy',"_id name")
        .exec();
    res.json(products);
}

const handlePrice=async(req,res,price)=>{
    console.log(req.body,'price-req.body');
    try{
        let products=await Product.find({
            price:{
                $gte:price[0],
                $lte:price[1]
            }
        })
        .populate('category','_id name')
        .populate('subs','_id name')
        .populate('postedBy','_id name')
        .exec();

        res.json(products);
    }catch(err){
        console.log('handle-price',err);
    }
}

const handleCategory=async(req,res,category)=>{
    const products=await Product.find({
        category
    })
    .populate('category','_id name')
    .populate('subs','_id name')
    .populate('postedBy','_id name')
    .exec();

    res.json(products);
}

const handleStar=(req,res,stars)=>{
    Product.aggregate([
        {
            $project:{
                document:'$$ROOT',
                floorAverage:{
                    $floor:{$avg:'$ratings.star'}
                }
            }
        },
        {$match:{floorAverage:stars}}
    ])
    .limit(100)
    .exec((err,aggregates)=>{
        if(err){
            console.log('AGGREGATE ERROR',err);
        }
        Product.find({_id:aggregates})
        .populate('category','_id name')
        .populate('subs','_id name')
        .populate('postedBy','_id name')
        .exec((error,products)=>{
            if(error){
                console.log("Product Aggregate error",err)
                
            }
            res.json(products);
        })
    });
}

const handleSub=async(req,res,sub)=>{
    const products=await Product.find({subs:sub})
      .populate("category","_id name")
      .populate("subs","_id name")
      .populate("postedBy","_id name")
      .exec();
      console.log('---subs--',products);
      res.json(products);
      //console.log("------------------------");
  }

  const handleShipping=async(req,res,shipping)=>{
      const products=await Product.find({shipping})
      .populate("category","_id name")
      .populate("subs","_id name")
      .populate("postedBy","_id name")
      .exec();

      res.json(products);
  }

exports.searchFilters=async(req,res)=>{
    const {query,price,category,stars,sub,shipping}=req.body;

    if(query){
        console.log('query==search==>',query);
        await handleQuery(req,res,query);
    }

    if(price !== undefined){
        console.log('price===>',price);
        await handlePrice(req,res,price);
    }

    if(category){
        console.log('category====>',category);
        await handleCategory(req,res,category);
    }

    if(stars){
        console.log('stars====>',stars);
        handleStar(req,res,stars);
    }

    if(sub){
        console.log('sub----->',sub);
        await handleSub(req,res,sub);
    }
    if(shipping){
        console.log('shipping---->',shipping);
        await handleShipping(req,res,shipping);
    }
}




