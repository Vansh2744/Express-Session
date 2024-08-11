const express = require("express");
const { getLoginController } = require("../controller/login");
const router = express.Router();
const Controller = require("../controller/login");

router.get("/", Controller.getLogin);

router.post("/", Controller.postLogin);

module.exports = router;
