const express = require("express");
const mongoose = require("mongoose");

const app = express();


const BlogSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  shortdescription: String,
  category: String,
  date: {
    type: Date,
    default: Date.now,
  },
  featureImage: String,
  postImage: String,
});

const BlogModel = mongoose.model("blog", BlogSchema);

module.exports = BlogModel;