// server.js - TEKRAR EDEN KODLAR TEMİZLENMİŞ NİHAİ SÜRÜM

require('dotenv').config();
const express = require('express');
const path = require('path');
const { google } = require('googleapis');
const coopaCore = require('./coopa-core.js');
const nodemailer = require('nodemailer');
const axios = require('axios');
const db = require('./database.js');
const cron = require('node-cron');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// --- ARAÇ FONKSİYONLARI ---
async function get_current_weather(location) { try { const apiKey = process.env.OPENWEATHERMAP_API_KEY; if (!apiKey) throw new Error("OpenWeatherMap API anahtarı .env dosyasında bulunamadı."); const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=tr`; const response = await axios.get(url); return { konum: response.data.name, sicaklik: response.data.main.temp, durum: response.data.weather[0].description }; } catch (error) { return { hata: `"${location}" için hava durumu bilgisi alınamadı.` }; } }
async function send_email(to, subject, body) { try { const user = process.env.GMAIL_USER; const pass = process.env.GMAIL_APP_PASSWORD; if (!user || !pass) throw new Error("Gmail kullanıcı adı veya Uygulama Şifresi .env dosyasında eksik."); let transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } }); let info = await transporter.sendMail({ from: `"Coopa Asistan" <${user}>`, to, subject, text: body }); return { success: true, message: `E-posta başarıyla ${to} adresine gönderildi.` }; } catch (error) { return { success: false, error: error.message }; } }
async function create_note(noteName, content) { return new Promise((resolve) => { const sql = `INSERT OR REPLACE INTO notes (name, content) VALUES (?, ?)`; db.run(sql, [noteName, content], (err) => { if (err) resolve({ success: false, error: err.message }); else resolve({ success: true, message: `"${noteName}" isimli not başarıyla kaydedildi.` }); }); }); }
async function get_note(noteName) { return new Promise((resolve) => { const sql = `SELECT content FROM notes WHERE name = ?`; db.get(sql, [noteName], (err, row) => { if (err) resolve({ success: false, error: err.message }); else if (row) resolve({ success: true, content: row.content }); else resolve({ success: false, message: `"${noteName}" isminde bir not bulunamadı.` }); }); }); }
async function schedule_reminder(noteName, time) { const [hour, minute] = time.split(':'); if (isNaN(hour) || isNaN(minute)) return { success: false, message: "Geçersiz zaman formatı." }; const cronTime = `${minute} ${hour} * * *`; cron.schedule(cronTime, async () => { const userEmail = process.env.MY_EMAIL_ADDRESS; if (!userEmail) { console.error("MY_EMAIL_ADDRESS .env dosyasında eksik."); return; } const note = await get_note(noteName); if (note.success) { await send_email(userEmail, `Coopa Hatırlatıcısı: ${noteName}`, `Hatırlatma:\n\n${note.content}`); } }, { timezone: "Europe/Istanbul" }); return { success: true, message: `Tamamdır, "${noteName}" notunu sana Türkiye saatiyle ${time}'da hatırlatacağım.` }; }
async function get_current_time() { const now = new Date(); const timeString = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' }); const dateString = now.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Istanbul' }); return { success: true, timeInfo: `Şu an saat ${timeString}, tarih ${dateString}.` }; }
async function create_calendar_event(title, date, time, description = '') { try { const tokens = await new Promise((resolve, reject) => { db.get(`SELECT * FROM google_auth WHERE id = 1`, (err, row) => { if (err) reject(err); resolve(row); }); }); if (!tokens || !tokens.refresh_token) { throw new Error("Kullanıcı için Google kimlik doğrulaması bulunamadı."); } oauth2Client.setCredentials({ refresh_token: tokens.refresh_token }); const calendar = google.calendar({ version: 'v3', auth: oauth2Client }); let eventDate = new Date(`${date}T${time}`); if (eventDate < new Date()) { const today = new Date(); eventDate = new Date(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}T${time}`); } const eventEndTime = new Date(eventDate.getTime() + 60 * 60 * 1000); const event = { summary: title, description: description, start: { dateTime: eventDate.toISOString(), timeZone: 'Europe/Istanbul' }, end: { dateTime: eventEndTime.toISOString(), timeZone: 'Europe/Istanbul' } }; const response = await calendar.events.insert({ calendarId: 'primary', resource: event }); return { success: true, message: `"${title}" etkinliği takviminize başarıyla eklendi.`, event_link: response.data.htmlLink }; } catch (error) { console.error("❌ Google Takvim hatası:", error.message); return { success: false, error: "Takvim etkinliği oluşturulamadı. Lütfen Google izninizi kontrol edin." }; } }

// --- ROUTE'LAR ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/auth/google', (req, res) => { const url = oauth2Client.generateAuthUrl({ access_type: 'offline', scope: ['https.googleapis.com/auth/calendar.events'] }); res.redirect(url); });
app.get('/auth/google/callback', async (req, res) => { const { code } = req.query; try { const { tokens } = await oauth2Client.getToken(code); const sql = `INSERT OR REPLACE INTO google_auth (id, access_token, refresh_token, expiry_date, scope) VALUES (1, ?, ?, ?, ?)`; db.run(sql, [tokens.access_token, tokens.refresh_token, tokens.expiry_date, tokens.scope]); res.redirect('/?auth=success'); } catch (error) { res.redirect('/?auth=error'); } });

app.post('/generate', async (req, res) => {
    try {
        const { prompt, history } = req.body;
        if (!prompt) return res.status(400).json({ error: "Prompt boş olamaz." });
        let currentHistory = [...(history || []), { role: "user", parts: [{ text: prompt }] }];
        while (true) {
            const result = await coopaCore.generateContentFromHistory(currentHistory);
            if (!result || !result.response?.candidates?.[0]?.content?.parts?.[0]) { throw new Error("Yapay zekadan geçersiz cevap alındı."); }
            const part = result.response.candidates[0].content.parts[0];
            currentHistory.push({ role: "model", parts: [part] });
            if (part.functionCall) {
                const { name, args } = part.functionCall;
                if (name === 'send_email') return res.json({ requires_confirmation: true, action_details: args, history: currentHistory });
                let toolResult;
                if (name === 'get_current_weather') toolResult = await get_current_weather(args.location);
                else if (name === 'create_note') toolResult = await create_note(args.noteName, args.content);
                else if (name === 'get_note') toolResult = await get_note(args.noteName);
                else if (name === 'schedule_reminder') toolResult = await schedule_reminder(args.noteName, args.time);
                else if (name === 'get_current_time') toolResult = await get_current_time();
                else if (name === 'create_calendar_event') toolResult = await create_calendar_event(args.title, args.date, args.time, args.description);
                currentHistory.push({ role: "function", parts: [{ functionResponse: { name, response: toolResult } }] });
            } else { break; }
        }
        coopaCore.uploadToIrys(currentHistory.slice(-2));
        res.json({ history: currentHistory });
    } catch (error) {
        const historyWithError = [...(history || []), { role: "user", parts: [{ text: req.body.prompt }] }, { role: "model", parts: [{ text: `Bir hata oluştu: ${error.message}` }] }];
        res.status(500).json({ history: historyWithError });
    }
});

app.post('/execute-action', async (req, res) => {
    try {
        const { actionName, to, subject, body, history } = req.body;
        if (actionName !== 'send_email') throw new Error("Desteklenmeyen eylem.");
        const toolResult = await send_email(to, subject, body);
        let currentHistory = [...(history || [])];
        currentHistory.push({ role: "function", parts: [{ functionResponse: { name: actionName, response: toolResult } }] });
        const finalResponseText = toolResult.success ? `E-posta başarıyla gönderildi.` : `E-posta gönderilemedi. Hata: ${toolResult.error}`;
        currentHistory.push({ role: "model", parts: [{ text: finalResponseText }]});
        coopaCore.uploadToIrys(`ONAYLANDI: E-posta gönderildi. Alıcı: ${to}`);
        res.json({ history: currentHistory });
    } catch (error) {
        res.status(500).json({ error: "Eylem gerçekleştirilirken hata oluştu: " + error.message });
    }
});

app.listen(port, () => {
    console.log(`\n✅ Coopa Asistan (Kararlı Sürüm) başarıyla başlatıldı!`);
    console.log(`   http://localhost:${port} adresinden erişebilirsiniz.`);
});