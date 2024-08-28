const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const DB = "aq-gimel";

async function Fetching() {
  let result = await client.connect();
  let db = result.db(DB);
  return db.collection("blogs");
}

module.exports = Fetching;