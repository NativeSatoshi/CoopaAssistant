// server.js - BASİTLEŞTİRİLMİŞ NOT FONKSİYONLARI İLE NİHAİ SÜRÜM

require('dotenv').config();
const express = require('express');
const path = require('path');
const { google } = require('googleapis');
const coopaCore = require('./coopa-core.js');
const nodemailer = require('nodemailer');
const axios = require('axios');
const { db, initializeDB } = require('./database.js');
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

// --- YARDIMCI FONKSİYONLAR ---
async function get_current_weather(location) { try { const apiKey = process.env.OPENWEATHERMAP_API_KEY; if (!apiKey) throw new Error("OpenWeatherMap API anahtarı .env dosyasında bulunamadı."); const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=tr`; const response = await axios.get(url); return { konum: response.data.name, sicaklik: response.data.main.temp, durum: response.data.weather[0].description }; } catch (error) { return { hata: `"${location}" için hava durumu bilgisi alınamadı.` }; } }
async function send_email(to, subject, body) { try { const user = process.env.GMAIL_USER; const pass = process.env.GMAIL_APP_PASSWORD; if (!user || !pass) throw new Error("Gmail kullanıcı adı veya Uygulama Şifresi .env dosyasında eksik."); let transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } }); await transporter.sendMail({ from: `"Coopa Asistan" <${user}>`, to, subject, text: body }); return { success: true, message: `E-posta başarıyla ${to} adresine gönderildi.` }; } catch (error) { return { success: false, error: error.message }; } }
async function create_note(noteName, content) { return new Promise((resolve) => { const sql = `INSERT OR REPLACE INTO notes (name, content) VALUES (?, ?)`; db.run(sql, [noteName, content], function(err) { if (err) { resolve({ success: false, error: err.message }); } else { resolve({ success: true, message: `"${noteName}" notu kaydedildi. Yeni içerik: ${content}` }); } }); }); }
async function get_current_time() { const now = new Date(); const timeString = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' }); const dateString = now.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Istanbul' }); return { success: true, timeInfo: `Şu an saat ${timeString}, tarih ${dateString}.` }; }
async function create_calendar_event(title, date, time, description = '') { try { const tokens = await new Promise((resolve, reject) => { db.get(`SELECT * FROM google_auth WHERE id = 1`, (err, row) => { if (err) reject(err); resolve(row); }); }); if (!tokens || !tokens.refresh_token) { throw new Error("Google kimlik doğrulaması bulunamadı."); } oauth2Client.setCredentials({ refresh_token: tokens.refresh_token }); const calendar = google.calendar({ version: 'v3', auth: oauth2Client }); let eventDateStr; if (!date || date.toLowerCase() === 'bugün') { const today = new Date(); eventDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; } else { eventDateStr = date; } const eventDateTime = new Date(`${eventDateStr}T${time}`); if (isNaN(eventDateTime.getTime())) { throw new Error(`Geçersiz tarih/saat formatı.`); } const eventEndTime = new Date(eventDateTime.getTime() + 60 * 60 * 1000); const event = { summary: title, description, start: { dateTime: eventDateTime.toISOString(), timeZone: 'Europe/Istanbul' }, end: { dateTime: eventEndTime.toISOString(), timeZone: 'Europe/Istanbul' } }; const response = await calendar.events.insert({ calendarId: 'primary', resource: event }); return { success: true, message: `"${title}" etkinliği takviminize eklendi.`, event_link: response.data.htmlLink }; } catch (error) { return { success: false, error: `Takvim etkinliği oluşturulamadı: ${error.message}` }; } }

// GÜNCELLEME: get_note fonksiyonu artık AI için daha basit bir çıktı (doğrudan metin) üretiyor.
async function get_note(noteName) {
    return new Promise((resolve) => {
        const sql = `SELECT content FROM notes WHERE name = ?`;
        db.get(sql, [noteName], (err, row) => {
            if (err) {
                resolve(`"${noteName}" notunu okurken bir veritabanı hatası oluştu: ${err.message}`);
            } else if (row) {
                resolve(row.content || "(notun içeriği boş)");
            } else {
                resolve(`"${noteName}" isminde bir not bulunamadı.`);
            }
        });
    });
}

// GÜNCELLEME: edit_note fonksiyonu, get_note'un yeni metin tabanlı çıktısına göre güncellendi.
async function edit_note(noteName, newContent) {
    const existingContent = await get_note(noteName);
    if (existingContent.includes("bulunamadı") || existingContent.includes("hatası oluştu")) {
        return { success: false, message: existingContent };
    }
    const updatedContent = (existingContent && existingContent !== "(notun içeriği boş)")
        ? existingContent + ", " + newContent
        : newContent;
    return create_note(noteName, updatedContent);
}

async function schedule_task(args) { const { noteName, subject, body, time } = args; if (!time) { return { success: false, message: "Görevi zamanlamak için bir saat belirtmelisiniz." }; } const [hour, minute] = time.split(':'); if (isNaN(hour) || isNaN(minute)) { return { success: false, message: "Geçersiz zaman formatı. Lütfen 'HH:MM' formatında belirtin." }; } const cronTime = `${minute} ${hour} * * *`; const targetEmail = process.env.MY_EMAIL_ADDRESS; if (!targetEmail) { return { success: false, message: "Hedef e-posta adresi MY_EMAIL_ADDRESS .env dosyasında bulunamadı." }; } let emailSubject = subject; let emailBody = body; if (noteName) { const noteContent = await get_note(noteName); if (noteContent.includes("bulunamadı") || noteContent.includes("hatası oluştu")) { return { success: false, message: `'${noteName}' isimli not bulunamadığı için görev zamanlanamadı.` }; } emailSubject = `Coopa Hatırlatıcısı: ${noteName}`; emailBody = `Hatırlatma:\n\n${noteContent}`; } if (!emailSubject || !emailBody) { return { success: false, message: "E-postayı zamanlamak için konu ve içerik bilgisi gereklidir." }; } console.log(`[Zamanlayıcı] Yeni görev zamanlandı. Konu: ${emailSubject}, Zaman: ${cronTime}`); const task = cron.schedule(cronTime, async () => { console.log(`[Zamanlayıcı] Zamanlanmış görev tetiklendi. Gönderiliyor: ${emailSubject}`); await send_email(targetEmail, emailSubject, emailBody); task.stop(); }, { timezone: "Europe/Istanbul", scheduled: true }); return { success: true, message: `Görev başarıyla zamanlandı. "${emailSubject}" konusu saat ${time}'da size hatırlatılacak.` }; }

// --- ROTALAR ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/auth/google', (req, res) => { const url = oauth2Client.generateAuthUrl({ access_type: 'offline', prompt: 'consent', scope: ['https://www.googleapis.com/auth/calendar.events'] }); res.redirect(url); });
app.get('/auth/google/callback', async (req, res) => { try { const { code } = req.query; const { tokens } = await oauth2Client.getToken(code); const sql = `INSERT OR REPLACE INTO google_auth (id, access_token, refresh_token, expiry_date, scope) VALUES (1, ?, ?, ?, ?)`; db.run(sql, [tokens.access_token, tokens.refresh_token, tokens.expiry_date, tokens.scope]); res.redirect('/?auth=success'); } catch (error) { res.redirect('/?auth=error'); }});
app.post('/generate', async (req, res) => {
    console.log(`\n[İstek] /generate <- Prompt: "${req.body.prompt}"`);
    try {
        const { prompt, history } = req.body;
        if (!prompt) return res.status(400).json({ error: "Prompt boş olamaz." });
        let currentHistory = [...(history || []), { role: "user", parts: [{ text: prompt }] }];
        while (true) {
            const result = await coopaCore.generateContentFromHistory(currentHistory);
            if (!result.response?.candidates?.[0]?.content?.parts?.[0]) { throw new Error("Yapay zekadan geçersiz cevap alındı."); }
            const part = result.response.candidates[0].content.parts[0];
            currentHistory.push({ role: "model", parts: [part] });
            if (part.functionCall) {
                console.log(`[Araç Çağrısı] -> ${part.functionCall.name}`);
                const { name, args } = part.functionCall;
                if (name === 'send_email') return res.json({ requires_confirmation: true, action_details: args, history: currentHistory });
                
                let toolResult;
                if (name === 'get_note') {
                    toolResult = await get_note(args.noteName);
                } else if (name === 'get_current_weather') {
                    toolResult = await get_current_weather(args.location);
                } else if (name === 'create_note') {
                    toolResult = await create_note(args.noteName, args.content);
                } else if (name === 'edit_note') {
                    toolResult = await edit_note(args.noteName, args.newContent);
                } else if (name === 'schedule_task') {
                    toolResult = await schedule_task(args);
                } else if (name === 'get_current_time') {
                    toolResult = await get_current_time();
                } else if (name === 'create_calendar_event') {
                    toolResult = await create_calendar_event(args.title, args.date, args.time, args.description);
                }
                
                currentHistory.push({ role: "function", parts: [{ functionResponse: { name, response: { result: toolResult } } }] });

            } else { break; }
        }
        coopaCore.uploadToIrys(currentHistory.slice(-2));
        res.json({ history: currentHistory });
    } catch (error) {
        console.error("❌ /generate rotasında hata:", error.message);
        const errHistory = [...(req.body.history || []), { role: "user", parts: [{ text: req.body.prompt }] }, { role: "model", parts: [{ text: `Bir hata oluştu: ${error.message}` }] }];
        res.status(500).json({ history: errHistory });
    }
});
app.post('/execute-action', async (req, res) => { try { const { actionName, to, subject, body, history } = req.body; if (actionName !== 'send_email') throw new Error("Desteklenmeyen eylem."); const toolResult = await send_email(to, subject, body); let currentHistory = [...(history || [])]; currentHistory.push({ role: "function", parts: [{ functionResponse: { name: actionName, response: toolResult } }] }); const finalResponseText = toolResult.success ? `E-posta başarıyla gönderildi.` : `E-posta gönderilemedi: ${toolResult.error}`; currentHistory.push({ role: "model", parts: [{ text: finalResponseText }]}); coopaCore.uploadToIrys(`ONAYLANDI: E-posta gönderildi. Alıcı: ${to}`); res.json({ history: currentHistory }); } catch (error) { res.status(500).json({ error: "Eylemde hata: " + error.message }); }});

// --- SUNUCUYU BAŞLATAN ANA FONKSİYON ---
const startServer = async () => {
    try {
        await initializeDB();
        console.log("Veritabanı hazır, sunucu başlatılıyor...");
        app.listen(port, () => {
            console.log(`\n✅ Coopa Asistan (Kararlı Sürüm) başarıyla başlatıldı!`);
            console.log(`   http://localhost:${port} adresinden erişebilirsiniz.`);
        });
    } catch (error) {
        console.error("❌ Sunucu başlatılamadı:", error);
        process.exit(1);
    }
};

startServer();