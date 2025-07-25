// coopa-core.js - TÜM ÖZELLİKLERİ AKTİF, NİHAİ KARARLI SÜRÜM

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Irys = require("@irys/sdk");
// const { ethers } = require("ethers"); // Artık bu kütüphanelere ihtiyacımız yok
// const { Buffer } = require("buffer");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// DÜZELTİLMİŞ VE DİKKATLİCE YENİDEN YAZILMIŞ ARAÇ TANIMLARI
const tools = [
  {
    functionDeclarations: [
      {
        name: "get_current_weather",
        description: "Belirtilen bir şehirdeki güncel hava durumu bilgisini alır.",
        parameters: {
          type: "OBJECT",
          properties: {
            location: {
              type: "STRING",
              description: "Hava durumu bilgisi istenen şehir adı, örneğin 'Ankara'"
            }
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
            to: { type: "STRING", description: "Alıcının e-posta adresi" },
            subject: { type: "STRING", description: "E-postanın konusu" },
            body: { type: "STRING", description: "E-postanın içeriği" }
          },
          required: ["to", "subject", "body"]
        }
      },
      {
        name: "create_note",
        description: "Yeni bir not oluşturur veya belirtilen isimde bir not varsa içeriğini günceller.",
        parameters: {
          type: "OBJECT",
          properties: {
            noteName: { type: "STRING", description: "Notun adı, örneğin 'market listesi'" },
            content: { type: "STRING", description: "Notun tam içeriği" }
          },
          required: ["noteName", "content"]
        }
      },
      {
        name: "get_note",
        description: "Daha önceden oluşturulmuş bir notun içeriğini adına göre getirir.",
        parameters: {
          type: "OBJECT",
          properties: {
            noteName: { type: "STRING", description: "Okunacak notun adı" }
          },
          required: ["noteName"]
        }
      },
      {
        name: "schedule_reminder",
        description: "Belirtilen bir notu, belirtilen zamanda kullanıcıya e-posta ile hatırlatmak için bir görev zamanlar.",
        parameters: {
          type: "OBJECT",
          properties: {
            noteName: { type: "STRING", description: "Hatırlatılacak notun adı" },
            time: { type: "STRING", description: "Hatırlatıcının gönderileceği saat, 'HH:MM' formatında" }
          },
          required: ["noteName", "time"]
        }
      }
    ]
  }
];

async function generateContentFromHistory(history) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
            systemInstruction: `Sen, Coopa adında yardımsever ve çok yönlü bir dijital asistansın. Görevin, kullanıcıya her türlü isteğinde yardımcı olmaktır.
            **Not Güncelleme Prosedürü (ÇOK ÖNEMLİ):**
            Kullanıcı mevcut bir nota bir şey eklemek istediğinde, şu adımları SIRAYLA takip etmelisin:
            1. Önce **get_note** aracını kullanarak notun mevcut içeriğini al.
            2. Aldığın bu mevcut içeriğe, kullanıcının eklemek istediği yeni bilgiyi ekleyerek **yeni ve tam bir metin oluştur**.
            3. Son olarak, bu **yeni ve tam metin** ile **create_note** aracını çağırarak notu güncelle.
            4. Bu işlem bittikten sonra, kullanıcıya **her zaman** "Notun güncellendi. Yeni hali: [yeni not içeriği]" şeklinde bir onay mesajı ver.`,
        });

        const result = await model.generateContent({
            contents: history,
            tools: tools,
        });
        return result;
    } catch (error) {
        console.error("❌ HATA: Gemini AI ile iletişim sırasında bir sorun oluştu:", error.message);
        throw error;
    }
}

// Irys bağlantısı için en basit ve kararlı yöntem
const getIrys = async () => {
	const url = "https://devnet.irys.xyz";
	const token = "matic";
	const privateKey = process.env.EVM_PRIVATE_KEY;
	const providerUrl = `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

	if (!privateKey || !providerUrl) throw new Error(".env dosyasında Irys anahtarları eksik.");
    
    const irys = new Irys({
        url,
        token,
        key: privateKey,
        config: { providerUrl },
    });
	return irys;
};

const uploadToIrys = async (data) => {
    try {
        const irys = await getIrys();
        // await irys.ready(); // Bu satır genellikle gereksizdir ve hataya neden olabilir.
        const receipt = await irys.upload(JSON.stringify(data));
        console.log(`✅ Veri başarıyla Irys'e yüklendi. ID: ${receipt.id}`);
        return receipt;
    } catch (e) {
        console.error("❌ Irys'e yükleme sırasında hata oluştu: ", e.message);
        return null;
    }
};

module.exports = { generateContentFromHistory, uploadToIrys };