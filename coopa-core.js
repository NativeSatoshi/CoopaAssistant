// coopa-core.js - EN KARARLI NİHAİ SÜRÜM

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Irys = require("@irys/sdk");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const tools = [
  {
    functionDeclarations: [
      { name: "get_current_weather", /* ... */ },
      { name: "send_email", /* ... */ },
      { name: "create_note", /* ... */ },
      { name: "get_note", /* ... */ },
      { name: "schedule_reminder", /* ... */ },
      { name: "get_current_time", /* ... */ },
      { name: "create_calendar_event", /* ... */ }
    ]
  }
];

async function generateContentFromHistory(history) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
            systemInstruction: `Sen, Coopa adında yardımsever ve proaktif bir dijital asistansın.
            
            **Kritik Bilgiler:**
            - Kullanıcının varsayılan e-posta adresi sistemde kayıtlı ve senin erişimine açık. Bu adres: ${process.env.MY_EMAIL_ADDRESS}.
            - Kullanıcı "e-posta adresime gönder" veya "bana hatırlat" gibi bir komut verdiğinde, alıcı olarak bu kayıtlı adresi kullanmalısın. **Kullanıcıya e-posta adresini tekrar sorma.**
            
            **Not Güncelleme Prosedürü:**
            Bir nota ekleme yapılması istendiğinde, önce 'get_note' ile notu oku, sonra yeni içeriği ekleyip 'create_note' ile notun tamamını yeniden yaz ve kullanıcıya sonucu bildir.`,
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
        url,
        token,
        key: privateKey,
        config: {
            providerUrl: `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        },
    });
    return irys;
};

const uploadToIrys = async (data) => {
    try {
        const irys = await getIrys();
        await irys.ready();
        const receipt = await irys.upload(JSON.stringify(data));
        console.log(`✅ Veri başarıyla Irys'e yüklendi. ID: ${receipt.id}`);
        return receipt;
    } catch (e) {
        console.error("❌ Irys'e yükleme sırasında hata oluştu: ", e.message);
        return null;
    }
};

module.exports = { generateContentFromHistory, uploadToIrys };

// ... (tools dizisinin tam içeriği aşağıdadır, kopyalama kolaylığı için)
tools[0].functionDeclarations = [ { name: "get_current_weather", description: "Belirtilen bir şehirdeki güncel hava durumu bilgisini alır.", parameters: { type: "OBJECT", properties: { location: { type: "STRING", description: "Hava durumu bilgisi istenen şehir adı" } }, required: ["location"] } }, { name: "send_email", description: "Belirtilen alıcıya, belirtilen konu ve içerikle bir e-posta gönderir.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["to", "subject", "body"] } }, { name: "create_note", description: "Yeni bir not oluşturur veya belirtilen isimde bir not varsa içeriğini günceller.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName", "content"] } }, { name: "get_note", description: "Daha önceden oluşturulmuş bir notun içeriğini adına göre getirir.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } }, { name: "schedule_reminder", description: "Belirtilen bir notu, belirtilen zamanda kullanıcıya e-posta ile hatırlatmak için bir görev zamanlar.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, time: { type: "STRING" } }, required: ["noteName", "time"] } }, { name: "get_current_time", description: "Kullanıcıya o anki saati ve tarihi söyler.", parameters: { type: "OBJECT", properties: {} } }, { name: "create_calendar_event", description: "Kullanıcının takvimine yeni bir etkinlik veya randevu ekler.", parameters: { type: "OBJECT", properties: { title: { type: "STRING" }, date: { type: "STRING", description: "'YYYY-MM-DD' formatında" }, time: { type: "STRING", description: "'HH:MM' formatında" }, description: { type: "STRING" } }, required: ["title", "date", "time"] } } ];