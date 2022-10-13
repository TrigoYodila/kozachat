const passport = require('passport')
const { loginUser, registerUser,protectedUser } = require('../Controllers/AuthControllers')

const express = require("express");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected", passport.authenticate("jwt", { session: false }),protectedUser);

module.exports = router
// module.exports = router;
