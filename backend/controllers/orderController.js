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

module.exports = {
  getOrders,
};
