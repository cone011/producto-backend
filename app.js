const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");

const cagetoriesRouter = require("./Routes/catgories");
const productsRouter = require("./Routes/products");
const userRoutes = require("./Routes/user");
dotenv.config();

const MONGODB_URL = "mongodb://127.0.0.1:27017/apiCommerce";

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(bodyParser.json());

app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Acess-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use((error, req, res, next) => {
  const stauts = error.statusCode || 500;
  const message = error.message;
  res.status(stauts).json({ isError: true, message: message });
});

app.use("/api", cagetoriesRouter);
app.use("/api", productsRouter);
app.use("/api", userRoutes);

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

mongoose
  .connect(MONGODB_URL)
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
