if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const { storage, cloudinary } = require("./cloudstorage/cloudinary/index");
const upload = multer({ storage });

const { firebaseApp } = require("./cloudstorage/firebase/index");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const firebaseStorage = getStorage(firebaseApp);
const firebaseUpload = multer({ storage: multer.memoryStorage() });

const Post = require("./models/post");
const User = require("./models/user");

mongoose.connect("mongodb://127.0.0.1:27017/crime-book");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post(
  "/document/:id",
  firebaseUpload.single("document"),
  async (req, res) => {
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
  }
);

app.get("/posts", async (req, res) => {
  const posts = await Post.find({});
  res.json({ posts });
});

app.post("/posts", upload.array("media"), async (req, res) => {
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
});

app.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

app.patch("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { ...updatedData },
    { new: true }
  );
  res.send({ message: "Post Updated successfully!!" });
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  post.medias.map((media) => cloudinary.uploader.destroy(media.filename));
  res.send({ message: "Post deleted successfully!!" });
});

const createJSONToken = (userData) => {
  return jwt.sign({ userData }, process.env.JWT_SECRET_KEY, {
    expiresIn: 1800,
  });
};

const validateJSONToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

const checkAuth = (req, res, next) => {
  const authFragments = req.headers.authorization.split(" ");
  const authToken = authFragments[1];
  const validatedToken = validateJSONToken(authToken);
  req.token = validatedToken;
  next();
};

app.post("/signup", async (req, res) => {
  const userData = req.body;
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  userData.password = hashedPassword;
  const user = new User(userData);
  await user.save();
  res.send({ message: "Signup successful!" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    const token = createJSONToken();
    res.json({ token, userId: user._id, username });
  } else {
    res.send({ message: "Invalid username or password" });
  }
});

app.post("/reset", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email });
  if (user) {
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate({email}, {password: hashedPassword})
    res.send({ message: "Password Changed!" });
  } else {
    res.send("Email does not exist!!");
  }
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(8080, () => {
  console.log("Serving on port 8080");
});
