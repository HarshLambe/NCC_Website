const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const ejsMate = require("ejs-mate");


app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
  secret:'thisisthekey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());




app.use((req, res, next) => {
  console.log(req.session);
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.render("allfiles/home");
});
app.get("/allfiles/about", (req, res) => {
  res.render("allfiles/about");
});
app.get("/allfiles/acheivement", (req, res) => {
  res.render("allfiles/acheivement");
});
app.get("/allfiles/enrollment", (req, res) => {
  res.render("allfiles/enrollment");
});
app.get("/allfiles/camp", (req, res) => {
  res.render("allfiles/camp");
});
app.get("/allfiles/event", (req, res) => {
  res.render("allfiles/event");
});
app.get("/allfiles/alumini", (req, res) => {
  res.render("allfiles/alumini");
});
app.get("/allfiles/trainning", (req, res) => {
  res.render("allfiles/trainning");
});



app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("the app is running on port 3000");
});
