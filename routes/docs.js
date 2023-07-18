const express = require("express");
const router = express.Router();

const { checkAuth } = require("../util/auth");

const multer = require("multer");
const firebaseUpload = multer({ storage: multer.memoryStorage() });

const docs = require("../controllers/docs");

router.post(
  "/:id",
  checkAuth,
  firebaseUpload.single("document"),
  docs.uploadDocs
);

module.exports = router;
