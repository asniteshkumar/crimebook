const express = require("express");
const router = express.Router();

const users = require("../controllers/users");

router.post("/signup", users.signup);

router.post("/login", users.login);

router.post("/reset", users.reset);

module.exports = router;
