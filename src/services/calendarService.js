// src/services/calendarService.js

const { google } = require('googleapis');
const { oauth2Client } = require('../config/googleClient');
const { db } = require('../config/database');
const { t } = require('../config/i18n');

const normalizeTime = (timeString) => {
    if (!timeString) return null;
    const digits = timeString.match(/\d+/g);
    if (!digits) return null;
    let hour, minute;
    if (digits.length >= 2) {
        hour = digits[0].padStart(2, '0');
        minute = digits[1].padStart(2, '0');
    } else if (digits.length === 1) {
        hour = digits[0].padStart(2, '0');
        minute = "00";
    } else {
        return null;
    }
    if (parseInt(hour) > 23 || parseInt(minute) > 59) return null;
    return `${hour}:${minute}`;
};

async function createCalendarEvent(args, lang) {
    const { title, date, time, description = '' } = args;
    const timezone = 'Europe/Istanbul';

    try {
        const normalizedTime = normalizeTime(time);
        if (!normalizedTime) {
            throw new Error(`Invalid time format received from AI: "${time}"`);
        }

        let eventDateStr;
        // --- BU BLOK TAMAMEN YENİLENDİ ---
        // Gelen 'date' verisinin 'YYYY-MM-DD' formatında olup olmadığını kontrol et.
        const isDateFormatCorrect = /^\d{4}-\d{2}-\d{2}$/.test(date);

        if (isDateFormatCorrect) {
            // Eğer format doğruysa, yapay zekanın gönderdiği tarihi doğrudan kullan.
            eventDateStr = date;
        } else {
            // Eğer format doğru DEĞİLSE (örn: "yau", "bugün", "tomorrow" gibi bir kelime ise),
            // bunu "bugün" olarak kabul et ve tarihi biz hesaplayalım.
            console.log(`[Calendar Service] Received a non-standard date format ('${date}'). Assuming 'today'.`);
            const today = new Date(new Date().toLocaleString("en-US", { timeZone: timezone }));
            eventDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        }
        // --- YENİ BLOK SONU ---

        const tokens = await new Promise((resolve, reject) => {
            db.get(`SELECT refresh_token FROM google_auth WHERE id = 1`, (err, row) => {
                if (err) return reject(err);
                if (!row || !row.refresh_token) {
                    return reject(new Error("Google authentication not found. Please authorize from the UI."));
                }
                resolve(row);
            });
        });
        
        oauth2Client.setCredentials({ refresh_token: tokens.refresh_token });
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        const eventDateTime = new Date(`${eventDateStr}T${normalizedTime}`);
        if (isNaN(eventDateTime.getTime())) {
            throw new Error(`Could not create a valid date from processed date: "${eventDateStr}" and time: "${normalizedTime}"`);
        }

        const eventEndTime = new Date(eventDateTime.getTime() + 60 * 60 * 1000);
        
        const event = {
            summary: title,
            description,
            start: { dateTime: eventDateTime.toISOString(), timeZone: timezone },
            end: { dateTime: eventEndTime.toISOString(), timeZone: timezone }
        };

        const response = await calendar.events.insert({ calendarId: 'primary', resource: event });
        return { success: true, message: `"${title}" ${t('calendar_added', lang)}`, event_link: response.data.htmlLink };
    } catch (error) {
        console.error("❌ Google Calendar error:", error.message);
        return { success: false, error: `${t('calendar_error', lang)}: ${error.message}` };
    }
}

module.exports = { createCalendarEvent };