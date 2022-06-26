const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  loginAccount,
  getCustomerId,
  getUserOrder,
} = require("../controllers/customerController");

router.get("/me/:id", getCustomers);
router.get("/auth/:email", getCustomerId);
router.get("/me/orders/:id", getUserOrder);

router.post("/login", loginAccount);

router.post("/", createCustomer);

router.put("/:id", updateCustomer);

router.delete("/:id", deleteCustomer);

module.exports = router;
