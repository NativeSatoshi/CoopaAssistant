// database.js - NİHAİ KARARLI SÜRÜM

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
            if (err) console.error("Tablo oluşturulamadı:", err);
            else console.log("✅ 'notes' tablosu başarıyla oluşturuldu veya zaten mevcut.");
        });
    }
});

module.exports = db;