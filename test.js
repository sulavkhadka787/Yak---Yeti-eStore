@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&family=Roboto:wght@300&display=swap');

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    
}

body{
    font-family: 'Montserrat',sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    height:100vh;
    margin:0;
    padding:0;
    
}
.wrap a{
    text-decoration: none;
    color:#de5246;
}
a:hover{
    color:green;
}

.wrap{
    width:100%;
    height:100vh;
    display:flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background:#fafafa;
}

.login-form{
    width:350px;
    margin:0 auto;
    border:1px solid #ddd;
    padding:2rem;
    background:#ffffff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.form-input{
    background:#fafafa;
    border:1px solid #eeeeee;
    padding:12px;
    width:100%;
    border-radius:5px;
   outline: none;
    
}

.form-group{
    margin-bottom:1rem;
}

.form-button{
    background:linear-gradient(260deg,#2376ae 0%, #16222A 100%); 
    border:1px solid #ddd;
    color:#ffffff;
    padding:10px;
    width:100%;
    text-transform:uppercase;
    border-radius: 5px;
    cursor: pointer;
}

.form-header{
    text-align: center;
    margin-bottom:2rem;
    letter-spacing:2px;
    text-transform: uppercase;
}

.form-footer{
    text-align:center;
}

.google-login{
    width:300px;
    margin:0 auto;    
}

.google-btn{
    width:100%;
    color:#ddd;
    background:#de5246;
    border-radius:5px;
    padding:10px;
    margin-top:5px;
    letter-spacing:1px;
    cursor: pointer;
}

.fa-google{
    font-size:15px;
}

/* ============nav========== */
.navbar{
    font-size: 18px;
    background: linear-gradient(#16222A,#2376ae);
    padding-bottom:10px;
}

.main-nav{
    list-style-type:none;
}

.nav-links,
.logo{
    text-decoration:none;
    color:rgba(255,255,255,0.7);
}

.main-nav li{
    text-align: center;
    margin:15px auto;
}

.logo{
    display: inline-block;
    font-size: 22px;
    margin-top: 10px;
    margin-left: 20px;
}

.navbar-toggle{
    position: absolute;
    top:10px;
    right:20px;
    cursor: pointer;
    color:rgba(255,255,255,0.8);
    font-size:24px;
    
}

.main-nav{
    display: none;
}

.active{
    display: block;
}

.search{
    border-radius:5px;
    outline:none;
    padding:5px;
    border:none;
    text-align: center;
    color:black;
}
.cart-img{
    display: inline-block;
    height:30px;
    width:35px;
    margin-left:20px;
    padding:2px;
    background-color: white;
    border-radius:10px;
}


.cart-img-li span{
    color:yellow;
    font-weight:900;
}

@media screen and (min-width:768px){

    html , body {
        width: 100% !important;
        overflow-x: hidden !important;
    } 
    
    .navbar{
        display: flex;
        justify-content: space-between;
        padding-bottom: 0;
        height:70px;
        align-items: center;
    }

    .main-nav{
        display: flex;
        margin-right: 30px;
        flex-direction: row;
        justify-content: flex-end;
    }

    .main-nav li{
        margin:0;
    }

    .nav-links{
        margin-left: 40px;
    }
    

    .logo{
        margin-top:0;
    }

    .logo-y{
        font-size:30px;
        color:#2376ae;
        font-weight:900;
    }
    .navbar-toggle{
        display: none;
    }

    .logo:hover,
    .nav-links:hover{
        color:rgba(255,255,255,1);
        font-weight: 900;
    }

    
}

/* ====loading-spinner */

.loading-spinner{
    display: flex;
    flex-direction: column;    
    align-items: center;
    justify-content: center;
    font-size:2rem;
    color:red;
    height:100vh;
    padding:10px 10px;
}

/* ===user history==== */

.user-history{
    max-width:90%;
    margin:auto 5px;
    display: flex;
    height:100vh;
    margin-top:10px;

}

.sidenav{
    flex:1;
    background: linear-gradient(260deg,#2376ae 0%, #16222A 100%);
}

.content{
    flex:5;
}

.user-history li{
    list-style-type: none;
    color:white;
    font-size: large;
    padding-top:10px;
    padding-bottom:5px;
    padding-left:20px;
    cursor: pointer;
}

.user-history li:hover{
    background:grey;
}

.admin-container{
    display: flex;
    height:auto;
    margin:10px 20px;
}

.admin-nav{
    height:auto;
    width:200px;
    background: linear-gradient(260deg,#2376ae 0%, #16222A 100%);
}

.admin-nav .logo{
    margin-bottom:10px;
    font-weight: 900;
}

.fa-shopping-cart{
    size:2px;
}

.fa-bars{
    margin-top:10px;
    margin-right: 10px;
    
}
.admin-sidenav{
    flex:1;
}

.main-content{
    flex:4;
    height:auto;
}

.admin-nav li{
    list-style-type: none;
    font-size: large;
    padding-top:10px;
    padding-bottom:5px;
    padding-left:20px;
    cursor: pointer;
}

.admin-nav li a{
    color:white;
    text-decoration: none;
}

.admin-nav li:hover{
    background:grey;
}


/* ====user password */
.password-wrap.wrap{
    margin-top:20px;
}



/* =======catgory create form=== */
.category-create-form{
    display:flex;
    flex-direction:column;
    margin:10px 10px;
}

.category-create-form label{
    display: block;
    margin-top:10px;
}

.category-create-form input{
    width:50%;
    padding:10px;
    border-radius:10px;
    outline: none;
    margin-top:10px;
    font-size:20px;
    letter-spacing: 2px;
}

.category-create-form .btn-cat{
    display: block;
    padding:10px;
    border-radius:10px;
    margin-top:20px;
    width:50%;
    background:linear-gradient(260deg,#2376ae 0%, #16222A 100%);
    color:white;
    cursor: pointer;
    outline: none;
    border: none;
}

.category-create-form .btn-cat:hover{
    background:linear-gradient(260deg,#16222A 0%, #2376ae 100%);
}

/* ====all categories==== */

.all-categories{
    padding-left:10px;
}
.all-categories-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width:50%;
    margin:10px;
    background:silver;
    padding:10px 10px;
    border-radius:5px;
}

.cat-delete-edit .cat-delete{
    padding:5px 10px;
    margin-right:20px;
    background: red;
    color:white;
    border-radius:5px;
    cursor: pointer;
    font-size:15px;
    outline: none;
}

.cat-delete-edit .cat-edit{
    text-decoration: none;
    color:white;
    background:black;
    padding:5px 20px;
    border-radius:5px;
    cursor: pointer;
    font-size:15px;
}

/* sub-category */
.cat-select{
    width:50%;
    padding:10px;
    border-radius:10px;
    outline: none;
    margin-top:10px;
    font-size:20px;
    letter-spacing: 2px;
}



/* SUB-CATEGORY CHECKBOXES */

.sub-cat{
    padding:10px 10px;
    border:1px solid black;
    width:50%;
    margin-top:10px;
    border-radius: 10px;
}
.checkbox-div {
    width:50%;
}

.checkbox-div input{
    padding:0;
    width:auto;
    margin-left:20px;
    margin-right:10px;
}
.checkbox-div  label{
    display: inline-block;
}

/* upload images */
.product-img-div-container{
    display: flex;
    flex-wrap: wrap;
}


.images-div{
    padding:5px 5px 10px;
    width:15%;
    border-radius:10px;
    font-weight: 600;
    background:linear-gradient(#00003b,#2376ae );
    color:white;
    margin:10px 0px;
    text-align: center;
}

.images-div label,input{
    cursor: pointer;
}
.product-img{
    height:100px;
    width:100px;
   border-radius: 40%;
    
}

.product-img-div{
    position: relative;
    margin:0 10px;
}

.img-cross{
    position: absolute;
    top:5px;
    left:5px;
    font-size:10px;
    background:red;
    padding:3px 6px;
    opacity:0.7;
    border-radius: 50%;
    cursor: pointer;
}

.img-cross:hover{
    opacity:1;
}


/* admin product card */
.main-content-product-list{
    display: flex;
    column-gap:20px;
    flex-wrap: wrap;
    row-gap:20px;
    
}
.product-card-container{
    border:1px dotted black;
    border-radius: 10px;
    width:30%;
    margin-left:0;
    background:linear-gradient(260deg,#2376ae 0%, #16222A 100%);
}

.product-card-details{
    display: flex;
    flex-direction: column;
    align-items: center;
    height:225px;
    color:white;
    padding:0 5px;
    
}

.product-card-details img{
    width:100%;
    max-width: 100%;
    height:190px;
    padding:10px 5px;
    margin-bottom:10px;
    object-fit: contain;
}

.product-edit-delete{
    display: flex;
    justify-content: space-between;
    padding:5px 30px;
    border-top:1px solid black;
    color:white;
}

.product-edit-delete a{
    text-decoration: none;
    color:white;
}
.product-edit{
    background:linear-gradient(white,blue);
    padding:5px 10px;
    border-radius:10px;
}

.product-delete{
    background: linear-gradient(white,maroon);
    padding:5px 5px;
    border-radius:10px;
   
}
.product-edit:hover , .product-delete:hover{
    cursor: pointer;
    color:whitesmoke;
    opacity:0.8;
}
.admin-dashboard-h2{
    display: block;
    text-align: center;
}




/* Home Page */

.banner{
    width:70%;
    margin:10px auto;
    position: relative;
}

.banner img{
    display: block;
    width: 50%;
    height:auto;
}

.banner-slogan{
    position: absolute;
    right:30px;
    top:70px;
    color:white;
    font-size:30px;
    left:700px;
    font-weight:900;
    z-index:10;
}

.banner-slogan-small{
    font-size: 20px;
    top:250px;
    font-weight:900;
}
.banner::before{
    content:'';
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:linear-gradient(#16222A,#2376ae);
    opacity:0.5;
}
.homepage-top{
    width:100%;
    text-align: center;
}
.homepage-top-container{
    width:70%;
    display: flex;
    justify-content:center;
    column-gap:20px;
    margin:10px auto;

}
.images-column-top{
    flex:30%;
    position: relative;
}

 

.images-column-top::before{
    content:'';
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:linear-gradient(#16222A,#2376ae);
    opacity:0.3;
}


.column-top-images{
    display: block;
    width:350px;    
    height:500px;
    margin:auto auto;
}

.view-cart{
    position:absolute;
    bottom:0;
    display: flex;
    width:100%;
    justify-content: space-between;
}
.fa-eye,.fa-shopping-cart{
    font-size:40px;
    color:#2376ae;
    margin:5px 20px;
    cursor: pointer;
    opacity:0.7;
}

.fa-eye:hover,.fa-shopping-cart:hover{
    opacity:1.0;
}
/* pagination */
.paginationBttns{
    width:95%;;
    height:40px;
    margin:20px;
    list-style: none;
    display: flex;
    justify-content: center;
    
}

.paginationBttns a{
    padding:10px;
    margin:8px;
    border-radius:5px;
    color:white;
    cursor: pointer;
    outline: none;
    background-color:#6CA6CD;	
}

.paginationBttns a:hover{
    color:white;
    background: linear-gradient(260deg,#2376ae 0%, #16222A 100%);
}

.paginationActive a{
    color:white;
    background: linear-gradient(260deg,#16222A 0%, #2376ae 100%);
}

/* ===single product page */

.small-container{
    max-width:1080px;
    margin:auto;
    padding-left: 25px;
    padding-right:25px;
}
.row{
    display: flex;
    align-items: center;
   flex-wrap: wrap;
   justify-content: center;
   position: relative;
}

.col-2{
    flex-basis:50%;
    min-width: 300px;
    padding-left:30px;
}

.col-2 img{
    max-width:100%;
    padding:50px 0;
}

.single-product .col-2 img{
    padding: 0;
}
.col-2 h1{
    font-size: 50px;
    line-height:60px;
    margin:25px 0;
}

.btn{
    display: inline-block;
    background:linear-gradient(260deg,#2376ae 0%, #16222A 100%);
    color:white;
    padding:8px 30px;
    margin:30px 0;
    border-radius:30px;
    text-decoration: none;
}

.btn:hover{
    background:linear-gradient(260deg,#16222A 0%, #2376ae 100%);
    color:#cccccc;
}

.col-2 select{
    border:1px solid #16222A;
    padding:5px;
}

.single-product{
    margin-top:80px;
}

.single-product .col-2 img{
    padding:0;
    width:100%;
}

/* .col-2::before{
    content:'cccc';
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:linear-gradient(#16222A,#2376ae);
    opacity: 0.5;
} */

.single-product h4{
    margin:20px 0;
    font-size: 22px;
    font-weight: bold;
}

.single-product select{
    display: block;
    padding:10px;
    margin-top:20px;
}

.single-product input{
    width:50px;
    height:40px;
    padding-left:10px;
    font-size: 20px;
    margin-right:10px;
    border:1px solid #16222A;
}

.single-product input:focus{
    outline:none;
}

.single-product .fa{
    color:#16222A;;
    margin-left:10px;
}

.small-img-row{
    display: flex;
    justify-content:space-between;
}

.small-img-col{
    flex-basis:32%;
    z-index:1000;
    cursor:pointer;
}

/* ===footer=== */
.footer{
    
    bottom:0;
    margin-top:5px;
    margin-left: 5px;
    margin-right: 5px;
    height:50px;
    background-color: black;
    text-align: center;
    color:white;
    width:99%;
    justify-content: center;
}


@media screen and (max-width:768px){

    
    
    .login-form{
        width:350px;
      }
  
      .user-history{
          
          margin:auto 5px;
          display: flex;
          flex-direction: column;
          height:100vh;
          margin-top:10px;
          max-width: 100%;
      
      }

    .user-history .wrap{
       justify-content: right;
    
    }
    .user-history .login-form{
        max-width:250px;
        top:0;
    }

   
    .admin-container{
        display: flex;
        flex-direction:column;
        width:90%;
        height:auto;
        justify-content: center;
    }

    .admin-nav{
        width:100%;
        padding-bottom: 0;
        
    }

    .admin-nav-main{
        display: none;
    }

    .admin-nav-main-active{
        display: block;
    }

    .category-create-form input{
        width:90%;
    }

    .category-create-form .btn-cat{
        width:50%;
    }

    .cat-name{
        text-align: center;
        font-size:20px;
    }

    .all-categories-list{
        display: flex;
        flex-direction: column;
        width:90%;
    }

    .cat-delete-edit{
        display: flex;
        justify-content: space-between;
        font-size:15px;
    }

    .cat-select{
        max-width: 100%; 
        text-overflow: ellipsis;
    }

    .sub-cat{
        width:100%;
    }
    .sub-cat .checkbox-div{
        width:100%;
    }

    .checkbox-div input{
        padding:0;
        width:auto;
        margin-left:20px;
        margin-right:10px;
    }
    .checkbox-div  label{
        display: inline-block;
    }

    .images-div{
        width:90%;
    }

    .main-content-product-list{
        flex-direction: column;
        width:100%;
    }
    
    .main-content-product-list .product-card-container{
        width:100%;
    }

    .product-card-details {
        width:100%;
    }

    /* homepage */

    .banner{
        display: block;
        width:100%;
        height:300px;
        margin: 10px auto;
        position: relative;
        
    }

    .banner img{
        width: 100%;
        height:100%;
    }
    .banner .banner-slogan{
        position:absolute;
       top:90px;
       left:50px;
       font-size:20px;
        z-index:100;
    }

    .banner .banner-slogan-small{
        top:200px;
    }

    .homepage-top-container{
        display:flex;
        flex-direction:column;
        width:100%;
        box-sizing: border-box;
        margin:5px auto;
    }

    .images-column-top{
        flex:1;
        max-width:100%;
        align-items: center;
        
        margin:0px 10px 10px 10px;
    }
    .footer{
        bottom:0;
        margin-top:10px;
        padding:5px;
    }

    /* single product page */
    .single-product{
        margin-top: 10px;
    }
    

    
    .col-2{
        flex-basis:100%;
        padding:0 0;
    }

    

    
    
    /* .row{
        text-align: center;
       width:100%;
    }

    .col-2{
        flex-basis:100%;
        margin:auto auto;
        
       
    }

    .single-product.small-container {
        margin-top:20px;
        margin-left:auto;
        margin-right: auto;
        max-width:100%;
       
    }
    .single-product .row{
        text-align: left;
    }

    .single-product.small-container.row.col-2.col2-img{
        width:100%;
    } */
    
}



 {/* <div className="images-column-top">
                <div className="test">
                {product.images  && product.images.length ? (<img className="column-top-images" src={product.images[0].url}  />)
                                :(<img className="column-top-images" src={defaultimage}  />)}
                <div className="view-cart">
                    <Link to={`/product/${product.slug}`}><i className="far fa-eye"></i></Link>
                    <Link to="`/product/${slug}"><i className="fas fa-shopping-cart"></i></Link>
                </div>
                </div>
                
            </div>