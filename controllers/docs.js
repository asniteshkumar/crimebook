const Post = require("../models/post");

const { firebaseApp } = require("../cloudstorage/firebase/index");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const firebaseStorage = getStorage(firebaseApp);

module.exports.uploadDocs = async (req, res) => {
  const dateTime = new Date();
  const storageRef = ref(
    firebaseStorage,
    `CrimeBook/${req.file.originalname + " " + dateTime}`
  );
  const metaData = {
    contentType: req.file.mimetype,
  };
  const snapshot = await uploadBytesResumable(
    storageRef,
    req.file.buffer,
    metaData
  );
  const downloadURL = await getDownloadURL(snapshot.ref);

  const { id } = req.params;
  const post = await Post.findById(id);
  post.document = downloadURL;
  post.save();
  res.send({ message: "Document Uploaded successfully!!" });
};
