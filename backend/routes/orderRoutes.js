const express = require("express");
const router = express.Router();
const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
} = require("../controllers/orderController");

router.get("/", getOrders);
router.get("/:id", getUserOrder);
router.post("/", createOrder);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

module.exports = router;
