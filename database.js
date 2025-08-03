// database.js - TEMİZ VE SAĞLAM NİHAİ SÜRÜM

const sqlite3 = require('sqlite3').verbose();
const DB_SOURCE = "coopa_memory.db";

const db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        console.error("❌ Veritabanı dosyası açılamadı:", err.message);
        throw err;
    }
});

const runQuery = (query) => {
    return new Promise((resolve, reject) => {
        db.run(query, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

const initializeDB = async () => {
    console.log('✅ SQLite veritabanına başarıyla bağlanıldı ve kurulum başlıyor...');
    try {
        await runQuery(`CREATE TABLE IF NOT EXISTS notes (
            name TEXT PRIMARY KEY,
            content TEXT
        )`);
        console.log("✅ 'notes' tablosu hazır.");

        await runQuery(`CREATE TABLE IF NOT EXISTS google_auth (
            id INTEGER PRIMARY KEY DEFAULT 1,
            access_token TEXT,
            refresh_token TEXT,
            expiry_date INTEGER,
            scope TEXT
        )`);
        console.log("✅ 'google_auth' tablosu hazır.");

        await runQuery(`CREATE TABLE IF NOT EXISTS reminders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            note_name TEXT NOT NULL,
            cron_time TEXT NOT NULL,
            target_email TEXT NOT NULL,
            is_active INTEGER DEFAULT 1
        )`);
        console.log("✅ 'reminders' tablosu hazır.");

        console.log("👍 Veritabanı kurulumu başarıyla tamamlandı.");
        return db;

    } catch (error) {
        console.error("❌ Veritabanı kurulumu sırasında bir hata oluştu:", error);
        throw error;
    }
};

module.exports = { db, initializeDB };