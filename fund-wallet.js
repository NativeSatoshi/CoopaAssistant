// fund-wallet.js (Düzeltilmiş Hali)

const ethers = require('ethers');
const fs = require('fs');

try {
    // Adım 1: Dosyayı metin olarak değil, bir Buffer (tampon) olarak oku.
    // Bunun için 'utf-8' parametresini kaldırıyoruz.
    const privateKeyBuffer = fs.readFileSync('evm-wallet.key');
    
    // Adım 2: Buffer'ı, ethers kütüphanesinin anlayacağı hexadecimal formata çevir.
    const privateKeyHex = "0x" + privateKeyBuffer.toString('hex');

    // Adım 3: Geçerli formattaki anahtardan cüzdan nesnesini oluştur.
    const wallet = new ethers.Wallet(privateKeyHex);

    console.log("\n✅ Sunucu cüzdan bilgileri başarıyla okundu!");
    console.log("--------------------------------------------------");
    console.log("Cüzdan Genel Adresiniz (Public Address):");
    console.log(wallet.address);
    console.log("--------------------------------------------------");
    console.log("\nLütfen yukarıdaki adresi kopyalayıp bir sonraki adımdaki faucet sitesine yapıştırın.");

} catch (error) {
    console.error("\nHata: evm-wallet.key dosyası okunamadı veya geçersiz.", error.message);
}
