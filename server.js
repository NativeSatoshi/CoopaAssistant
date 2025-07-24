// server.js - HATA GİDERİLMİŞ NİHAİ SÜRÜM

require('dotenv').config(); // .env dosyasındaki değişkenleri yüklemek için
const express = require('express');
const path = require('path');
const coopaCore = require('./coopa-core.js');
const nodemailer = require('nodemailer');
const axios = require('axios');

const app = express();
const port = 3000;

// --- UYGULAMA HAFIZASI ---
let conversationHistory = [];

// --- MIDDLEWARE'LER ---
// Gelen isteklerin gövdesini (body) doğru bir şekilde ayrıştırmak için
// bu iki middleware'in rotalardan ÖNCE tanımlanması gerekir.
app.use(express.urlencoded({ extended: true })); // HTML formlarından gelen veriler için
app.use(express.json());                        // JSON formatında gönderilen veriler için (EKLENDİ)


// --- ARAÇ FONKSİYONLARI ---

async function get_current_weather(location) {
    console.log(`Gerçek hava durumu API'si çağrılıyor. Lokasyon: ${location}`);
    try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        if (!apiKey) {
            throw new Error("OpenWeatherMap API anahtarı .env dosyasında bulunamadı.");
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=tr`;
        
        const response = await axios.get(url);
        
        const weatherData = {
            konum: response.data.name,
            sicaklik: response.data.main.temp,
            durum: response.data.weather[0].description,
            hissedilen_sicaklik: response.data.main.feels_like
        };
        console.log("API'den gelen hava durumu verisi:", weatherData);
        return weatherData;

    } catch (error) {
        console.error("Hava durumu verisi alınırken hata oluştu:", error.response ? error.response.data.message : error.message);
        return { hata: `"${location}" için hava durumu bilgisi alınamadı. Lütfen şehir adını kontrol edin.` };
    }
}

async function send_email(to, subject, body) {
    console.log(`E-posta gönderme aracı çalıştırılıyor. Alıcı: ${to}`);
    try {
        const user = process.env.ETHEREAL_USER; const pass = process.env.ETHEREAL_PASS;
        if (!user || !pass) throw new Error("Ethereal .env bilgileri eksik.");
        let transporter = nodemailer.createTransport({ host: "smtp.ethereal.email", port: 587, secure: false, auth: { user, pass } });
        let info = await transporter.sendMail({ from: '"Coopa Asistan" <coopa@example.com>', to, subject, text: body, html: `<b>${body}</b>` });
        const emailUrl = nodemailer.getTestMessageUrl(info);
        console.log("✉️ E-posta başarıyla gönderildi. Test URL: %s", emailUrl);
        return { success: true, message: "E-posta başarıyla gönderildi.", url: emailUrl };
    } catch (error) {
        console.error("❌ HATA: E-posta gönderilirken hata oluştu:", error);
        return { success: false, error: error.message };
    }
}

// --- HTML OLUŞTURMA FONKSİYONLARI ---
function getConfirmationHTML(args) {return `<!DOCTYPE html><html lang="tr"><head><title>İşlem Onayı</title><style>body{font-family:sans-serif; margin: 40px; line-height: 1.6;} .container{max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;} button, a {display: inline-block; padding: 10px 20px; text-decoration: none; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin-right: 10px;} .confirm {background-color: #28a745; color: white;} .cancel {background-color: #dc3545; color: white;}</style></head><body><div class="container"><h2>Lütfen Onaylayın</h2><p>Aşağıdaki e-postayı göndermek üzeresiniz:</p><ul><li><strong>Alıcı:</strong> ${args.to}</li><li><strong>Konu:</strong> ${args.subject}</li><li><strong>İçerik:</strong><pre>${args.body}</pre></li></ul><p>Bu işlemi onaylıyor musunuz?</p><form action="/execute-action" method="POST"><input type="hidden" name="actionName" value="send_email"><input type="hidden" name="to" value="${args.to}"><input type="hidden" name="subject" value="${args.subject}"><input type="hidden" name="body" value="${args.body}"><button type="submit" class="confirm">Evet, Gönder</button><a href="/" class="cancel">Hayır, İptal Et</a></form></div></body></html>`;}
function getSuccessHTML(finalAnswer, receipt) { const receiptHTML = receipt ? `<hr><h3>Irys İşlem ID:</h3><p>${receipt.id}</p><p><a href="https://gateway.irys.xyz/${receipt.id}" target="_blank">Kaydı Blok Zincirinde Görüntüle</a></p>` : ''; return `<!DOCTYPE html><html lang="tr"><head><title>İşlem Tamamlandı</title><style>body{font-family:sans-serif; margin: 40px;}</style></head><body><h1>İşlem Başarılı!</h1><h3>Yanıt:</h3><div style="background-color:#f0f0f0; border:1px solid #ccc; padding:10px; border-radius:5px; white-space: pre-wrap;">${finalAnswer}</div>${receiptHTML}<br><a href="/">Yeni Bir Sorgu Yap</a></body></html>`;}


// --- SAYFA ROUTE'LARI ---
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')); });

app.post('/generate', async (req, res) => {
    try {
        const userPrompt = req.body.prompt; // Bu satır artık hata vermeyecek
        if (!userPrompt) {
            return res.status(400).send(`<h1>Hata</h1><p>İstek gövdesinde 'prompt' alanı bulunamadı. Lütfen isteğinizi kontrol edin.</p>`);
        }
        
        console.log(`\n🚀 Yeni komut alındı: "${userPrompt}"`);
        const { response, chat } = await coopaCore.generateAIMessage(userPrompt, conversationHistory);
        const functionCall = response.candidates[0]?.content?.parts[0]?.functionCall;

        if (functionCall) {
            console.log("🤖 AI bir araç kullanmaya karar verdi:", functionCall.name);
            const { name, args } = functionCall;
            
            conversationHistory.push({ role: "user", parts: [{ text: userPrompt }] });
            conversationHistory.push({ role: "model", parts: response.candidates[0].content.parts });

            if (name === 'send_email') {
                console.log("💡 Onay gerekiyor. Kullanıcıya onay ekranı gösteriliyor.");
                return res.send(getConfirmationHTML(args));
            } 
            else if (name === 'get_current_weather') {
                console.log("🌤️ Hava durumu aracı tetiklendi.");
                const toolResult = await get_current_weather(args.location);
                
                const result = await chat.sendMessage(JSON.stringify({
                    functionResponse: { name, response: toolResult }
                }));
                
                const finalAnswer = result.response.candidates[0].content.parts[0].text;
                console.log("✅ AI, hava durumu verisini yorumlayarak nihai cevabı üretti.");
                
                conversationHistory.push({ role: "function", parts: [{ functionResponse: { name, response: toolResult } }] });
                conversationHistory.push({ role: "model", parts: [{ text: finalAnswer }] });
                
                const receipt = await coopaCore.uploadToIrys(finalAnswer);
                res.send(getSuccessHTML(finalAnswer, receipt));
            }

        } else {
            const finalAnswer = response.candidates[0].content.parts[0].text;
            console.log("✅ AI doğrudan metin yanıtı üretti.");
            conversationHistory.push({ role: "user", parts: [{ text: userPrompt }] });
            conversationHistory.push({ role: "model", parts: [{ text: finalAnswer }] });
            const receipt = await coopaCore.uploadToIrys(finalAnswer);
            res.send(getSuccessHTML(finalAnswer, receipt));
        }
    } catch (error) {
        console.error("❌ /generate rotasında hata:", error);
        res.status(500).send(`<h1>Bir Hata Oluştu</h1><p>${error.message}</p>`);
    }
});

app.post('/execute-action', async (req, res) => { 
    try { 
        const { actionName, to, subject, body } = req.body; 
        console.log(`\n👍 Onay alındı! Eylem gerçekleştiriliyor: ${actionName}`); 
        let toolResult; 
        if (actionName === 'send_email') { 
            toolResult = await send_email(to, subject, body); 
        } else { 
            throw new Error("Desteklenmeyen eylem."); 
        } 
        
        if (toolResult.success) { 
            const finalAnswer = `E-posta başarıyla gönderildi! <a href="${toolResult.url}" target="_blank">Buradan görebilirsiniz</a>.`; 
            conversationHistory.push({ role: "function", parts: [{ functionResponse: { name: actionName, response: toolResult } }] }); 
            const receipt = await coopaCore.uploadToIrys(`ONAYLANDI: E-posta gönderildi. Alıcı: ${to}`); 
            res.send(getSuccessHTML(finalAnswer, receipt)); 
        } else { 
            throw new Error(toolResult.error); 
        } 
    } catch (error) { 
        console.error("❌ /execute-action rotasında hata:", error); 
        res.status(500).send(`<h1>Eylem Gerçekleştirilirken Hata Oluştu</h1><p>${error.message}</p>`); 
    } 
});

app.listen(port, () => {
    console.log(`\n✅ Sunucu (Tüm Özellikler Aktif) başarıyla başlatıldı!`);
    console.log(`   http://localhost:${port} adresinden erişebilirsiniz.`);
});