const mongoose = require("mongoose");
const Poll = require("../models/poll");
const slug = require("slug");
const ip = require('ip');

const date = (data) => {
  let myDate = new Date(data)
  return myDate.toDateString();
}

const getForHome = async (req, res) => {
  const poll = await Poll.find();
  res.render("home", { user: req.user, title: "Voting App", poll , date: date });
}

const singlePoll = async (req, res) => {
  const pollName = req.params.slug;
  const poll = await Poll.findOne({ slugname: pollName });
  res.render("single-poll", { user: req.user, title: 'Voting App | ' + poll.pollname , poll });
}
const myPoll = async (req, res) => {
  const myPoll = await Poll.find({author: req.user.username});
  res.render("my-polls", { user: req.user, title: "Voting App | My Polls", poll: myPoll });
}
const createPoll =  (req, res) => {
  res.render("create_poll", {
    user: req.user,
    title: "Voting App | Create Poll"
  });
}
const addPoll =  async (req, res) => {
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
  res.redirect(`/polls/${slugname}`);
}

const votePoll = async (req, res) => {
  const pollName = req.params.slugname;
  const ipaddress = ip.address();
  const poll = await Poll.findOne({ slugname: pollName });
  const voteVal = poll.options.find(data => data.name === req.body.vote);
  if(voteVal.ipaddress === ipaddress){
    req.flash('error', 'You cannot vote a option twice!')
    res.redirect(`/polls/${pollName}`)
  }else{
    voteVal.vote += 1;
    voteVal.ipaddress = ipaddress;
    const newPoll = await poll.save();
    res.redirect(`/polls/${pollName}`);
  }
}

const deletePoll = async (req,res) => {
  const pollName = req.params.slug;
  const poll = await Poll.findOneAndRemove({ slugname: pollName });
  res.redirect('/my-polls')
}

const pollAPI = async (req,res) => {
  const poll = await Poll.find();
  res.json(poll)
}

module.exports = {getForHome, singlePoll, myPoll, createPoll, addPoll, votePoll, deletePoll, pollAPI}