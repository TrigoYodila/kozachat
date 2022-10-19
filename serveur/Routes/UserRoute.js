const express = require('express');

const { getaUser, getAllUsers } = require('../Controllers/UserControllers')

const router = express.Router();

router.get("/:id", getaUser);
router.get("/", getAllUsers);

module.exports = router;