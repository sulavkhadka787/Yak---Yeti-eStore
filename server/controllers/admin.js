const Order=require('../models/order');

//orders ,orderstatus

exports.orders=async(req,res)=>{
    console.log('orders',req.user);
    let allOrders=await Order
        .find({})
        .sort("-createdAt")
        .populate("products.product")
        .exec();

        res.json(allOrders);
}

exports.orderStatus=async(req,res)=>{
    
    const {orderId,orderStatus}=req.body;

    let updated=await Order.findByIdAndUpdate(
        orderId,
        {orderStatus},
        {new:true}
    ).exec();

    res.json(updated);

}
