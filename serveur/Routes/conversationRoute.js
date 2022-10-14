const express = require('express');
const { createConversation, userConversations, findConversation } = require('../Controllers/conversationControllers')

const router = express.Router();

//creating endPoints
router.post("/",createConversation)
router.get("/:userId", userConversations)
router.get("/find/:firstId/:secondId", findConversation)

module.exports = router