//This file is for UserInfo .js

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema, "User");

module.exports = User;
