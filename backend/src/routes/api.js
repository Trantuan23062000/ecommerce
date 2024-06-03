import express from "express";
import multer from "multer";
import {GetListBrand,Search} from "../controller/brand/brandController";
import {listImages} from "../controller/images/getlist";
import {addProduct} from "../controller/product/create";
import {updateProducts} from "../controller/product/updateProductImage";
import {GetList} from "../controller/product/getList";
import {deleteProduct} from "../controller/product/delete";
import {addProductDataController} from "../controller/productSizeColor/create"
import {getProductDetailsController} from "../controller/productSizeColor/get"
import {GetPorduct} from "../controller/productSizeColor/getProduct"
import {getVariant} from "../controller/productSizeColor/getVariants"
import {GetimageById} from "../controller/productSizeColor/getImageById"
import {updateProductDataController} from "../controller/productSizeColor/update"
import {Delete} from "../controller/productSizeColor/delete"
import {SearchProductdata} from "../controller/product/search"
import {searchProduct,searchProductRe} from "../controller/productSizeColor/seacrh"
import {GetAll} from "../controller/productSizeColor/getall"
import {getAllSize} from "../controller/size/get"
import {getAllColor} from "../controller/color/get"
import {getRelatedProducts} from "../controller/productSizeColor/related"
import {getByNameProduct} from"../controller/productSizeColor/getbyname"
import {filterController} from "../controller/filter/index"
import {RegisterUser} from "../controller/auth/Register"
import {loginUser} from "../controller/auth/login"
import {forgotPasswordController, resetPasswordController } from "../controller/auth/resetpassword"
import {Orders,vnPay,cancelOrders} from "../controller/order/order"
import {createPayment, executePayment, cancelPayment } from '../controller/paypal/paypal_controller'
import {CreateColors} from "../controller/color/create"
import {EditColor} from "../controller/color/edit"
import {DeleteColor} from "../controller/color/delete"
import {SearchColors} from "../controller/color/search"
import {GetListColor} from "../controller/color/getpaginate"
import {CreateSizes} from "../controller/size/create"
import {EditSize} from "../controller/size/edit"
import {SearchSizes} from "../controller/size/search"
import {DeleteSize} from "../controller/size/delete"
import {GetListSize} from "../controller/size/getpaginate"
import {getOrders,filterRateOrders,Dailyrevenue,DailyrevenueDaily,TotalByDate,getOrdersCancel,filterRateOrdersCancel} from "../controller/order/get"
import {getUserOrdersController} from "../controller/order/getOrderById"
import {loginUserAdmin} from "../controller/auth/loginAdmin"
import VNPayService from "../services/vnpay/vnpay";
import {handleVNPAYCallback,cancelPaymentVNpay} from "../controller/vnpay/callback"
import {CountOrders} from "../controller/statistics/order"
import {CountProducts} from "../controller/statistics/produtcs"
import {CountUsers} from "../controller/statistics/user"
import {getAccount} from "../controller/auth/account"
import {Create} from "../controller/brand/create"
import {EditBrand} from "../controller/brand/edit"
import {DeleteBrand} from "../controller/brand/delete"
import {CreateBanner} from "../controller/banner/create"
import {EditBanner} from "../controller/banner/edit"
import {DeleteBanner} from "../controller/banner/delete"
import {GetAllBanner} from "../controller/banner/get"
import {verifyTokenWithVerificationToken} from "../controller/auth/checktoken"
import {ConfirmCancelOrder} from "../controller/order/order"
 


const router = express.Router();
const upload = multer({
  dest: "src/uploads/",
  fileFilter: (req, file, cb) => {
    if (file) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        req.fileValidationError = "Only image files are allowed!";
        return cb(new Error("Only image files are allowed!"));
      }
    }
    cb(null, true);
  },
});

const ApiRouter = (app) => {
  //Brand
  router.post("/brand/createBrand", upload.single('image'),Create);
  router.get("/brand/getBrand",GetListBrand);
  router.put("/brand/update/:id",upload.single('image'), EditBrand);
  router.delete("/brand/delete/:id",DeleteBrand);
  router.get("/brand/search",Search);

  router.post("/banner/create", upload.single('image'),CreateBanner);
  router.put("/banner/update/:id",upload.single('image'), EditBanner);
  router.delete("/banner/delete/:id",DeleteBanner);
  router.get("/banner/get",GetAllBanner)

  router.post("/checktoken",verifyTokenWithVerificationToken)
 



  router.post("/color/create",CreateColors)
  router.put("/color/update",EditColor)
  router.delete("/color/delete/:id",DeleteColor)
  router.get("/color/search",SearchColors)
  router.get("/color/getpaginate",GetListColor)

  router.post("/size/create",CreateSizes)
  router.put("/size/update",EditSize)
  router.get("/size/search",SearchSizes)
  router.delete("/size/delete/:id",DeleteSize)
  router.get("/size/getpaginate",GetListSize)


  router.get("/orders",getOrders)
  router.delete("/CancelOder/:id",ConfirmCancelOrder)
  router.get("/cancelOrder/filterOrder",filterRateOrdersCancel)
  router.get("/cancelOrder",getOrdersCancel)

  




  //Images
  router.get("/image/getImage",listImages);

  // productSizeColor
  router.post("/productDetails/create",addProductDataController)
  router.get("/productDetails/get",getProductDetailsController)
  router.get("/product/get",GetPorduct)
  router.get("/variant/get",getVariant)
  router.get("/image/getById/:id",GetimageById)
  router.put("/productDetails/update/:detailId",updateProductDataController);
  router.delete("/productDetails/delete/:detailId",Delete)
  router.get("/productDetails/search",searchProduct)
  router.post("/productDetails/search",searchProductRe)
  //getall
  router.get("/productDetails/getall",GetAll);
  //productImage

  router.post(
    "/productImage/create",
    upload.array("images", 10),
    addProduct
  );

  router.put(
    "/productImage/update/:id",
    upload.array("images", 10),
    updateProducts
  );
  router.get("/productImage/getList",GetList);
  router.delete("/productImage/delete/:id", deleteProduct);
  router.get('/productImage/search',SearchProductdata)
  router.get("/product/related",getRelatedProducts)
  router.get("/product/getByName/:detailId",getByNameProduct)
  

  router.get("/size",getAllSize)
  router.get("/color",getAllColor)

  router.post("/products/filter",filterController);

  router.post("/register",RegisterUser)
  router.post("/login",loginUser)
  router.post("/loginAdmin",loginUserAdmin)
  router.post('/forgot-password',forgotPasswordController)
  router.post('/reset-password',resetPasswordController)
  router.post('/oders',Orders)
  router.post('/oder-vnpay',vnPay)
  router.get('/oderById/:userId',getUserOrdersController)


  router.post('/create-payment', createPayment);
  router.get('/success', executePayment);
  router.get('/cancel', cancelPayment);

  router.get('/vnpay_return',VNPayService)
  router.get('/payment/callback',handleVNPAYCallback)
  router.get('/paymentVNpay/cancel', cancelPaymentVNpay);
  router.post('/cancelorder', cancelOrders);

  router.get('/orders/count',CountOrders)
  router.get('/products/count',CountProducts)
  router.get('/users/count',CountUsers)
  router.get('/orders/filterDate',filterRateOrders)
  router.get('/orders/daily-revenue',Dailyrevenue)
  router.get('/orders/daily',DailyrevenueDaily)
  router.get('/oders/bytotalDate',TotalByDate)

  

  router.get ('/users',getAccount)
  
  
  return app.use("/api/v1", router);
 

};

export default ApiRouter;
