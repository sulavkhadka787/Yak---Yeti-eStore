const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const cartSchema=mongoose.Schema({
    products:[
        {
            product:{
                type:ObjectId,
                ref:'Product'
            },
            count:Number,
            price:Number
        }
    ],
    cartTotal:Number,
    orderedBy:{
        type:ObjectId,
        ref:'User'
    }
},
    {timestamps:true}
)

module.exports=mongoose.model('Cart',cartSchema);

