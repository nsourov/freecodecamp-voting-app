const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const flash = require("connect-flash");
const authRoute = require("./routes/authRoute");
const viewRoute = require("./routes/viewsRoute");
const pollRoute = require("./routes/pollRoutes");
const User = require("./models/user");
require('dotenv').config()
//CONNECTION DB fccvotingapp
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB).then(() => {
  console.log("DB CONNECTED");
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(process.env.PORT || 4000, () => {
  console.log("SERVER RUNNING");
});

//SESSION
app.use(
  require("express-session")({
    secret: "keys.session.secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(flash());

//Flash
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.warning = req.flash("warning");
  res.locals.success = req.flash("success");
  next();
});

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport.js")(passport);
//PASSPORT LOCAL
passport.use(new LocalStrategy(User.authenticate()));

//ROUTES
app.use("/auth", authRoute);
app.use("/", viewRoute);
app.use("/", pollRoute);
