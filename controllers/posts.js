const Post = require("../models/post");

const { cloudinary } = require("../cloudstorage/cloudinary/index");

module.exports.index = async (req, res) => {
  const posts = await Post.find({});
  res.json({ posts });
};

module.exports.createPost = async (req, res) => {
  const newPostData = req.body;
  const author = JSON.parse(newPostData.author);
  const post = new Post(newPostData);
  post.medias = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
    mediatype: f.mimetype,
  }));
  post.author = author;
  await post.save();
  res.send({ message: "Post created successfully!!" });
};

module.exports.showPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { ...updatedData },
    { new: true }
  );
  res.send({ message: "Post Updated successfully!!" });
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  post.medias.map((media) => cloudinary.uploader.destroy(media.filename));
  res.send({ message: "Post deleted successfully!!" });
};
