var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressValidator = require("express-validator");
var flash = require("express-flash");
var session = require("express-session");
var authRouter = require("../backend/routes/auth");
var moment = require("moment");

const port = 5000;
const app = express();
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "123456cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

app.use(flash());
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/auth", authRouter);
console.log(moment());

// var connection = mysql.createConnection({
//   host: "school.ckv8j6gpmc8l.us-east-2.rds.amazonaws.com",
//   user: "admin",
//   password: "12345678",
//   port: "3306",
// });

// connection.connect(function (err) {
//   if (err) {
//     console.error("Database connection failed: " + err.stack);
//     return;
//   }

//   console.log("Connected to database.");
// });

// connection.query("USE `selu_project`", function (error, results, fields) {});
