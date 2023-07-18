const express = require("express");
const router = express.Router();

const { checkAuth } = require("../util/auth");

const multer = require("multer");
const { storage } = require("../cloudstorage/cloudinary/index");
const upload = multer({ storage });

const posts = require("../controllers/posts");

router
  .route("/")
  .get(posts.index)
  .post(checkAuth, upload.array("media"), posts.createPost);

router
  .route("/:id")
  .get(posts.showPost)
  .patch(checkAuth, posts.updatePost)
  .delete(checkAuth, posts.deletePost);

module.exports = router;
