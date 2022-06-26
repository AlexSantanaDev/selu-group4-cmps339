const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const asyncHandler = require("express-async-handler");
const jwtcode = "selu123";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, jwtcode);
      var connection = mysql.createConnection({
        host: "school.ckv8j6gpmc8l.us-east-2.rds.amazonaws.com",
        user: "admin",
        password: "12345678",
        port: "3306",
      });
      connection.query(
        "USE `selu_project`",
        function (error, results, fields) {}
      );
      var sql = `SELECT * FROM customers WHERE id=${decoded.id}`;
      console.log(decoded.id);
      req.user = connection.query(sql, function (results, error) {});
      next();
    } catch (error) {
      console.log(error);
      throw new Error("Not authorized");
    }

  if (!token) {
    throw new Error("No token");
  }
});

module.exports = { protect };
