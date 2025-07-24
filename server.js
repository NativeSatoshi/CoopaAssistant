// server.js - KARARLI NİHAİ SÜRÜM

require('dotenv').config();
const express = require('express');
const path = require('path');
const coopaCore = require('./coopa-core.js');
const nodemailer = require('nodemailer');
const axios = require('axios');

const app = express();
const port = 3000;

let conversationHistory = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- ARAÇ FONKSİYONLARI ---
async function get_current_weather(location) {
    console.log(`Gerçek hava durumu API'si çağrılıyor. Lokasyon: ${location}`);
    try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        if (!apiKey) throw new Error("OpenWeatherMap API anahtarı .env dosyasında bulunamadı.");
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=tr`;
        const response = await axios.get(url);
        return {
            konum: response.data.name,
            sicaklik: response.data.main.temp,
            durum: response.data.weather[0].description,
            hissedilen_sicaklik: response.data.main.feels_like
        };
    } catch (error) {
        console.error("Hava durumu API hatası:", error.message);
        return { hata: `"${location}" için hava durumu bilgisi alınamadı.` };
    }
}

async function send_email(to, subject, body) {
    console.log(`E-posta gönderme aracı çalıştırılıyor. Alıcı: ${to}`);
    try {
        const user = process.env.ETHEREAL_USER;
        const pass = process.env.ETHEREAL_PASS;
        if (!user || !pass) throw new Error("Ethereal .env bilgileri eksik.");
        let transporter = nodemailer.createTransport({ host: "smtp.ethereal.email", port: 587, secure: false, auth: { user, pass } });
        let info = await transporter.sendMail({ from: '"Coopa Asistan" <coopa@example.com>', to, subject, text: body, html: `<b>${body}</b>` });
        const emailUrl = nodemailer.getTestMessageUrl(info);
        console.log("✉️ E-posta başarıyla gönderildi. Test URL: %s", emailUrl);
        return { success: true, message: "E-posta başarıyla gönderildi.", url: emailUrl };
    } catch (error) {
        console.error("❌ E-posta gönderme hatası:", error);
        return { success: false, error: error.message };
    }
}

// --- ROUTE'LAR ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/generate', async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        if (!userPrompt) return res.status(400).json({ error: "Prompt boş olamaz." });

        console.log(`\n🚀 Yeni komut alındı: "${userPrompt}"`);
        let historyForThisTurn = [...conversationHistory, { role: "user", parts: [{ text: userPrompt }] }];
        const initialResult = await coopaCore.generateContentFromHistory(historyForThisTurn);
        const functionCall = initialResult.response.candidates[0]?.content?.parts[0]?.functionCall;

        if (functionCall) {
            console.log("🤖 AI bir araç kullanmaya karar verdi:", functionCall.name);
            historyForThisTurn.push(initialResult.response.candidates[0].content);
            const { name, args } = functionCall;

            if (name === 'send_email') {
                console.log("💡 Onay gerekiyor. Kullanıcıya onay bilgileri gönderiliyor.");
                conversationHistory = historyForThisTurn; // Geçmişi bu noktada kaydet
                return res.json({ requires_confirmation: true, action_details: args });
            } 
            else if (name === 'get_current_weather') {
                const toolResult = await get_current_weather(args.location);
                historyForThisTurn.push({ role: "function", parts: [{ functionResponse: { name, response: toolResult } }] });
                const finalResult = await coopaCore.generateContentFromHistory(historyForThisTurn);
                historyForThisTurn.push(finalResult.response.candidates[0].content);
            }
        } else {
            historyForThisTurn.push(initialResult.response.candidates[0].content);
        }

        conversationHistory = historyForThisTurn;
        coopaCore.uploadToIrys(conversationHistory.slice(-2)); // Son kullanıcı ve model cevabını Irys'e yükle
        res.json({ history: conversationHistory });

    } catch (error) {
        console.error("❌ /generate rotasında hata:", error.message);
        res.status(500).json({ error: "Sunucu hatası: " + error.message });
    }
});

app.post('/execute-action', async (req, res) => {
    try {
        const { actionName, to, subject, body } = req.body;
        if (actionName !== 'send_email') throw new Error("Desteklenmeyen eylem.");

        console.log(`\n👍 Onay alındı! Eylem gerçekleştiriliyor: ${actionName}`);
        const toolResult = await send_email(to, subject, body);
        
        conversationHistory.push({ role: "function", parts: [{ functionResponse: { name: actionName, response: toolResult } }] });
        
        const finalResponseText = toolResult.success 
            ? `E-posta başarıyla gönderildi. Ön izlemesine şu adresten bakabilirsin: ${toolResult.url}`
            : `E-posta gönderilemedi. Hata: ${toolResult.error}`;
        
        conversationHistory.push({ role: "model", parts: [{ text: finalResponseText }]});
        
        coopaCore.uploadToIrys(`ONAYLANDI: E-posta gönderildi. Alıcı: ${to}`);
        res.json({ history: conversationHistory });

    } catch (error) {
        console.error("❌ /execute-action rotasında hata:", error);
        res.status(500).json({ error: "Eylem gerçekleştirilirken bir hata oluştu: " + error.message });
    }
});

// --- SUNUCUYU BAŞLATMA ---
app.listen(port, () => {
    console.log(`\n✅ Sunucu (Nihai Sürüm) başarıyla başlatıldı!`);
    console.log(`   http://localhost:${port} adresinden erişebilirsiniz.`);
});