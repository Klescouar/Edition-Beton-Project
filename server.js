require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const AWS = require("aws-sdk");
const bluebird = require("bluebird");
const user = require("./routes/user");
const articles = require("./routes/articles");
const categories = require("./routes/categories");
const about = require("./routes/about");
const logo = require("./routes/logo");
const path = require("path");

// Setting up port
const connUri = process.env.MONGO_LOCAL_CONN_URL;
let PORT = process.env.PORT || 4444;

//=== 1 - CREATE APP
// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.connect(connUri, {
  useNewUrlParser: true,
  autoIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB --  database connection established successfully!")
);
connection.on("error", (err) => {
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running. " + err
  );
  process.exit();
});

app.use("/api/user", user);
app.use("/api", articles);
app.use("/api", categories);
app.use("/api", about);
app.use("/api", logo);
app.use("/medias", express.static(__dirname + "/medias"));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "static-site/public")));

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/static-site/public/index.html"));
});

//=== 5 - START SERVER
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT + "/");
});
