// server.js - HATA DÜZELTİLMİŞ, TAM VE NİHAİ SÜRÜM

require('dotenv').config();
const express = require('express');
const path = require('path');
const { google } = require('googleapis');
const coopaCore = require('./coopa-core.js');
const nodemailer = require('nodemailer');
const axios =require('axios');
const { db, initializeDB } = require('./database.js');
const cron = require('node-cron');
const multer = require('multer');
const CryptoJS = require("crypto-js");
const app = express();
const port = 3000;

// Demo modu kontrol fonksiyonu - BURAYA EKLE (require'lardan sonra)
function checkAdminAccess(userAddress) {
    const adminAddresses = process.env.ADMIN_WALLET_ADDRESS?.toLowerCase() || "";
    
    if (!adminAddresses) {
        console.warn('[UYARI] Admin cüzdan adresleri .env dosyasında tanımlanmamış!');
        return false;
    }
    
    // Virgülle ayrılmış adresleri diziye çevir
    const adminList = adminAddresses.split(',').map(addr => addr.trim());
    const userAddr = userAddress.toLowerCase();
    
    console.log(`[Demo Kontrol] Kullanıcı: ${userAddr}`);
    console.log(`[Demo Kontrol] ${adminList.length} admin kayıtlı`);
    
    return adminList.includes(userAddr);
}

// DİL DESTEĞİ SİSTEMİ
const translations = {
    tr: {
        welcome: "Merhaba! Size nasıl yardımcı olabilirim?",
        weather_error: "için hava durumu bilgisi alınamadı.",
        email_sent: "E-posta başarıyla gönderildi:",
        email_error: "E-posta gönderilirken hata oluştu:",
        note_saved: "notu kaydedildi. Yeni içerik:",
        note_not_found: "isminde bir not bulunamadı.",
        note_empty: "(notun içeriği boş)",
        note_db_error: "notunu okurken bir veritabanı hatası oluştu:",
        current_time: "Şu an saat",
        current_date: "tarih",
        calendar_added: "etkinliği takviminize eklendi.",
        calendar_error: "Takvim etkinliği oluşturulamadı:",
        task_scheduled: "Görev başarıyla zamanlandı.",
        task_reminder: "konusu saat",
        memory_saved: "adresli kullanıcı için anı veritabanına kaydedildi.",
        memory_found: "açıklamalı anı bulundu.",
        memory_not_found: "ile eşleşen bir anı bulunamadı.",
        memory_decrypt_error: "Anı bulundu ancak deşifre edilemedi.",
        upload_success: "Anı Başarıyla Şifrelenerek Kalıcı Olarak Kaydedildi!",
        invalid_signature: "Geçersiz imza. Kimlik doğrulanamadı.",
        missing_info: "Eksik bilgi: Dosya, adres veya imza belirtilmemiş.",
        server_error: "Bir hata oluştu: Sunucu hatası"
    },
    en: {
        welcome: "Hello! How can I help you?",
        weather_error: "weather information could not be retrieved for",
        email_sent: "Email sent successfully to:",
        email_error: "Error sending email:",
        note_saved: "note saved. New content:",
        note_not_found: "No note found with the name",
        note_empty: "(note content is empty)",
        note_db_error: "Database error while reading note:",
        current_time: "It's currently",
        current_date: "date",
        calendar_added: "event added to your calendar.",
        calendar_error: "Could not create calendar event:",
        task_scheduled: "Task scheduled successfully.",
        task_reminder: "subject at",
        memory_saved: "Memory saved to database for user address:",
        memory_found: "Memory found with description:",
        memory_not_found: "No memory found matching",
        memory_decrypt_error: "Memory found but could not be decrypted.",
        upload_success: "Memory Successfully Encrypted and Permanently Saved!",
        invalid_signature: "Invalid signature. Authentication failed.",
        missing_info: "Missing information: File, address or signature not specified.",
        server_error: "An error occurred: Server error"
    },
es: {
        welcome: "¡Hola! ¿Cómo puedo ayudarte?",
        weather_error: "no se pudo obtener información meteorológica para",
        email_sent: "Correo enviado exitosamente a:",
        email_error: "Error al enviar correo:",
        note_saved: "nota guardada. Nuevo contenido:",
        note_not_found: "No se encontró ninguna nota con el nombre",
        note_empty: "(el contenido de la nota está vacío)",
        note_db_error: "Error de base de datos al leer la nota:",
        current_time: "Actualmente son las",
        current_date: "fecha",
        calendar_added: "evento agregado a tu calendario.",
        calendar_error: "No se pudo crear el evento del calendario:",
        task_scheduled: "Tarea programada exitosamente.",
        task_reminder: "asunto a las",
        memory_saved: "Memoria guardada en la base de datos para la dirección del usuario:",
        memory_found: "Memoria encontrada con descripción:",
        memory_not_found: "No se encontró memoria que coincida con",
        memory_decrypt_error: "Memoria encontrada pero no se pudo descifrar.",
        upload_success: "¡Memoria Cifrada y Guardada Permanentemente con Éxito!",
        invalid_signature: "Firma inválida. Falló la autenticación.",
        missing_info: "Información faltante: Archivo, dirección o firma no especificados.",
        server_error: "Ocurrió un error: Error del servidor"
    },
fr: {
        welcome: "Bonjour ! Comment puis-je vous aider ?",
        weather_error: "Impossible d'obtenir les informations météo pour",
        email_sent: "E-mail envoyé avec succès :",
        email_error: "Erreur lors de l'envoi de l'e-mail :",
        note_saved: "note sauvegardée. Nouveau contenu :",
        note_not_found: "Aucune note trouvée avec le nom",
        note_empty: "(le contenu de la note est vide)",
        note_db_error: "Erreur de base de données lors de la lecture de la note :",
        current_time: "Il est actuellement",
        current_date: "date",
        calendar_added: "événement ajouté à votre calendrier.",
        calendar_error: "Impossible de créer l'événement du calendrier :",
        task_scheduled: "Tâche programmée avec succès.",
        task_reminder: "sujet à",
        memory_saved: "mémoire sauvegardée dans la base de données pour l'utilisateur à l'adresse",
        memory_found: "mémoire trouvée avec description",
        memory_not_found: "Aucune mémoire trouvée correspondant à",
        memory_decrypt_error: "Mémoire trouvée mais impossible à déchiffrer.",
        upload_success: "Mémoire cryptée et sauvegardée définitivement avec succès !",
        invalid_signature: "Signature invalide. Authentification échouée.",
        missing_info: "Informations manquantes : Fichier, adresse ou signature non spécifiés.",
        server_error: "Une erreur s'est produite : Erreur serveur"
    },
it: {
        welcome: "Ciao! Come posso aiutarti?",
        weather_error: "Impossibile ottenere informazioni meteo per",
        email_sent: "Email inviata con successo:",
        email_error: "Errore nell'invio dell'email:",
        note_saved: "nota salvata. Nuovo contenuto:",
        note_not_found: "Nessuna nota trovata con il nome",
        note_empty: "(il contenuto della nota è vuoto)",
        note_db_error: "Errore del database durante la lettura della nota:",
        current_time: "Ora sono le",
        current_date: "data",
        calendar_added: "evento aggiunto al tuo calendario.",
        calendar_error: "Impossibile creare l'evento del calendario:",
        task_scheduled: "Attività programmata con successo.",
        task_reminder: "oggetto alle",
        memory_saved: "memoria salvata nel database per l'utente all'indirizzo",
        memory_found: "memoria trovata con descrizione",
        memory_not_found: "Nessuna memoria trovata corrispondente a",
        memory_decrypt_error: "Memoria trovata ma impossibile da decifrare.",
        upload_success: "Memoria crittografata e salvata permanentemente con successo!",
        invalid_signature: "Firma non valida. Autenticazione fallita.",
        missing_info: "Informazioni mancanti: File, indirizzo o firma non specificati.",
        server_error: "Si è verificato un errore: Errore del server"
    },
zh: {
        welcome: "你好！我能为您做什么？",
        weather_error: "无法获取天气信息",
        email_sent: "邮件发送成功：",
        email_error: "发送邮件时出错：",
        note_saved: "笔记已保存。新内容：",
        note_not_found: "未找到名为",
        note_empty: "（笔记内容为空）",
        note_db_error: "读取笔记时发生数据库错误：",
        current_time: "现在是",
        current_date: "日期",
        calendar_added: "事件已添加到您的日历。",
        calendar_error: "无法创建日历事件：",
        task_scheduled: "任务安排成功。",
        task_reminder: "主题在",
        memory_saved: "地址用户的记忆已保存到数据库。",
        memory_found: "找到描述为",
        memory_not_found: "未找到匹配的记忆",
        memory_decrypt_error: "找到记忆但无法解密。",
        upload_success: "记忆已成功加密并永久保存！",
        invalid_signature: "无效签名。身份验证失败。",
        missing_info: "信息不完整：未指定文件、地址或签名。",
        server_error: "发生错误：服务器错误"
    },
de: {
        welcome: "Hallo! Wie kann ich Ihnen helfen?",
        weather_error: "Wetterinformationen für",
        email_sent: "E-Mail erfolgreich gesendet:",
        email_error: "Fehler beim Senden der E-Mail:",
        note_saved: "Notiz gespeichert. Neuer Inhalt:",
        note_not_found: "Keine Notiz mit dem Namen gefunden",
        note_empty: "(der Notizinhalt ist leer)",
        note_db_error: "Datenbankfehler beim Lesen der Notiz:",
        current_time: "Es ist jetzt",
        current_date: "Datum",
        calendar_added: "Ereignis zu Ihrem Kalender hinzugefügt.",
        calendar_error: "Kalenderereignis konnte nicht erstellt werden:",
        task_scheduled: "Aufgabe erfolgreich geplant.",
        task_reminder: "Betreff um",
        memory_saved: "Erinnerung in der Datenbank für Benutzer an Adresse gespeichert",
        memory_found: "Erinnerung mit Beschreibung gefunden",
        memory_not_found: "Keine passende Erinnerung gefunden für",
        memory_decrypt_error: "Erinnerung gefunden, aber kann nicht entschlüsselt werden.",
        upload_success: "Erinnerung erfolgreich verschlüsselt und dauerhaft gespeichert!",
        invalid_signature: "Ungültige Signatur. Authentifizierung fehlgeschlagen.",
        missing_info: "Fehlende Informationen: Datei, Adresse oder Signatur nicht angegeben.",
        server_error: "Ein Fehler ist aufgetreten: Server-Fehler"
    },
ru: {
        welcome: "Привет! Как я могу вам помочь?",
        weather_error: "Не удалось получить информацию о погоде для",
        email_sent: "Письмо успешно отправлено:",
        email_error: "Ошибка при отправке письма:",
        note_saved: "заметка сохранена. Новое содержание:",
        note_not_found: "Заметка с именем не найдена",
        note_empty: "(содержание заметки пустое)",
        note_db_error: "Ошибка базы данных при чтении заметки:",
        current_time: "Сейчас",
        current_date: "дата",
        calendar_added: "событие добавлено в ваш календарь.",
        calendar_error: "Не удалось создать событие календаря:",
        task_scheduled: "Задача успешно запланирована.",
        task_reminder: "тема в",
        memory_saved: "память сохранена в базе данных для пользователя по адресу",
        memory_found: "найдена память с описанием",
        memory_not_found: "Не найдено подходящей памяти для",
        memory_decrypt_error: "Память найдена, но не может быть расшифрована.",
        upload_success: "Память успешно зашифрована и сохранена навсегда!",
        invalid_signature: "Недействительная подпись. Аутентификация не удалась.",
        missing_info: "Отсутствует информация: Файл, адрес или подпись не указаны.",
        server_error: "Произошла ошибка: Ошибка сервера"
    }
    
};

// Dil belirleme fonksiyonu
function getUserLanguage(req) {
    // Önce kullanıcının seçtiği dili kontrol et
    const userSelectedLang = req.body.lang || req.query.lang;
    if (userSelectedLang) {
        return userSelectedLang;
    }
    
    // Fallback olarak browser dilini kontrol et
    const browserLang = req.headers['accept-language'];
    if (browserLang) {
        if (browserLang.includes('tr')) return 'tr';
        if (browserLang.includes('es')) return 'es';
        if (browserLang.includes('fr')) return 'fr';
        if (browserLang.includes('it')) return 'it';
        if (browserLang.includes('zh')) return 'zh';
        if (browserLang.includes('de')) return 'de';
        if (browserLang.includes('ru')) return 'ru';
    }
    return 'en'; // varsayılan
}

function t(key, lang = 'tr') {
    return translations[lang][key] || translations['tr'][key] || key;
}

// GÜNCELLEME: body-parser limitlerini artırıyoruz.
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);

// --- YARDIMCI FONKSİYONLAR ---
// server.js dosyasındaki eski encryptBuffer ve decryptBuffer fonksiyonlarını silip
// yerlerine bu YENİ ve DAHA SAĞLAM versiyonları yapıştırın.

const encryptBuffer = (buffer, key) => {
    // Dosya tamponunu (Buffer) doğrudan CryptoJS'un anlayacağı WordArray formatına çeviriyoruz.
    const wordArray = CryptoJS.lib.WordArray.create(buffer);
    // WordArray'i AES ile şifreliyoruz.
    const encrypted = CryptoJS.AES.encrypt(wordArray, key);
    // Şifrelenmiş veriyi, güvenli bir metin formatı olan Base64'e çeviriyoruz.
    // Bu, verinin bozulmadan saklanmasını ve taşınmasını sağlar.
    return Buffer.from(encrypted.toString(), 'utf-8');
};

// server.js dosyasındaki decryptBuffer fonksiyonunu bu YENİ versiyonla değiştirin.

const decryptBuffer = (encryptedBuffer, key) => {
    console.log("\n--- ŞİFRE ÇÖZME (DEBUG) BAŞLADI ---");
    try {
        console.log(`[DEBUG] 1. Gelen şifreli verinin boyutu: ${encryptedBuffer.length} byte`);

        const encryptedString = encryptedBuffer.toString('utf-8');
        console.log(`[DEBUG] 2. Metne çevrilen şifreli veri (ilk 30 karakter): '${encryptedString.substring(0, 30)}...'`);

        const decrypted = CryptoJS.AES.decrypt(encryptedString, key);
        // Deşifre edilen verinin boyutunu kontrol edelim. 0'dan büyük olmalı.
        console.log(`[DEBUG] 3. CryptoJS deşifre işlemi sonucu (içerik boyutu): ${decrypted.sigBytes} byte`);

        if (decrypted.sigBytes <= 0) {
            console.error("[DEBUG] HATA: Deşifre işlemi boş veri döndürdü! Anahtar veya şifreli veri hatalı olabilir.");
            console.log("--- ŞİFRE ÇÖZME (DEBUG) BAŞARISIZ OLDU ---\n");
            return Buffer.from(''); // Boş buffer döndür
        }

        const hexString = decrypted.toString(CryptoJS.enc.Hex);
        console.log(`[DEBUG] 4. Hex formatına çevrilen veri (ilk 30 karakter): '${hexString.substring(0, 30)}...'`);

        const finalBuffer = Buffer.from(hexString, 'hex');
        console.log(`[DEBUG] 5. Sonuç olarak üretilen Buffer boyutu: ${finalBuffer.length} byte`);

        console.log("--- ŞİFRE ÇÖZME (DEBUG) BAŞARIYLA TAMAMLANDI ---\n");
        return finalBuffer;

    } catch (error) {
        console.error("[DEBUG] HATA: Şifre çözme sırasında beklenmedik bir hata oluştu!", error);
        console.log("--- ŞİFRE ÇÖZME (DEBUG) BAŞARISIZ OLDU ---\n");
        return Buffer.from(''); // Hata durumunda boş buffer döndür
    }
};

const fixedSignMessage = "CoopaASI dijital kasanızın kilidini açmak ve işlem yapmak için bu mesajı imzalayın.";

async function verifySignature(message, signature, expectedAddress) { 
    try { 
        const { ethers } = require('ethers');
        const recoveredAddress = ethers.verifyMessage(message, signature); 
        return recoveredAddress.toLowerCase() === expectedAddress.toLowerCase(); 
    } catch (error) { 
        console.error("İmza doğrulanırken hata:", error); 
        return false; 
    } 
}

async function get_current_weather(location, lang = 'tr') { 
    try { 
        const apiKey = process.env.OPENWEATHERMAP_API_KEY; 
        if (!apiKey) throw new Error("OpenWeatherMap API anahtarı .env dosyasında bulunamadı."); 
        const langCode = lang === 'tr' ? 'tr' : lang === 'es' ? 'es' : 'en';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=${langCode}`; 
        const response = await axios.get(url); 
        return { konum: response.data.name, sicaklik: response.data.main.temp, durum: response.data.weather[0].description }; 
    } catch (error) { 
        return { hata: `"${location}" ${t('weather_error', lang)}` }; 
    } 
}

async function send_email(to, subject, body, lang = 'tr') { 
    try { 
        const user = process.env.GMAIL_USER; 
        const pass = process.env.GMAIL_APP_PASSWORD; 
        if (!user || !pass) throw new Error("Gmail kullanıcı adı veya Uygulama Şifresi .env dosyasında eksik."); 
        let transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } }); 
        await transporter.sendMail({ from: `"Coopa Asistan" <${user}>`, to, subject, text: body }); 
        return { success: true, message: `${t('email_sent', lang)} ${to}` }; 
    } catch (error) { 
        return { success: false, error: `${t('email_error', lang)} ${error.message}` }; 
    } 
}

async function create_note(noteName, content, lang = 'tr') { 
    return new Promise((resolve) => { 
        const sql = `INSERT OR REPLACE INTO notes (name, content) VALUES (?, ?)`; 
        db.run(sql, [noteName, content], function(err) { 
            if (err) { 
                resolve({ success: false, error: err.message }); 
            } else { 
                resolve({ success: true, message: `"${noteName}" ${t('note_saved', lang)} ${content}` }); 
            } 
        }); 
    }); 
}

async function get_note(noteName, lang = 'tr') { 
    return new Promise((resolve) => { 
        const sql = `SELECT content FROM notes WHERE name = ?`; 
        db.get(sql, [noteName], (err, row) => { 
            if (err) { 
                resolve(`"${noteName}" ${t('note_db_error', lang)} ${err.message}`); 
            } else if (row) { 
                resolve(row.content || t('note_empty', lang)); 
            } else { 
                resolve(`"${noteName}" ${t('note_not_found', lang)}`); 
            } 
        }); 
    }); 
}

async function edit_note(noteName, newContent, lang = 'tr') { 
    const existingContent = await get_note(noteName, lang); 
    if (existingContent.includes(t('note_not_found', lang)) || existingContent.includes(t('note_db_error', lang))) { 
        return { success: false, message: existingContent }; 
    } 
    const updatedContent = (existingContent && existingContent !== t('note_empty', lang)) ? existingContent + ", " + newContent : newContent; 
    return create_note(noteName, updatedContent, lang); 
}

async function get_current_time(lang = 'tr') { 
    const now = new Date(); 
    const timeString = now.toLocaleTimeString(lang === 'tr' ? 'tr-TR' : lang === 'es' ? 'es-ES' : 'en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' }); 
    const dateString = now.toLocaleDateString(lang === 'tr' ? 'tr-TR' : lang === 'es' ? 'es-ES' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Istanbul' }); 
    return { success: true, timeInfo: `${t('current_time', lang)} ${timeString}, ${t('current_date', lang)} ${dateString}.` }; 
}

async function create_calendar_event(title, date, time, description = '', lang = 'tr') { 
    try { 
        const tokens = await new Promise((resolve, reject) => { 
            db.get(`SELECT * FROM google_auth WHERE id = 1`, (err, row) => { 
                if (err) reject(err); 
                resolve(row); 
            }); 
        }); 
        if (!tokens || !tokens.refresh_token) { 
            throw new Error("Google kimlik doğrulaması bulunamadı. Lütfen arayüzden yetki verin."); 
        } 
        oauth2Client.setCredentials({ refresh_token: tokens.refresh_token }); 
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client }); 
        let eventDateStr; 
        if (!date || date.toLowerCase() === 'bugün' || date.toLowerCase() === 'today' || date.toLowerCase() === 'hoy') { 
            const today = new Date(); 
            eventDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; 
        } else { 
            eventDateStr = date; 
        }  

        const eventDateTime = new Date(`${eventDateStr}T${time}+03:00`);
if (isNaN(eventDateTime.getTime())) {
    throw new Error(`Geçersiz tarih/saat formatı.`);
}
        const eventEndTime = new Date(eventDateTime.getTime() + 60 * 60 * 1000); 
        const event = { summary: title, description, start: { dateTime: eventDateTime.toISOString(), timeZone: 'Europe/Istanbul' }, end: { dateTime: eventEndTime.toISOString(), timeZone: 'Europe/Istanbul' } }; 
        const response = await calendar.events.insert({ calendarId: 'primary', resource: event }); 
        return { success: true, message: `"${title}" ${t('calendar_added', lang)}`, event_link: response.data.htmlLink }; 
    } catch (error) { 
        console.error("❌ Google Takvim hatası:", error.message); 
        return { success: false, error: `${t('calendar_error', lang)} ${error.message}` }; 
    } 
}

// =================================================================
// ===                 *** HATA DÜZELTME ALANI *** ===
// =================================================================
async function schedule_task(args, lang = 'tr') { 
    const { noteName, subject, body, time } = args; 
    if (!time) { 
        return { success: false, message: "Görevi zamanlamak için bir saat belirtmelisiniz." }; 
    } 
    const [hour, minute] = time.split(':'); 
    if (isNaN(hour) || isNaN(minute)) { 
        return { success: false, message: "Geçersiz zaman formatı. Lütfen 'HH:MM' formatında belirtin." }; 
    } 
    const cronTime = `${minute} ${hour} * * *`; 
    const targetEmail = process.env.MY_EMAIL_ADDRESS; 
    if (!targetEmail) { 
        return { success: false, message: "Hedef e-posta adresi MY_EMAIL_ADDRESS .env dosyasında bulunamadı." }; 
    } 
    let emailSubject = subject; 
    let emailBody = body; 
    if (noteName) { 
        const noteContent = await get_note(noteName, lang); 
        if (noteContent.includes(t('note_not_found', lang)) || noteContent.includes(t('note_db_error', lang))) { 
            return { success: false, message: `'${noteName}' isimli not bulunamadığı için görev zamanlanamadı.` }; 
        } 
        emailSubject = `Coopa Hatırlatıcısı: ${noteName}`; 
        emailBody = `Hatırlatma:\n\n${noteContent}`; 
    } 
    if (!emailSubject || !emailBody) { 
        return { success: false, message: "E-postayı zamanlamak için konu ve içerik bilgisi gereklidir." }; 
    } 
    console.log(`[Zamanlayıcı] Yeni görev zamanlandı. Konu: ${emailSubject}, Zaman: ${cronTime}`); 
    const task = cron.schedule(cronTime, async () => { 
        console.log(`[Zamanlayıcı] Zamanlanmış görev tetiklendi. E-posta gönderiliyor: "${emailSubject}"`);
        
        // DÜZELTME: send_email fonksiyonundan dönen sonuç yakalanıyor ve kontrol ediliyor.
        const result = await send_email(targetEmail, emailSubject, emailBody, lang); 
        
        if (result.success) {
            console.log(`[Zamanlayıcı] ✅ E-posta başarıyla gönderildi. Mesaj: ${result.message}`);
        } else {
            console.error(`[Zamanlayıcı] ❌ E-posta gönderilirken hata oluştu: ${result.error}`);
        }

        task.stop(); 
    }, { timezone: "Europe/Istanbul", scheduled: true }); 
    return { success: true, message: `${t('task_scheduled', lang)} "${emailSubject}" ${t('task_reminder', lang)} ${time}'da size hatırlatılacak.` }; 
}
// =================================================================
// ===               *** HATA DÜZELTME ALANI SONU *** ===
// =================================================================
async function saveMemory(txId, description, mediaType, userAddress, lang = 'tr') { 
    return new Promise((resolve, reject) => { 
        const sql = `INSERT INTO memories (tx_id, description, media_type, user_address) VALUES (?, ?, ?, ?)`; 
        db.run(sql, [txId, description, mediaType, userAddress], function (err) { 
            if (err) { 
                console.error("Veritabanına anı kaydedilirken hata:", err.message); 
                return reject(err); 
            } 
            console.log(`✅ ${t('memory_saved', lang)} ${userAddress}`); 
            resolve({ id: this.lastID }); 
        }); 
    }); 
}

// server.js dosyasındaki find_memory fonksiyonunu bu YENİ versiyonla değiştirin.

async function find_memory(searchText, userAddress, signature, lang = 'tr') {
    return new Promise(async (resolve) => {
        const trimmedSearchText = searchText.trim();

        // --- AŞAMA 1: BİREBİR EŞLEŞME ARAMASI ---
        const exactSql = `SELECT * FROM memories WHERE user_address = ? AND description = ?`;
        db.get(exactSql, [userAddress, trimmedSearchText], async (err, exactRow) => {
            if (err) {
                console.error("❌ Anı aranırken (birebir eşleşme) veritabanı hatası:", err.message);
                return resolve({ error: err.message });
            }

            if (exactRow) {
                try {
                    const gatewayUrl = `https://arweave.net/${exactRow.tx_id}`;
                    const response = await axios.get(gatewayUrl, { responseType: 'arraybuffer' });
                    const encryptedBuffer = Buffer.from(response.data, 'binary');
                    const decryptedBuffer = decryptBuffer(encryptedBuffer, signature);
                    const decryptedDataUrl = `data:${exactRow.media_type};base64,${decryptedBuffer.toString('base64')}`;
                    
                    // DÜZELTME: "return" ifadesi eklendi.
                    return resolve({ found: true, multiple: false, description: exactRow.description, data: { decryptedDataUrl, description: exactRow.description } });
                } catch (error) {
                    console.error("❌ Anı deşifre edilirken hata (birebir eşleşme):", error);
                    // DÜZELTME: "return" ifadesi eklendi.
                    return resolve({ error: 'memory_decrypt_error' });
                }
            }

            // --- AŞAMA 2: ANAHTAR KELİME ARAMASI (Birebir eşleşme bulunamadıysa burası çalışır) ---
            const keywords = trimmedSearchText.split(' ').filter(word => word.length > 2);
            if (keywords.length === 0) {
                // DÜZELTME: "return" ifadesi eklendi.
                return resolve({ found: false });
            }

            const likeClauses = keywords.map(() => `description LIKE ?`).join(' OR ');
            const keywordSql = `SELECT * FROM memories WHERE user_address = ? AND (${likeClauses}) ORDER BY created_at DESC`;
            const queryParams = [userAddress, ...keywords.map(kw => `%${kw}%`)];

            db.all(keywordSql, queryParams, async (err, rows) => {
                if (err) {
                    return resolve({ error: err.message });
                }
                if (!rows || rows.length === 0) {
                    resolve({ found: false });
                } else if (rows.length === 1) {
                    const row = rows[0];
                    try {
                        const gatewayUrl = `https://arweave.net/${row.tx_id}`;
                        const response = await axios.get(gatewayUrl, { responseType: 'arraybuffer' });
                        const decryptedBuffer = Buffer.from(response.data, 'binary');
                        const decryptedDataUrl = `data:${row.media_type};base64,${decryptedBuffer.toString('base64')}`;
                        resolve({ found: true, multiple: false, description: row.description, data: { decryptedDataUrl, description: row.description } });
                    } catch (error) {
                        resolve({ error: 'memory_decrypt_error' });
                    }
                } else {
                    resolve({ found: true, multiple: true, descriptions: rows.map(r => r.description) });
                }
            });
        });
    });
}

// --- ROTALAR ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/auth/google', (req, res) => { 
    const url = oauth2Client.generateAuthUrl({ access_type: 'offline', prompt: 'consent', scope: ['https://www.googleapis.com/auth/calendar.events'] }); 
    res.redirect(url); 
});

app.get('/auth/google/callback', async (req, res) => { 
    try { 
        const { code } = req.query; 
        const { tokens } = await oauth2Client.getToken(code); 
        const sql = `INSERT OR REPLACE INTO google_auth (id, access_token, refresh_token, expiry_date, scope) VALUES (1, ?, ?, ?, ?)`; 
        db.run(sql, [tokens.access_token, tokens.refresh_token, tokens.expiry_date, tokens.scope]); 
        res.redirect('/?auth=success'); 
    } catch (error) { 
        console.error("Google Auth Callback Hatası:", error.message); 
        res.redirect('/?auth=error'); 
    }
});

app.post('/upload', upload.single('memoryFile'), async (req, res) => { 
    try { 
        const { description, userAddress, signature } = req.body; 
        const file = req.file; 
        const lang = getUserLanguage(req);
        
        if (!file || !userAddress || !signature) { 
            return res.status(400).send(t('missing_info', lang)); 
        } 
        if (!await verifySignature(fixedSignMessage, signature, userAddress)) { 
            return res.status(401).send(t('invalid_signature', lang)); 
        } 

  // --- DEMO MODU KONTROLÜ EKLE ---
        if (!checkAdminAccess(userAddress)) {
            console.log(`[Demo] ${userAddress} görsel yükleme denedi - engellendi`);
            return res.status(403).json({ 
                success: false, 
                error: "🔒 Bu bir demo versiyonudur. Görsel yükleme admin erişimi gerektirir. Tam erişim için bizimle iletişime geçin."
            });
        }
        console.log(`[Admin İşlem] ${userAddress} görsel yüklüyor - izin verildi`);
        // --- KONTROL SONU ---


        const encryptedBuffer = encryptBuffer(file.buffer, signature); 
        const tags = [{ name: "Content-Type", value: "text/plain" }]; 
        const receipt = await coopaCore.uploadFileToIrys(encryptedBuffer, tags); 
        if (!receipt) { 
            throw new Error("Turbo'ya şifreli yükleme başarısız oldu."); 
        } 
        await saveMemory(receipt.id, description, file.mimetype, userAddress, lang); 
        const gatewayUrl = `https://arweave.net/${receipt.id}`; 
        
        const successMessages = {
            tr: `<div style="font-family: sans-serif; padding: 20px;"><h1>✅ ${t('upload_success', 'tr')}</h1><p><b>Açıklama:</b> ${description}</p><p><b>Arweave İşlem ID:</b> ${receipt.id}</p><p><a href="${gatewayUrl}" target="_blank">Kaydedilen Şifreli Dosyayı Arweave'de Görüntüle</a></p><br><a href="/">Sohbete Geri Dön</a></div>`,
            en: `<div style="font-family: sans-serif; padding: 20px;"><h1>✅ ${t('upload_success', 'en')}</h1><p><b>Description:</b> ${description}</p><p><b>Arweave Transaction ID:</b> ${receipt.id}</p><p><a href="${gatewayUrl}" target="_blank">View Saved Encrypted File on Arweave</a></p><br><a href="/">Back to Chat</a></div>`,

            es: `<div style="font-family: sans-serif; padding: 20px;"><h1>✅ ${t('upload_success', 'es')}</h1><p><b>Descripción:</b> ${description}</p><p><b>ID de Transacción Arweave:</b> ${receipt.id}</p><p><a href="${gatewayUrl}" target="_blank">Ver Archivo Cifrado Guardado en Arweave</a></p><br><a href="/">Volver al Chat</a></div>`,

            fr: `<div style="font-family: sans-serif; padding: 20px;"><h1>✅ ${t('upload_success', 'fr')}</h1><p><b>Description :</b> ${description}</p><p><b>ID de Transaction Arweave :</b> ${receipt.id}</p><p><a href="${gatewayUrl}" target="_blank">Voir le Fichier Crypté Sauvegardé sur Arweave</a></p><br><a href="/">Retour au Chat</a></div>`,

            it: `<div style="font-family: sans-serif; padding: 20px;"><h1>✅ ${t('upload_success', 'it')}</h1><p><b>Descrizione:</b> ${description}</p><p><b>ID Transazione Arweave:</b> ${receipt.id}</p><p><a href="${gatewayUrl}" target="_blank">Visualizza File Crittografato Salvato su Arweave</a></p><br><a href="/">Torna alla Chat</a></div>`,

            zh: `<div style="font-family: sans-serif; padding: 20px;"><h1>✅ ${t('upload_success', 'zh')}</h1><p><b>描述：</b> ${description}</p><p><b>Arweave 交易 ID：</b> ${receipt.id}</p><p><a href="${gatewayUrl}" target="_blank">在 Arweave 上查看已保存的加密文件</a></p><br><a href="/">返回聊天</a></div>`,

           de: `<div style="font-family: sans-serif; padding: 20px;"><h1>✅ ${t('upload_success', 'de')}</h1><p><b>Beschreibung:</b> ${description}</p><p><b>Arweave Transaktions-ID:</b> ${receipt.id}</p><p><a href="${gatewayUrl}" target="_blank">Gespeicherte verschlüsselte Datei auf Arweave anzeigen</a></p><br><a href="/">Zurück zum Chat</a></div>`,

           ru: `<div style="font-family: sans-serif; padding: 20px;"><h1>✅ ${t('upload_success', 'ru')}</h1><p><b>Описание:</b> ${description}</p><p><b>ID Транзакции Arweave:</b> ${receipt.id}</p><p><a href="${gatewayUrl}" target="_blank">Просмотреть сохранённый зашифрованный файл на Arweave</a></p><br><a href="/">Вернуться к чату</a></div>`
        };
        
        res.send(successMessages[lang] || successMessages['en']); 
    } catch (error) { 
        console.error("Dosya yükleme sürecinde hata:", error); 
        const lang = getUserLanguage(req);
        res.status(500).send(`${t('server_error', lang)}: ${error.message}`); 
    }
});

app.post('/generate', async (req, res) => {
    try {
        const { prompt, history, userAddress, signature } = req.body;
        const lang = getUserLanguage(req);
        
        if (!userAddress || !signature) { 
            throw new Error("İstekle birlikte kullanıcı adresi veya imza gönderilmedi."); 
        }
        if (!await verifySignature(fixedSignMessage, signature, userAddress)) { 
            throw new Error(t('invalid_signature', lang)); 
        }
        if (!prompt) return res.status(400).json({ error: "Prompt boş olamaz." });
        
        // --- DEMO MODU KONTROLÜ ---
        if (!checkAdminAccess(userAddress)) {
            console.log(`[Demo] ${userAddress} AI sohbet denedi - demo cevabı veriliyor`);

            const demoMessages = {
    tr: `🔒 **COOPA AI Demo Modu**

Merhaba! Bu COOPA AI'nın halka açık demo versiyonu.

**Demo'da kullanabileceğiniz özellikler:**
✅ Cüzdan bağlantısı
✅ Arayüz keşfi  
✅ Genel navigasyon

**Admin erişimi ile mevcut özellikler:**
🔒 AI destekli akıllı sohbet
🔒 Gelişmiş hafıza arama
🔒 Arweave entegrasyonu
🔒 Akıllı araçlar (hava durumu, notlar, takvim)

Tam erişim için bizimle iletişime geçin!`,
    
    en: `🔒 **COOPA AI Demo Mode**

Hello! This is the public demo version of COOPA AI.

**Available features in demo:**
✅ Wallet connection
✅ Interface exploration
✅ General navigation

**Features available with admin access:**
🔒 AI-powered smart chat
🔒 Advanced memory search
🔒 Arweave integration  
🔒 Smart tools (weather, notes, calendar)

Contact us for full access!`,
    
    es: `🔒 **Modo Demo de COOPA AI**

¡Hola! Esta es la versión demo pública de COOPA AI.

**Características disponibles en demo:**
✅ Conexión de billetera
✅ Exploración de interfaz
✅ Navegación general

**Características disponibles con acceso admin:**
🔒 Chat inteligente con IA
🔒 Búsqueda avanzada de memoria
🔒 Integración Arweave
🔒 Herramientas inteligentes (clima, notas, calendario)

¡Contáctanos para acceso completo!`,

    fr: `🔒 **Mode Démo COOPA AI**

Bonjour ! Ceci est la version démo publique de COOPA AI.

**Fonctionnalités disponibles en démo:**
✅ Connexion portefeuille
✅ Exploration interface
✅ Navigation générale

**Fonctionnalités disponibles avec accès admin:**
🔒 Chat intelligent alimenté par IA
🔒 Recherche mémoire avancée
🔒 Intégration Arweave
🔒 Outils intelligents (météo, notes, calendrier)

Contactez-nous pour un accès complet !`,

    it: `🔒 **Modalità Demo COOPA AI**

Ciao! Questa è la versione demo pubblica di COOPA AI.

**Funzionalità disponibili nella demo:**
✅ Connessione portafoglio
✅ Esplorazione interfaccia
✅ Navigazione generale

**Funzionalità disponibili con accesso admin:**
🔒 Chat intelligente alimentata da AI
🔒 Ricerca memoria avanzata
🔒 Integrazione Arweave
🔒 Strumenti intelligenti (meteo, note, calendario)

Contattaci per l'accesso completo!`,

    zh: `🔒 **COOPA AI 演示模式**

您好！这是 COOPA AI 的公开演示版本。

**演示中可用功能:**
✅ 钱包连接
✅ 界面探索
✅ 常规导航

**管理员权限可用功能:**
🔒 AI 驱动的智能聊天
🔒 高级内存搜索
🔒 Arweave 集成
🔒 智能工具（天气、笔记、日历）

联系我们获取完整访问权限！`,

    de: `🔒 **COOPA AI Demo-Modus**

Hallo! Dies ist die öffentliche Demo-Version von COOPA AI.

**Verfügbare Funktionen in der Demo:**
✅ Wallet-Verbindung
✅ Interface-Erkundung
✅ Allgemeine Navigation

**Funktionen mit Admin-Zugriff verfügbar:**
🔒 KI-gestützter intelligenter Chat
🔒 Erweiterte Speichersuche
🔒 Arweave-Integration
🔒 Intelligente Tools (Wetter, Notizen, Kalender)

Kontaktieren Sie uns für vollen Zugriff!`,

    ru: `🔒 **Демо-режим COOPA AI**

Привет! Это публичная демо-версия COOPA AI.

**Доступные функции в демо:**
✅ Подключение кошелька
✅ Исследование интерфейса
✅ Общая навигация

**Функции, доступные с правами администратора:**
🔒 Умный чат на базе ИИ
🔒 Расширенный поиск по памяти
🔒 Интеграция Arweave
🔒 Умные инструменты (погода, заметки, календарь)

Свяжитесь с нами для полного доступа!`
};
            


            const demoResponse = {
                role: "model", 
                parts: [{ 
                    text: demoMessages[lang] || demoMessages['en']
                }]
            };
            
            const demoHistory = [
                ...(history || []), 
                { role: "user", parts: [{ text: prompt }] },
                demoResponse
            ];
            
            return res.json({ 
                history: demoHistory,
                displayData: null 
            });
        }
        console.log(`[Admin Sohbet] ${userAddress} AI ile sohbet ediyor - izin verildi`);
        // --- KONTROL SONU ---
        
        let currentHistory = [...(history || []), { role: "user", parts: [{ text: prompt }] }];
        let displayData = null; // Görüntülenecek veriyi tutmak için döngü dışında tanımlıyoruz.

        while (true) {
            const result = await coopaCore.generateContentFromHistory(currentHistory, lang);
            if (!result.response?.candidates?.[0]?.content?.parts?.[0]) { 
                throw new Error("Yapay zekadan geçersiz cevap alındı."); 
            }
            const part = result.response.candidates[0].content.parts[0];

            // ÖNEMLİ: find_memory için olan eski özel "if" bloğu buradan kaldırıldı.

            currentHistory.push({ role: "model", parts: [part] });

            if (part.functionCall) {
                console.log(`[Araç Çağrısı] -> ${part.functionCall.name}`);
                const { name, args } = part.functionCall;
                
                if (name === 'send_email') {
                     const action_details = { 
                        to: args.to, 
                        subject: args.subject, 
                        body: args.body, 
                        attachmentDescription: args.attachmentDescription 
                    };
                    return res.json({ requires_confirmation: true, action_details, history: currentHistory });
                }
                
                let toolResult;
                
                if (name === 'get_note') { toolResult = await get_note(args.noteName, lang); }
                else if (name === 'get_current_weather') { toolResult = await get_current_weather(args.location, lang); }
                else if (name === 'create_note') { toolResult = await create_note(args.noteName, args.content, lang); }
                else if (name === 'edit_note') { toolResult = await edit_note(args.noteName, args.newContent, lang); }
                else if (name === 'schedule_task') { toolResult = await schedule_task(args, lang, userAddress, signature); }
                else if (name === 'get_current_time') { toolResult = await get_current_time(lang); }
                else if (name === 'create_calendar_event') { toolResult = await create_calendar_event(args.title, args.date, args.time, args.description, lang); }
                // YENİ EKLENEN KISIM: find_memory artık standart bir araç gibi burada işleniyor.
                else if (name === 'find_memory') {
                    const memoryResult = await find_memory(args.searchText, userAddress, signature, lang);

                    // Yapay zeka için sonucun temiz bir kopyasını oluşturuyoruz.
                    const resultForAI = { ...memoryResult };
                    delete resultForAI.data; // Büyük 'data' özelliğini siliyoruz.
                    
                    // Yapay zeka sadece bu temiz sonucu görüyor.
                    toolResult = resultForAI;
                    
                    // Eğer tek bir resim bulunduysa, bunu arayüzde göstermek için ayırıyoruz.
                    if (memoryResult.found && !memoryResult.multiple) {
                        displayData = memoryResult.data;
                    }
                }
                
                currentHistory.push({ role: "function", parts: [{ functionResponse: { name, response: { result: toolResult } } }] });
            } else {
                break; // Eğer model bir araç çağırmadıysa, bu son cevaptır ve döngüden çıkılır.
            }
        }
        coopaCore.uploadToIrys(currentHistory.slice(-2));
        // Nihai cevap geçmişini ve varsa görüntülenecek veriyi frontend'e gönderiyoruz.
        res.json({ history: currentHistory, displayData: displayData });
    } catch (error) {
        console.error("❌ /generate rotasında hata:", error.message);
        const lang = getUserLanguage(req);
        const errHistory = [...(req.body.history || []), { role: "user", parts: [{ text: req.body.prompt }] }, { role: "model", parts: [{ text: t('server_error', lang) }] }];
        res.status(500).json({ history: errHistory });
    }
});

app.post('/execute-action', async (req, res) => {
    try {
        const { action_details, history, userAddress, signature } = req.body;
        const lang = getUserLanguage(req);
        
        if (!await verifySignature(fixedSignMessage, signature, userAddress)) {
            throw new Error(t('invalid_signature', lang));
        }
        
        const result = await send_email(action_details.to, action_details.subject, action_details.body, lang);
        const updatedHistory = [...history, { role: "function", parts: [{ functionResponse: { name: "send_email", response: { result } } }] }];
        
        const finalResult = await coopaCore.generateContentFromHistory(updatedHistory, lang);
        const finalPart = finalResult.response.candidates[0].content.parts[0];
        updatedHistory.push({ role: "model", parts: [finalPart] });
        
        coopaCore.uploadToIrys(updatedHistory.slice(-2));
        res.json({ history: updatedHistory });
    } catch (error) {
        console.error("❌ /execute-action rotasında hata:", error.message);
        const lang = getUserLanguage(req);
        res.status(500).json({ error: t('server_error', lang) });
    }
});

// --- SUNUCUYU BAŞLATAN ANA FONKSİYON ---
const startServer = async () => {
    try {
        await initializeDB();
        console.log("Veritabanı hazır, sunucu başlatılıyor...");
        app.listen(port, () => {
            console.log(`\n✅ Coopa Asistan (Çok Dilli Kararlı Sürüm) başarıyla başlatıldı!`);
            console.log(`   http://localhost:${port} adresinden erişebilirsiniz.`);
        });
    } catch (error) {
        console.error("❌ Sunucu başlatılamadı:", error);
        process.exit(1);
    }
};

startServer()