var mysql = require("mysql");
var express = require("express");
const port = 5000;
const app = express();
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

var connection = mysql.createConnection({
  host: "school.ckv8j6gpmc8l.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "12345678",
  port: "3306",
});

connection.connect(function (err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }

  console.log("Connected to database.");
});

connection.query("USE `selu_project`", function (error, results, fields) {});

var query = connection.query(
  "SELECT * FROM `products`",
  function (error, results, fields) {
    // console.log(results);
  }
);
