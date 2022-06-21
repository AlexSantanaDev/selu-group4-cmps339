var mysql = require("mysql");

const getOrders = (req, res) => {
  var connection = mysql.createConnection({
    host: "school.ckv8j6gpmc8l.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    port: "3306",
  });

  connection.query("USE `selu_project`", function (error, results, fields) {});

  var query = connection.query(
    "SELECT * FROM `orders`",
    function (error, results, fields) {
      console.log(results);
      res.status(200).json(results);
    }
  );
};

const getUserOrder = (req, res) => {
  var id = req.params.id;
  var connection = mysql.createConnection({
    host: "school.ckv8j6gpmc8l.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    port: "3306",
  });

  connection.query("USE `selu_project`", function (error, results, fields) {});
  var sql = `SELECT * FROM orders WHERE customer_id = ${id}`;

  var query = connection.query(sql, function (error, results, fields) {
    if (results.length == 0) {
      console.log("No active orders for this customer");
    } else {
      console.log(results);
      res.status(200).json({
        id: results[0].id,
        customerId: results[0].customer_id,
        productId: results[0].product_id,
        amount: results[0].amount,
      });
    }
  });
};

const createOrder = (req, res) => {
  const id = req.body.id;
  const customerId = req.body.customerId;
  const productId = req.body.productId;
  const amount = req.body.amount;
  var connection = mysql.createConnection({
    host: "school.ckv8j6gpmc8l.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    port: "3306",
  });

  connection.query("USE `selu_project`", function (error, results, fields) {});
  var sql = `INSERT INTO orders VALUES (${id},"${customerId}","${productId}","${amount}")`;

  connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log("Successs");
    }

    res.status(200).json(results);
  });
};

const updateOrder = (req, res) => {
  const id = req.params.id;
  var connection = mysql.createConnection({
    host: "school.ckv8j6gpmc8l.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    port: "3306",
  });

  const updatedInfo = req.body.amount;

  connection.query("USE `selu_project`", function (error, results, fields) {});
  var sql = `UPDATE orders
            SET amount = "${updatedInfo}"
            WHERE id = ${id}`;

  connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log("Successs");
    }

    res.status(200).json(results);
  });
};

const deleteOrder = (req, res) => {
  const id = req.params.id;
  var connection = mysql.createConnection({
    host: "school.ckv8j6gpmc8l.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    port: "3306",
  });

  connection.query("USE `selu_project`", function (error, results, fields) {});
  var sql = `DELETE FROM orders
            WHERE id=${id}`;

  connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log("Successs");
    }

    res.status(200).json(results);
  });
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
};
