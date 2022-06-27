const express = require("express");
const router = express.Router();
const {
  getProducts,
  updateProduct,
  createProduct,
  deleteProduct,
  getUserProducts,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/me/:id", getUserProducts);
router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
