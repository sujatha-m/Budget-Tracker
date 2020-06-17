// Requiring express to set up the server
const express = require("express");
// Require morgan for debugging
const logger = require("morgan");
// Require mongoose to connect database
const mongoose = require("mongoose");
// Require compression for code compress
const compression = require("compression");

const PORT = 3000;
/** Create the Express App and apply global middleware */
const app = express();

// Assign Express global middleware
app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// Open the database connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// routes
app.use(require("./routes/api.js"));
// Start listening for HTTP requests
app.listen(process.env.PORT || PORT, () => {
  console.log(`App running on port ${PORT}!`);
});