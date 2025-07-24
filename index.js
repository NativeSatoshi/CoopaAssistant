// Gerekli kütüphaneleri ve modülleri projemize dahil ediyoruz.
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Irys = require("@irys/sdk");
const fs = require('fs');
const readline = require('readline');

// --- BAŞLANGIÇ AYARLARI ---

// 1. Google AI Studio'dan aldığınız API anahtarınızı buraya yapıştırın.
const GEMINI_API_KEY = "AIzaSyDVICLuHClDfqAwyC9I2kHVnKlWXVCHQXk";

// 2. Özel anahtarımızı içeren dosyanın adı.
const privateKeyFileName = "evm-wallet.key";

// 3. Aktif test ağı RPC adresi.
const rpcUrl = "https://rpc-amoy.polygon.technology/";
// -------------------------


// Terminalden kullanıcı girdisi almak için arayüz.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Irys'e bağlanmak için güncellenmiş fonksiyon.
 */
const getIrys = async () => {
    // Özel anahtarı dosyadan binary olarak oku ve hexadecimal metne çevir.
    const privateKeyBuffer = fs.readFileSync(privateKeyFileName);
    const privateKey = privateKeyBuffer.toString('hex');
    
    // Irys'e bağlanmak için en son öğrendiğimiz doğru ayarları kullan.
    const irys = new Irys({
        network: "devnet",
        token: "matic",
        key: privateKey,
        config: { providerUrl: rpcUrl },
    });
    console.log("Irys ağına başarıyla bağlanıldı.");
    return irys;
};

/**
 * Verilen metni Irys ağına yükleyen fonksiyon.
 */
const uploadToIrys = async (dataToUpload) => {
    try {
        const irys = await getIrys();
        // Verinin metin olduğunu belirtmek için etiket ekliyoruz.
        const tags = [{ name: "Content-Type", value: "text/plain" }];
        
        console.log("Veri Irys'e yükleniyor...");
        const receipt = await irys.upload(dataToUpload, { tags });
        
        console.log("✅ Veri başarıyla yüklendi!");
        console.log(`   Yükleme ID'si: ${receipt.id}`);
        console.log(`   Erişim URL'si: https://gateway.irys.xyz/${receipt.id}`);

        return receipt;
    } catch (error) {
        console.error("❌ HATA: Irys'e yükleme sırasında bir sorun oluştu:", error.message);
    }
};

/**
 * Gemini AI modeline bir prompt gönderip yanıt alan fonksiyon.
 */
const generateAIMessage = async (prompt) => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YAPAY_ZEKA_API_ANAHTARINIZI_BURAYA_YAPISTIRIN") {
        console.error("Lütfen 'index.js' dosyasına geçerli bir Gemini API Anahtarı girin.");
        return null;
    }
    try {
        console.log("Yapay zekadan yanıt bekleniyor...");
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log("Yapay zeka yanıtı oluşturuldu.");
        return text;
    } catch (error) {
        console.error("❌ HATA: Gemini AI ile iletişim sırasında bir sorun oluştu:", error.message);
        return null;
    }
};

// Ana fonksiyon: Tüm süreci başlatan ve yöneten fonksiyon.
const main = async () => {
    rl.question('AI için komutunuzu girin (Örn: "Kalıcı depolama hakkında bir şiir yaz"): ', async (prompt) => {
        if (!prompt) {
            console.log("Lütfen geçerli bir komut girin.");
            rl.close();
            return;
        }

        console.log(`\nGirilen komut: "${prompt}"`);

        // 1. Adım: AI'dan mesajı oluştur.
        const aiMessage = await generateAIMessage(prompt);

        // 2. Adım: Eğer mesaj başarıyla oluşturulduysa, Irys'e yükle.
        if (aiMessage) {
            console.log("\n--- AI Mesajı ---");
            console.log(aiMessage);
            console.log("-----------------\n");
            
            await uploadToIrys(aiMessage);
        }

        rl.close();
    });
};

// Programı çalıştır!
main();
