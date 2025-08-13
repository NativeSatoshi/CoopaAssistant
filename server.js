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
        "welcome": "Merhaba! Size nasıl yardımcı olabilirim?",
        "weather_error": "için hava durumu bilgisi alınamadı.",
        "email_sent": "E-posta başarıyla gönderildi:",
        "email_error": "E-posta gönderilirken hata oluştu:",
        "note_saved": "notu kaydedildi. Yeni içerik:",
        "note_not_found": "isminde bir not bulunamadı.",
        "note_empty": "(notun içeriği boş)",
        "note_db_error": "notunu okurken bir veritabanı hatası oluştu:",
        "current_time": "Şu an saat",
        "current_date": "tarih",
        "calendar_added": "etkinliği takviminize eklendi.",
        "calendar_error": "Takvim etkinliği oluşturulamadı:",
        "task_scheduled": "Görev başarıyla zamanlandı.",
        "task_reminder": "konusu saat",
        "memory_saved": "adresli kullanıcı için anı veritabanına kaydedildi.",
        "memory_found": "açıklamalı anı bulundu.",
        "memory_not_found": "ile eşleşen bir anı bulunamadı.",
        "memory_search_not_found": "'{searchText}' ile eşleşen bir anı bulunamadı.",
        "memory_decrypt_error": "Anı bulundu ancak deşifre edilemedi.",
        "upload_success": "Anı Başarıyla Şifrelenerek Kalıcı Olarak Kaydedildi!",
        "invalid_signature": "Geçersiz imza. Kimlik doğrulanamadı.",
        "missing_info": "Eksik bilgi: Dosya, adres veya imza belirtilmemiş.",
        "server_error": "Bir hata oluştu: Sunucu hatası",
        "task_missing_time": "Görevi zamanlamak için bir saat belirtmelisiniz.",
        "task_invalid_time": "Geçersiz zaman formatı. Lütfen 'HH:MM' formatında belirtin.",
        "task_note_subject": "Coopa Not Hatırlatıcısı: {noteName}",
        "task_note_body": "Hatırlatmanız gereken notun içeriği aşağıdadır:\n\n\"{noteContent}\"",
        "task_file_subject": "Coopa Dosya Hatırlatıcısı: {attachmentDescription}",
        "task_file_body": "İstediğiniz \"{attachmentDescription}\" anısı e-postaya eklenmiştir.",
        "task_error_insufficient_info": "Zamanlanmış görev için yeterli bilgi bulunamadı (not, dosya veya e-posta içeriği eksik).",
        "task_success_message": "'{taskIdentifier}' görevi, saat {time} için başarıyla zamanlandı.",
        "email_attachment_not_found": "(Not: İstediğiniz \"{attachmentDescription}\" anısı bulunamadığı için e-postaya eklenemedi.)"
    },
    en: {
        "welcome": "Hello! How can I help you?",
        "weather_error": "Weather information could not be retrieved for",
        "email_sent": "Email successfully sent:",
        "email_error": "An error occurred while sending the email:",
        "note_saved": "note has been saved. New content:",
        "note_not_found": "A note with the name was not found.",
        "note_empty": "(note content is empty)",
        "note_db_error": "A database error occurred while reading the note:",
        "current_time": "The current time is",
        "current_date": "the date is",
        "calendar_added": "event has been added to your calendar.",
        "calendar_error": "Could not create calendar event:",
        "task_scheduled": "Task scheduled successfully.",
        "task_reminder": "subject at",
        "memory_saved": "Memory saved to the database for user with address.",
        "memory_found": "Memory with description found.",
        "memory_not_found": "No memory matching was found.",
        "memory_search_not_found": "No memory matching '{searchText}' was found.",
        "memory_decrypt_error": "Memory found but could not be decrypted.",
        "upload_success": "Memory Successfully Encrypted and Permanently Saved!",
        "invalid_signature": "Invalid signature. Authentication failed.",
        "missing_info": "Missing information: File, address, or signature not specified.",
        "server_error": "An error occurred: Server error",
        "task_missing_time": "You must specify a time to schedule the task.",
        "task_invalid_time": "Invalid time format. Please use 'HH:MM' format.",
        "task_note_subject": "Coopa Note Reminder: {noteName}",
        "task_note_body": "Here is the content of the note you wanted to be reminded of:\n\n\"{noteContent}\"",
        "task_file_subject": "Coopa File Reminder: {attachmentDescription}",
        "task_file_body": "The memory \"{attachmentDescription}\" you requested has been attached to the email.",
        "task_error_insufficient_info": "Insufficient information for scheduled task (missing note, file, or email content).",
        "task_success_message": "The task '{taskIdentifier}' has been successfully scheduled for {time}.",
        "email_attachment_not_found": "(Note: The requested memory \"{attachmentDescription}\" could not be found and was not attached to the email.)"
    },
    es: {
        "welcome": "¡Hola! ¿Cómo puedo ayudarte?",
        "weather_error": "No se pudo obtener la información del tiempo para",
        "email_sent": "Correo electrónico enviado con éxito:",
        "email_error": "Ocurrió un error al enviar el correo electrónico:",
        "note_saved": "la nota ha sido guardada. Nuevo contenido:",
        "note_not_found": "No se encontró una nota con el nombre.",
        "note_empty": "(el contenido de la nota está vacío)",
        "note_db_error": "Ocurrió un error en la base de datos al leer la nota:",
        "current_time": "La hora actual es",
        "current_date": "la fecha es",
        "calendar_added": "el evento ha sido añadido a tu calendario.",
        "calendar_error": "No se pudo crear el evento del calendario:",
        "task_scheduled": "Tarea programada con éxito.",
        "task_reminder": "asunto a las",
        "memory_saved": "Recuerdo guardado en la base de datos para el usuario con la dirección.",
        "memory_found": "Se encontró el recuerdo con la descripción.",
        "memory_not_found": "No se encontró ningún recuerdo que coincida con.",
        "memory_search_not_found": "No se encontró ningún recuerdo que coincida con '{searchText}'.",
        "memory_decrypt_error": "Se encontró el recuerdo pero no se pudo descifrar.",
        "upload_success": "¡Recuerdo Cifrado y Guardado Permanentemente con Éxito!",
        "invalid_signature": "Firma no válida. No se pudo autenticar.",
        "missing_info": "Información faltante: No se especificó archivo, dirección o firma.",
        "server_error": "Ocurrió un error: Error del servidor",
        "task_missing_time": "Debes especificar una hora para programar la tarea.",
        "task_invalid_time": "Formato de hora no válido. Por favor, usa el formato 'HH:MM'.",
        "task_note_subject": "Recordatorio de Nota de Coopa: {noteName}",
        "task_note_body": "Aquí está el contenido de la nota que querías que te recordaran:\n\n\"{noteContent}\"",
        "task_file_subject": "Recordatorio de Archivo de Coopa: {attachmentDescription}",
        "task_file_body": "El recuerdo \"{attachmentDescription}\" que solicitaste ha sido adjuntado al correo electrónico.",
        "task_error_insufficient_info": "Información insuficiente para la tarea programada (falta nota, archivo o contenido de correo electrónico).",
        "task_success_message": "La tarea '{taskIdentifier}' ha sido programada con éxito para las {time}.",
        "email_attachment_not_found": "(Nota: El recuerdo solicitado \"{attachmentDescription}\" no se pudo encontrar y no se ha adjuntado al correo electrónico.)"
    },
    fr: {
        "welcome": "Bonjour ! Comment puis-je vous aider ?",
        "weather_error": "Les informations météorologiques n'ont pas pu être récupérées pour",
        "email_sent": "E-mail envoyé avec succès :",
        "email_error": "Une erreur est survenue lors de l'envoi de l'e-mail :",
        "note_saved": "la note a été enregistrée. Nouveau contenu :",
        "note_not_found": "Aucune note portant le nom n'a été trouvée.",
        "note_empty": "(le contenu de la note est vide)",
        "note_db_error": "Une erreur de base de données est survenue lors de la lecture de la note :",
        "current_time": "L'heure actuelle est",
        "current_date": "la date est le",
        "calendar_added": "l'événement a été ajouté à votre calendrier.",
        "calendar_error": "Impossible de créer l'événement de calendrier :",
        "task_scheduled": "Tâche planifiée avec succès.",
        "task_reminder": "sujet à",
        "memory_saved": "Souvenir enregistré dans la base de données pour l'utilisateur avec l'adresse.",
        "memory_found": "Souvenir avec la description trouvé.",
        "memory_not_found": "Aucun souvenir correspondant à n'a été trouvé.",
        "memory_search_not_found": "Aucun souvenir correspondant à '{searchText}' n'a été trouvé.",
        "memory_decrypt_error": "Souvenir trouvé mais n'a pas pu être déchiffré.",
        "upload_success": "Souvenir Chiffré et Enregistré de Manière Permanente avec Succès !",
        "invalid_signature": "Signature invalide. Authentification échouée.",
        "missing_info": "Informations manquantes : Fichier, adresse ou signature non spécifiés.",
        "server_error": "Une erreur est survenue : Erreur de serveur",
        "task_missing_time": "Vous devez spécifier une heure pour planifier la tâche.",
        "task_invalid_time": "Format d'heure invalide. Veuillez utiliser le format 'HH:MM'.",
        "task_note_subject": "Rappel de Note Coopa : {noteName}",
        "task_note_body": "Voici le contenu de la note dont vous vouliez vous souvenir :\n\n\"{noteContent}\"",
        "task_file_subject": "Rappel de Fichier Coopa : {attachmentDescription}",
        "task_file_body": "Le souvenir \"{attachmentDescription}\" que vous avez demandé a été joint à l'e-mail.",
        "task_error_insufficient_info": "Informations insuffisantes pour la tâche planifiée (note, fichier ou contenu d'e-mail manquant).",
        "task_success_message": "La tâche '{taskIdentifier}' a été planifiée avec succès pour {time}.",
        "email_attachment_not_found": "(Remarque : Le souvenir demandé \"{attachmentDescription}\" n'a pas pu être trouvé et n'a pas été joint à l'e-mail.)"
    },
    it: {
        "welcome": "Ciao! Come posso aiutarti?",
        "weather_error": "Impossibile recuperare le informazioni meteo per",
        "email_sent": "Email inviata con successo:",
        "email_error": "Si è verificato un errore durante l'invio dell'email:",
        "note_saved": "la nota è stata salvata. Nuovo contenuto:",
        "note_not_found": "Nessuna nota con il nome è stata trovata.",
        "note_empty": "(il contenuto della nota è vuoto)",
        "note_db_error": "Si è verificato un errore del database durante la lettura della nota:",
        "current_time": "L'ora attuale è",
        "current_date": "la data è il",
        "calendar_added": "l'evento è stato aggiunto al tuo calendario.",
        "calendar_error": "Impossibile creare l'evento del calendario:",
        "task_scheduled": "Attività pianificata con successo.",
        "task_reminder": "soggetto alle",
        "memory_saved": "Ricordo salvato nel database per l'utente con indirizzo.",
        "memory_found": "Trovato ricordo con descrizione.",
        "memory_not_found": "Nessun ricordo corrispondente a è stato trovato.",
        "memory_search_not_found": "Nessun ricordo corrispondente a '{searchText}' è stato trovato.",
        "memory_decrypt_error": "Ricordo trovato ma non è stato possibile decifrarlo.",
        "upload_success": "Ricordo Cifrato e Salvato Permanentemente con Successo!",
        "invalid_signature": "Firma non valida. Autenticazione non riuscita.",
        "missing_info": "Informazioni mancanti: File, indirizzo o firma non specificati.",
        "server_error": "Si è verificato un errore: Errore del server",
        "task_missing_time": "Devi specificare un'ora per pianificare l'attività.",
        "task_invalid_time": "Formato dell'ora non valido. Si prega di usare il formato 'HH:MM'.",
        "task_note_subject": "Promemoria Nota Coopa: {noteName}",
        "task_note_body": "Ecco il contenuto della nota di cui volevi essere ricordato:\n\n\"{noteContent}\"",
        "task_file_subject": "Promemoria File Coopa: {attachmentDescription}",
        "task_file_body": "Il ricordo \"{attachmentDescription}\" che hai richiesto è stato allegato all'email.",
        "task_error_insufficient_info": "Informazioni insufficienti per l'attività pianificata (manca nota, file o contenuto email).",
        "task_success_message": "L'attività '{taskIdentifier}' è stata pianificata con successo per le {time}.",
        "email_attachment_not_found": "(Nota: il ricordo richiesto \"{attachmentDescription}\" non è stato trovato e non è stato allegato all'email.)"
    },
    zh: {
        "welcome": "你好！我能为你做些什么？",
        "weather_error": "无法获取天气信息",
        "email_sent": "电子邮件已成功发送：",
        "email_error": "发送电子邮件时出错：",
        "note_saved": "笔记已保存。新内容：",
        "note_not_found": "找不到名为的笔记。",
        "note_empty": "（笔记内容为空）",
        "note_db_error": "读取笔记时发生数据库错误：",
        "current_time": "现在的时间是",
        "current_date": "日期是",
        "calendar_added": "活动已添加到您的日历中。",
        "calendar_error": "无法创建日历活动：",
        "task_scheduled": "任务已成功安排。",
        "task_reminder": "主题于",
        "memory_saved": "已为地址为的用户将记忆保存到数据库。",
        "memory_found": "已找到描述为的记忆。",
        "memory_not_found": "未找到匹配的记忆。",
        "memory_search_not_found": "未找到与“{searchText}”匹配的记忆。",
        "memory_decrypt_error": "找到但无法解密记忆。",
        "upload_success": "记忆已成功加密并永久保存！",
        "invalid_signature": "无效签名。身份验证失败。",
        "missing_info": "信息缺失：未指定文件、地址或签名。",
        "server_error": "发生错误：服务器错误",
        "task_missing_time": "您必须指定时间才能安排任务。",
        "task_invalid_time": "无效的时间格式。请使用'HH:MM'格式。",
        "task_note_subject": "Coopa 笔记提醒：{noteName}",
        "task_note_body": "这是您希望被提醒的笔记内容：\n\n“{noteContent}”",
        "task_file_subject": "Coopa 文件提醒：{attachmentDescription}",
        "task_file_body": "您请求的“{attachmentDescription}”记忆已附加到电子邮件中。",
        "task_error_insufficient_info": "计划任务信息不足（缺少笔记、文件或电子邮件内容）。",
        "task_success_message": "任务“{taskIdentifier}”已成功安排在 {time}。",
        "email_attachment_not_found": "(注意：无法找到您请求的记忆“{attachmentDescription}”，因此未附加到电子邮件中。)"
    },
    de: {
        "welcome": "Hallo! Wie kann ich Ihnen helfen?",
        "weather_error": "Wetterinformationen konnten nicht für abgerufen werden.",
        "email_sent": "E-Mail erfolgreich gesendet:",
        "email_error": "Beim Senden der E-Mail ist ein Fehler aufgetreten:",
        "note_saved": "Notiz wurde gespeichert. Neuer Inhalt:",
        "note_not_found": "Eine Notiz mit dem Namen wurde nicht gefunden.",
        "note_empty": "(Notizinhalt ist leer)",
        "note_db_error": "Beim Lesen der Notiz ist ein Datenbankfehler aufgetreten:",
        "current_time": "Es ist",
        "current_date": "das Datum ist der",
        "calendar_added": "Ereignis wurde Ihrem Kalender hinzugefügt.",
        "calendar_error": "Kalenderereignis konnte nicht erstellt werden:",
        "task_scheduled": "Aufgabe erfolgreich geplant.",
        "task_reminder": "Betreff um",
        "memory_saved": "Erinnerung für Benutzer mit Adresse in der Datenbank gespeichert.",
        "memory_found": "Erinnerung mit Beschreibung gefunden.",
        "memory_not_found": "Keine passende Erinnerung für gefunden.",
        "memory_search_not_found": "Keine Erinnerung passend zu '{searchText}' gefunden.",
        "memory_decrypt_error": "Erinnerung gefunden, konnte aber nicht entschlüsselt werden.",
        "upload_success": "Erinnerung Erfolgreich Verschlüsselt und Dauerhaft Gespeichert!",
        "invalid_signature": "Ungültige Signatur. Authentifizierung fehlgeschlagen.",
        "missing_info": "Fehlende Informationen: Datei, Adresse oder Signatur nicht angegeben.",
        "server_error": "Ein Fehler ist aufgetreten: Serverfehler",
        "task_missing_time": "Sie müssen eine Zeit angeben, um die Aufgabe zu planen.",
        "task_invalid_time": "Ungültiges Zeitformat. Bitte verwenden Sie das 'HH:MM'-Format.",
        "task_note_subject": "Coopa-Notizerinnerung: {noteName}",
        "task_note_body": "Hier ist der Inhalt der Notiz, an die Sie erinnert werden wollten:\n\n„{noteContent}“",
        "task_file_subject": "Coopa-Dateierinnerung: {attachmentDescription}",
        "task_file_body": "Die von Ihnen angeforderte Erinnerung „{attachmentDescription}“ wurde der E-Mail angehängt.",
        "task_error_insufficient_info": "Unzureichende Informationen für die geplante Aufgabe (fehlende Notiz, Datei oder E-Mail-Inhalt).",
        "task_success_message": "Die Aufgabe '{taskIdentifier}' wurde erfolgreich für {time} geplant.",
        "email_attachment_not_found": "(Hinweis: Die angeforderte Erinnerung \"{attachmentDescription}\" konnte nicht gefunden werden und wurde der E-Mail nicht beigefügt.)"
    },
    ru: {
        "welcome": "Здравствуйте! Чем я могу вам помочь?",
        "weather_error": "Не удалось получить информацию о погоде для",
        "email_sent": "Электронное письмо успешно отправлено:",
        "email_error": "Произошла ошибка при отправке электронного письма:",
        "note_saved": "заметка сохранена. Новое содержание:",
        "note_not_found": "Заметка с таким названием не найдена.",
        "note_empty": "(содержимое заметки пусто)",
        "note_db_error": "Произошла ошибка базы данных при чтении заметки:",
        "current_time": "Текущее время",
        "current_date": "сегодня",
        "calendar_added": "событие добавлено в ваш календарь.",
        "calendar_error": "Не удалось создать событие в календаре:",
        "task_scheduled": "Задача успешно запланирована.",
        "task_reminder": "тема в",
        "memory_saved": "Воспоминание сохранено в базе данных для пользователя с адресом.",
        "memory_found": "Найдено воспоминание с описанием.",
        "memory_not_found": "Не найдено воспоминание, соответствующее.",
        "memory_search_not_found": "Не найдено воспоминание, соответствующее '{searchText}'.",
        "memory_decrypt_error": "Воспоминание найдено, но не может быть расшифровано.",
        "upload_success": "Воспоминание Успешно Зашифровано и Постоянно Сохранено!",
        "invalid_signature": "Неверная подпись. Аутентификация не удалась.",
        "missing_info": "Отсутствует информация: не указан файл, адрес или подпись.",
        "server_error": "Произошла ошибка: Ошибка сервера",
        "task_missing_time": "Вы должны указать время для планирования задачи.",
        "task_invalid_time": "Неверный формат времени. Пожалуйста, используйте формат 'ЧЧ:ММ'.",
        "task_note_subject": "Напоминание о заметке Coopa: {noteName}",
        "task_note_body": "Вот содержание заметки, о которой вы хотели получить напоминание:\n\n«{noteContent}»",
        "task_file_subject": "Напоминание о файле Coopa: {attachmentDescription}",
        "task_file_body": "Запрошенное вами воспоминание «{attachmentDescription}» прикреплено к электронному письму.",
        "task_error_insufficient_info": "Недостаточно информации для запланированной задачи (отсутствует заметка, файл или содержимое письма).",
        "task_success_message": "Задача «{taskIdentifier}» успешно запланирована на {time}.",
        "email_attachment_not_found": "(Примечание: запрошенное воспоминание «{attachmentDescription}» не найдено и не было прикреплено к электронному письму.)"
    }
};

// t() fonksiyonu, kullandığı translations objesinden SONRA gelmeli.
function t(key, lang = 'tr') { // DOĞRU YER BURASI
    return translations[lang][key] || translations['tr'][key] || key;
}

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

const fixedSignMessage = "Bu, CoopaASI için kalıcı şifreleme anahtarımı oluşturacak ve bu anahtar başka bir amaç için kullanılmayacaktır.";

// server.js dosyasının üst kısımlarına, diğer yardımcı fonksiyonların yanına ekleyin.

// Metin şifreleme için yeni yardımcı fonksiyon
const encryptString = (text, key) => {
    return CryptoJS.AES.encrypt(text, key).toString();
};

// Metin deşifreleme için yeni yardımcı fonksiyon
const decryptString = (ciphertext, key) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
};

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

async function send_email(args, userAddress, signature, lang = 'tr') {
    const { to, subject, body, attachmentDescription } = args;
    try {
        const user = process.env.GMAIL_USER;
        const pass = process.env.GMAIL_APP_PASSWORD;
        if (!user || !pass) throw new Error("Gmail kullanıcı adı veya Uygulama Şifresi .env dosyasında eksik.");

        let transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });

        const mailOptions = {
            from: `"Coopa Asistan" <${user}>`,
            to,
            subject,
            text: body,
            attachments: []
        };

        if (attachmentDescription) {
            console.log(`[E-posta Eklentisi] "${attachmentDescription}" anısı aranıyor...`);
            const memoryResult = await find_memory(attachmentDescription, userAddress, signature, lang);

            if (memoryResult.found && memoryResult.data && memoryResult.data.decryptedDataUrl) {
                console.log(`[E-posta Eklentisi] Anı bulundu. E-postaya ekleniyor...`);
                const dataUrlParts = memoryResult.data.decryptedDataUrl.split(',');
                const mimeType = dataUrlParts[0].match(/:(.*?);/)[1];
                const buffer = Buffer.from(dataUrlParts[1], 'base64');

                mailOptions.attachments.push({
                    filename: memoryResult.description.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'attachment',
                    content: buffer,
                    contentType: mimeType
                });
            } else {
                console.warn(`[E-posta Eklentisi] "${attachmentDescription}" anısı bulunamadı veya veri bozuk. E-posta ek olmadan gönderilecek.`);
                // DİKKAT: Bu satır, `t()` fonksiyonunu kullanacak şekilde güncellendi.
                const notFoundText = t('email_attachment_not_found', lang).replace('{attachmentDescription}', attachmentDescription);
                mailOptions.text += `\n\n${notFoundText}`;
            }
        }

        await transporter.sendMail(mailOptions);
        return { success: true, message: `${t('email_sent', lang)} ${to}` };

    } catch (error) {
        console.error(`[E-posta Hatası] Hata: ${error.message}`);
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

async function create_calendar_event(title, date, time, description = '', lang = 'tr', timezone = 'Europe/Istanbul') { 
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
    const userDate = new Date(today.toLocaleString("en-US", {timeZone: timezone}));
    eventDateStr = `${userDate.getFullYear()}-${String(userDate.getMonth() + 1).padStart(2, '0')}-${String(userDate.getDate()).padStart(2, '0')}`;
} else {
    eventDateStr = date;
}

const eventDateTime = new Date(`${eventDateStr}T${time}+03:00`);
if (isNaN(eventDateTime.getTime())) {
    throw new Error(`Geçersiz tarih/saat formatı.`);
}

        const eventEndTime = new Date(eventDateTime.getTime() + 60 * 60 * 1000); 
        const event = { summary: title, description, start: { dateTime: eventDateTime.toISOString(), timeZone: timezone }, end: { dateTime: eventEndTime.toISOString(), timeZone: timezone } }; 
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
async function schedule_task(args, userAddress, signature, lang = 'tr') {
    const { noteName, time, subject, body, attachmentDescription } = args;

    if (!time) {
        return { success: false, message: t('task_missing_time', lang) };
    }

    const [hour, minute] = time.split(':');
    if (isNaN(hour) || isNaN(minute)) {
        return { success: false, message: t('task_invalid_time', lang) };
    }

    const cronTime = `${minute} ${hour} * * *`;
    const taskIdentifier = noteName || attachmentDescription || subject || 'Task';
    console.log(`[Zamanlayıcı] Görev ayarlanıyor. Zaman: ${cronTime}, Görev: '${taskIdentifier}'`);

    const task = cron.schedule(cronTime, async () => {
        
        console.log(`[Zamanlayıcı] ZAMAN GELDİ! '${taskIdentifier}' görevi tetiklendi.`);
        
        const targetEmail = process.env.MY_EMAIL_ADDRESS;
        let emailSubject = '';
        let emailBody = '';
        let finalAttachmentDescription = null;

        try {
            if (noteName) {
                console.log(`[Zamanlayıcı] '${noteName}' notu veritabanından şimdi alınıyor...`);
                const noteContent = await get_note(noteName, lang); 

                if (noteContent.includes(t('note_not_found', lang)) || noteContent.includes(t('note_db_error', lang))) {
                    throw new Error(`Zamanlanmış görev için '${noteName}' notu bulunamadı.`);
                }
                emailSubject = t('task_note_subject', lang).replace('{noteName}', noteName);
                emailBody = t('task_note_body', lang).replace('{noteContent}', noteContent);
            } 
            else if (attachmentDescription) {
                console.log(`[Zamanlayıcı] '${attachmentDescription}' dosyası için e-posta hazırlanıyor...`);
                emailSubject = t('task_file_subject', lang).replace('{attachmentDescription}', attachmentDescription);
                emailBody = t('task_file_body', lang).replace('{attachmentDescription}', attachmentDescription);
                finalAttachmentDescription = attachmentDescription;
            }
            else if (subject && body) {
                console.log(`[Zamanlayıcı] Basit e-posta için içerik hazırlanıyor...`);
                emailSubject = subject;
                emailBody = body;
            }
            else {
                 throw new Error(t('task_error_insufficient_info', lang));
            }

            console.log(`[Zamanlayıcı] E-posta gönderiliyor... Konu: ${emailSubject}`);
            const emailArgs = { to: targetEmail, subject: emailSubject, body: emailBody, attachmentDescription: finalAttachmentDescription };
            const result = await send_email(emailArgs, userAddress, signature, lang);

            if (result.success) {
                console.log(`[Zamanlayıcı] ✅ E-posta başarıyla gönderildi.`);
            } else {
                console.log(`[Zamanlayıcı] ❌ E-posta gönderilemedi.`);
            }

        } catch (error) {
            console.error(`[Zamanlayıcı] ❌ Zamanlanmış görev yürütülürken bir hata oluştu:`, error.message);
        } finally {
            task.stop();
            console.log(`[Zamanlayıcı] '${taskIdentifier}' görevi tamamlandı ve durduruldu.`);
        }

    }, { timezone: "Europe/Istanbul", scheduled: true });

    const successMessage = t('task_success_message', lang)
        .replace('{taskIdentifier}', taskIdentifier)
        .replace('{time}', time);
        
    return { success: true, message: successMessage };
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
    return new Promise((resolve) => {
        const sql = `SELECT * FROM memories WHERE user_address = ? ORDER BY created_at DESC`;
        
        db.all(sql, [userAddress], async (err, rows) => {
            if (err) {
                console.error("❌ Anı aranırken veritabanı hatası:", err.message);
                return resolve({ error: err.message });
            }

            if (!rows || rows.length === 0) {
                // DİKKAT: Bu satır da çok dilli hale getirildi.
                return resolve({ found: false, message: t('memory_not_found', lang) });
            }

            const searchKeywords = searchText.toLowerCase().split(' ').filter(word => word.length > 2);
            let bestMatch = null;
            let maxScore = 0;

            for (const row of rows) {
                try {
                    const decryptedDescription = decryptString(row.description, signature);
                    if (!decryptedDescription) {
                        console.warn(`[UYARI] Bir anının şifresi çözülemedi (TX_ID: ${row.tx_id}). Farklı bir oturumda kaydedilmiş olabilir.`);
                        continue;
                    }

                    const descriptionLowerCase = decryptedDescription.toLowerCase();
                    let currentScore = 0;
                    for (const keyword of searchKeywords) {
                        if (descriptionLowerCase.includes(keyword)) {
                            currentScore++;
                        }
                    }

                    if (currentScore > maxScore) {
                        maxScore = currentScore;
                        bestMatch = row;
                    }
                } catch (e) {
                    continue; 
                }
            }

            if (bestMatch && maxScore > 0) {
                try {
                    const finalDescription = decryptString(bestMatch.description, signature);
                    console.log(`✅ En iyi anı eşleşmesi bulundu: "${finalDescription}". Veri Arweave'den çekiliyor...`);
                    
                    const gatewayUrl = `https://arweave.net/${bestMatch.tx_id}`;
                    const response = await axios.get(gatewayUrl, { responseType: 'arraybuffer' });
                    
                    const encryptedBuffer = Buffer.from(response.data, 'binary');
                    const decryptedBuffer = decryptBuffer(encryptedBuffer, signature);
                    const decryptedDataUrl = `data:${bestMatch.media_type};base64,${decryptedBuffer.toString('base64')}`;
                    
                    return resolve({ 
                        found: true, 
                        description: finalDescription, 
                        data: { decryptedDataUrl, description: finalDescription, mediaType: bestMatch.media_type } 
                    });
                } catch (error) {
                    console.error("❌ Anı Arweave'den çekilirken veya deşifre edilirken hata:", error);
                    return resolve({ error: t('memory_decrypt_error', lang) });
                }
            }
            // DİKKAT: Bu satır, `t()` fonksiyonunu kullanacak şekilde güncellendi.
            resolve({ found: false, message: t('memory_search_not_found', lang).replace('{searchText}', searchText) });
        });
    });
}

// server.js içine, find_memory fonksiyonunun altına bu yeni fonksiyonu ekleyin.



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
        // Açıklamayı veritabanına kaydetmeden önce şifreliyoruz.
        const encryptedDescription = encryptString(description, signature);
        await saveMemory(receipt.id, encryptedDescription, file.mimetype, userAddress, lang);
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

            // server.js dosyasındaki mevcut if (part.functionCall) { ... } bloğunu
// komple silip yerine bu yeni versiyonu yapıştırın.

if (part.functionCall) {
    console.log(`[Araç Çağrısı] -> ${part.functionCall.name}`);
    const { name, args } = part.functionCall;
    
    let toolResult;
    
    // Araçları işleyen ana kontrol bloğu
    if (name === 'get_note') {
        toolResult = await get_note(args.noteName, lang);
    } 
    else if (name === 'get_current_weather') {
        toolResult = await get_current_weather(args.location, lang);
    } 
    else if (name === 'create_note') {
        toolResult = await create_note(args.noteName, args.content, lang);
    } 
    else if (name === 'edit_note') {
        toolResult = await edit_note(args.noteName, args.newContent, lang);
    } 
    else if (name === 'schedule_task') {
    // Yapay zekadan gelen argümanları olduğu gibi, değiştirmeden fonksiyona iletiyoruz.
    // Fonksiyonun kendisi not mu dosya mı olduğunu ayırt edecektir.
    toolResult = await schedule_task(args, userAddress, signature, lang);
}
    else if (name === 'get_current_time') {
        toolResult = await get_current_time(lang);
    } 
    else if (name === 'create_calendar_event') {
        toolResult = await create_calendar_event(args.title, args.date, args.time, args.description, lang);
    } 
    else if (name === 'find_memory') {
        const memoryResult = await find_memory(args.searchText, userAddress, signature, lang);
        
        // Yapay zeka için sonucun temiz bir kopyasını oluşturuyoruz.
        const resultForAI = { ...memoryResult };
        delete resultForAI.data; // Büyük 'data' özelliğini siliyoruz.
        
        toolResult = resultForAI;
        
        // Eğer tek bir anı bulunduysa, bunu arayüzde göstermek için ayırıyoruz.
        if (memoryResult.found && !memoryResult.multiple) {
            displayData = memoryResult.data;
        }
    }
    // --- YENİ EKLENEN E-POSTA KONTROLÜ ---
    else if (name === 'send_email') {
        toolResult = await (async () => {
            const { to, subject, body, attachmentDescription } = args;
            try {
                const user = process.env.GMAIL_USER;
                const pass = process.env.GMAIL_APP_PASSWORD;
                if (!user || !pass) throw new Error("Gmail credentials missing in .env file.");

                let transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
                
                const mailOptions = {
                    from: `"Coopa Assistant" <${user}>`,
                    to,
                    subject,
                    text: body,
                    attachments: []
                };

                if (attachmentDescription) {
                    console.log(`[Email Attachment] Searching for memory: "${attachmentDescription}"`);
                    
                    const memoryResult = await find_memory(attachmentDescription, userAddress, signature, lang);

                    if (memoryResult.found && memoryResult.data && memoryResult.data.decryptedDataUrl) {
                        console.log(`[Email Attachment] Memory found. Attaching to email...`);
                        
                        const dataUrlParts = memoryResult.data.decryptedDataUrl.split(',');
                        const mimeType = dataUrlParts[0].match(/:(.*?);/)[1];
                        const buffer = Buffer.from(dataUrlParts[1], 'base64');

                        mailOptions.attachments.push({
                            filename: (memoryResult.description.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'attachment') + `.${mimeType.split('/')[1] || 'dat'}`,
                            content: buffer,
                            contentType: mimeType
                        });
                    } else {
                        console.warn(`[Email Attachment] Memory "${attachmentDescription}" not found. Sending email without attachment.`);
                        mailOptions.text += `\n\n(Note: The requested memory "${attachmentDescription}" could not be found and was not attached.)`;
                    }
                }
                
                await transporter.sendMail(mailOptions);
                return { success: true, message: `${t('email_sent', lang)} ${to}` };

            } catch (error) {
                console.error(`[Email Error] Details: ${error.message}`);
                return { success: false, error: `${t('email_error', lang)} ${error.message}` };
            }
        })();
    }
    // --- E-POSTA KONTROLÜ SONU ---

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