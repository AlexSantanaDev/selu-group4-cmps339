var mysql = require("mysql");

const getCustomers = (req, res) => {
  var connection = mysql.createConnection({
    host: "school.ckv8j6gpmc8l.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    port: "3306",
  });

  connection.query("USE `selu_project`", function (error, results, fields) {});

  var query = connection.query(
    "SELECT * FROM `customers`",
    function (error, results, fields) {
      console.log(results);
      res.status(200).json(results);
    }
  );
};

const createCustomer = (req, res) => {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address = req.body.address;
  var connection = mysql.createConnection({
    host: "school.ckv8j6gpmc8l.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "12345678",
    port: "3306",
  });

  connection.query("USE `selu_project`", function (error, results, fields) {});
  var sql = `INSERT INTO customers VALUES (${id},"${firstName}","${lastName}","${address}")`;

  connection.query(sql, function (error, results, fields) {
    if (error) {
      throw error;
    } else {
      console.log("Success");
    }

    res.status(200).json(results);
  });
};

module.exports = {
  getCustomers,
  createCustomer,
};
