// src/services/arweaveService.js
const { TurboFactory, EthereumSigner } = require("@ardrive/turbo-sdk");
const { db } = require('../config/database');

// Helper function to create an authenticated Turbo instance
function getTurboInstance() {
    const privateKey = process.env.EVM_PRIVATE_KEY;
    if (!privateKey) throw new Error("EVM_PRIVATE_KEY not found in .env file.");

    const signer = new EthereumSigner(privateKey);
    return TurboFactory.authenticated({ signer, token: 'pol' });
}

/**
 * Encrypted file buffer'ını Arweave'e yükler.
 * @param {Buffer} fileBuffer - Şifrelenmiş dosya verisi.
 * @param {string} contentType - Dosyanın MIME türü (örn: 'image/png').
 * @returns Yükleme sonrası makbuz nesnesi.
 */
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

/**
 * Metin verisini (genellikle sohbet geçmişi) Arweave'e yükler.
 * @param {Object} data - Yüklenecek JSON verisi.
 * @returns Yükleme sonrası makbuz nesnesi.
 */
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
 * Yüklenen anının meta verilerini yerel veritabanına kaydeder.
 * @param {string} txId - Arweave işlem ID'si.
 * @param {string} encryptedDescription - Şifrelenmiş anı açıklaması.
 * @param {string} mediaType - Dosyanın MIME türü.
 * @param {string} userAddress - Kullanıcının cüzdan adresi.
 */
async function saveMemoryMetadata(txId, encryptedDescription, mediaType, userAddress) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO memories (tx_id, description, media_type, user_address) VALUES (?, ?, ?, ?)`;
        db.run(sql, [txId, encryptedDescription, mediaType, userAddress], function (err) {
            if (err) {
                console.error("DB Error saving memory metadata:", err.message);
                return reject(err);
            }
            console.log(`✅ Memory metadata saved to DB for user: ${userAddress}`);
            resolve({ id: this.lastID });
        });
    });
}

module.exports = {
    uploadFileToArweave,
    uploadTextToArweave,
    saveMemoryMetadata
};