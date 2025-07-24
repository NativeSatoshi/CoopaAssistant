// server.js - STATELESS (HAFIZASIZ) MİMARİ - NİHAİ SÜRÜM

require('dotenv').config();
const express = require('express');
const path = require('path');
const coopaCore = require('./coopa-core.js');
const nodemailer = require('nodemailer');
const axios = require('axios');

const app = express();
const port = 3000;

// ARTIK SUNUCUDA GEÇMİŞ TUTMUYORUZ!
// let conversationHistory = []; // BU SATIR SİLİNDİ

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- ARAÇ FONKSİYONLARI (DEĞİŞİKLİK YOK) ---
async function get_current_weather(location) {
    try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        if (!apiKey) throw new Error("OpenWeatherMap API anahtarı .env dosyasında bulunamadı.");
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=tr`;
        const response = await axios.get(url);
        return { konum: response.data.name, sicaklik: response.data.main.temp, durum: response.data.weather[0].description, hissedilen_sicaklik: response.data.main.feels_like };
    } catch (error) {
        return { hata: `"${location}" için hava durumu bilgisi alınamadı.` };
    }
}

async function send_email(to, subject, body) {
    try {
        const user = process.env.ETHEREAL_USER;
        const pass = process.env.ETHEREAL_PASS;
        if (!user || !pass) throw new Error("Ethereal .env bilgileri eksik.");
        let transporter = nodemailer.createTransport({ host: "smtp.ethereal.email", port: 587, secure: false, auth: { user, pass } });
        let info = await transporter.sendMail({ from: '"Coopa Asistan" <coopa@example.com>', to, subject, text: body, html: `<b>${body}</b>` });
        const emailUrl = nodemailer.getTestMessageUrl(info);
        return { success: true, message: "E-posta başarıyla gönderildi.", url: emailUrl };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// --- ROUTE'LAR ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/generate', async (req, res) => {
    try {
        // YENİ: prompt VE history'yi istek gövdesinden alıyoruz
        const { prompt, history } = req.body;
        if (!prompt) return res.status(400).json({ error: "Prompt boş olamaz." });

        console.log(`\n🚀 Yeni komut alındı: "${prompt}"`);
        let historyForThisTurn = [...(history || []), { role: "user", parts: [{ text: prompt }] }];
        
        const initialResult = await coopaCore.generateContentFromHistory(historyForThisTurn);
        const functionCall = initialResult.response.candidates[0]?.content?.parts[0]?.functionCall;

        if (functionCall) {
            console.log("🤖 AI bir araç kullanmaya karar verdi:", functionCall.name);
            historyForThisTurn.push(initialResult.response.candidates[0].content);
            const { name, args } = functionCall;

            if (name === 'send_email') {
                console.log("💡 Onay gerekiyor. Kullanıcıya onay bilgileri gönderiliyor.");
                // ONAY GEREKTİĞİNDE, O ANA KADARKİ GEÇMİŞİ DE GERİ GÖNDERİYORUZ
                return res.json({ requires_confirmation: true, action_details: args, history: historyForThisTurn });
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

        coopaCore.uploadToIrys(historyForThisTurn.slice(-2));
        // YENİ: Global geçmişi güncellemek yerine, sadece bu isteğin sonucunu döndürüyoruz
        res.json({ history: historyForThisTurn });

    } catch (error) {
        console.error("❌ /generate rotasında hata:", error.message);
        res.status(500).json({ error: "Sunucu hatası: " + error.message });
    }
});

app.post('/execute-action', async (req, res) => {
    try {
        // YENİ: history'yi istekten alıyoruz
        const { actionName, to, subject, body, history } = req.body;
        if (actionName !== 'send_email') throw new Error("Desteklenmeyen eylem.");

        console.log(`\n👍 Onay alındı! Eylem gerçekleştiriliyor: ${actionName}`);
        const toolResult = await send_email(to, subject, body);
        
        // Bize gönderilen geçmişin üzerine eklemeler yapıyoruz
        let historyForThisTurn = [...(history || [])];
        historyForThisTurn.push({ role: "function", parts: [{ functionResponse: { name: actionName, response: toolResult } }] });
        
        const finalResponseText = toolResult.success 
            ? `E-posta başarıyla gönderildi. Ön izlemesine şu adresten bakabilirsin: ${toolResult.url}`
            : `E-posta gönderilemedi. Hata: ${toolResult.error}`;
        
        historyForThisTurn.push({ role: "model", parts: [{ text: finalResponseText }]});
        
        coopaCore.uploadToIrys(`ONAYLANDI: E-posta gönderildi. Alıcı: ${to}`);
        // YENİ: Güncellenmiş tam geçmişi geri gönderiyoruz
        res.json({ history: historyForThisTurn });

    } catch (error) {
        console.error("❌ /execute-action rotasında hata:", error);
        res.status(500).json({ error: "Eylem gerçekleştirilirken bir hata oluştu: " + error.message });
    }
});

app.listen(port, () => {
    console.log(`\n✅ Sunucu (Hafızasız Mimarî) başarıyla başlatıldı!`);
    console.log(`   http://localhost:${port} adresinden erişebilirsiniz.`);
});