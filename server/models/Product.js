const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxlenght:32,
        text:true
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true
    },
    description:{
        type:String,
        required:true,
        maxlength:2000,
        text:true
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        maxlenght:32
    },
    category:{
        type:ObjectId,
        ref:'Category'
    },
    subs:[
        {
            type:ObjectId,
            ref:'Sub'
        }
    ],
    quantity:Number,
    // sold:{
    //     type:Number,
    //     default:0
    // },
    images:{
        type:Array
    },
    shipping:{
        type:String,
        enum:['Yes','No']
    },
    color:{
        type:String,
        maxlenght:32,
        trim:true,
        text:true
    },
    brand:{
        type:String,
        maxlenght:32,
        trim:true,
        text:true
    },
    // ratings:[
    //     {
    //         star:Number,
    //         postedBy:{
    //             type:ObjectId,
    //             ref:"User"
    //         }
    //     }
    // ]

},
{timestamps:true}
);

module.exports=mongoose.model("Product",productSchema);