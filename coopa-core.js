// coopa-core.js - YENİ DOSYA YÜKLEME FONKSİYONU İLE NİHAİ SÜRÜM

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Irys = require("@irys/sdk");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const tools = [
    {
        functionDeclarations: [
            { name: "get_current_weather", description: "Belirtilen bir şehirdeki güncel hava durumu bilgisini alır.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
            { name: "send_email", description: "Belirtilen alıcıya, belirtilen konu ve içerikle bir e-posta gönderir.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["to", "subject", "body"] } },
            { name: "create_note", description: "Sıfırdan yeni bir not oluşturur veya var olan notun üzerine tamamen yazar.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
            { name: "edit_note", description: "Var olan bir notun içeriğinin sonuna yeni bilgi ekler.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
            { name: "get_note", description: "Daha önceden oluşturulmuş bir notun içeriğini adına göre getirir.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
            { name: "schedule_task", description: "Gelecekteki bir zamanda bir hatırlatma veya e-posta görevi zamanlar. Var olan bir notu hatırlatmak için 'noteName' kullanılır. Yeni bir e-posta için 'subject' ve 'body' kullanılır.", parameters: { type: "OBJECT", properties: { time: { type: "STRING", description: "'HH:MM' formatında" }, noteName: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["time"] } },
            { name: "get_current_time", description: "Kullanıcıya o anki saati ve tarihi söyler.", parameters: { type: "OBJECT", properties: {} } },
            { name: "create_calendar_event", description: "Kullanıcının takvimine yeni bir etkinlik veya randevu ekler.", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING" }, time: { type: "STRING" }, description: { type: "STRING" } }, required: ["title", "time"] } }
        ]
    }
];

async function generateContentFromHistory(history) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
            systemInstruction: `Sen, Coopa adında yardımsever ve proaktif bir dijital asistansın.
            1. Sohbet ve Selamlaşma: Kullanıcı sohbet başlatırsa veya genel soru sorarsa, ASLA araç kullanma. Doğrudan metinle cevap ver.
            2. Eyleme Geçme: Kullanıcı bir eylem isterse (not oluştur, hava durumu, hatırlatıcı kur, takvime ekle vb.), uygun aracı MUTLAKA kullan.
            - Kullanıcının varsayılan e-posta adresi: ${process.env.MY_EMAIL_ADDRESS}.`,
            toolConfig: { functionCallingConfig: { mode: "AUTO" } },
        });
        const result = await model.generateContent({ contents: history, tools: tools });
        return result;
    } catch (error) {
        throw error;
    }
}

const getIrys = async () => {
    const url = "https://devnet.irys.xyz";
    const token = "matic";
    const privateKey = process.env.EVM_PRIVATE_KEY;
    if (!privateKey) throw new Error("EVM_PRIVATE_KEY .env dosyasında bulunamadı.");
    const irys = new Irys({
        url, token, key: privateKey,
        config: { providerUrl: `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` },
    });
    return irys;
};

const uploadToIrys = async (data) => {
    try {
        const irys = await getIrys();
        await irys.ready();
        const receipt = await irys.upload(JSON.stringify(data));
        console.log(`✅ Metin verisi başarıyla Irys'e yüklendi. ID: ${receipt.id}`);
        return receipt;
    } catch (e) {
        console.error("❌ Metin Irys'e yüklenirken hata oluştu: ", e.message);
        return null;
    }
};

const uploadFileToIrys = async (fileBuffer, tags) => {
    try {
        console.log("[Irys] Dosya yükleme için Irys'e bağlanılıyor...");
        const irys = await getIrys();
        await irys.ready();
        
        console.log("[Irys] Dosya Irys'e yükleniyor...");
        const receipt = await irys.upload(fileBuffer, { tags });
        
        console.log(`✅ Dosya başarıyla Irys'e yüklendi. ID: ${receipt.id}`);
        return receipt;
    } catch (e) {
        console.error("❌ Dosya Irys'e yüklenirken hata oluştu: ", e.message);
        return null;
    }
};

module.exports = { generateContentFromHistory, uploadToIrys, uploadFileToIrys };