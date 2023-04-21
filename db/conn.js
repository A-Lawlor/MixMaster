const { MongoClient } = require("mongodb");
const Db = process.env.MONGODB_URI;



let _dbDrinks;
let _dbIngredient;
let _dbUser;

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

  getDrinksDb: function (dbName) {
    if (dbName === "drinks") {
      return _dbDrinks;
    } else if (dbName === "ingredients") {
      return _dbIngredient;
    } else if (dbName === "users") {
      return _dbUser;
    }
  },

  getUsersDb: function () {
    return _dbUser;
  },
};


/*module.exports = {
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
  }
};*/