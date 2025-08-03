// coopa-core.js - TÜM ARAÇ PARAMETRELERİ DÜZELTİLMİŞ NİHAİ SÜRÜM

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Irys = require("@irys/sdk");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const tools = [
    {
        functionDeclarations: [
            {
                name: "get_current_weather",
                description: "Belirtilen bir şehirdeki güncel hava durumu bilgisini alır.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        location: { type: "STRING", description: "Hava durumu bilgisi istenen şehir adı" }
                    },
                    required: ["location"]
                }
            },
            {
                name: "send_email",
                description: "Belirtilen alıcıya, belirtilen konu ve içerikle bir e-posta gönderir.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        to: { type: "STRING", description: "E-postanın gönderileceği alıcı adresi" },
                        subject: { type: "STRING", description: "E-postanın konusu" },
                        body: { type: "STRING", description: "E-postanın içeriği" }
                    },
                    required: ["to", "subject", "body"]
                }
            },
            {
                name: "create_note",
                description: "Sıfırdan yeni bir not oluşturur veya var olan notun üzerine tamamen yazar.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        noteName: { type: "STRING", description: "Oluşturulacak veya güncellenecek notun adı" },
                        content: { type: "STRING", description: "Notun içeriği. Boş bırakılabilir." }
                    },
                    required: ["noteName"]
                }
            },
            {
                name: "edit_note",
                description: "Var olan bir notun içeriğinin sonuna yeni bilgi ekler. '... notuna şunu ekle' gibi komutlar için kullanılır.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        noteName: { type: "STRING", description: "İçeriği düzenlenecek notun adı" },
                        newContent: { type: "STRING", description: "Nota eklenecek yeni içerik" }
                    },
                    required: ["noteName", "newContent"]
                }
            },
            {
                name: "get_note",
                description: "Daha önceden oluşturulmuş bir notun içeriğini adına göre getirir. Doğrudan notun metin içeriğini döndürür.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        noteName: { type: "STRING", description: "İçeriği istenen notun adı" }
                    },
                    required: ["noteName"]
                }
            },
            {
                name: "get_current_time",
                description: "Kullanıcıya o anki saati ve tarihi söyler.",
                parameters: {
                    type: "OBJECT",
                    properties: {}
                }
            },
            {
                name: "create_calendar_event",
                description: "Kullanıcının takvimine yeni bir etkinlik veya randevu ekler.",
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
            },
            {
                name: "schedule_task",
                description: "Gelecekteki bir zamanda bir hatırlatma veya e-posta göndermek için görev zamanlar. Eğer kullanıcı var olan bir notu hatırlatmak istiyorsa 'noteName' parametresini kullan. Eğer kullanıcı sıfırdan yeni bir e-posta göndermek istiyorsa 'subject' ve 'body' parametrelerini kullan. Her durumda 'time' parametresi zorunludur.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        time: { type: "STRING", description: "Görevin çalışacağı saat, 'HH:MM' formatında." },
                        noteName: { type: "STRING", description: "Eğer bir not hatırlatılacaksa, o notun adı." },
                        subject: { type: "STRING", description: "Eğer yeni bir e-posta gönderilecekse, e-postanın konusu." },
                        body: { type: "STRING", description: "Eğer yeni bir e-posta gönderilecekse, e-postanın içeriği." }
                    },
                    required: ["time"]
                }
            }
        ]
    }
];

async function generateContentFromHistory(history) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
            systemInstruction: `Sen, Coopa adında yardımsever ve proaktif bir dijital asistansın. Görevin, kullanıcı isteklerini anlamak ve bu istekleri yerine getirmektir.
            - Eğer kullanıcının isteği elindeki araçlarla yapılabilecek bir görev ise (not alma, e-posta, takvim, hatırlatıcı vb.), uygun aracı ÇAĞIRMALISIN.
            - Eğer kullanıcının isteği genel bir soru veya sohbet ise, araçları kullanmadan kendi bilgine dayanarak doğrudan bir metin yanıtı OLUŞTUR.
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
        console.log(`✅ Veri başarıyla Irys'e yüklendi. ID: ${receipt.id}`);
        return receipt;
    } catch (e) {
        console.error("❌ Irys'e yükleme sırasında hata oluştu: ", e.message);
        return null;
    }
};

module.exports = { generateContentFromHistory, uploadToIrys };