const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

//import route files
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");

//mongoose connection
mongoose
  .connect(
    `mongodb+srv://RockyStudios:${process.env.MONGO_DB_PASSWORD}@cluster0.hhedcvi.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log(err);
  });

//Routes
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);

//listening on port
app.listen(process.env.PORT || 5050, () => {
  console.log("server is running on port:5050 🚀");
});
