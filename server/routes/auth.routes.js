const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const checkRole = require("../middleware/checkRole");

router.post("/login", authController.handleLogin);
router.post("/register", authController.handleRegister);
router.get("/me", checkRole([]), authController.handleGetIdentity);

module.exports = router;
