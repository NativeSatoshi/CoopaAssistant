// database.js - GOOGLE İZİN TABLOSU EKLENDİ

const sqlite3 = require('sqlite3').verbose();
const DB_SOURCE = "coopa_memory.db";

const db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else {
        console.log('✅ SQLite veritabanına başarıyla bağlanıldı.');
        
        db.run(`CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE,
            content TEXT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) console.error("'notes' tablosu oluşturulamadı:", err);
            else console.log("✅ 'notes' tablosu başarıyla oluşturuldu veya zaten mevcut.");
        });

        db.run(`CREATE TABLE IF NOT EXISTS memories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            irys_id TEXT NOT NULL,
            media_type TEXT,
            description TEXT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) console.error("'memories' tablosu oluşturulamadı:", err);
            else console.log("✅ 'memories' tablosu başarıyla oluşturuldu veya zaten mevcut.");
        });

        // YENİ: Google kimlik doğrulama anahtarlarını saklamak için tablo
        db.run(`CREATE TABLE IF NOT EXISTS google_auth (
            id INTEGER PRIMARY KEY DEFAULT 1,
            access_token TEXT,
            refresh_token TEXT,
            expiry_date INTEGER,
            scope TEXT
        )`, (err) => {
            if (err) console.error("'google_auth' tablosu oluşturulamadı:", err);
            else console.log("✅ 'google_auth' tablosu başarıyla oluşturuldu veya zaten mevcut.");
        });
    }
});

module.exports = db;