const express = require("express");
const router = express.Router();
const {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getAccount,
} = require("../controllers/customerController");

router.get("/", getCustomers);

router.get("/login", getAccount);

router.post("/", createCustomer);

router.put("/:id", updateCustomer);

router.delete("/:id", deleteCustomer);

module.exports = router;
