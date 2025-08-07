// database.js - GÜNCELLENMIŞ VE KONTROL EDİLMİŞ VERSİYON

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Veritabanı dosyasının yolu
const dbPath = path.join(__dirname, 'coopa_memory.db');

// Veritabanı bağlantısı
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Veritabanı bağlantı hatası:', err.message);
    } else {
        console.log('✅ SQLite veritabanına başarıyla bağlanıldı.');
    }
});

// Veritabanını başlatma fonksiyonu
function initializeDB() {
    return new Promise((resolve, reject) => {
        // Notlar tablosunu oluştur
        db.run(`CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            content TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('❌ Notes tablosu oluşturulurken hata:', err.message);
                return reject(err);
            }
            console.log('✅ Notes tablosu hazır.');
        });

        // Anılar tablosunu oluştur
        db.run(`CREATE TABLE IF NOT EXISTS memories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            irys_id TEXT NOT NULL,
            description TEXT,
            media_type TEXT,
            user_address TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('❌ Memories tablosu oluşturulurken hata:', err.message);
                return reject(err);
            }
            console.log('✅ Memories tablosu hazır.');
        });

        
        // Google kimlik doğrulama tablosunu oluştur
        db.run(`CREATE TABLE IF NOT EXISTS google_auth (
            id INTEGER PRIMARY KEY,
            access_token TEXT,
            refresh_token TEXT,
            expiry_date INTEGER,
            scope TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('❌ Google_auth tablosu oluşturulurken hata:', err.message);
                return reject(err);
            }
            console.log('✅ Google_auth tablosu hazır.');
            
            // Tüm tablolar başarıyla oluşturuldu
            console.log('✅ Tüm veritabanı tabloları başarıyla hazırlandı.');
            resolve();
        });
    });
}

// Veritabanı bağlantısını kapatma fonksiyonu
function closeDB() {
    return new Promise((resolve, reject) => {
        db.close((err) => {
            if (err) {
                console.error('❌ Veritabanı kapatılırken hata:', err.message);
                reject(err);
            } else {
                console.log('✅ Veritabanı bağlantısı kapatıldı.');
                resolve();
            }
        });
    });
}

// Temizlik fonksiyonu - Process sonlandığında veritabanını kapat
process.on('SIGINT', async () => {
    console.log('\n⚠️  Uygulama sonlandırılıyor...');
    try {
        await closeDB();
        process.exit(0);
    } catch (error) {
        console.error('❌ Temizlik sırasında hata:', error.message);
        process.exit(1);
    }
});

process.on('SIGTERM', async () => {
    console.log('\n⚠️  Uygulama sonlandırılıyor...');
    try {
        await closeDB();
        process.exit(0);
    } catch (error) {
        console.error('❌ Temizlik sırasında hata:', error.message);
        process.exit(1);
    }
});

module.exports = {
    db,
    initializeDB,
    closeDB
};