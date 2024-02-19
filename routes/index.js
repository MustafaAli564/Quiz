const express = require('express');
const router = express.Router();

const authRouter = require("./auth");
const showRoomRouter = require("./showRoom");

router.use("/auth", authRouter);
router.use("/showRoom", showRoomRouter);

module.exports = router;
