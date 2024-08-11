const express = require("express");
const router = express.Router();
const Controller = require("../controller/page");

router.get("/", Controller.getPage);

module.exports = router;
