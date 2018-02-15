const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let PollSchema = new Schema({
  slugname: String,
  pollname: String,
  options: [
    {
      name: String,
      vote: { type: Number, default: 1 }
    }
  ],
  author: String,
  created: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("Poll", PollSchema);
