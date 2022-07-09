const express = require("express");
const router = express.Router();
const {
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  getUserProducts,
} = require("../controllers/productController");

//These are our endpoints to get or post information to our server involving PRODUCTS

//this will get ALL PRDOUCTS in our DB and send it to us
router.get("/", getProducts);

//this will get all of a customers PRODUCTS dependent on his ID
router.get("/me/:id", getUserProducts);

//this will create a PRODUCT into our DB
router.post("/", createProduct);

//this will update a PRODUCT into our DB
router.put("/:id", updateProduct);

//this will delete a PRODUCT into our DB
router.delete("/:id", deleteProduct);

module.exports = router;
