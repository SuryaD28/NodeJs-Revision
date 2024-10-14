const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  data: Buffer,
  size: Number,
  uploadDate: { type: Date, default: Date.now },
});

const File = mongoose.model("File", fileSchema, "File");

module.exports = File;
