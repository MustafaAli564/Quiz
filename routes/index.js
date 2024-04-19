const express = require('express');
const router = express.Router();

const authRouter = require("./auth");
const foodRouter = require("./food");

router.use("/auth", authRouter);
router.use("/food", foodRouter);

module.exports = router;
