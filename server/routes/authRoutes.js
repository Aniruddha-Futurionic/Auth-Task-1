const express = require("express");
const { signup, login, forgotPassword, resetPassword,getQuestion } = require("../Controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/get-question", getQuestion)

module.exports = router