// coopa-core.js - NOT GÜNCELLEME DAVRANIŞI İYİLEŞTİRİLMİŞ NİHAİ SÜRÜM

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Irys = require("@irys/sdk");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const tools = [
  {
    functionDeclarations: [
      // ... (Tüm araç tanımları öncekiyle aynı, değişiklik yok)
      { name: "get_current_weather", description: "Belirtilen bir konumdaki güncel hava durumu bilgisini alır.", parameters: { type: "OBJECT", properties: { location: { type: "STRING", description: "Hava durumu bilgisi alınacak şehir veya bölge, örn: 'İstanbul' veya 'Ankara, Türkiye'" } }, required: ["location"] } },
      { name: "send_email", description: "Belirtilen alıcıya, belirtilen konu ve içerikle bir e-posta gönderir.", parameters: { type: "OBJECT", properties: { to: { type: "STRING", description: "E-postanın gönderileceği alıcının e-posta adresi." }, subject: { type: "STRING", description: "E-postanın konusu." }, body: { type: "STRING", description: "E-postanın ana metni veya içeriği." } }, required: ["to", "subject", "body"] } },
      { name: "create_note", description: "Belirtilen isim ve içerikle yeni bir not oluşturur veya aynı isimli not varsa günceller.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING", description: "Notun benzersiz adı, örneğin 'alış-veriş listesi' veya 'toplantı fikirleri'" }, content: { type: "STRING", description: "Notun içeriği, örneğin 'ekmek, zeytin, peynir'" } }, required: ["noteName", "content"] } },
      { name: "get_note", description: "Daha önceden oluşturulmuş bir notun içeriğini adına göre getirir.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING", description: "İçeriği alınacak notun adı, örneğin 'alış-veriş listesi'" } }, required: ["noteName"] } },
      { name: "schedule_reminder", description: "Belirtilen bir notu, belirtilen zamanda kullanıcıya e-posta ile hatırlatmak için bir görev zamanlar.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING", description: "Hatırlatılacak olan notun adı, örneğin 'market listesi'" }, time: { type: "STRING", description: "Hatırlatıcının gönderileceği saat, 'HH:MM' formatında, örneğin '18:00' veya '09:30'" } }, required: ["noteName", "time"] } }
    ]
  }
];

async function generateContentFromHistory(history) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
            // YENİ: Not güncelleme davranışını iyileştiren ek talimat
            systemInstruction: "Sen, Coopa adında yardımsever ve çok yönlü bir dijital asistansın. Amacın, kullanıcıya her türlü isteğinde yardımcı olmaktır. Araçlarını kullanman gerektiğinde kullanırsın. Bir notu güncellemek için önce get_note ile notun mevcut içeriğini oku, sonra istenen değişikliği ekleyerek create_note ile notun tamamını yeniden yaz. Bir aracı (özellikle create_note) kullandıktan sonra, işlemin sonucunu kullanıcıya her zaman bir onay cümlesiyle bildir. Eğer bir istek araçlarından biriyle eşleşmiyorsa, genel bilgini kullanarak cevapla. Çok amaçlı ve bilgili bir yoldaş gibi davran.",
        });
        const result = await model.generateContent({ contents: history, tools: tools });
        return result;
    } catch (error) {
        console.error("❌ HATA: Gemini AI ile iletişim sırasında bir sorun oluştu:", error.message);
        throw error;
    }
}

const getIrys = async () => {
	const url = "https://devnet.irys.xyz";
	const providerUrl = `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
	const token = "matic";
	const privateKey = process.env.EVM_PRIVATE_KEY;

	if (!privateKey) throw new Error("EVM_PRIVATE_KEY .env dosyasında bulunamadı.");
    if (!process.env.ALCHEMY_API_KEY) throw new Error("ALCHEMY_API_KEY .env dosyasında bulunamadı.");

	const irys = new Irys({ url, token, key: privateKey, config: { providerUrl } });
	return irys;
};

const uploadToIrys = async (data) => {
    try {
        const irys = await getIrys();
        const receipt = await irys.upload(JSON.stringify(data), { tags: [{ name: "Content-Type", value: "application/json" }] });
        console.log(`✅ Veri başarıyla Irys'e yüklendi. ID: ${receipt.id}`);
        return receipt;
    } catch (e) {
        console.error("❌ Irys'e yükleme sırasında hata oluştu: ", e);
        return null;
    }
};

module.exports = { generateContentFromHistory, uploadToIrys };