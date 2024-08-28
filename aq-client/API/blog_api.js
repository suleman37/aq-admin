const express = require("express");
const connect = require("../DBConnect/mongo");
const app = express();

const Blog_Api = (app) => {
  app.get("/blog", async (req, res) => {
    let data = await connect();
    data = await data.find().toArray();
    res.send(data);
    console.log("Blog Api Running Sucessfully");
  });
};
module.exports = Blog_Api;