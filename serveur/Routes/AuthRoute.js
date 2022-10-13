const { loginUser, registerUser } = require('../Controllers/AuthControllers')

const express = require("express");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router
// module.exports = router;
