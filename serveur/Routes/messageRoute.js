const express = require('express');
const {addMessage,getMessage} = require('../Controllers/messageControllers')

const router = express.Router();

router.post('/',addMessage);
router.get('/:conversationId',getMessage)

module.exports = router;