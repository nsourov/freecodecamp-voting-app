const express = require("express");
const router = express.Router();
const controller = require('../controller/authController')

router.get("/login", (req, res) => {
  if(req.user){
    res.redirect('/')
  }
  res.render("login",{user: req.user, title: 'Voting App | Login'});
});
router.get("/logout", (req, res) => {
  res.redirect("/auth/logout");
});
router.get("/sign-up", (req, res) => {
  if(req.user){
    res.redirect('/')
  }
  res.render("register", {user: req.user, title: 'Voting App | Sign-up'});
});


module.exports = router;
