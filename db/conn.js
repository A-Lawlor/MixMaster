const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
 
let _db;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  connectToServer: async (callback) => {
    await client.connect();
    console.log("Connected successfully to server");
    _db = client.db("drinks");
    console.log("Successfully connected to MongoDB");
  },

  getDb: function () {
    return _db;
  },
};