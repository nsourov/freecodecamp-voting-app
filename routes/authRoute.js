const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controller/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
module.exports = router;
