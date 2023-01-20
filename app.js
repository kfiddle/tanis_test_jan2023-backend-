const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const instRoutes = require("./routes/inst-routes");
const playerRoutes = require("./routes/player-routes");
const gigRoutes = require("./routes/gig-routes");

const HttpError = require("./utils/http-error");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/insts", instRoutes);
app.use("/players/", playerRoutes);
app.use("/gigs", gigRoutes);

app.use((req, res, next) => {
  throw new HttpError("not a valid url", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "something really went wrong" });
});

mongoose
  .connect(
    "mongodb+srv://kenjon:kenjonsmythe@cluster0.d2aep6g.mongodb.net/tanis?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000);
    console.log("connected");
  })
  .catch((err) => console.log(err));

// mongodb+srv://kenjon:kenjonsmythe@cluster0.d2aep6g.mongodb.net/?retryWrites=true&w=majority
