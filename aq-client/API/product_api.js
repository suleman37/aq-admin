const express = require("express");
const connect = require("../DBConnect/proconnect");
const app = express();

const Product_Api = (app) => {
  app.get("/product", async (req , res) => {
    let data = await connect();
    data = await data.find().toArray();
    res.send(data);
    console.log("Product API Running Sucessfully");
  });
};

module.exports = Product_Api;