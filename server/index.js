const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://pastry-shop-admin:KWgoj8noLczzx5J9@cluster0.6tj66.mongodb.net/pastryShop?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
