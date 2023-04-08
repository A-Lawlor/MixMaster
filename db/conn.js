const { MongoClient } = require("mongodb");
const Db = process.env.MONGO_URI;
 
let _db;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  connectToServer: async (callback) => {
    await client.connect();
    console.log("Connected successfully to server");
    _dbDrinks = client.db("drinks");
    _dbIngredient = client.db("ingredients");
    _dbUser = client.db("users");
    console.log("Successfully connected to MongoDB");
  },

  getDrinksDb: function () {
    return _dbDrinks;
  },
  getIngredientsDb: function () {
    return _dbIngredient;
  },
  getUsersDb: function () {
    return _dbUser;
  },
};