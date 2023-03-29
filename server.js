require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5005;
app.use(cors());
app.use(express.json());
app.use(require("./routes/drink"));
app.use(require("./routes/ingredient"));
// get driver connection
const dbo = require("./db/conn");
 

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use('*', express.static(path.join(__dirname, "client", "build")));
}

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});