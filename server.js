// server.js
require('dotenv').config();
const app = require('./src/app');
const { initializeDB } = require('./src/config/database');

const port = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await initializeDB();
        console.log("Veritabanı hazır, sunucu başlatılıyor...");
        app.listen(port, () => {
            console.log(`\n✅ Coopa Asistan (Yeniden Yapılandırılmış Sürüm) başarıyla başlatıldı!`);
            console.log(`   http://localhost:${port} adresinden erişebilirsiniz.`);
        });
    } catch (error) {
        console.error("❌ Sunucu başlatılamadı:", error);
        process.exit(1);
    }
};

startServer();