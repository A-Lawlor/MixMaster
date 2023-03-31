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
<<<<<<< Updated upstream
    _db = client.db("drinks");
=======
    _dbDrinks = client.db("drinks");
    _dbIngredient = client.db("ingredients");
>>>>>>> Stashed changes
    console.log("Successfully connected to MongoDB");
  },

<<<<<<< HEAD
  getDbDrinks: function () {
    return _dbDrinks;
  },
  getDbIngredient: function () {
=======
  getDrinksDb: function () {
    return _dbDrinks;
  },
  getIngredientsDb: function () {
>>>>>>> 506ab3338ad01cfa7cb8b27dea266f7e102a0142
    return _dbIngredient;
  },
};