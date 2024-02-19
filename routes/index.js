const express = require('express');
const router = express.Router(); // Create a router instance

const authRouter = require("./auth");
router.use("/auth", authRouter);

module.exports = router;
