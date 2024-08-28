const express = require("express");
const mongoose= require("mongoose");

const app = express();

const ProductSchema = new mongoose.Schema({
    title :String,
    price :String,
    discount_price :String,
    description :String,
    shortdescription :String,
    category :String,
    image :String,
    featureImage:String,
});

const ProductModel = mongoose.model("Product" , ProductSchema);

module.exports = ProductModel;