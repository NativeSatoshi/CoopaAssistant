// database.js

const sqlite3 = require('sqlite3').verbose();

// Veritabanı dosyamızın adı. Bu dosya proje klasöründe oluşturulacak.
const DB_SOURCE = "coopa_memory.db";

// Veritabanı bağlantısını oluşturuyoruz.
// Dosya yoksa, bu komut dosyayı oluşturur.
const db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
      // Veritabanı açılamazsa kritik bir hata verir ve uygulamayı durdurur.
      console.error(err.message);
      throw err;
    } else {
        console.log('✅ SQLite veritabanına başarıyla bağlanıldı.');
        // Veritabanı ilk kez oluşturuluyorsa veya tablo yoksa, 'notes' tablosunu oluştur.
        db.run(`CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE,
            content TEXT,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                // Tablo oluşturulamazsa hata verir.
                console.error("Tablo oluşturulamadı:", err);
            } else {
                console.log("✅ 'notes' tablosu başarıyla oluşturuldu veya zaten mevcut.");
            }
        });
    }
});

// Veritabanı bağlantı nesnesini diğer dosyalarda kullanmak için dışa aktarıyoruz.
module.exports = db;