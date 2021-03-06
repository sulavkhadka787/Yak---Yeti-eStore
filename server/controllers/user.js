const User=require('../models/user');
const Product=require('../models/Product');
const Cart=require('../models/cart');
const Order=require('../models/order');

exports.userCart=async(req,res)=>{
    console.log('REQ-BODY-USER-CART',req.body);

    const {cart}=req.body;

    let products=[];

    const user=await User.findOne({email:req.user.email}).exec();

    //check if cart with logged in user id already exists
    let cartExistByThisUser=await Cart.findOne({orderedBy:user._id}).exec();

    if(cartExistByThisUser){
        cartExistByThisUser.remove();
        console.log('removed old cart');
    }

    for(let i=0;i<cart.length;i++){
        let object={};
        object.product=cart[i]._id;
        object.count=cart[i].count;

        //get price for creating total
        let productFromDb=await Product.findById(cart[i]._id).select("price").exec();
        object.price=productFromDb.price;
        products.push(object);

        console.log('CART-PROUDCTS',products);
    }

    let cartTotal=0;
    for(let i=0;i<products.length;i++){
        cartTotal=cartTotal+products[i].price*products[i].count;
    }

    console.log('CART-TOTAL',cartTotal);

    let newCart=await new Cart({
        products,
        cartTotal,
        orderedBy:user._id
    }).save();

    console.log('new cart',newCart);
    res.json({ok:true});

}

exports.getUserCart=async(req,res)=>{
    const user=await User.findOne({email:req.user.email}).exec();

    let cart=await Cart.findOne({orderedBy:user._id})
                .populate("products.product","_id title price")
                .exec();

    const {products,cartTotal}=cart;
    res.json({products,cartTotal});
}

exports.emptyCart=async(req,res)=>{
    const user=await User.findOne({email:req.user.email}).exec();

    const cart=await Cart.findOneAndRemove({orderedBy:user._id}).exec();
    res.json(cart);
}

exports.saveAddress=async(req,res)=>{
    const user=await User.findOneAndUpdate(
        {email:req.user.email},
        {address:req.body.address}
    ).exec();

    res.json({ok:true})
}

exports.createOrder=async(req,res)=>{
    const {paymentIntent}=req.body.stripeResponse;
    const user=await User.findOne({email:req.user.email}).exec();

    let {products}= await Cart.findOne({orderedBy:user._id}).exec();

    let newOrder=await new Order({
        products,
        paymentIntent,
        orderedBy:user._id
    }).save();

    let bulkOption=products.map((item)=>{
        return{
            updateOne:{
                filter:{_id:item.product._id},
                update:{$inc:{quantity:-item.count,sold:+item.count}}
            }
        }
    });

    let updated=await Product.bulkWrite(bulkOption,{});
    console.log('PRODUCT QUANTITY-- AND SOLD++',udpated);

    console.log('NEW ORDER SAVED',newOrder);
    res.json({ok:true})
}

exports.orders=async(req,res)=>{
    let user=await User.findOne({email:req.user.email}).exec();
    let userOrders=await Order.find({orderedBy:user._id}).populate(
        'products.product').exec();

    res.json(userOrders);
}