const express = require("express");
const router = express.Router();
const apiAuthContoller = require("../../api/AuthAPI")
router.post('/login',apiAuthContoller.login);
module.exports= router;
