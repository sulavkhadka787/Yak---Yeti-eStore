const User=require('../models/user');
const Product=require('../models/Product');
const Cart=require('../models/cart');

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
        let {price}=await Product.findById(cart[i]._id).select("price").exec();
        object.price=price;
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