const express = require("express");
const app = express();
var session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");

app.use(flash());

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_PATH,
    }),
  })
);

const Router1 = require("./routes/signup");
const Router2 = require("./routes/login");
const Router3 = require("./routes/page");

app.use("/signup", Router1);

app.use("/login", Router2);

app.use("/page", Router3);

app.use("/", Router3);

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/signout", (req, res) => {
  res.redirect("/signup");
});

mongoose
  .connect(process.env.DB_PATH)
  .then(() => {
    app.listen(3000, () => {
      console.log("listening.....");
    });
  })
  .catch((err) => {
    console.log(err);
  });
