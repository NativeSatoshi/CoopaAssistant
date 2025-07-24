// coopa-core.js - GENEL BİLGİ YETENEĞİ EKLENMİŞ NİHAİ SÜRÜM

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Irys } = require("@irys/sdk");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const tools = [
  {
    functionDeclarations: [
      {
        name: "get_current_weather",
        description: "Belirtilen bir konumdaki güncel hava durumu bilgisini alır.",
        parameters: {
          type: "OBJECT",
          properties: {
            location: {
              type: "STRING",
              description: "Hava durumu bilgisi alınacak şehir veya bölge, örn: 'İstanbul'"
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
            to: {
              type: "STRING",
              description: "E-postanın gönderileceği alıcının e-posta adresi."
            },
            subject: {
              type: "STRING",
              description: "E-postanın konusu."
            },
            body: {
              type: "STRING",
              description: "E-postanın ana metni veya içeriği."
            }
          },
          required: ["to", "subject", "body"]
        }
      }
    ]
  }
];

async function generateContentFromHistory(history) {
    try {
        // YENİ: Coopa'ya ana görevini ve kimliğini hatırlatan sistem talimatı
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
            systemInstruction: "Sen, Coopa adında yardımsever ve çok yönlü bir dijital asistansın. Amacın, kullanıcıya her türlü isteğinde yardımcı olmaktır. Hava durumunu öğrenmek veya e-posta göndermek gibi özel görevler için bazı araçlara erişimin var. Eğer kullanıcının isteği bu araçlardan biriyle açıkça eşleşiyorsa, o aracı kullanmalısın. Eğer istek genel bir soru, bir bilgi talebi veya basit bir sohbet mesajı ise, bunu bir araca zorlamaya çalışmadan, doğrudan kendi genel bilgini kullanarak cevaplamalısın. Çok amaçlı ve bilgili bir yoldaş gibi davran.",
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

// --- Irys fonksiyonları (Değişiklik yok) ---
const getIrys = async () => {
	const network = "matic";
	const providerUrl = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
	const token = "matic";
	const privateKey = process.env.EVM_PRIVATE_KEY;

	if (!privateKey) throw new Error("EVM_PRIVATE_KEY .env dosyasında bulunamadı.");
    if (!process.env.ALCHEMY_API_KEY) throw new Error("ALCHEMY_API_KEY .env dosyasında bulunamadı.");

	const irys = new Irys({
		network, token, key: privateKey, config: { providerUrl },
	});
	return irys;
};

const uploadToIrys = async (data) => {
    try {
        const irys = await getIrys();
        const receipt = await irys.upload(JSON.stringify(data), {
            tags: [{ name: "Content-Type", value: "application/json" }]
        });
        console.log(`✅ Veri başarıyla Irys'e yüklendi. ID: ${receipt.id}`);
        return receipt;
    } catch (e) {
        console.error("❌ Irys'e yükleme sırasında hata oluştu: ", e);
        return null;
    }
};

module.exports = { generateContentFromHistory, uploadToIrys };