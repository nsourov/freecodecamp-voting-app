const mongoose = require("mongoose");
const User = require("../models/user");
const passport = require("passport");

const register = async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    await User.register(
      new User({ username: username }),
      password,
      (error, user) => {
        if (error) {
          req.flash('error', error.message)
          return res.redirect('/sign-up')
        }
        passport.authenticate('local')(req,res,()=>{
          req.flash('success', 'Successfully Registered')
          res.redirect('/')
        })
      }
    );
  } catch (error) {
    req.flash('warning', 'Something went wrong');
    console.log(error)
    res.redirect('/')
  }
};

const login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'username or password is incorrect!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});

const logout = async (req, res) => {
  try {
    await req.logout();
    req.flash('warning', 'You are now logged out.')
    res.redirect('/login');
  } catch (error) {
    req.flash('warning', 'Something went wrong');
    console.log(error)
    res.redirect('/')
  }
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
    req.flash('warning', 'You need to login first')
    res.redirect('/login');
  }
};

module.exports = { register, login, logout, isLoggedIn };
