const express = require('express');
const router = express.Router();
const { sendMessage, getChatHistory, getConversations, deleteConversation } = require('../controllers/chat.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Semua route chat butuh login
router.use(verifyToken);

router.post('/', sendMessage);
router.get('/conversations', getConversations);
router.get('/history/:conversationId', getChatHistory);
router.delete('/conversations/:conversationId', deleteConversation);

module.exports = router;