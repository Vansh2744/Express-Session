const express = require("express");
const router = express.Router();
const Controller = require("../controller/signup");

router.get("/", Controller.getSignup);

router.post("/", Controller.postSignup);

module.exports = router;
