const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const LoginModel = require("./Model/login_model");
const BlogModel = require("./Model/blog_model");
const ProductModel = require("./Model/product_model");
const Blog_Api = require("./API/blog_api");
const Product_Api = require("./API/product_api");

const app = express();
app.use(express.json());
app.use(cors());
// MONGODB CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/aq-gimel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));
// CREATE BLOGS
app.post("/blog", (req, res) => {
  BlogModel.create(req.body)
    .then((User) => {
      res.json(User);
    })
    .catch((err) => res.json(err));
});
// DELETE BLOGS
app.delete("/blog/:id", (req, res) => {
  const { id } = req.params;
  BlogModel.findByIdAndDelete(id)
    .then((deletedBlog) => {
      if (!deletedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json({ message: "Blog deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Error deleting blog", error: err })
    );
});
// DELETE PRODUCTS
app.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  ProductModel.findByIdAndDelete(id)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json({ message: "Products not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Error deleting products", error: err })
    );
});

// CREATE PRODUCTS
app.post("/product", (req, res) => {
  ProductModel.create(req.body)
    .then((User) => {
      res.json(User);
    })
    .catch((err) => res.json(err));
});
//LOGIN AUTHENTICATION
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  LoginModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        alert("Password is Incorrect");
      }
    } else {
      res.json("No Record Existed");
    }
  });
});
// CALL APIs
Blog_Api(app);
Product_Api(app);
app.listen(5000, () => {
  console.log("Server is Running");
});