require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(require("./routes/drink"));
app.use(require("./routes/ingredient"));
app.use(require("./routes/userstorage"));
app.use(require("./routes/user"));
const { default: mongoose } = require("mongoose");
const dbo = require("./db/conn");

//DB Config
mongoose.connect(process.env.MONGO_URI_USERS, {
  keepAlive: true,
  useNewUrlParser: true,
  retryWrites: true,
  useUnifiedTopology: true,
}).catch((err) => console.log(err));
//mongoose.connect(process.env.MONGO_URI).catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//const port = process.env.PORT || 5005;

app.listen(process.env.PORT || 5005, function () {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log("Express server is running");
});









// const port = process.env.PORT || 5005;
// require("dotenv").config({ path: "./config.env" });
// app.use(cors());
// app.use(express.json());
// app.use(require("./routes/drink"));
// app.use(require("./routes/ingredient"));
// // get driver connection
// const dbo = require("./db/conn");
 

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
 
//   });
//   console.log(`Server is running on port: ${port}`);
// });