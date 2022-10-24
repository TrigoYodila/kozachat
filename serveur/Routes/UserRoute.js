const express = require('express');

const { getaUser, getAllUsers, getaAllUsers, addUser } = require('../Controllers/UserControllers')

const router = express.Router();

router.get("/:id", getaUser);
router.get("/", getAllUsers);
router.get("/users/:id", getaAllUsers)
module.exports = router;