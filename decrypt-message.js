// decrypt-message.js (Yerel Dosya Testi için)

require('dotenv').config();
const fs = require('fs');
const { decryptData } = require('./coopa-core.js'); 

// Komut satırından dosya adını alıyoruz
const fileName = process.argv[2];

if (!fileName) {
    console.error("Lütfen şifresini çözmek istediğiniz bir dosya adı girin. Örnek: node decrypt-message.js context_0x....json");
    process.exit(1);
}

try {
    console.log(`\n'${fileName}' dosyasındaki şifreli veri okunuyor...`);
    const encryptedData = fs.readFileSync(fileName, 'utf-8');
    
    const decryptedData = decryptData(encryptedData);
    
    console.log("\n--- ÇÖZÜLMÜŞ VERİ ---");
    console.log(JSON.stringify(JSON.parse(decryptedData), null, 2));
    console.log("---------------------\n");

} catch (error) {
    console.error("\nVeri çözülürken bir hata oluştu:", error.message);
}
