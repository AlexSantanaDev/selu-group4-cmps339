var mysql = require("mysql");
var JWT = require("jsonwebtoken");
const jwtcode = "selu123";
var connection = require("../lib/db");

const getOrders = (req, res) => {
  var query = connection.query(
    "SELECT * FROM `orders`",
    function (error, results, fields) {
      console.log(results);
      res.status(200).json(results);
    }
  );
};

const createOrder = (req, res) => {
  // const id = req.body.id;
  const idNumber = req.body.idNumber;
  const makeOrder = req.body.makeOrder;
  const testMoney = req.body.testMoney;
  const address = req.body.address;

  var sql = `INSERT INTO orders VALUES (id,${idNumber},${makeOrder},${testMoney},"${address}")`;
  var sql2 = `INSERT INTO history(name,price) VALUES ('Large Chocolate Milk',4.99)`;
  var sql3 = `INSERT INTO history(name,price) VALUES ('Small Coffee',2.99)`;

  connection.query(sql2, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log("Successs");
    }

    res.status(200).json(results);
  });

  connection.query(sql2, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log("Successs");
    }

    res.status(200).json(results);
  });
  connection.query(sql2, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log("Successs");
    }

    res.status(200).json(results);
  });

  connection.query(sql3, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log("Successs");
    }

    res.status(200).json(results);
  });

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

  const updatedInfo = req.body.amount;

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

  var sql = `DELETE FROM orders
            WHERE id=${id}`;

  connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log(results);
    }

    res.status(200).json(results);
  });
};

module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  // getUserOrder,
};
