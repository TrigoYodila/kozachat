const passport = require('passport')
const { loginUser, registerUser,protectedUser,getUserIdWithToken,getUser } = require('../Controllers/AuthControllers')

const express = require("express");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", getUserIdWithToken);
router.get("/authuser/:userId", getUser);
router.get("/protected", passport.authenticate("jwt", { session: false }),protectedUser);

module.exports = router
// module.exports = router;
