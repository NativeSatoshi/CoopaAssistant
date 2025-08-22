// src/services/arweaveService.js - NİHAİ VERSİYON

const { TurboFactory, EthereumSigner } = require("@ardrive/turbo-sdk");
const { db } = require('../config/database');

// Bu fonksiyon değişmedi.
function getTurboInstance() {
    const privateKey = process.env.EVM_PRIVATE_KEY;
    if (!privateKey) throw new Error("EVM_PRIVATE_KEY not found in .env file.");

    const signer = new EthereumSigner(privateKey);
    return TurboFactory.authenticated({ signer, token: 'pol' });
}

// Bu fonksiyon değişmedi.
async function uploadFileToArweave(fileBuffer, contentType) {
    try {
        console.log("[Arweave Service] Starting encrypted file upload...");
        const turbo = getTurboInstance();
        const tags = [{ name: "Content-Type", value: contentType }];

        const response = await turbo.upload({
            data: fileBuffer,
            dataItemOpts: { tags }
        });

        console.log(`✅ File successfully uploaded to Arweave. ID: ${response.id}`);
        return response;
    } catch (e) {
        console.error("❌ Arweave file upload error:", e.message);
        return null;
    }
}

// Bu fonksiyon değişmedi.
async function uploadTextToArweave(data) {
    try {
        console.log("[Arweave Service] Starting text data upload...");
        const turbo = getTurboInstance();
        const dataBuffer = Buffer.from(JSON.stringify(data), 'utf-8');
        const tags = [{ name: "Content-Type", value: "application/json" }];

        const response = await turbo.upload({
            data: dataBuffer,
            dataItemOpts: { tags }
        });

        console.log(`✅ Text data successfully uploaded to Arweave. ID: ${response.id}`);
        return response;
    } catch (e) {
        console.error("❌ Arweave text upload error:", e.message);
        return null;
    }
}

/**
 * Yüklenen anının veya makbuzun meta verilerini yerel veritabanına kaydeder.
 * @param {string} txId - Arweave işlem ID'si.
 * @param {string} encryptedDescription - Şifrelenmiş anı açıklaması.
 * @param {string} mediaType - Dosyanın MIME türü.
 * @param {string} userAddress - Kullanıcının cüzdan adresi.
 * @param {string} recordType - (YENİ) Kaydın türü ('memory' veya 'receipt'). Varsayılan 'memory'dir.
 */
async function saveMemoryMetadata(txId, encryptedDescription, mediaType, userAddress, recordType = 'memory') {
    return new Promise((resolve, reject) => {
        // YENİ: SQL sorgusuna 'record_type' sütunu eklendi.
        const sql = `INSERT INTO memories (tx_id, description, media_type, user_address, record_type) VALUES (?, ?, ?, ?, ?)`;
        // YENİ: Parametrelere 'recordType' eklendi.
        db.run(sql, [txId, encryptedDescription, mediaType, userAddress, recordType], function (err) {
            if (err) {
                console.error("DB Error saving memory metadata:", err.message);
                return reject(err);
            }
            // YENİ: Log mesajı daha bilgilendirici hale getirildi.
            console.log(`✅ Metadata for record type '${recordType}' saved to DB for user: ${userAddress}`);
            resolve({ id: this.lastID });
        });
    });
}

module.exports = {
    getTurboInstance, // Turbo motorumuzu dışarıya açıyoruz
    uploadFileToArweave,
    uploadTextToArweave,
    saveMemoryMetadata
};


