const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  // getUserOrder,
} = require("../controllers/orderController");

//These are our endpoints to get or post information to our server involving ORDERS

//this will get ALL ORDERS in our DB and send it to us
router.get("/", getOrders);

//this will take the input from the browser and POST it in our DB as a new order
router.post("/", createOrder);

//this will update an order dependent on the ID
router.put("/:id", updateOrder);

//this will delete an order dependent on the ID
router.delete("/:id", deleteOrder);

module.exports = router;
