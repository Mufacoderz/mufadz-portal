const db = require("../config/db");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `Kamu adalah asisten AI yang membantu dan berpengetahuan luas bernama "Mufadz Assistant".
Kamu memahami ajaran Islam dengan baik dan bisa menjawab pertanyaan seputar Al-Quran, hadits, fiqih, doa, 
dan kehidupan sehari-hari dari perspektif Islam. Untuk topik umum, kamu tetap membantu dengan bijak dan santun.
Jawab selalu dalam bahasa yang sama dengan pertanyaan user. Gunakan bahasa yang hangat, ramah, dan mudah dipahami.`;

// GET /api/chat/history/:conversationId
const getChatHistory = async (req, res) => {
    const { conversationId } = req.params;
    const userId = req.user.id;

    try {
        const [rows] = await db.query(
            `SELECT role, content, created_at 
       FROM chat_messages 
       WHERE user_id = ? AND conversation_id = ?
       ORDER BY created_at ASC
       LIMIT 50`,
            [userId, conversationId],
        );
        res.json({ success: true, messages: rows });
    } catch (error) {
        console.error("getChatHistory error:", error);
        res
            .status(500)
            .json({ success: false, message: "Gagal mengambil history chat" });
    }
};

// GET /api/chat/conversations
const getConversations = async (req, res) => {
    const userId = req.user.id;

    try {
        const [rows] = await db.query(
            `SELECT 
         conversation_id,
         MIN(created_at) as started_at,
         COUNT(*) as message_count,
         (SELECT content FROM chat_messages cm2 
          WHERE cm2.conversation_id = cm.conversation_id 
            AND cm2.user_id = ? AND cm2.role = 'user'
          ORDER BY created_at ASC LIMIT 1) as first_message
       FROM chat_messages cm
       WHERE user_id = ?
       GROUP BY conversation_id
       ORDER BY started_at DESC
       LIMIT 20`,
            [userId, userId],
        );
        res.json({ success: true, conversations: rows });
    } catch (error) {
        console.error("getConversations error:", error);
        res
            .status(500)
            .json({ success: false, message: "Gagal mengambil daftar percakapan" });
    }
};

// POST /api/chat
const sendMessage = async (req, res) => {
    const { message, conversationId } = req.body;
    const userId = req.user.id;

    if (!message || !message.trim()) {
        return res
            .status(400)
            .json({ success: false, message: "Pesan tidak boleh kosong" });
    }

    if (!conversationId) {
        return res
            .status(400)
            .json({ success: false, message: "conversationId diperlukan" });
    }

    try {
        // Ambil history percakapan dari DB
        const [historyRows] = await db.query(
            `SELECT role, content FROM chat_messages 
       WHERE user_id = ? AND conversation_id = ?
       ORDER BY created_at ASC
       LIMIT 20`,
            [userId, conversationId],
        );

        // Build history untuk Gemini (format: {role, parts})
        const history = historyRows.map((row) => ({
            role: row.role === "assistant" ? "model" : "user",
            parts: [{ text: row.content }],
        }));

        // Init Gemini model
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_PROMPT,
        });

        // Start chat dengan history
        const chat = model.startChat({ history });

        // Kirim pesan user
        const result = await chat.sendMessage(message.trim());
        const aiResponse = result.response.text();

        // Simpan pesan user & AI ke DB
        await db.query(
            `INSERT INTO chat_messages (user_id, conversation_id, role, content) VALUES (?, ?, 'user', ?)`,
            [userId, conversationId, message.trim()],
        );
        await db.query(
            `INSERT INTO chat_messages (user_id, conversation_id, role, content) VALUES (?, ?, 'assistant', ?)`,
            [userId, conversationId, aiResponse],
        );

        res.json({ success: true, reply: aiResponse });
    } catch (error) {
        console.error("sendMessage error:", error);

        // Handle Gemini rate limit (429)
        if (
            error.status === 429 ||
            (error.message && error.message.includes("429"))
        ) {
            return res.status(429).json({
                success: false,
                message: "RATE_LIMIT",
            });
        }

        res
            .status(500)
            .json({ success: false, message: "Terjadi kesalahan pada server" });
    }
};

// DELETE /api/chat/conversations/:conversationId
const deleteConversation = async (req, res) => {
    const { conversationId } = req.params;
    const userId = req.user.id;

    try {
        await db.query(
            `DELETE FROM chat_messages WHERE user_id = ? AND conversation_id = ?`,
            [userId, conversationId],
        );
        res.json({ success: true, message: "Percakapan berhasil dihapus" });
    } catch (error) {
        console.error("deleteConversation error:", error);
        res
            .status(500)
            .json({ success: false, message: "Gagal menghapus percakapan" });
    }
};

module.exports = {
    sendMessage,
    getChatHistory,
    getConversations,
    deleteConversation,
};
