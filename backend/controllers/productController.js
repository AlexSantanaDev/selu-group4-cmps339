var mysql = require("mysql");
var connection = require("../lib/db");

const getProducts = (req, res) => {
  connection.query("USE `selu_project`", function (error, results, fields) {});
  var sql = `SELECT * FROM products`;
  connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log("Successs");
    }

    res.status(200).json(results);
  });
};

const createProduct = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const size = req.body.size;

  var sql = `INSERT INTO products VALUES (${id},"${name}","${size}")`;

  connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log("Successs");
    }

    res.status(200).json(results);
  });
};

const updateProduct = (req, res) => {
  const id = req.params.id;

  const updatedInfo = req.body.name;

  var sql = `UPDATE products
            SET name = "${updatedInfo}"
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

const deleteProduct = (req, res) => {
  const id = req.params.id;

  var sql = `DELETE FROM products WHERE id=${id}`;

  connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      res.json(results);
    }

    res.status(200).json(results);
  });
};

const getUserProducts = (req, res) => {
  const id = req.params.id;
  connection.query(
    `SELECT * FROM products WHERE id=${id}`,
    function (error, results) {
      res.json(results);
    }
  );
};

const getProfit = (req, res) => {
  const name = req.body.name;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  var sql = `SELECT name,sum(price) AS total FROM history WHERE name='${name}' AND date_ordered between '${startDate}'
    AND '${endDate}';`;

  // var sql = `SELECT name,sum(price) FROM history WHERE name='Small Coffee' AND date_ordered between '2022-07-10 15:18:54'
  // AND '2022-07-14 00:03:10';`;

  connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log(results);
    }
    console.log("suscces");
    res.status(200).json(results);
  });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getUserProducts,
  getProfit,
};
