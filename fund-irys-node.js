// fund-irys-node.js (API ile Bakiye Kontrolü Yapan Düzeltilmiş Hali)

require('dotenv').config();
const Irys = require("@irys/sdk");
const ethers = require('ethers');
const fs = require('fs');
const axios = require('axios'); // YENİ: API isteği için axios'u ekledik.

const getIrys = async () => {
    const privateKeyBuffer = fs.readFileSync('evm-wallet.key');
    const privateKey = privateKeyBuffer.toString('hex');
    const rpcUrl = "https://rpc-amoy.polygon.technology/";
    const irys = new Irys({
        network: "devnet",
        token: "matic",
        key: privateKey,
        config: { providerUrl: rpcUrl },
    });
    return irys;
};

// YENİ: Irys Node Bakiyesini SDK yerine doğrudan API'den çeken fonksiyon.
async function checkBalanceWithAPI(address) {
    try {
        const url = `https://devnet.irys.xyz/account/balance/matic?address=${address}`;
        const response = await axios.get(url);
        // API'dan gelen cevap { balance: "12345..." } formatındadır.
        return response.data.balance; // Bu bir string olarak döner ve ethers için güvenlidir.
    } catch (error) {
        console.error("API üzerinden bakiye kontrolü sırasında hata oluştu:", error.message);
        return "0"; // Hata durumunda bakiye 0 varsayalım.
    }
}


const main = async () => {
    try {
        console.log("Irys node'u fonlama betiği başlatılıyor...");
        const irys = await getIrys();

        const amountToFund = ethers.parseEther("0.05");

        console.log(`Cüzdan Adresi: ${irys.address}`);
        
        // DEĞİŞTİ: Bakiye kontrolü artık yeni fonksiyonumuzla yapılıyor.
        const loadedBalance = await checkBalanceWithAPI(irys.address);
        console.log(`Mevcut Irys Node Bakiyesi: ${ethers.formatEther(loadedBalance)} MATIC`);

        // Eğer bakiye zaten yeterliyse fonlama yapma.
        if (ethers.toBigInt(loadedBalance) >= amountToFund) {
            console.log("\n✅ Yeterli bakiye mevcut. Ekstra fonlama yapılmasına gerek yok.");
            return;
        }

        console.log(`Irys node'una ${ethers.formatEther(amountToFund)} MATIC yatırılıyor...`);

        const fundTx = await irys.fund(amountToFund);
        
        console.log("\n✅ Fonlama işlemi başarıyla gönderildi! İşlemin ağda onaylanması birkaç dakika sürebilir.");
        console.log(`İşlem ID: ${fundTx.id}`);
        console.log(`Yatırılan Miktar: ${ethers.formatEther(amountToFund)} MATIC`);

        // DEĞİŞTİ: Yeni bakiye kontrolü de API üzerinden yapılıyor.
        console.log("\nYeni bakiye kontrol ediliyor...");
        const newLoadedBalance = await checkBalanceWithAPI(irys.address);
        console.log(`Yeni Irys Node Bakiyesi: ${ethers.formatEther(newLoadedBalance)} MATIC`);

    } catch (e) {
        console.error("\n❌ Fonlama sırasında bir hata oluştu:", e.message);
        console.log("Lütfen sunucu cüzdanınızda (evm-wallet.key) yeterli Amoy MATIC/POL olduğundan emin olun.");
    }
};

main();
