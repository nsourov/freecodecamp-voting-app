const express = require("express");
const router = express.Router();
const slug = require("slug");
const ip = require('ip');
const controller = require("../controller/authController");
const Pollcontroller = require("../controller/pollController");
const Poll = require("../models/poll");



router.get("/", Pollcontroller.getForHome);
router.get("/polls", (req, res) => {res.redirect("/");});
router.get("/polls/:slug", Pollcontroller.singlePoll);
router.get("/my-polls", controller.isLoggedIn, Pollcontroller.myPoll);
router.get("/create-poll", controller.isLoggedIn,Pollcontroller.createPoll);
router.post("/create-poll", controller.isLoggedIn, Pollcontroller.addPoll);
router.post("/vote/:slugname", Pollcontroller.votePoll);

router.get('/polls/delete/:slug', Pollcontroller.deletePoll)

router.get('/allPolls', Pollcontroller.pollAPI)

module.exports = router;
