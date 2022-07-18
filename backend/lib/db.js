//This is how we connect our DB to our backend. We export this file as 'connection' so we can import it to another file
//We do this so we dont have to retype all of the code in this file over and over, rather just import and use the function 'connection'.
//Look at controller files for examples
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "school.ckv8j6gpmc8l.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "oakleythedog2022",
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
