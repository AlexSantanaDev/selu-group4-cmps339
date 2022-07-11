const jwt = require("jsonwebtoken");
var mysql = require("mysql");
const jwtcode = "selu123";
var connection = require("../lib/db");
const express = require("express");
const router = express.Router();

const createToken = (id) => {
  return jwt.sign({ id }, jwtcode, {
    expiresIn: "1d",
  });
};

const getCustomers = (req, res) => {
  const id = req.params.id;

  var sql = `SELECT * FROM customers WHERE id=${id}`;

  connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      res.status(200).json(results);
    }
  });
};

const getAllCustomers = (req, res) => {
  connection.query(`SELECT * FROM customers`, function (error, results) {
    res.json(results);
  });
};

const getCustomerId = (req, res) => {
  var email = req.params.email;
  var sql = `SELECT id FROM customers WHERE email="${email}"`;
  connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      res.status(200).json(results);
    }
  });
};

const createCustomer = (req, res) => {
  const { firstName, lastName, address, email, password } = req.body;

  if (!firstName || !lastName || !address || !email || !password) {
    throw new Error("Please add all fields");
  } else {
    var sql = `INSERT INTO customers VALUES (id,"${firstName}","${lastName}","${address}","${email}","${password}")`;
    var getId = `SELECT * FROM customers WHERE email="${email}" AND password = "${password}" `;

    connection.query(sql, function (error, results, fields) {
      if (error) {
        throw error;
      } else {
        connection.query(getId, function (error, data, fields) {
          res.status(200).json({
            id: data[0].id,
            firstName: data[0].first_name,
            lastName: data[0].last_name,
            address: data[0].address,
            email: data[0].email,
            password: data[0].password,
            token: createToken(data[0].id),
          });
        });
      }
    });
  }
};

const loginAccount = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  connection.query(
    "SELECT * FROM customers WHERE email = ? AND password = ?",
    [email, password],
    function (err, data, fields) {
      // if user not found
      if (data.length <= 0) {
        req.flash("error", "Please correct enter email and Password!");
        console.log("error");
      } else {
        console.log("success");

        res.json({
          id: data[0].id,
          firstName: data[0].first_name,
          lastName: data[0].last_name,
          address: data[0].address,
          email: data[0].email,
          password: data[0].password,
          token: createToken(data[0].id),
        });
      }
    }
  );
};

const updateCustomer = (req, res) => {
  const id = req.params.id;
  var connection = mysql.createConnection({
    host: "school.ckv8j6gpmc8l.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    port: "3306",
  });

  const updatedInfo = req.body.address;

  connection.query("USE `selu_project`", function (error, results, fields) {});
  var sql = `UPDATE customers
            SET address = "${updatedInfo}"
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

const deleteCustomer = (req, res) => {
  const id = req.params.id;
  var connection = mysql.createConnection({
    host: "school.ckv8j6gpmc8l.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    port: "3306",
  });

  connection.query("USE `selu_project`", function (error, results, fields) {});
  var sql = `DELETE FROM customers
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

const getUserOrder = (req, res) => {
  const id = req.params.id;

  var sql = `SELECT * FROM orders WHERE customer_id=${id}`;
  var test = `SELECT * FROM customers WHERE id=${id}`;

  connection.query("USE `selu_project`", function (error, results, fields) {});
  connection.query(
    `SELECT * FROM orders WHERE customer_id=${id};
    SELECT * FROM customers WHERE id=${id}`,
    function (error, results, fields) {
      if (error) {
        throw error;
      } else {
        res.json(results);
      }
    }
  );
};

const getCartOrder = (req, res) => {
  const id = req.params.id;

  var sql = `SELECT * FROM orders WHERE customer_id=${id}`;

  connection.query("USE `selu_project`", function (error, results, fields) {});
  connection.query(
    `SELECT * FROM orders WHERE customer_id=${id}`,
    function (error, results, fields) {
      if (error) {
        throw error;
      } else {
        res.json(results);
      }
    }
  );
};

module.exports = {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  loginAccount,
  getCustomerId,
  getUserOrder,
  getAllCustomers,
  getCartOrder,
};
