const express=require('express');
const router=express.Router();

//middlwares
const {authCheck,adminCheck}=require('../middlewares/auth');

//controller
const {create,listAll,remove,read,update,list,productsCount,productStar,searchFilters}=require('../controllers/product');

//routes
router.get('/products/total',productsCount);
router.get('/product/:slug',read);
router.post('/product',authCheck,adminCheck,create);
router.get('/products/:count',listAll);
router.delete('/product/:slug',authCheck,adminCheck,remove);

router.put('/product/:slug',authCheck,adminCheck,update);

router.post('/products',list);

//rating
router.put("/product/star/:productId", authCheck,productStar);

//search
router.post('/search/filters',searchFilters);




module.exports=router;