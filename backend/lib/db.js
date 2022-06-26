var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "school.ckv8j6gpmc8l.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "12345678",
  port: "3306",
  multipleStatements: true,
});
connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Connected!:)");
  }
});
connection.query("USE `selu_project`", function (error, results, fields) {});
module.exports = connection;
