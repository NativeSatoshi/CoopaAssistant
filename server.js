// server.js - HATA MESAJLARI GELİŞTİRİLMİŞ NİHAİ SÜRÜM

require('dotenv').config();
const express = require('express');
const path = require('path');
const coopaCore = require('./coopa-core.js');
const nodemailer = require('nodemailer');
const axios = require('axios');
const db = require('./database.js');
const cron = require('node-cron');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- ARAÇ FONKSİYONLARI ---

async function get_current_weather(location) { /* ...içerik aynı... */ }
async function send_email(to, subject, body) { /* ...içerik aynı... */ }
async function create_note(noteName, content) { /* ...içerik aynı... */ }
async function get_note(noteName) { /* ...içerik aynı... */ }

// DÜZELTME: Bu fonksiyon artık daha net hata mesajları veriyor.
async function schedule_reminder(noteName, time) {
    console.log(`⏰ Yeni hatırlatıcı kuruluyor: Not='${noteName}', Zaman='${time}'`);
    const [hour, minute] = time.split(':');
    
    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        return { success: false, message: "Geçersiz zaman formatı. Lütfen 'HH:MM' formatında belirtin." };
    }
    
    const cronTime = `${minute} ${hour} * * *`;
    
    cron.schedule(cronTime, async () => {
        console.log(`🔔 Hatırlatıcı tetiklendi: '${noteName}' notu gönderiliyor.`);
        const userEmail = process.env.MY_EMAIL_ADDRESS;

        // YENİ: E-posta adresi eksikse, terminale net bir hata bas.
        if (!userEmail) {
            console.error("❌ HATA: Hatırlatıcı e-postası gönderilemedi. Lütfen .env dosyanıza MY_EMAIL_ADDRESS değişkenini ekleyin.");
            return;
        }

        const note = await get_note(noteName);

        if (note.success) {
            const subject = `Coopa Hatırlatıcısı: ${noteName}`;
            const body = `Merhaba, bu sana "${noteName}" notun için bir hatırlatma:\n\n---\n${note.content}\n---`;
            await send_email(userEmail, subject, body);
        } else {
            console.error(`❌ HATA: Hatırlatıcı e-postası gönderilemedi. '${noteName}' notu veritabanında bulunamadı.`);
        }
    }, {
        scheduled: true,
        timezone: "Europe/Istanbul" // Türkiye saat dilimini kullan
    });

    return { success: true, message: `Tamamdır, "${noteName}" notunu sana Türkiye saatiyle ${time}'da hatırlatacağım.` };
}

// ... (dosyanın geri kalanı öncekiyle tamamen aynı)

// --- ROUTE'LAR VE DİĞER FONKSİYONLAR ---
// Fonksiyonların tam içerikleri (kopyala-yapıştır kolaylığı için)
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });
async function get_current_weather(location) { try { const apiKey = process.env.OPENWEATHERMAP_API_KEY; if (!apiKey) throw new Error("OpenWeatherMap API anahtarı .env dosyasında bulunamadı."); const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=tr`; const response = await axios.get(url); return { konum: response.data.name, sicaklik: response.data.main.temp, durum: response.data.weather[0].description, hissedilen_sicaklik: response.data.main.feels_like }; } catch (error) { return { hata: `"${location}" için hava durumu bilgisi alınamadı.` }; } }
async function send_email(to, subject, body) { try { const user = process.env.ETHEREAL_USER; const pass = process.env.ETHEREAL_PASS; if (!user || !pass) throw new Error("Ethereal .env bilgileri eksik."); let transporter = nodemailer.createTransport({ host: "smtp.ethereal.email", port: 587, secure: false, auth: { user, pass } }); let info = await transporter.sendMail({ from: '"Coopa Asistan" <coopa@example.com>', to, subject, text: body, html: `<b>${body}</b>` }); const emailUrl = nodemailer.getTestMessageUrl(info); console.log("✉️ E-posta başarıyla gönderildi. Test URL: %s", emailUrl); return { success: true, message: "E-posta başarıyla gönderildi.", url: emailUrl }; } catch (error) { console.error("❌ E-posta gönderme hatası:", error); return { success: false, error: error.message }; } }
async function create_note(noteName, content) { return new Promise((resolve, reject) => { const sql = `INSERT OR REPLACE INTO notes (name, content) VALUES (?, ?)`; db.run(sql, [noteName, content], function(err) { if (err) { console.error("Veritabanı hatası (not oluşturma):", err.message); reject({ success: false, error: err.message }); } else { console.log(`✅ Not başarıyla oluşturuldu/güncellendi: ${noteName}`); resolve({ success: true, message: `"${noteName}" isimli not başarıyla oluşturuldu/güncellendi.` }); } }); }); }
async function get_note(noteName) { return new Promise((resolve, reject) => { const sql = `SELECT content FROM notes WHERE name = ?`; db.get(sql, [noteName], (err, row) => { if (err) { console.error("Veritabanı hatası (not okuma):", err.message); reject({ success: false, error: err.message }); } else { if (row) { console.log(`✅ Not bulundu ve okundu: ${noteName}`); resolve({ success: true, content: row.content }); } else { console.log(`🟡 Not bulunamadı: ${noteName}`); resolve({ success: false, message: `"${noteName}" isminde bir not bulunamadı.` }); } } }); }); }
app.post('/generate', async (req, res) => { try { const { prompt, history } = req.body; if (!prompt) return res.status(400).json({ error: "Prompt boş olamaz." }); let historyForThisTurn = [...(history || []), { role: "user", parts: [{ text: prompt }] }]; const initialResult = await coopaCore.generateContentFromHistory(historyForThisTurn); const functionCall = initialResult.response.candidates[0]?.content?.parts[0]?.functionCall; if (functionCall) { historyForThisTurn.push(initialResult.response.candidates[0].content); const { name, args } = functionCall; let toolResult; if (name === 'send_email') { return res.json({ requires_confirmation: true, action_details: args, history: historyForThisTurn }); } else if (name === 'get_current_weather') { toolResult = await get_current_weather(args.location); } else if (name === 'create_note') { toolResult = await create_note(args.noteName, args.content); } else if (name === 'get_note') { toolResult = await get_note(args.noteName); } else if (name === 'schedule_reminder') { toolResult = await schedule_reminder(args.noteName, args.time); } if (name !== 'send_email') { historyForThisTurn.push({ role: "function", parts: [{ functionResponse: { name, response: toolResult } }] }); const finalResult = await coopaCore.generateContentFromHistory(historyForThisTurn); historyForThisTurn.push(finalResult.response.candidates[0].content); } } else { historyForThisTurn.push(initialResult.response.candidates[0].content); } coopaCore.uploadToIrys(historyForThisTurn.slice(-2)); res.json({ history: historyForThisTurn }); } catch (error) { console.error("❌ /generate rotasında hata:", error.message); res.status(500).json({ error: "Sunucu hatası: " + error.message }); } });
app.post('/execute-action', async (req, res) => { try { const { actionName, to, subject, body, history } = req.body; if (actionName !== 'send_email') throw new Error("Desteklenmeyen eylem."); const toolResult = await send_email(to, subject, body); let historyForThisTurn = [...(history || [])]; historyForThisTurn.push({ role: "function", parts: [{ functionResponse: { name: actionName, response: toolResult } }] }); const finalResponseText = toolResult.success ? `E-posta başarıyla gönderildi. Ön izlemesine şu adresten bakabilirsin: ${toolResult.url}` : `E-posta gönderilemedi. Hata: ${toolResult.error}`; historyForThisTurn.push({ role: "model", parts: [{ text: finalResponseText }]}); coopaCore.uploadToIrys(`ONAYLANDI: E-posta gönderildi. Alıcı: ${to}`); res.json({ history: historyForThisTurn }); } catch (error) { console.error("❌ /execute-action rotasında hata:", error); res.status(500).json({ error: "Eylem gerçekleştirilirken bir hata oluştu: " + error.message }); } });
app.listen(port, () => { console.log(`\n✅ Sunucu (Zamanlayıcı Aktif) başarıyla başlatıldı!`); console.log(`   http://localhost:${port} adresinden erişebilirsiniz.`); });