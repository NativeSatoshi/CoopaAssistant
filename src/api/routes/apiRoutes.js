// src/api/routes/apiRoutes.js

const express = require('express');
const multer = require('multer');
const { handleUpload } = require('../controllers/uploadController');
const { generateResponse } = require('../controllers/chatController');
// DİKKAT: checkSignature middleware'ini buraya da import ediyoruz.
const { checkSignature, setLanguage, checkAdminAccess } = require('../middlewares/authMiddleware');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Dil middleware'i tüm /api rotaları için geçerli olabilir, bu kalabilir.
router.use(setLanguage);

// --- DEĞİŞİKLİK BURADA BAŞLIYOR ---

// Global imza kontrolünü kaldırıyoruz çünkü her rota için sırası farklı olmalı.
// router.use(checkSignature); // BU SATIRI SİLİYORUZ VEYA YORUMA ALIYORUZ.

// İmza kontrolünü her bir rotaya ayrı ayrı ve doğru sırada ekliyoruz.
// /upload rotası için: ÖNCE multer çalışır, SONRA imza kontrol edilir.
router.post('/upload', upload.single('memoryFile'), checkSignature, checkAdminAccess, handleUpload);

// /generate rotası için: multer'a gerek olmadığından imza kontrolü doğrudan çalışabilir.
router.post('/generate', checkSignature, generateResponse);

// --- DEĞİŞİKLİK BURADA BİTİYOR ---

module.exports = router;