// coopa-core.js - DAHA KATI KURALLAR VE ZORUNLU ARAÇ KULLANIMI İLE GÜNCELLENDİ

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Irys = require("@irys/sdk");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const tools = [
    {
        functionDeclarations: [
            { name: "get_current_weather", description: "Belirtilen bir şehirdeki güncel hava durumu bilgisini alır.", parameters: { type: "OBJECT", properties: { location: { type: "STRING", description: "Hava durumu bilgisi istenen şehir adı" } }, required: ["location"] } },
            { name: "send_email", description: "Belirtilen alıcıya, belirtilen konu ve içerikle bir e-posta gönderir.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" } }, required: ["to", "subject", "body"] } },
            { name: "create_note", description: "Yeni bir not oluşturur veya belirtilen isimde bir not varsa içeriğini günceller.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName", "content"] } },
            { name: "get_note", description: "Daha önceden oluşturulmuş bir notun içeriğini adına göre getirir.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
            { name: "schedule_reminder", description: "Belirtilen bir notu, belirtilen zamanda kullanıcıya e-posta ile hatırlatmak için bir görev zamanlar.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, time: { type: "STRING" } }, required: ["noteName", "time"] } },
            { name: "get_current_time", description: "Kullanıcıya o anki saati ve tarihi söyler.", parameters: { type: "OBJECT",properties: {} } },
            {
                name: "create_calendar_event",
                description: "Kullanıcının takvimine yeni bir etkinlik veya randevu ekler. Eğer tarih belirtilmezse veya 'bugün' denirse, etkinlik bugüne oluşturulur.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        title: { type: "STRING", description: "Etkinliğin başlığı" },
                        date: { type: "STRING", description: "Etkinlik tarihi, 'YYYY-MM-DD' formatında. Boş bırakılırsa bugün kabul edilir." },
                        time: { type: "STRING", description: "Etkinlik saati, 'HH:MM' formatında" },
                        description: { type: "STRING", description: "Etkinlik için isteğe bağlı açıklama" }
                    },
                    required: ["title", "time"]
                }
            }
        ]
    }
];

async function generateContentFromHistory(history) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
            // --- GÜNCELLENMİŞ SİSTEM TALİMATI ---
            systemInstruction: `Sen, Coopa adında yardımsever ve proaktif bir dijital asistansın. Senin görevin, kullanıcı isteklerini anlamak ve bu istekleri yerine getirmek için SANA VERİLEN ARAÇLARI KULLANMAKTIR.

            **KURALLAR:**
            1.  **Araç Kullanımı ZORUNLUDUR:** Bir takvim etkinliği oluşturma, not alma, hava durumunu kontrol etme gibi bir görev istendiğinde, bu işi yapan aracı ('functionCall') KULLANMAK ZORUNDASIN.
            2.  **Varsayımda Bulunma:** Bir aracı çağırdığını varsayıp doğrudan "yaptım, ekledim" gibi bir cevap VEREMEZSİN. Önce aracı çağır, sistemin sana vereceği sonucu bekle ve o sonuca göre nihai cevabını oluştur.
            3.  **Kullanıcı Bilgileri:** Kullanıcının varsayılan e-posta adresi: ${process.env.MY_EMAIL_ADDRESS}. "bana gönder" veya "bana hatırlat" gibi komutlarda bu adresi kullan.
            
            **Örnek Akış:**
            - Kullanıcı: "Bana yarın 14:00 için bir toplantı ayarla"
            - SENİN CEVABIN (API): { functionCall: { name: 'create_calendar_event', args: { title: 'Toplantı', date: 'YARININ_TARİHİ', time: '14:00' } } }
            - SİSTEMİN CEVABI: { functionResponse: { name: 'create_calendar_event', response: { success: true, ... } } }
            - SENİN NİHAİ CEVABIN (Metin): "Tamamdır, yarın 14:00 için 'Toplantı' etkinliğini takviminize ekledim."`,
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