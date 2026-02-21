// src/services/arweaveService.js - PRODUCTION URL'LERİ EKLENDİ

const { TurboFactory, EthereumSigner } = require("@ardrive/turbo-sdk");
const { ethers } = require("ethers");
const { db } = require('../config/database');

function getTurboInstance() {
    const privateKey = process.env.EVM_PRIVATE_KEY;
    if (!privateKey) throw new Error("EVM_PRIVATE_KEY not found in .env file.");

    const wallet = new ethers.Wallet(privateKey);
    console.log(`[Turbo] Using wallet address: ${wallet.address}`);

    const signer = new EthereumSigner(privateKey);
    
    // PRODUCTION CONFIG - Mainnet için doğru URL'ler
    return TurboFactory.authenticated({ 
        signer, 
        token: 'pol',
        paymentServiceConfig: {
            url: 'https://payment.ardrive.io'  // Production payment service
        },
        uploadServiceConfig: {
            url: 'https://upload.ardrive.io'   // Production upload service
        }
    });
}

async function uploadFileToArweave(fileBuffer, contentType) {
    try {
        console.log("[Arweave Service] Starting encrypted file upload...");
        const turbo = getTurboInstance();
        
        // Bakiyeyi kontrol et
        const balance = await turbo.getBalance();
        console.log(`[Arweave Service] Current balance: ${balance.winc} winston credits`);
        
        if (balance.winc < 1000000) {
            throw new Error(`Insufficient balance! Current: ${balance.winc}, Required: min 1M winston`);
        }

        const tags = [{ name: "Content-Type", value: contentType }];

        const response = await turbo.upload({
            data: fileBuffer,
            dataItemOpts: { tags }
        });

        console.log(`✅ File successfully uploaded to Arweave. ID: ${response.id}`);
        return response;
    } catch (e) {
        console.error("❌ Arweave file upload error:", e.message);
        throw e;
    }
}

async function uploadTextToArweave(data) {
    try {
        console.log("[Arweave Service] Starting text data upload...");
        const turbo = getTurboInstance();
        
        const balance = await turbo.getBalance();
        console.log(`[Arweave Service] Current balance: ${balance.winc} winston credits`);
        
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
        throw e;
    }
}

async function saveMemoryMetadata(txId, encryptedDescription, mediaType, userAddress, recordType = 'memory') {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO memories (tx_id, description, media_type, user_address, record_type) VALUES (?, ?, ?, ?, ?)`;
        db.run(sql, [txId, encryptedDescription, mediaType, userAddress, recordType], function (err) {
            if (err) {
                console.error("DB Error saving memory metadata:", err.message);
                return reject(err);
            }
            console.log(`✅ Metadata for record type '${recordType}' saved to DB for user: ${userAddress}`);
            resolve({ id: this.lastID });
        });
    });
}

module.exports = {
    getTurboInstance,
    uploadFileToArweave,
    uploadTextToArweave,
    saveMemoryMetadata
};