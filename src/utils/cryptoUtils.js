// src/utils/cryptoUtils.js
const CryptoJS = require("crypto-js");
const { ethers } = require('ethers');

const encryptBuffer = (buffer, key) => {
    const wordArray = CryptoJS.lib.WordArray.create(buffer);
    const encrypted = CryptoJS.AES.encrypt(wordArray, key);
    return Buffer.from(encrypted.toString(), 'utf-8');
};

const decryptBuffer = (encryptedBuffer, key) => {
    try {
        const encryptedString = encryptedBuffer.toString('utf-8');
        const decrypted = CryptoJS.AES.decrypt(encryptedString, key);
        if (decrypted.sigBytes <= 0) {
            console.error("[DECRYPT] Decryption resulted in empty data. Check key or ciphertext.");
            return Buffer.from('');
        }
        const hexString = decrypted.toString(CryptoJS.enc.Hex);
        return Buffer.from(hexString, 'hex');
    } catch (error) {
        console.error("[DECRYPT] An unexpected error occurred during decryption:", error);
        return Buffer.from('');
    }
};

const encryptString = (text, key) => {
    return CryptoJS.AES.encrypt(text, key).toString();
};

const decryptString = (ciphertext, key) => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, key);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedText) {
             // Anahtar yanlışsa veya veri bozuksa boş string döner. Hata vermemesi için kontrol.
            return null;
        }
        return decryptedText;
    } catch (error) {
        return null;
    }
};

async function verifySignature(message, signature, expectedAddress) {
    try {
        const recoveredAddress = ethers.verifyMessage(message, signature);
        return recoveredAddress.toLowerCase() === expectedAddress.toLowerCase();
    } catch (error) {
        console.error("Signature verification error:", error);
        return false;
    }
}

module.exports = {
    encryptBuffer,
    decryptBuffer,
    encryptString,
    decryptString,
    verifySignature,
    fixedSignMessage: "Bu, CoopaASI için kalıcı şifreleme anahtarımı oluşturacak ve bu anahtar başka bir amaç için kullanılmayacaktır."
};