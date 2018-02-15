const mongoose = require("mongoose");
const Poll = require("../models/poll");
const slug = require("slug");

const date = (data) => {
  let myDate = new Date(data)
  return myDate.toDateString();
}

const getForHome = async (req, res) => {
  try {
    const poll = await Poll.find();
    res.render("home", { user: req.user, title: "Voting App", poll , date: date });
  } catch (error) {
    req.flash('warning', 'Something went wrong');
    console.log(error)
    res.redirect('/')
  }
}

const singlePoll = async (req, res) => {
  try {
    const pollName = req.params.slug;
    const poll = await Poll.findOne({ slugname: pollName });
    res.render("single-poll", { user: req.user, title: 'Voting App | ' + poll.pollname , poll });
  } catch (error) {
    req.flash('warning', 'Something went wrong');
    console.log(error)
    res.redirect('/')
  }
}
const myPoll = async (req, res) => {
  try {
    const myPoll = await Poll.find({author: req.user.username});
    res.render("my-polls", { user: req.user, title: "Voting App | My Polls", poll: myPoll });
  } catch (error) {
    req.flash('warning', 'Something went wrong');
    console.log(error)
    res.redirect('/')
  }
}
const createPoll =  (req, res) => {
  res.render("create_poll", {
    user: req.user,
    title: "Voting App | Create Poll"
  });
}
const addPoll =  async (req, res) => {
  try {
    let options = [];
  for (var i = 0; i < req.body.option.length; i++) {
    let data = req.body.option[i];
    options.push({ name: data });
  }
  const { pollname } = req.body;
  const slugname = slug(pollname);
  const author = req.user.username;
  const newPoll = new Poll({ pollname, options, author, slugname});
  const poll = await newPoll.save();
  await res.redirect(`/polls/${slugname}`);
  } catch (error) {
    req.flash('warning', 'Something went wrong');
    console.log(error)
    res.redirect('/')
  }
 
}

const votePoll = async (req, res) => {
  try {
    const pollName = req.params.slugname;
    const poll = await Poll.findOne({ slugname: pollName });
    const voteVal = poll.options.find(data => data.name === req.body.vote);
    voteVal.vote += 1;
    const newPoll = await poll.save();
    await res.redirect(`/polls/${pollName}`);
  } catch (error) {
    req.flash('warning', 'Something went wrong');
    console.log(error)
    res.redirect('/')
  }
  
}

const deletePoll = async (req,res) => {
  try {
    const pollName = req.params.slug;
    const poll = await Poll.findOneAndRemove({ slugname: pollName });
    res.redirect('/my-polls')
  } catch (error) {
    req.flash('warning', 'Something went wrong');
    console.log(error)
    res.redirect('/')
  }
}

const pollAPI = async (req,res) => {
  try {
    const poll = await Poll.find();
    res.json(poll)
  } catch (error) {
    req.flash('warning', 'Something went wrong');
    console.log(error)
    res.redirect('/')
  }
}

module.exports = {getForHome, singlePoll, myPoll, createPoll, addPoll, votePoll, deletePoll, pollAPI}