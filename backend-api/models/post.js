const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  medias: [
    {
      url: String,
      filename: String,
      mediatype: String,
    },
  ],
  location: String,
  description: String,
  author: {
    id: String,
    username: String,
  },
  document: String,
});

module.exports = mongoose.model("Post", PostSchema);
