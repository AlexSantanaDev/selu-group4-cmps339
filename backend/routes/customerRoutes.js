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
  getAllCustomers,
  getCartOrder,
} = require("../controllers/customerController");

//These are our endpoints to get or post information to our server involving CUSTOMERS

//this will GET the customers information by his ID and send it to us
router.get("/me/:id", getCustomers);

//this will GET the customers ID from his EMAIL and send us his ID
router.get("/auth/:email", getCustomerId);

//this will GET the customers order from his ID and send it to us
router.get("/me/orders/:id", getUserOrder);

router.get("/me/myOrders/:id", getCartOrder);

//this will GET ALL customers in our DB and send it to us
router.get("/all", getAllCustomers);

//this will POST the login information a user inputs on login page and will use that to try to find a match in the DB
router.post("/login", loginAccount);

//this will take the registration input and POST it into our DB as a new customer
router.post("/", createCustomer);

//this will update a customer dependent on the ID
router.put("/:id", updateCustomer);

//this will delete a customer dependent on the ID
router.delete("/:id", deleteCustomer);

module.exports = router;
