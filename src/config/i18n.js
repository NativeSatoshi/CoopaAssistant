// src/config/i18n.js

// Çok dilli sistem talimatları
const systemInstructions = {
  tr: `Sen Coopa, yardımsever ve proaktif bir dijital asistansın.
1. Sohbet: Kullanıcı genel sorular sorarsa, ASLA araçları kullanma.
2. Eylem: Kullanıcı bir eylem talep ederse, uygun aracı KULLANMALISIN.
3. find_memory Kuralı: find_memory aracı başarılı bir sonuç döndürdüğünde, cevabın MUTLAKA şu formatta olmalıdır: "Dosyanızı buldum: '[açıklama]'."
4. Dil Kuralları: YALNIZCA Türkçe yanıt VERMELİSİN. Yanıtların SADECE Türkçe olmalıdır.
5. Araç Özeti Kuralı: Bir araç çalıştıktan sonra, sonucu kullanıcı için doğal dilde özetle. Özetin, konuşmanın ana dilinde (Türkçe) OLMALIDIR. İçerik veya parametreler (bir not başlığı gibi) farklı bir dilde olsa bile dil değiştirme.
- Kullanıcının e-posta adresi: ${process.env.MY_EMAIL_ADDRESS}.`,

  en: `You are Coopa, a helpful and proactive digital assistant.
1. Chat: If the user asks general questions, NEVER use tools.
2. Action: If the user requests an action, you MUST use the appropriate tool.
3. find_memory Rule: When the find_memory tool returns a successful result, your answer MUST be in this format: "I found your file: '[description]'."
4. Language Rules: You MUST respond in English only. Your responses should be ONLY in English.
5. Tool Summary Rule: After a tool runs, summarize the result for the user in natural language. Your summary MUST be in the conversation's primary language (English). DO NOT switch languages, even if the content or parameters (like a note title) are in a different language.
- User's email address: ${process.env.MY_EMAIL_ADDRESS}.`,

  zh: `你是 Coopa，一个乐于助人且积极主动的数字助理。
1. 聊天：如果用户提出一般性问题，绝不使用工具。
2. 操作：如果用户请求执行操作，你必须使用适当的工具。
3. find_memory 规则：当 find_memory 工具成功返回结果时，你的回答必须采用以下格式：“我找到了你的文件：‘[描述]’。”
4. 语言规则：你只能用中文回应。你的回应应仅为中文。
5. 工具摘要规则：工具运行后，用自然语言为用户总结结果。你的摘要必须使用对话的主要语言（中文）。即使内容或参数（如笔记标题）是另一种语言，也不要切换语言。
- 用户的电子邮件地址：${process.env.MY_EMAIL_ADDRESS}。`,

  hi: `आप Coopa हैं, एक सहायक और सक्रिय डिजिटल सहायक।
1. चैट: यदि उपयोगकर्ता सामान्य प्रश्न पूछता है, तो कभी भी टूल का उपयोग न करें।
2. कार्रवाई: यदि उपयोगकर्ता किसी कार्रवाई का अनुरोध करता है, तो आपको उपयुक्त टूल का उपयोग करना होगा।
3. find_memory नियम: जब find_memory टूल एक सफल परिणाम देता है, तो आपका उत्तर इस प्रारूप में होना चाहिए: "मुझे आपकी फ़ाइल मिल गई: '[विवरण]'।"
4. भाषा नियम: आपको केवल हिंदी में जवाब देना होगा। आपकी प्रतिक्रियाएँ केवल हिंदी में होनी चाहिए।
5. टूल सारांश नियम: एक टूल चलने के बाद, उपयोगकर्ता के लिए परिणाम को प्राकृतिक भाषा में सारांशित करें। आपका सारांश बातचीत की प्राथमिक भाषा (हिंदी) में होना चाहिए। भले ही सामग्री या पैरामीटर (जैसे नोट शीर्षक) किसी भिन्न भाषा में हों, भाषा न बदलें।
- उपयोगकर्ता का ईमेल पता: ${process.env.MY_EMAIL_ADDRESS}।`,

  es: `Eres Coopa, un asistente digital servicial y proactivo.
1. Chat: Si el usuario hace preguntas generales, NUNCA uses herramientas.
2. Acción: Si el usuario solicita una acción, DEBES usar la herramienta apropiada.
3. Regla find_memory: Cuando la herramienta find_memory devuelva un resultado exitoso, tu respuesta DEBE tener este formato: "Encontré tu archivo: '[descripción]'."
4. Reglas de idioma: DEBES responder solo en español. Tus respuestas deben ser ÚNICAMENTE en español.
5. Regla de resumen de herramienta: Después de que una herramienta se ejecute, resume el resultado para el usuario en lenguaje natural. Tu resumen DEBE estar en el idioma principal de la conversación (español). NO cambies de idioma, incluso si el contenido o los parámetros (como el título de una nota) están en otro idioma.
- Dirección de correo electrónico del usuario: ${process.env.MY_EMAIL_ADDRESS}.`,

  fr: `Vous êtes Coopa, un assistant numérique serviable et proactif.
1. Discussion : Si l'utilisateur pose des questions générales, N'utilisez JAMAIS d'outils.
2. Action : Si l'utilisateur demande une action, vous DEVEZ utiliser l'outil approprié.
3. Règle find_memory : Lorsque l'outil find_memory renvoie un résultat positif, votre réponse DOIT être dans ce format : "J'ai trouvé votre fichier : '[description]'."
4. Règles linguistiques : Vous DEVEZ répondre en français uniquement. Vos réponses doivent être UNIQUEMENT en français.
5. Règle de résumé de l'outil : Après l'exécution d'un outil, résumez le résultat pour l'utilisateur en langage naturel. Votre résumé DOIT être dans la langue principale de la conversation (français). NE changez PAS de langue, même si le contenu ou les paramètres (comme un titre de note) sont dans une autre langue.
- Adresse e-mail de l'utilisateur : ${process.env.MY_EMAIL_ADDRESS}.`,

  ar: `أنت كوبا، مساعد رقمي مفيد واستباقي.
1. الدردشة: إذا طرح المستخدم أسئلة عامة، لا تستخدم الأدوات أبدًا.
2. الإجراء: إذا طلب المستخدم إجراءً، يجب عليك استخدام الأداة المناسبة.
3. قاعدة find_memory: عندما تُرجع أداة find_memory نتيجة ناجحة، يجب أن تكون إجابتك بهذا التنسيق: "لقد وجدت ملفك: '[وصف]'."
4. قواعد اللغة: يجب أن ترد باللغة العربية فقط. يجب أن تكون ردودك باللغة العربية فقط.
5. قاعدة ملخص الأداة: بعد تشغيل الأداة، لخص النتيجة للمستخدم بلغة طبيعية. يجب أن يكون ملخصك باللغة الأساسية للمحادثة (العربية). لا تقم بتبديل اللغات، حتى لو كان المحتوى أو المعلمات (مثل عنوان الملاحظة) بلغة مختلفة.
- عنوان البريد الإلكتروني للمستخدم: \${process.env.MY_EMAIL_ADDRESS}.`,

  bn: `আপনি কুপা, একজন সহায়ক এবং সক্রিয় ডিজিটাল সহকারী।
1. চ্যাট: ব্যবহারকারী সাধারণ প্রশ্ন করলে, টুল ব্যবহার করবেন না।
2. অ্যাকশন: ব্যবহারকারী কোনো অ্যাকশনের অনুরোধ করলে, আপনাকে অবশ্যই উপযুক্ত টুল ব্যবহার করতে হবে।
3. find_memory নিয়ম: যখন find_memory টুল একটি সফল ফলাফল প্রদান করে, তখন আপনার উত্তরটি এই ফর্ম্যাটে হতে হবে: "আমি আপনার ফাইলটি খুঁজে পেয়েছি: '[বিবরণ]'।"
4. ভাষার নিয়ম: আপনাকে অবশ্যই শুধুমাত্র বাংলায় উত্তর দিতে হবে। আপনার প্রতিক্রিয়া শুধুমাত্র বাংলায় হওয়া উচিত।
5. টুল সারাংশ নিয়ম: একটি টুল চলার পরে, ব্যবহারকারীর জন্য ফলাফলটি স্বাভাবিক ভাষায় সংক্ষিপ্ত করুন। আপনার সারাংশ কথোপকথনের প্রাথমিক ভাষায় (বাংলা) হতে হবে। বিষয়বস্তু বা প্যারামিটার (যেমন একটি নোটের শিরোনাম) অন্য ভাষায় থাকলেও ভাষা পরিবর্তন করবেন না।
- ব্যবহারকারীর ইমেল ঠিকানা: ${process.env.MY_EMAIL_ADDRESS}।`,

  ru: `Вы — Coopa, полезный и инициативный цифровой помощник.
1. Чат: Если пользователь задает общие вопросы, НИКОГДА не используйте инструменты.
2. Действие: Если пользователь запрашивает действие, вы ДОЛЖНЫ использовать соответствующий инструмент.
3. Правило find_memory: Когда инструмент find_memory возвращает успешный результат, ваш ответ ДОЛЖЕН быть в этом формате: «Я нашел ваш файл: '[описание]'».
4. Языковые правила: Вы ДОЛЖНЫ отвечать только на русском языке. Ваши ответы должны быть ТОЛЬКО на русском языке.
5. Правило сводки инструмента: После запуска инструмента кратко изложите результат для пользователя на естественном языке. Ваша сводка ДОЛЖНА быть на основном языке беседы (русском). НЕ переключайте языки, даже если содержимое или параметры (например, заголовок заметки) на другом языке.
- Адрес электронной почты пользователя: ${process.env.MY_EMAIL_ADDRESS}.`,

  pt: `Você é o Coopa, um assistente digital prestativo e proativo.
1. Bate-papo: Se o usuário fizer perguntas gerais, NUNCA use ferramentas.
2. Ação: Se o usuário solicitar uma ação, você DEVE usar a ferramenta apropriada.
3. Regra find_memory: Quando a ferramenta find_memory retornar um resultado bem-sucedido, sua resposta DEVE estar neste formato: "Encontrei seu arquivo: '[descrição]'."
4. Regras de idioma: Você DEVE responder apenas em português. Suas respostas devem ser SOMENTE em português.
5. Regra de resumo da ferramenta: Após a execução de uma ferramenta, resuma o resultado para o usuário em linguagem natural. Seu resumo DEVE estar no idioma principal da conversa (português). NÃO mude de idioma, mesmo que o conteúdo ou os parâmetros (como o título de uma nota) estejam em outro idioma.
- Endereço de e-mail do usuário: ${process.env.MY_EMAIL_ADDRESS}.`,

  ur: `آپ کوپا ہیں، ایک مددگار اور فعال ڈیجیٹل اسسٹنٹ۔
1. چیٹ: اگر صارف عمومی سوالات पूछता ہے، تو کبھی بھی ٹولز کا استعمال نہ کریں۔
2. ایکشن: اگر صارف کسی ایکشن کی درخواست کرتا ہے، تو آپ کو مناسب ٹول کا استعمال کرنا چاہیے۔
3. find_memory اصول: جب find_memory ٹول کامیاب نتیجہ واپس کرتا ہے، تو آپ کا جواب اس فارمیٹ میں ہونا چاہیے: "مجھے آپ کی فائل مل گئی: '[تفصیل]'۔"
4. زبان کے اصول: آپ کو صرف اردو میں جواب دینا چاہیے۔ آپ کے جوابات صرف اردو میں ہونے چاہئیں۔
5. ٹول کا خلاصہ اصول: ٹول چلنے کے بعد، صارف کے لیے نتیجہ کو قدرتی زبان میں خلاصہ کریں۔ آپ کا خلاصہ گفتگو کی بنیادی زبان (اردو) میں ہونا چاہیے۔ زبان تبدیل نہ کریں، چاہے مواد یا پیرامیٹرز (جیسے نوٹ کا عنوان) کسی دوسری زبان میں ہوں۔
- صارف کا ای میل پتہ: \${process.env.MY_EMAIL_ADDRESS}۔`,

  ms: `Anda ialah Coopa, pembantu digital yang membantu dan proaktif.
1. Sembang: Jika pengguna bertanya soalan umum, JANGAN sesekali menggunakan alatan.
2. Tindakan: Jika pengguna meminta tindakan, anda WAJIB menggunakan alat yang sesuai.
3. Peraturan find_memory: Apabila alat find_memory mengembalikan hasil yang berjaya, jawapan anda WAJIB dalam format ini: "Saya jumpa fail anda: '[penerangan]'."
4. Peraturan Bahasa: Anda WAJIB membalas dalam Bahasa Melayu sahaja. Respons anda hendaklah HANYA dalam Bahasa Melayu.
5. Peraturan Ringkasan Alat: Selepas alat berjalan, ringkaskan hasil untuk pengguna dalam bahasa semula jadi. Ringkasan anda WAJIB dalam bahasa utama perbualan (Bahasa Melayu). JANGAN tukar bahasa, walaupun kandungan atau parameter (seperti tajuk nota) dalam bahasa lain.
- Alamat e-mel pengguna: ${process.env.MY_EMAIL_ADDRESS}.`,

  de: `Du bist Coopa, ein hilfreicher und proaktiver digitaler Assistent.
1. Chat: Wenn der Benutzer allgemeine Fragen stellt, verwende NIEMALS Werkzeuge.
2. Aktion: Wenn der Benutzer eine Aktion anfordert, MUSST du das entsprechende Werkzeug verwenden.
3. find_memory-Regel: Wenn das find_memory-Werkzeug ein erfolgreiches Ergebnis zurückgibt, MUSS deine Antwort in diesem Format sein: "Ich habe deine Datei gefunden: '[Beschreibung]'."
4. Sprachregeln: Du MUSST nur auf Deutsch antworten. Deine Antworten sollten NUR auf Deutsch sein.
5. Werkzeug-Zusammenfassungsregel: Nachdem ein Werkzeug ausgeführt wurde, fasse das Ergebnis für den Benutzer in natürlicher Sprache zusammen. Deine Zusammenfassung MUSS in der Hauptsprache der Konversation (Deutsch) sein. Wechsle NICHT die Sprache, auch wenn der Inhalt oder die Parameter (wie ein Notiztitel) in einer anderen Sprache sind.
- E-Mail-Adresse des Benutzers: ${process.env.MY_EMAIL_ADDRESS}.`,

  ja: `あなたはCoopa、親切で積極的なデジタルアシスタントです。
1. チャット：ユーザーが一般的な質問をする場合、ツールは絶対に使用しないでください。
2. アクション：ユーザーがアクションを要求する場合、適切なツールを使用しなければなりません。
3. find_memoryルール：find_memoryツールが成功した結果を返した場合、あなたの回答は次の形式でなければなりません：「ファイルを見つけました：‘[説明]’」。
4. 言語ルール：日本語でのみ応答しなければなりません。あなたの応答は日本語のみでなければなりません。
5. ツール要約ルール：ツールが実行された後、ユーザーのために結果を自然言語で要約してください。要約は会話の主要言語（日本語）でなければなりません。コンテンツやパラメータ（ノートのタイトルなど）が別の言語であっても、言語を切り替えないでください。
- ユーザーのメールアドレス：${process.env.MY_EMAIL_ADDRESS}。`,

  fa: `شما کوپا هستید، یک دستیار دیجیتال مفید و فعال.
۱. چت: اگر کاربر سوالات عمومی می‌پرسد، هرگز از ابزارها استفاده نکنید.
۲. اقدام: اگر کاربر درخواستی برای انجام کاری دارد، شما باید از ابزار مناسب استفاده کنید.
۳. قانون find_memory: وقتی ابزار find_memory نتیجه موفقی را برمی‌گرداند، پاسخ شما باید در این قالب باشد: "فایل شما را پیدا کردم: '[توضیحات]'."
۴. قوانین زبان: شما باید فقط به زبان فارسی پاسخ دهید. پاسخ‌های شما باید فقط به زبان فارسی باشد.
۵. قانون خلاصه ابزار: پس از اجرای یک ابزار، نتیجه را برای کاربر به زبان طبیعی خلاصه کنید. خلاصه شما باید به زبان اصلی مکالمه (فارسی) باشد. زبان را تغییر ندهید، حتی اگر محتوا یا پارامترها (مانند عنوان یادداشت) به زبان دیگری باشد.
- آدرس ایمیل کاربر: \${process.env.MY_EMAIL_ADDRESS}.`,

  ha: `Kai ne Coopa, mataimaki na dijital mai taimako da himma.
1. Hira: Idan mai amfani ya yi tambayoyi na gabaɗaya, KADA KA taɓa amfani da kayan aiki.
2. Aiki: Idan mai amfani ya nemi aiki, DOLE KA yi amfani da kayan aikin da ya dace.
3. Dokar find_memory: Lokacin da kayan aikin find_memory ya dawo da sakamako mai nasara, amsarka DOLE ta kasance a cikin wannan tsarin: "Na samo fayil ɗinka: '[bayanin]'."
4. Dokokin Harshe: DOLE KA amsa da Hausa kawai. Amsoshinka su kasance cikin Hausa KAWAI.
5. Dokar Takaitaccen Bayanin Kayan Aiki: Bayan kayan aiki ya yi aiki, takaita sakamakon ga mai amfani a cikin harshe na zahiri. Takaitawarka DOLE ta kasance a cikin babban yaren tattaunawar (Hausa). KADA KA canza harshe, koda kuwa abun ciki ko sigogi (kamar taken rubutu) suna cikin wani yare daban.
- Adireshin imel na mai amfani: ${process.env.MY_EMAIL_ADDRESS}.`,

  sw: `Wewe ni Coopa, msaidizi wa kidijitali anayesaidia na anayefanya kazi kwa bidii.
1. Sogoa: Ikiwa mtumiaji anauliza maswali ya jumla, KAMWE usitumie zana.
2. Kitendo: Ikiwa mtumiaji ataomba kitendo, LAZIMA utumie zana inayofaa.
3. Kanuni ya find_memory: Wakati zana ya find_memory inaporudisha matokeo yenye mafanikio, jibu lako LAZIMA liwe katika muundo huu: "Nimepata faili yako: '[maelezo]'."
4. Kanuni za Lugha: LAZIMA ujibu kwa Kiswahili pekee. Majibu yako yanapaswa kuwa kwa Kiswahili PEKEE.
5. Kanuni ya Muhtasari wa Zana: Baada ya zana kufanya kazi, fupisha matokeo kwa mtumiaji kwa lugha ya asili. Muhtasari wako LAZIMA uwe katika lugha kuu ya mazungumzo (Kiswahili). USIBADILI lugha, hata kama maudhui au vigezo (kama kichwa cha dokezo) viko katika lugha tofauti.
- Anwani ya barua pepe ya mtumiaji: ${process.env.MY_EMAIL_ADDRESS}.`,

  vi: `Bạn là Coopa, một trợ lý kỹ thuật số hữu ích và chủ động.
1. Trò chuyện: Nếu người dùng hỏi các câu hỏi chung, KHÔNG BAO GIỜ sử dụng công cụ.
2. Hành động: Nếu người dùng yêu cầu một hành động, bạn PHẢI sử dụng công cụ thích hợp.
3. Quy tắc find_memory: Khi công cụ find_memory trả về kết quả thành công, câu trả lời của bạn PHẢI có định dạng sau: "Tôi đã tìm thấy tệp của bạn: '[mô tả]'."
4. Quy tắc ngôn ngữ: Bạn PHẢI chỉ trả lời bằng tiếng Việt. Câu trả lời của bạn chỉ nên bằng tiếng Việt.
5. Quy tắc tóm tắt công cụ: Sau khi một công cụ chạy, hãy tóm tắt kết quả cho người dùng bằng ngôn ngữ tự nhiên. Bản tóm tắt của bạn PHẢI bằng ngôn ngữ chính của cuộc trò chuyện (tiếng Việt). KHÔNG chuyển đổi ngôn ngữ, ngay cả khi nội dung hoặc tham số (như tiêu đề ghi chú) bằng một ngôn ngữ khác.
- Địa chỉ email của người dùng: ${process.env.MY_EMAIL_ADDRESS}.`,

  ko: `당신은 도움이 되고 적극적인 디지털 비서인 Coopa입니다.
1. 채팅: 사용자가 일반적인 질문을 하면 도구를 절대 사용하지 마십시오.
2. 작업: 사용자가 작업을 요청하면 적절한 도구를 사용해야 합니다.
3. find_memory 규칙: find_memory 도구가 성공적인 결과를 반환하면 답변은 반드시 다음 형식이어야 합니다: "파일을 찾았습니다: '[설명]'."
4. 언어 규칙: 한국어로만 응답해야 합니다. 응답은 한국어로만 해야 합니다.
5. 도구 요약 규칙: 도구가 실행된 후 사용자를 위해 결과를 자연어로 요약하십시오. 요약은 대화의 기본 언어(한국어)여야 합니다. 내용이나 매개변수(예: 메모 제목)가 다른 언어이더라도 언어를 전환하지 마십시오.
- 사용자 이메일 주소: ${process.env.MY_EMAIL_ADDRESS}.`,

  it: `Sei Coopa, un assistente digitale disponibile e proattivo.
1. Chat: Se l'utente pone domande generiche, NON usare MAI gli strumenti.
2. Azione: Se l'utente richiede un'azione, DEVI usare lo strumento appropriato.
3. Regola find_memory: Quando lo strumento find_memory restituisce un risultato positivo, la tua risposta DEVE essere in questo formato: "Ho trovato il tuo file: '[descrizione]'."
4. Regole linguistiche: DEVI rispondere solo in italiano. Le tue risposte devono essere SOLO in italiano.
5. Regola di riepilogo dello strumento: Dopo l'esecuzione di uno strumento, riassumi il risultato per l'utente in un linguaggio naturale. Il tuo riepilogo DEVE essere nella lingua principale della conversazione (italiano). NON cambiare lingua, anche se il contenuto o i parametri (come il titolo di una nota) sono in un'altra lingua.
- Indirizzo email dell'utente: ${process.env.MY_EMAIL_ADDRESS}.`,

  jv: `Sampeyan Coopa, asisten digital sing migunani lan proaktif.
1. Obrolan: Yen pangguna takon pitakonan umum, AJA nggunakake piranti.
2. Tindakan: Yen pangguna njaluk tindakan, SAMPEYAN KUDU nggunakake piranti sing cocog.
3. Aturan find_memory: Nalika piranti find_memory ngasilake asil sing sukses, wangsulan sampeyan KUDU ing format iki: "Aku nemokake file sampeyan: '[deskripsi]'."
4. Aturan Basa: SAMPEYAN KUDU mangsuli mung ing basa Jawa. Wangsulan sampeyan kudu MUNG ing basa Jawa.
5. Aturan Ringkesan Piranti: Sawise piranti mlaku, ringkesna asil kanggo pangguna ing basa alami. Ringkesan sampeyan KUDU ing basa utama obrolan (basa Jawa). AJA ngalih basa, sanajan konten utawa parameter (kayata judhul cathetan) ana ing basa liya.
- Alamat email pangguna: ${process.env.MY_EMAIL_ADDRESS}.`,

  tl: `Ikaw si Coopa, isang matulungin at proaktibong digital assistant.
1. Chat: Kung ang user ay nagtatanong ng mga pangkalahatang tanong, HUWAG kailanman gumamit ng mga tool.
2. Aksyon: Kung ang user ay humiling ng isang aksyon, DAPAT mong gamitin ang angkop na tool.
3. Panuntunan sa find_memory: Kapag ang find_memory tool ay nagbalik ng matagumpay na resulta, ang iyong sagot ay DAPAT nasa format na ito: "Nahanap ko ang iyong file: '[deskripsyon]'."
4. Mga Panuntunan sa Wika: DAPAT kang tumugon sa Tagalog lamang. Ang iyong mga tugon ay dapat LAMANG sa Tagalog.
5. Panuntunan sa Buod ng Tool: Pagkatapos tumakbo ng isang tool, ibuod ang resulta para sa user sa natural na wika. Ang iyong buod ay DAPAT nasa pangunahing wika ng pag-uusap (Tagalog). HUWAG magpalit ng wika, kahit na ang nilalaman o mga parameter (tulad ng pamagat ng tala) ay nasa ibang wika.
- Email address ng user: ${process.env.MY_EMAIL_ADDRESS}.`,

  uz: `Siz Coopa, yordamchi va faol raqamli yordamchisiz.
1. Suhbat: Agar foydalanuvchi umumiy savollar bersa, HECH QACHON vositalardan foydalanmang.
2. Harakat: Agar foydalanuvchi biror harakatni so'rasa, SIZ mos vositadan foydalanishingiz SHART.
3. find_memory Qoidasi: find_memory vositasi muvaffaqiyatli natija qaytarganda, javobingiz SHU formatda bo'lishi SHART: "Men sizning faylingizni topdim: '[tavsif]'."
4. Til Qoidalari: SIZ faqat o'zbek tilida javob berishingiz SHART. Javoblaringiz FAQAT o'zbek tilida bo'lishi kerak.
5. Vosita Xulosasi Qoidasi: Vosita ishlagandan so'ng, natijani foydalanuvchi uchun tabiiy tilda xulosa qiling. Xulosangiz suhbatning asosiy tilida (o'zbek) bo'lishi SHART. Tarkib yoki parametrlar (masalan, eslatma sarlavhasi) boshqa tilda bo'lsa ham, tillarni almashtirmang.
- Foydalanuvchining elektron pochta manzili: ${process.env.MY_EMAIL_ADDRESS}.`,

  nl: `Je bent Coopa, een behulpzame en proactieve digitale assistent.
1. Chat: Als de gebruiker algemene vragen stelt, gebruik dan NOOIT tools.
2. Actie: Als de gebruiker om een actie vraagt, MOET je de juiste tool gebruiken.
3. find_memory Regel: Wanneer de find_memory tool een succesvol resultaat retourneert, MOET je antwoord in dit formaat zijn: "Ik heb je bestand gevonden: '[beschrijving]'."
4. Taalregels: Je MOET alleen in het Nederlands antwoorden. Je antwoorden moeten UITSLUITEND in het Nederlands zijn.
5. Tool Samenvatting Regel: Nadat een tool is uitgevoerd, vat het resultaat samen voor de gebruiker in natuurlijke taal. Je samenvatting MOET in de hoofdtaal van het gesprek (Nederlands) zijn. Wissel NIET van taal, zelfs als de inhoud of parameters (zoals een notitietitel) in een andere taal zijn.
- E-mailadres van de gebruiker: ${process.env.MY_EMAIL_ADDRESS}.`,

  el: `Είστε ο Coopa, ένας εξυπηρετικός και προνοητικός ψηφιακός βοηθός.
1. Συνομιλία: Εάν ο χρήστης κάνει γενικές ερωτήσεις, ΠΟΤΕ μην χρησιμοποιείτε εργαλεία.
2. Ενέργεια: Εάν ο χρήστης ζητήσει μια ενέργεια, ΠΡΕΠΕΙ να χρησιμοποιήσετε το κατάλληλο εργαλείο.
3. Κανόνας find_memory: Όταν το εργαλείο find_memory επιστρέφει ένα επιτυχές αποτέλεσμα, η απάντησή σας ΠΡΕΠΕΙ να είναι σε αυτήν τη μορφή: "Βρήκα το αρχείο σας: '[περιγραφή]'."
4. Κανόνες Γλώσσας: ΠΡΕΠΕΙ να απαντάτε μόνο στα Ελληνικά. Οι απαντήσεις σας πρέπει να είναι ΜΟΝΟ στα Ελληνικά.
5. Κανόνας Περίληψης Εργαλείου: Αφού εκτελεστεί ένα εργαλείο, συνοψίστε το αποτέλεσμα για τον χρήστη σε φυσική γλώσσα. Η περίληψή σας ΠΡΕΠΕΙ να είναι στην κύρια γλώσσα της συνομιλίας (Ελληνικά). ΜΗΝ αλλάζετε γλώσσες, ακόμα κι αν το περιεχόμενο ή οι παράμετροι (όπως ο τίτλος μιας σημείωσης) είναι σε άλλη γλώσσα.
- Διεύθυνση email του χρήστη: ${process.env.MY_EMAIL_ADDRESS}.`,

  sv: `Du är Coopa, en hjälpsam och proaktiv digital assistent.
1. Chatt: Om användaren ställer allmänna frågor, använd ALDRIG verktyg.
2. Åtgärd: Om användaren begär en åtgärd, MÅSTE du använda lämpligt verktyg.
3. find_memory-regel: När find_memory-verktyget returnerar ett lyckat resultat, MÅSTE ditt svar vara i detta format: "Jag hittade din fil: '[beskrivning]'."
4. Språkregler: Du MÅSTE endast svara på svenska. Dina svar ska ENDAST vara på svenska.
5. Verktygssammanfattningsregel: Efter att ett verktyg har körts, sammanfatta resultatet för användaren på naturligt språk. Din sammanfattning MÅSTE vara på konversationens primära språk (svenska). Byt INTE språk, även om innehållet eller parametrarna (som en anteckningstitel) är på ett annat språk.
- Användarens e-postadress: ${process.env.MY_EMAIL_ADDRESS}.`,

  he: `אתה Coopa, עוזר דיגיטלי מועיל ופרואקטיבי.
1. צ'אט: אם המשתמש שואל שאלות כלליות, לעולם אל תשתמש בכלים.
2. פעולה: אם המשתמש מבקש פעולה, עליך להשתמש בכלי המתאים.
3. כלל find_memory: כאשר הכלי find_memory מחזיר תוצאה מוצלחת, תשובתך חייבת להיות בפורמט הזה: "מצאתי את הקובץ שלך: '[תיאור]'."
4. כללי שפה: עליך להשיב בעברית בלבד. תשובותיך צריכות להיות בעברית בלבד.
5. כלל סיכום כלי: לאחר שכלי רץ, סכם את התוצאה עבור המשתמש בשפה טבעית. הסיכום שלך חייב להיות בשפה הראשית של השיחה (עברית). אל תחליף שפות, גם אם התוכן או הפרמטרים (כמו כותרת פתק) הם בשפה אחרת.
- כתובת האימייל של המשתמש: \${process.env.MY_EMAIL_ADDRESS}.`,

  da: `Du er Coopa, en hjælpsom og proaktiv digital assistent.
1. Chat: Hvis brugeren stiller generelle spørgsmål, må du ALDRIG bruge værktøjer.
2. Handling: Hvis brugeren anmoder om en handling, SKAL du bruge det passende værktøj.
3. find_memory-regel: Når find_memory-værktøjet returnerer et vellykket resultat, SKAL dit svar være i dette format: "Jeg fandt din fil: '[beskrivelse]'."
4. Sprogregler: Du SKAL kun svare på dansk. Dine svar skal KUN være på dansk.
5. Værktøjsoversigtsregel: Når et værktøj er kørt, skal du opsummere resultatet for brugeren i naturligt sprog. Din opsummering SKAL være på samtalens primære sprog (dansk). Skift IKKE sprog, selvom indholdet eller parametrene (som en notetitel) er på et andet sprog.
- Brugerens e-mailadresse: ${process.env.MY_EMAIL_ADDRESS}.`,

  fi: `Olet Coopa, avulias ja ennakoiva digitaalinen avustaja.
1. Keskustelu: Jos käyttäjä esittää yleisiä kysymyksiä, ÄLÄ KOSKAAN käytä työkaluja.
2. Toiminto: Jos käyttäjä pyytää toimintoa, SINUN ON käytettävä asianmukaista työkalua.
3. find_memory-sääntö: Kun find_memory-työkalu palauttaa onnistuneen tuloksen, vastauksesi TÄYTYY olla tässä muodossa: "Löysin tiedostosi: '[kuvaus]'."
4. Kielelliset säännöt: SINUN TÄYTYY vastata vain suomeksi. Vastauksiesi tulee olla VAIN suomeksi.
5. Työkalun yhteenvetosääntö: Kun työkalu on suoritettu, tee yhteenveto tuloksesta käyttäjälle luonnollisella kielellä. Yhteenvetosi TÄYTYY olla keskustelun pääkielellä (suomi). ÄLÄ vaihda kieltä, vaikka sisältö tai parametrit (kuten muistiinpanon otsikko) olisivat toisella kielellä.
- Käyttäjän sähköpostiosoite: ${process.env.MY_EMAIL_ADDRESS}.`,

  no: `Du er Coopa, en hjelpsom og proaktiv digital assistent.
1. Chat: Hvis brukeren stiller generelle spørsmål, skal du ALDRI bruke verktøy.
2. Handling: Hvis brukeren ber om en handling, MÅ du bruke det riktige verktøyet.
3. find_memory-regel: Når find_memory-verktøyet returnerer et vellykket resultat, MÅ svaret ditt være i dette formatet: "Jeg fant filen din: '[beskrivelse]'."
4. Språkregler: Du MÅ kun svare på norsk. Svarene dine skal KUN være på norsk.
5. Verktøyoppsummeringsregel: Etter at et verktøy har kjørt, oppsummer resultatet for brukeren på naturlig språk. Oppsummeringen MÅ være på samtalens hovedspråk (norsk). IKKE bytt språk, selv om innholdet eller parametrene (som en notatittel) er på et annet språk.
- Brukerens e-postadresse: ${process.env.MY_EMAIL_ADDRESS}.`
};
const toolsMultilingual = {
    tr: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Belirtilen bir şehirdeki güncel hava durumu bilgisini alır.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Bir e-postayı ŞİMDİ gönderir. Bir anıyı ek olarak göndermek için 'attachmentDescription' parametresi kullanılır.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "E-postaya eklenecek olan, daha önce kaydedilmiş bir anının açıklaması (örn: 'İstanbul ve Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Bir e-postayı, notu veya dosyayı GELECEKTEKİ belirli bir saat için planlar/zamanlar. Kullanıcı 'saat', 'sonra', 'akşam' gibi bir zaman ifadesi kullanırsa MUTLAKA bu araç seçilmelidir.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Görevin zamanı, MUTLAKA 24 saatlik 'HH:MM' formatında olmalı (örnek: '17:45')." },
                        noteName: { type: "STRING", description: "E-posta ile gönderilecek, önceden kaydedilmiş bir notun adı." }, 
                        subject: { type: "STRING", description: "Sıfırdan oluşturulacak bir e-postanın konusu." }, 
                        body: { type: "STRING", description: "Sıfırdan oluşturulacak bir e-postanın içeriği." }, 
                        attachmentDescription: { type: "STRING", description: "E-postaya eklenecek olan, daha önce kaydedilmiş bir anının (dosyanın) açıklaması." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Sıfırdan yeni bir not oluşturur veya var olan notun üzerine tamamen yazar.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Var olan bir notun içeriğinin sonuna yeni bilgi ekler.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Daha önceden oluşturulmuş bir notun içeriğini adına göre getirir.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Kullanıcıya o anki saati ve tarihi söyler.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Kullanıcının takvimine yeni bir etkinlik veya randevu ekler.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Etkinlik tarihi, 'YYYY-MM-DD' formatında OLMALI. Eğer kullanıcı 'bugün', 'yarın' gibi bir ifade kullanırsa, ilgili tarihi bu formatta KENDİN HESAPLA. Tarih belirtilmezse bugünü kullan." }, 
                        time: { type: "STRING", description: "Etkinlik saati, MUTLAKA 24 saatlik 'HH:MM' formatında olmalı (örnek: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Kullanıcının daha önce kaydettiği bir anıyı (görsel, dosya vb.) açıklamasına göre arar ve bulur. '... göster', '... bul', '... getir' gibi komutlar için kullanılır.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Anıyı bulmak için kullanılacak anahtar kelimeler (örn: 'kırmızı araba')" } }, required: ["searchText"] } }
            ]
        }
    ],
    en: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Gets current weather information for a specified city.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Sends an email NOW. Use the 'attachmentDescription' parameter to send a memory as an attachment.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "The description of a previously saved memory to attach to the email (e.g., 'Istanbul and Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Schedules an email, note, or file for a specific time in the FUTURE. This tool MUST be chosen if the user uses a time expression like 'hour', 'later', 'evening'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "The time of the task, MUST be in 24-hour 'HH:MM' format (example: '17:45')." },
                        noteName: { type: "STRING", description: "The name of a pre-saved note to be sent via email." }, 
                        subject: { type: "STRING", description: "The subject of an email to be created from scratch." }, 
                        body: { type: "STRING", description: "The content of an email to be created from scratch." }, 
                        attachmentDescription: { type: "STRING", description: "The description of a previously saved memory (file) to be attached to the email." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Creates a new note from scratch or completely overwrites an existing note.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Adds new information to the end of an existing note's content.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Retrieves the content of a previously created note by name.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Tells the user the current time and date.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Adds a new event or appointment to the user's calendar.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Event date MUST be in 'YYYY-MM-DD' format. If the user says 'today' or 'tomorrow', CALCULATE the corresponding date in this format YOURSELF. If no date is specified, use today." }, 
                        time: { type: "STRING", description: "Event time MUST be in 24-hour 'HH:MM' format (example: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Searches and finds a memory (image, file, etc.) previously saved by the user based on its description. Used for commands like '... show', '... find', '... get'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Keywords to find the memory (e.g., 'red car')" } }, required: ["searchText"] } }
            ]
        }
    ],
    zh: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "获取指定城市的当前天气信息。", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "立即发送电子邮件。使用“attachmentDescription”参数将记忆作为附件发送。", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "要附加到电子邮件的先前保存的记忆的描述（例如，'伊斯坦布尔和加拉太'）。" } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "为将来的特定时间安排电子邮件、笔记或文件。如果用户使用像“小时”、“稍后”、“晚上”这样的时间表达，则必须选择此工具。", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "任务时间，必须为24小时制的“HH:MM”格式（例如：“17:45”）。" },
                        noteName: { type: "STRING", description: "要通过电子邮件发送的预存笔记的名称。" }, 
                        subject: { type: "STRING", description: "要从头创建的电子邮件的主题。" }, 
                        body: { type: "STRING", description: "要从头创建的电子邮件的内容。" }, 
                        attachmentDescription: { type: "STRING", description: "要附加到电子邮件的先前保存的记忆（文件）的描述。" } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "从头开始创建新笔记或完全覆盖现有笔记。", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "在现有笔记内容的末尾添加新信息。", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "按名称检索先前创建的笔记的内容。", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "告诉用户当前的时间和日期。", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "将新活动添加到用户的日历中。", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "事件日期必须为“YYYY-MM-DD”格式。如果用户说“今天”或“明天”，请自行计算并使用此格式的相应日期。如果未指定日期，则使用今天。" }, 
                        time: { type: "STRING", description: "事件时间必须为24小时制的“HH:MM”格式（例如：“14:30”）。" }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "根据描述搜索并找到用户先前保存的记忆（图片、文件等）。用于“...显示”、“...查找”、“...获取”等命令。", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "用于查找记忆的关键字（例如：'红色汽车'）" } }, required: ["searchText"] } }
            ]
        }
    ],
    hi: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "निर्दिष्ट शहर के लिए वर्तमान मौसम की जानकारी प्राप्त करता है।", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "अभी एक ईमेल भेजता है। एक मेमोरी को अटैचमेंट के रूप में भेजने के लिए 'attachmentDescription' पैरामीटर का उपयोग करें।", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "ईमेल में संलग्न की जाने वाली पहले से सहेजी गई मेमोरी का विवरण (उदा: 'इस्तांबुल और गलाटा')।" } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "भविष्य में एक विशिष्ट समय के लिए एक ईमेल, नोट या फ़ाइल शेड्यूल करता है। यदि उपयोगकर्ता 'घंटे', 'बाद में', 'शाम' जैसे समय अभिव्यक्ति का उपयोग करता है तो इस टूल को अनिवार्य रूप से चुना जाना चाहिए।", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "कार्य का समय, 24-घंटे के 'HH:MM' प्रारूप में होना चाहिए (उदाहरण: '17:45')।" },
                        noteName: { type: "STRING", description: "ईमेल के माध्यम से भेजे जाने वाले पूर्व-सहेजे गए नोट का नाम।" }, 
                        subject: { type: "STRING", description: "स्क्रैच से बनाए जाने वाले ईमेल का विषय।" }, 
                        body: { type: "STRING", description: "स्क्रैच से बनाए जाने वाले ईमेल की सामग्री।" }, 
                        attachmentDescription: { type: "STRING", description: "ईमेल में संलग्न की जाने वाली पहले से सहेजी गई मेमोरी (फ़ाइल) का विवरण।" } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "स्क्रैच से एक नया नोट बनाता है या किसी मौजूदा नोट को पूरी तरह से ओवरराइट करता है।", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "किसी मौजूदा नोट की सामग्री के अंत में नई जानकारी जोड़ता है।", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "पहले से बनाए गए नोट की सामग्री को उसके नाम से पुनः प्राप्त करता है।", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "उपयोगकर्ता को वर्तमान समय और तारीख बताता है।", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "उपयोगकर्ता के कैलेंडर में एक नया ईवेंट या अपॉइंटमेंट जोड़ता है।", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "ईवेंट की तारीख 'YYYY-MM-DD' प्रारूप में होनी चाहिए। यदि उपयोगकर्ता 'आज' या 'कल' कहता है, तो इस प्रारूप में संबंधित तारीख की गणना स्वयं करें। यदि कोई तारीख निर्दिष्ट नहीं है, तो आज का उपयोग करें।" }, 
                        time: { type: "STRING", description: "ईवेंट का समय 24-घंटे के 'HH:MM' प्रारूप में होना चाहिए (उदाहरण: '14:30')।" }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "उपयोगकर्ता द्वारा पहले सहेजी गई मेमोरी (छवि, फ़ाइल, आदि) को उसके विवरण के आधार पर खोजता और ढूंढता है। इसका उपयोग '... दिखाओ', '... ढूंढो', '... लाओ' जैसे कमांड के लिए किया जाता है।", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "मेमोरी खोजने के लिए उपयोग किए जाने वाले कीवर्ड (उदा: 'लाल गाड़ी')" } }, required: ["searchText"] } }
            ]
        }
    ],
    es: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Obtiene información meteorológica actual para una ciudad especificada.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Envía un correo electrónico AHORA. Use el parámetro 'attachmentDescription' para enviar un recuerdo como adjunto.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "La descripción de un recuerdo guardado previamente para adjuntar al correo (ej. 'Estambul y Gálata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Programa un correo electrónico, nota o archivo para una hora específica en el FUTURO. Esta herramienta DEBE elegirse si el usuario utiliza una expresión de tiempo como 'hora', 'más tarde', 'noche'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "La hora de la tarea, DEBE estar en formato de 24 horas 'HH:MM' (ejemplo: '17:45')." },
                        noteName: { type: "STRING", description: "El nombre de una nota pre-guardada que se enviará por correo electrónico." }, 
                        subject: { type: "STRING", description: "El asunto de un correo electrónico que se creará desde cero." }, 
                        body: { type: "STRING", description: "El contenido de un correo electrónico que se creará desde cero." }, 
                        attachmentDescription: { type: "STRING", description: "La descripción de un recuerdo (archivo) guardado previamente que se adjuntará al correo electrónico." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Crea una nueva nota desde cero o sobrescribe completamente una nota existente.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Agrega nueva información al final del contenido de una nota existente.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Recupera el contenido de una nota creada previamente por nombre.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Dice al usuario la hora y fecha actuales.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Agrega un nuevo evento o cita al calendario del usuario.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "La fecha del evento DEBE estar en formato 'YYYY-MM-DD'. Si el usuario dice 'hoy' o 'mañana', CALCULA TÚ MISMO la fecha correspondiente en este formato. Si no se especifica ninguna fecha, usa la de hoy." }, 
                        time: { type: "STRING", description: "La hora del evento DEBE estar en formato de 24 horas 'HH:MM' (ejemplo: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Busca y encuentra una memoria (imagen, archivo, etc.) previamente guardada por el usuario basándose en su descripción. Se usa para comandos como '... mostrar', '... encontrar', '... obtener'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Palabras clave para encontrar la memoria (ej: 'coche rojo')" } }, required: ["searchText"] } }
            ]
        }
    ],
    fr: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Obtient les informations météorologiques actuelles pour une ville spécifiée.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Envoie un e-mail MAINTENANT. Utilisez le paramètre 'attachmentDescription' pour envoyer un souvenir en pièce jointe.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "La description d'un souvenir enregistré précédemment à joindre à l'e-mail (par ex. 'Istanbul et Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Planifie un e-mail, une note ou un fichier pour une heure spécifique dans le FUTUR. Cet outil DOIT être choisi si l'utilisateur utilise une expression temporelle comme 'heure', 'plus tard', 'soir'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "L'heure de la tâche DOIT être au format 24 heures 'HH:MM' (exemple : '17:45')." },
                        noteName: { type: "STRING", description: "Le nom d'une note pré-enregistrée à envoyer par e-mail." }, 
                        subject: { type: "STRING", description: "L'objet d'un e-mail à créer à partir de zéro." }, 
                        body: { type: "STRING", description: "Le contenu d'un e-mail à créer à partir de zéro." }, 
                        attachmentDescription: { type: "STRING", description: "La description d'un souvenir (fichier) précédemment enregistré à joindre à l'e-mail." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Crée une nouvelle note à partir de zéro ou écrase complètement une note existante.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Ajoute de nouvelles informations à la fin du contenu d'une note existante.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Récupère le contenu d'une note créée précédemment par son nom.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Dit à l'utilisateur l'heure et la date actuelles.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Ajoute un nouvel événement ou rendez-vous au calendrier de l'utilisateur.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "La date de l'événement DOIT être au format 'YYYY-MM-DD'. Si l'utilisateur dit 'aujourd'hui' ou 'demain', CALCULEZ VOUS-MÊME la date correspondante dans ce format. Si aucune date n'est spécifiée, utilisez la date d'aujourd'hui." }, 
                        time: { type: "STRING", description: "L'heure de l'événement DOIT être au format 24 heures 'HH:MM' (exemple : '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Recherche et trouve une mémoire (image, fichier, etc.) que l'utilisateur a sauvegardée précédemment basée sur sa description. Utilisé pour des commandes comme '... montrer', '... trouver', '... obtenir'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Mots-clés pour trouver la mémoire (ex: 'voiture rouge')" } }, required: ["searchText"] } }
            ]
        }
    ],
    ar: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "الحصول على معلومات الطقس الحالية لمدينة محددة.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "يرسل بريدًا إلكترونيًا الآن. لإرسال ذكرى كمرفق، استخدم المعلمة 'attachmentDescription'.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "وصف لذاكرة محفوظة مسبقًا ليتم إرفاقها بالبريد الإلكتروني (مثال: 'اسطنبول وغალاتة')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "يجدول بريدًا إلكترونيًا أو ملاحظة أو ملفًا لوقت محدد في المستقبل. يجب اختيار هذه الأداة حتمًا إذا استخدم المستخدم تعبيرًا زمنيًا مثل 'ساعة'، 'لاحقًا'، 'مساءً'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "وقت المهمة، يجب أن يكون بتنسيق 24 ساعة 'HH:MM' (مثال: '17:45')." },
                        noteName: { type: "STRING", description: "اسم ملاحظة محفوظة مسبقًا ليتم إرسالها عبر البريد الإلكتروني." }, 
                        subject: { type: "STRING", description: "موضوع بريد إلكتروني سيتم إنشاؤه من البداية." }, 
                        body: { type: "STRING", description: "محتوى بريد إلكتروني سيتم إنشاؤه من البداية." }, 
                        attachmentDescription: { type: "STRING", description: "وصف لذاكرة (ملف) محفوظة مسبقًا ليتم إرفاقها بالبريد الإلكتروني." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "ينشئ ملاحظة جديدة من البداية أو يكتب فوق ملاحظة موجودة بالكامل.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "يضيف معلومات جديدة إلى نهاية محتوى ملاحظة موجودة.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "يجلب محتوى ملاحظة تم إنشاؤها مسبقًا حسب اسمها.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "يخبر المستخدم بالوقت والتاريخ الحاليين.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "يضيف حدثًا جديدًا أو موعدًا إلى تقويم المستخدم.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "تاريخ الحدث يجب أن يكون بتنسيق 'YYYY-MM-DD'. إذا قال المستخدم 'اليوم' أو 'غدًا'، قم بحساب التاريخ المناظر بهذا التنسيق بنفسك. إذا لم يتم تحديد تاريخ، استخدم تاريخ اليوم." }, 
                        time: { type: "STRING", description: "وقت الحدث يجب أن يكون بتنسيق 24 ساعة 'HH:MM' (مثال: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "يبحث عن ويعثر على ذكرى (صورة، ملف، إلخ) قام المستخدم بحفظها مسبقًا بناءً على وصفها. يُستخدم لأوامر مثل '... أظهر'، '... ابحث'، '... أحضر'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "الكلمات الرئيسية المستخدمة للعثور على الذاكرة (مثال: 'سيارة حمراء')" } }, required: ["searchText"] } }
            ]
        }
    ],
    bn: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "নির্দিষ্ট শহরের জন্য বর্তমান আবহাওয়ার তথ্য প্রাপ্ত করে।", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "এখনই একটি ইমেল পাঠায়। সংযুক্তি হিসাবে একটি স্মৃতি পাঠাতে 'attachmentDescription' প্যারামিটার ব্যবহার করুন।", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "ইমেলে সংযুক্ত করার জন্য পূর্বে সংরক্ষিত একটি স্মৃতির বিবরণ (যেমন: 'ইস্তানবুল এবং গালাটা')।" } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "ভবিষ্যতে একটি নির্দিষ্ট সময়ের জন্য একটি ইমেল, নোট বা ফাইল নির্ধারণ করে। ব্যবহারকারী যদি 'ঘন্টা', 'পরে', 'সন্ধ্যা'র মতো সময় অভিব্যক্তি ব্যবহার করে তবে অবশ্যই এই সরঞ্জামটি বেছে নিতে হবে।", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "কাজের সময়টি অবশ্যই 24-ঘন্টার 'HH:MM' বিন্যাসে হতে হবে (উদাহরণস্বরূপ: '17:45')।" },
                        noteName: { type: "STRING", description: "ইমেলের মাধ্যমে পাঠানোর জন্য একটি পূর্ব-সংরক্ষিত নোটের নাম।" }, 
                        subject: { type: "STRING", description: "নতুন করে তৈরি করা একটি ইমেলের বিষয়।" }, 
                        body: { type: "STRING", description: "নতুন করে তৈরি করা একটি ইমেলের বিষয়বস্তু।" }, 
                        attachmentDescription: { type: "STRING", description: "ইমেলে সংযুক্ত করার জন্য পূর্বে সংরক্ষিত একটি স্মৃতির (ফাইলের) বিবরণ।" } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "নতুন করে একটি নোট তৈরি করে বা বিদ্যমান নোটের উপর সম্পূর্ণভাবে লেখে।", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "বিদ্যমান নোটের বিষয়বস্তুর শেষে নতুন তথ্য যোগ করে।", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "পূর্বে তৈরি করা একটি নোটের বিষয়বস্তু তার নাম দিয়ে নিয়ে আসে।", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "ব্যবহারকারীকে বর্তমান সময় এবং তারিখ জানায়।", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "ব্যবহারকারীর ক্যালেন্ডারে একটি নতুন ইভেন্ট বা অ্যাপয়েন্টমেন্ট যোগ করে।", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "ইভেন্টের তারিখ অবশ্যই 'YYYY-MM-DD' বিন্যাসে হতে হবে। যদি ব্যবহারকারী 'আজ' বা 'কাল' বলে, তাহলে এই বিন্যাসে সংশ্লিষ্ট তারিখটি নিজে গণনা করুন। যদি কোনো তারিখ নির্দিষ্ট না করা হয়, তাহলে আজকের তারিখ ব্যবহার করুন।" }, 
                        time: { type: "STRING", description: "ইভেন্টের সময় অবশ্যই 24-ঘন্টার 'HH:MM' বিন্যাসে হতে হবে (উদাহরণস্বরূপ: '14:30')।" }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "ব্যবহারকারীর দ্বারা পূর্বে সংরক্ষিত একটি স্মৃতি (ছবি, ফাইল, ইত্যাদি) তার বিবরণের উপর ভিত্তি করে অনুসন্ধান করে এবং খুঁজে বের করে। এটি '... দেখান', '... খুঁজুন', '... আনুন' এর মতো কমান্ডের জন্য ব্যবহৃত হয়।", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "স্মৃতি খুঁজে বের করার জন্য ব্যবহৃত কীওয়ার্ড (যেমন: 'লাল গাড়ি')" } }, required: ["searchText"] } }
            ]
        }
    ],
    ru: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Получает текущую информацию о погоде для указанного города.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Отправляет электронное письмо СЕЙЧАС. Используйте параметр 'attachmentDescription', чтобы отправить воспоминание в качестве вложения.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "Описание ранее сохраненного воспоминания для прикрепления к электронному письму (например, «Стамбул и Галата»)." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Планирует электронное письмо, заметку или файл на определенное время в БУДУЩЕМ. Этот инструмент ОБЯЗАТЕЛЬНО должен быть выбран, если пользователь использует временное выражение, такое как 'час', 'позже', 'вечер'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Время задачи, ОБЯЗАТЕЛЬНО должно быть в 24-часовом формате 'HH:MM' (пример: '17:45')." },
                        noteName: { type: "STRING", description: "Имя предварительно сохраненной заметки для отправки по электронной почте." }, 
                        subject: { type: "STRING", description: "Тема электронного письма, создаваемого с нуля." }, 
                        body: { type: "STRING", description: "Содержимое электронного письма, создаваемого с нуля." }, 
                        attachmentDescription: { type: "STRING", description: "Описание ранее сохраненного воспоминания (файла) для прикрепления к электронному письму." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Создает новую заметку с нуля или полностью перезаписывает существующую заметку.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Добавляет новую информацию в конец содержимого существующей заметки.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Извлекает содержимое ранее созданной заметки по ее названию.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Сообщает пользователю текущее время и дату.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Добавляет новое событие или встречу в календарь пользователя.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Дата события ОБЯЗАТЕЛЬНО должна быть в формате 'YYYY-MM-DD'. Если пользователь говорит 'сегодня' или 'завтра', ВЫЧИСЛИТЕ соответствующую дату в этом формате САМОСТОЯТЕЛЬНО. Если дата не указана, используйте сегодняшнюю." }, 
                        time: { type: "STRING", description: "Время события ОБЯЗАТЕЛЬНО должно быть в 24-часовом формате 'HH:MM' (пример: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Ищет и находит воспоминание (изображение, файл и т.д.), которое пользователь ранее сохранил, на основе его описания. Используется для команд типа '... покажи', '... найди', '... получи'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Ключевые слова для поиска воспоминания (например: 'красная машина')" } }, required: ["searchText"] } }
            ]
        }
    ],
    pt: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Obtém as informações meteorológicas atuais de uma cidade especificada.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Envia um e-mail AGORA. Para enviar uma memória como anexo, use o parâmetro 'attachmentDescription'.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "Uma descrição de uma memória previamente salva para ser anexada ao e-mail (ex: 'Istambul e Gálata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Agenda um e-mail, nota ou arquivo para um horário específico no FUTURO. Esta ferramenta DEVE ser escolhida se o usuário usar uma expressão de tempo como 'hora', 'mais tarde', 'noite'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "A hora da tarefa DEVE estar no formato 24 horas 'HH:MM' (exemplo: '17:45')." },
                        noteName: { type: "STRING", description: "O nome de uma nota pré-salva a ser enviada por e-mail." }, 
                        subject: { type: "STRING", description: "O assunto de um e-mail a ser criado do zero." }, 
                        body: { type: "STRING", description: "O conteúdo de um e-mail a ser criado do zero." }, 
                        attachmentDescription: { type: "STRING", description: "A descrição de uma memória (arquivo) previamente salva a ser anexada ao e-mail." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Cria uma nova nota do zero ou sobrescreve completamente uma nota existente.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Adiciona novas informações ao final do conteúdo de uma nota existente.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Recupera o conteúdo de uma nota criada anteriormente pelo nome.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Informa o usuário sobre a hora e a data atuais.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Adiciona um novo evento ou compromisso ao calendário do usuário.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "A data do evento DEVE estar no formato 'YYYY-MM-DD'. Se o usuário disser 'hoje' ou 'amanhã', CALCULE VOCÊ MESMO a data correspondente neste formato. Se nenhuma data for especificada, use a de hoje." }, 
                        time: { type: "STRING", description: "A hora do evento DEVE estar no formato 24 horas 'HH:MM' (exemplo: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Pesquisa e encontra uma memória (imagem, arquivo, etc.) salva anteriormente pelo usuário com base em sua descrição. Usado para comandos como '... mostrar', '... encontrar', '... obter'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Palavras-chave a serem usadas para encontrar a memória (ex: 'carro vermelho')" } }, required: ["searchText"] } }
            ]
        }
    ],
    ur: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "ایک مخصوص شہر کے لیے موجودہ موسم کی معلومات حاصل کرتا ہے۔", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "ابھی ایک ای میل بھیجتا ہے۔ میموری کو اٹیچمنٹ کے طور پر بھیجنے کے لیے 'attachmentDescription' پیرامیٹر استعمال کریں۔", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "ای میل میں اٹیچ کرنے کے لیے پہلے سے محفوظ کردہ میموری کی تفصیل (مثلاً 'استنبول اور گالاٹا')۔" } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "مستقبل میں ایک مخصوص وقت کے لیے ای میل، نوٹ، یا فائل کو شیڈول کرتا ہے۔ اگر صارف 'گھنٹہ'، 'بعد میں'، 'شام' جیسے وقت کا اظہار استعمال کرتا ہے تو یہ ٹول لازمی طور پر منتخب کیا جانا چاہیے۔", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "کام کا وقت 24 گھنٹے کے 'HH:MM' فارمیٹ میں ہونا چاہیے (مثال: '17:45')۔" },
                        noteName: { type: "STRING", description: "ای میل کے ذریعے بھیجے جانے والے پہلے سے محفوظ کردہ نوٹ کا نام۔" }, 
                        subject: { type: "STRING", description: "شروع سے بنائے جانے والے ای میل کا موضوع۔" }, 
                        body: { type: "STRING", description: "شروع سے بنائے جانے والے ای میل کا مواد۔" }, 
                        attachmentDescription: { type: "STRING", description: "ای میل میں اٹیچ کی جانے والی پہلے سے محفوظ کردہ میموری (فائل) کی تفصیل۔" } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "شروع سے ایک نیا نوٹ بناتا ہے یا موجودہ نوٹ کو مکمل طور پر اوور رائٹ کرتا ہے۔", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "موجودہ نوٹ کے مواد کے آخر میں نئی معلومات شامل کرتا ہے۔", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "پہلے سے بنائے گئے نوٹ کے مواد کو اس کے نام سے بازیافت کرتا ہے۔", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "صارف کو موجودہ وقت اور تاریخ بتاتا ہے۔", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "صارف کے کیلنڈر میں نیا ایونٹ یا اپائنٹمنٹ شامل کرتا ہے۔", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "ایونٹ کی تاریخ 'YYYY-MM-DD' فارمیٹ میں ہونی چاہیے۔ اگر صارف 'آج' یا 'کل' کہتا ہے تو اس فارمیٹ میں متعلقہ تاریخ کا حساب خود لگائیں۔ اگر کوئی تاریخ متعین نہیں ہے تو آج کا دن استعمال کریں۔" }, 
                        time: { type: "STRING", description: "ایونٹ کا وقت 24 گھنٹے کے 'HH:MM' فارمیٹ میں ہونا چاہیے (مثال: '14:30')۔" }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "صارف کی طرف سے پہلے محفوظ کردہ میموری (تصویر، فائل، وغیرہ) کو اس کی تفصیل کی بنیاد پر تلاش کرتا اور ڈھونڈتا ہے۔ اسے '... دکھائیں'، '... ڈھونڈیں'، '... لائیں' جیسے کمانڈز کے لیے استعمال کیا جاتا ہے۔", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "میموری کو تلاش کرنے کے لیے استعمال ہونے والے کلیدی الفاظ (مثلاً 'لال کار')" } }, required: ["searchText"] } }
            ]
        }
    ],
    ms: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Mendapatkan maklumat cuaca semasa untuk bandar yang dinyatakan.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Menghantar e-mel SEKARANG. Untuk menghantar memori sebagai lampiran, gunakan parameter 'attachmentDescription'.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "Penerangan memori yang disimpan sebelum ini untuk dilampirkan pada e-mel (cth: 'Istanbul dan Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Menjadualkan e-mel, nota, atau fail untuk masa tertentu di MASA DEPAN. Alat ini MESTI dipilih jika pengguna menggunakan ungkapan masa seperti 'jam', 'kemudian', 'petang'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Masa tugas, MESTI dalam format 24 jam 'HH:MM' (contoh: '17:45')." },
                        noteName: { type: "STRING", description: "Nama nota pra-simpan untuk dihantar melalui e-mel." }, 
                        subject: { type: "STRING", description: "Subjek e-mel yang akan dibuat dari awal." }, 
                        body: { type: "STRING", description: "Kandungan e-mel yang akan dibuat dari awal." }, 
                        attachmentDescription: { type: "STRING", description: "Penerangan memori (fail) yang disimpan sebelum ini untuk dilampirkan pada e-mel." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Mencipta nota baharu dari awal atau menulis ganti nota sedia ada sepenuhnya.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Menambah maklumat baharu pada akhir kandungan nota sedia ada.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Mengambil kandungan nota yang dibuat sebelum ini mengikut namanya.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Memberitahu pengguna masa dan tarikh semasa.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Menambah acara atau janji temu baharu pada kalendar pengguna.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Tarikh acara MESTI dalam format 'YYYY-MM-DD'. Jika pengguna berkata 'hari ini' atau 'esok', KIRA SENDIRI tarikh yang sepadan dalam format ini. Jika tiada tarikh dinyatakan, gunakan hari ini." }, 
                        time: { type: "STRING", description: "Masa acara MESTI dalam format 24 jam 'HH:MM' (contoh: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Mencari dan menemui memori (imej, fail, dll.) yang disimpan sebelum ini oleh pengguna berdasarkan penerangannya. Digunakan untuk arahan seperti '... tunjuk', '... cari', '... dapatkan'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Kata kunci untuk mencari memori (cth: 'kereta merah')" } }, required: ["searchText"] } }
            ]
        }
    ],
    de: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Ruft aktuelle Wetterinformationen für eine bestimmte Stadt ab.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Sendet JETZT eine E-Mail. Verwenden Sie den Parameter 'attachmentDescription', um eine Erinnerung als Anhang zu senden.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "Die Beschreibung einer zuvor gespeicherten Erinnerung, die an die E-Mail angehängt werden soll (z. B. 'Istanbul und Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Plant eine E-Mail, eine Notiz oder eine Datei für eine bestimmte Zeit in der ZUKUNFT. Dieses Werkzeug MUSS ausgewählt werden, wenn der Benutzer einen Zeitausdruck wie 'Stunde', 'später', 'Abend' verwendet.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Die Zeit der Aufgabe MUSS im 24-Stunden-Format 'HH:MM' sein (Beispiel: '17:45')." },
                        noteName: { type: "STRING", description: "Der Name einer vorgespeicherten Notiz, die per E-Mail gesendet werden soll." }, 
                        subject: { type: "STRING", description: "Der Betreff einer von Grund auf neu zu erstellenden E-Mail." }, 
                        body: { type: "STRING", description: "Der Inhalt einer von Grund auf neu zu erstellenden E-Mail." }, 
                        attachmentDescription: { type: "STRING", description: "Die Beschreibung einer zuvor gespeicherten Erinnerung (Datei), die an die E-Mail angehängt werden soll." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Erstellt eine neue Notiz von Grund auf oder überschreibt eine bestehende Notiz vollständig.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Fügt neue Informationen am Ende des Inhalts einer bestehenden Notiz hinzu.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Ruft den Inhalt einer zuvor erstellten Notiz anhand ihres Namens ab.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Teilt dem Benutzer die aktuelle Uhrzeit und das aktuelle Datum mit.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Fügt dem Kalender des Benutzers ein neues Ereignis oder einen neuen Termin hinzu.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Das Veranstaltungsdatum MUSS im Format 'YYYY-MM-DD' sein. Wenn der Benutzer 'heute' oder 'morgen' sagt, BERECHNEN SIE DAS entsprechende Datum in diesem Format SELBST. Wenn kein Datum angegeben wird, verwenden Sie das heutige Datum." }, 
                        time: { type: "STRING", description: "Die Veranstaltungszeit MUSS im 24-Stunden-Format 'HH:MM' sein (Beispiel: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Sucht und findet eine Erinnerung (Bild, Datei usw.), die der Benutzer zuvor anhand ihrer Beschreibung gespeichert hat. Wird für Befehle wie '... anzeigen', '... finden', '... holen' verwendet.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Schlüsselwörter zum Finden der Erinnerung (z.B.: 'rotes Auto')" } }, required: ["searchText"] } }
            ]
        }
    ],
    ja: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "指定された都市の現在の天気情報を取得します。", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Eメールを今すぐ送信します。添付ファイルとして思い出を送信するには、「attachmentDescription」パラメータを使用します。", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "Eメールに添付する、以前に保存した思い出の説明（例：「イスタンブールとガラタ」）。" } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Eメール、メモ、またはファイルを将来の特定の時間にスケジュールします。ユーザーが「時間」、「後で」、「夕方」などの時間表現を使用する場合は、このツールを必ず選択する必要があります。", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "タスクの時間は、必ず24時間形式の「HH:MM」でなければなりません（例：「17:45」）。" },
                        noteName: { type: "STRING", description: "Eメールで送信する、事前に保存されたメモの名前。" }, 
                        subject: { type: "STRING", description: "最初から作成するEメールの件名。" }, 
                        body: { type: "STRING", description: "最初から作成するEメールの内容。" }, 
                        attachmentDescription: { type: "STRING", description: "Eメールに添付する、以前に保存した思い出（ファイル）の説明。" } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "新しいメモを最初から作成するか、既存のメモを完全に上書きします。", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "既存のメモの内容の末尾に新しい情報を追加します。", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "以前に作成したメモの内容を名前で取得します。", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "ユーザーに現在の時刻と日付を伝えます。", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "ユーザーのカレンダーに新しいイベントや予定を追加します。", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "イベントの日付は「YYYY-MM-DD」形式である必要があります。ユーザーが「今日」や「明日」と言った場合は、対応する日付をこの形式で自分で計算してください。日付が指定されていない場合は、今日を使用してください。" }, 
                        time: { type: "STRING", description: "イベントの時間は、必ず24時間形式の「HH:MM」でなければなりません（例：「14:30」）。" }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "ユーザーが以前に保存した思い出（画像、ファイルなど）をその説明に基づいて検索し、見つけます。「...表示」、「...検索」、「...取得」などのコマンドに使用されます。", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "思い出を見つけるためのキーワード（例：「赤い車」）" } }, required: ["searchText"] } }
            ]
        }
    ],
    fa: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "اطلاعات آب و هوای فعلی را برای یک شهر مشخص دریافت می‌کند.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "یک ایمیل را هم اکنون ارسال می‌کند. برای ارسال یک خاطره به عنوان پیوست، از پارامتر 'attachmentDescription' استفاده کنید.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "توضیح یک خاطره ذخیره شده قبلی برای پیوست به ایمیل (مثال: 'استانبول و گالاتا')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "یک ایمیل، یادداشت یا فایل را برای زمان مشخصی در آینده برنامه‌ریزی می‌کند. اگر کاربر از عبارات زمانی مانند 'ساعت'، 'بعداً'، 'عصر' استفاده کند، این ابزار باید حتما انتخاب شود.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "زمان وظیفه، حتماً باید با فرمت 24 ساعته 'HH:MM' باشد (مثال: '17:45')." },
                        noteName: { type: "STRING", description: "نام یک یادداشت از پیش ذخیره شده برای ارسال از طریق ایمیل." }, 
                        subject: { type: "STRING", description: "موضوع ایمیلی که از ابتدا ایجاد می‌شود." }, 
                        body: { type: "STRING", description: "محتوای ایمیلی که از ابتدا ایجاد می‌شود." }, 
                        attachmentDescription: { type: "STRING", description: "توضیح یک خاطره (فایل) از پیش ذخیره شده برای پیوست به ایمیل." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "یک یادداشت جدید از ابتدا ایجاد می‌کند یا به طور کامل روی یادداشت موجود بازنویسی می‌کند.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "اطلاعات جدیدی به انتهای محتوای یک یادداشت موجود اضافه می‌کند.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "محتوای یک یادداشت از پیش ایجاد شده را بر اساس نام آن بازیابی می‌کند.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "زمان و تاریخ فعلی را به کاربر می‌گوید.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "یک رویداد یا قرار ملاقات جدید به تقویم کاربر اضافه می‌کند.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "تاریخ رویداد باید با فرمت 'YYYY-MM-DD' باشد. اگر کاربر عباراتی مانند 'امروز' یا 'فردا' را به کار برد، تاریخ مربوطه را خودتان در این فرمت محاسبه کنید. اگر تاریخی مشخص نشود، از تاریخ امروز استفاده کنید." }, 
                        time: { type: "STRING", description: "زمان رویداد حتماً باید با فرمت 24 ساعته 'HH:MM' باشد (مثال: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "یک خاطره (تصویر، فایل و غیره) که کاربر قبلاً ذخیره کرده است را بر اساس توضیحات آن جستجو و پیدا می‌کند. برای دستوراتی مانند '... نشان بده'، '... پیدا کن'، '... بیاور' استفاده می‌شود.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "کلمات کلیدی برای یافتن خاطره (مثال: 'ماشین قرمز')" } }, required: ["searchText"] } }
            ]
        }
    ],
    ha: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Samun bayanan yanayi na yanzu don birni da aka ayyana.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Aika imel YANZU. Don aika ƙwaƙwalwa a matsayin haɗe-haɗe, yi amfani da siga 'attachmentDescription'.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "Bayanin ƙwaƙwalwar da aka adana a baya don a haɗa shi da imel (misali: 'Istanbul da Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Shirya imel, rubutu, ko fayil don takamaiman lokaci a GABA. DOLE ne a zaɓi wannan kayan aiki idan mai amfani ya yi amfani da furucin lokaci kamar 'sa'a', 'daga baya', 'maraice'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Lokacin aikin, DOLE ne ya kasance a cikin tsarin 'HH:MM' na sa'o'i 24 (misali: '17:45')." },
                        noteName: { type: "STRING", description: "Sunan rubutun da aka riga aka adana don a aika ta imel." }, 
                        subject: { type: "STRING", description: "Taken imel da za a ƙirƙira daga farko." }, 
                        body: { type: "STRING", description: "Abun cikin imel da za a ƙirƙira daga farko." }, 
                        attachmentDescription: { type: "STRING", description: "Bayanin ƙwaƙwalwar (fayil) da aka riga aka adana don a haɗa shi da imel." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Ƙirƙiri sabon rubutu daga farko ko sake rubuta rubutun da ke akwai gaba ɗaya.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Ƙara sabon bayani a ƙarshen abun cikin rubutun da ke akwai.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Samun abun cikin rubutun da aka ƙirƙira a baya ta sunansa.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Faɗa wa mai amfani lokaci da kwanan wata na yanzu.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Ƙara sabon taro ko alƙawari a kalandar mai amfani.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Kwanan watan taron DOLE ne ya kasance a tsarin 'YYYY-MM-DD'. Idan mai amfani ya ce 'yau' ko 'gobe', LISSAFA kwanan watan da ya dace a wannan tsarin DA KANKA. Idan ba a fayyace kwanan wata ba, yi amfani da na yau." }, 
                        time: { type: "STRING", description: "Lokacin taron DOLE ne ya kasance a cikin tsarin 'HH:MM' na sa'o'i 24 (misali: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Bincika kuma nemo ƙwaƙwalwar (hoto, fayil, da sauransu) da mai amfani ya adana a baya bisa ga bayaninsa. Ana amfani da shi don umarni kamar '... nuna', '... nemo', '... samu'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Kalmomin da za a yi amfani da su don nemo ƙwaƙwalwar (misali: 'jan mota')" } }, required: ["searchText"] } }
            ]
        }
    ],
    sw: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Hupata taarifa za hali ya hewa za sasa za jiji lililobainishwa.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Hutuma barua pepe SASA HIVI. Ili kutuma kumbukumbu kama kiambatisho, tumia kigezo cha 'attachmentDescription'.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "Maelezo ya kumbukumbu iliyohifadhiwa awali ya kuambatisha kwenye barua pepe (k.m., 'Istanbul na Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Hupanga barua pepe, dokezo, au faili kwa wakati maalum ujao. Zana hii LAZIMA ichaguliwe ikiwa mtumiaji atatumia msemo wa wakati kama 'saa', 'baadaye', 'jioni'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Saa ya kazi, LAZIMA iwe katika umbizo la saa 24 'HH:MM' (mfano: '17:45')." },
                        noteName: { type: "STRING", description: "Jina la dokezo lililohifadhiwa awali la kutumwa kupitia barua pepe." }, 
                        subject: { type: "STRING", description: "Mada ya barua pepe itakayoundwa kutoka mwanzo." }, 
                        body: { type: "STRING", description: "Maudhui ya barua pepe yatakayoundwa kutoka mwanzo." }, 
                        attachmentDescription: { type: "STRING", description: "Maelezo ya kumbukumbu (faili) iliyohifadhiwa awali ya kuambatisha kwenye barua pepe." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Huunda dokezo jipya kutoka mwanzo au kubatilisha kabisa dokezo lililopo.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Huongeza taarifa mpya mwishoni mwa maudhui ya dokezo lililopo.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Hurejesha maudhui ya dokezo lililoundwa awali kwa jina lake.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Humwambia mtumiaji saa na tarehe ya sasa.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Huongeza tukio jipya au miadi kwenye kalenda ya mtumiaji.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Tarehe ya tukio LAZIMA iwe katika umbizo la 'YYYY-MM-DD'. Ikiwa mtumiaji atasema 'leo' au 'kesho', KOKOTOA tarehe husika katika umbizo hili WEWE MWENYEWE. Ikiwa hakuna tarehe iliyobainishwa, tumia ya leo." }, 
                        time: { type: "STRING", description: "Saa ya tukio LAZIMA iwe katika umbizo la saa 24 'HH:MM' (mfano: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Hutafuta na kupata kumbukumbu (picha, faili, n.k.) iliyohifadhiwa awali na mtumiaji kulingana na maelezo yake. Hutumika kwa amri kama '... onyesha', '... pata', '... leta'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Maneno muhimu ya kupata kumbukumbu (k.m., 'gari jekundu')" } }, required: ["searchText"] } }
            ]
        }
    ],
    vi: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Lấy thông tin thời tiết hiện tại tại một thành phố được chỉ định.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Gửi email NGAY BÂY GIỜ. Để gửi một kỷ niệm dưới dạng tệp đính kèm, hãy sử dụng tham số 'attachmentDescription'.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "Mô tả về một kỷ niệm đã được lưu trước đó để đính kèm vào email (ví dụ: 'Istanbul và Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Lên lịch cho email, ghi chú hoặc tệp vào một thời điểm cụ thể trong TƯƠNG LAI. Công cụ này PHẢI được chọn nếu người dùng sử dụng các biểu thức thời gian như 'giờ', 'sau', 'buổi tối'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Thời gian của nhiệm vụ, PHẢI ở định dạng 24 giờ 'HH:MM' (ví dụ: '17:45')." },
                        noteName: { type: "STRING", description: "Tên của một ghi chú đã được lưu trước đó sẽ được gửi qua email." }, 
                        subject: { type: "STRING", description: "Chủ đề của một email sẽ được tạo từ đầu." }, 
                        body: { type: "STRING", description: "Nội dung của một email sẽ được tạo từ đầu." }, 
                        attachmentDescription: { type: "STRING", description: "Mô tả về một kỷ niệm (tệp) đã được lưu trước đó để đính kèm vào email." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Tạo một ghi chú mới từ đầu hoặc ghi đè hoàn toàn lên một ghi chú hiện có.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Thêm thông tin mới vào cuối nội dung của một ghi chú hiện có.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Lấy nội dung của một ghi chú đã được tạo trước đó theo tên của nó.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Cho người dùng biết thời gian và ngày hiện tại.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Thêm một sự kiện hoặc cuộc hẹn mới vào lịch của người dùng.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Ngày sự kiện PHẢI ở định dạng 'YYYY-MM-DD'. Nếu người dùng nói 'hôm nay' hoặc 'ngày mai', hãy TỰ TÍNH ngày tương ứng ở định dạng này. Nếu không có ngày nào được chỉ định, hãy sử dụng ngày hôm nay." }, 
                        time: { type: "STRING", description: "Thời gian sự kiện PHẢI ở định dạng 24 giờ 'HH:MM' (ví dụ: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Tìm kiếm và tìm thấy một kỷ niệm (hình ảnh, tệp, v.v.) mà người dùng đã lưu trước đó dựa trên mô tả của nó. Được sử dụng cho các lệnh như '... hiển thị', '... tìm', '... lấy'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Các từ khóa sẽ được sử dụng để tìm kỷ niệm (ví dụ: 'xe hơi màu đỏ')" } }, required: ["searchText"] } }
            ]
        }
    ],
    ko: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "지정된 도시의 현재 날씨 정보를 가져옵니다.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "이메일을 지금 보냅니다. 추억을 첨부 파일로 보내려면 'attachmentDescription' 매개변수를 사용하세요.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "이메일에 첨부할 이전에 저장된 추억에 대한 설명 (예: '이스탄불과 갈라타')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "이메일, 메모 또는 파일을 미래의 특정 시간으로 예약합니다. 사용자가 '시간', '나중에', '저녁'과 같은 시간 표현을 사용하면 반드시 이 도구를 선택해야 합니다.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "작업 시간은 반드시 24시간 형식인 'HH:MM'이어야 합니다(예: '17:45')." },
                        noteName: { type: "STRING", description: "이메일로 보낼 미리 저장된 메모의 이름." }, 
                        subject: { type: "STRING", description: "처음부터 만들 이메일의 제목." }, 
                        body: { type: "STRING", description: "처음부터 만들 이메일의 내용." }, 
                        attachmentDescription: { type: "STRING", description: "이메일에 첨부할 이전에 저장된 추억(파일)에 대한 설명." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "새 메모를 처음부터 만들거나 기존 메모를 완전히 덮어씁니다.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "기존 메모 내용 끝에 새 정보를 추가합니다.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "이전에 만든 메모의 내용을 이름으로 가져옵니다.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "사용자에게 현재 시간과 날짜를 알려줍니다.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "사용자의 캘린더에 새 이벤트나 약속을 추가합니다.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "이벤트 날짜는 'YYYY-MM-DD' 형식이어야 합니다. 사용자가 '오늘'이나 '내일'이라고 말하면 해당 날짜를 이 형식으로 직접 계산하십시오. 날짜가 지정되지 않은 경우 오늘을 사용하십시오." }, 
                        time: { type: "STRING", description: "이벤트 시간은 반드시 24시간 형식인 'HH:MM'이어야 합니다(예: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "사용자가 이전에 저장한 추억(이미지, 파일 등)을 설명에 따라 검색하여 찾습니다. '... 보여줘', '... 찾아줘', '... 가져와' 같은 명령어에 사용됩니다.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "추억을 찾기 위해 사용할 키워드 (예: '빨간 자동차')" } }, required: ["searchText"] } }
            ]
        }
    ],
    it: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Ottiene informazioni meteorologiche attuali per una città specificata.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Invia un'e-mail ORA. Usa il parametro 'attachmentDescription' per inviare un ricordo come allegato.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "La descrizione di un ricordo salvato in precedenza da allegare all'e-mail (es. 'Istanbul e Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Pianifica un'e-mail, una nota o un file per un'ora specifica nel FUTURO. Questo strumento DEVE essere scelto se l'utente utilizza un'espressione di tempo come 'ora', 'più tardi', 'sera'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "L'ora dell'attività DEVE essere in formato 24 ore 'HH:MM' (esempio: '17:45')." },
                        noteName: { type: "STRING", description: "Il nome di una nota pre-salvata da inviare via e-mail." }, 
                        subject: { type: "STRING", description: "L'oggetto di un'e-mail da creare da zero." }, 
                        body: { type: "STRING", description: "Il contenuto di un'e-mail da creare da zero." }, 
                        attachmentDescription: { type: "STRING", description: "La descrizione di un ricordo (file) salvato in precedenza da allegare all'e-mail." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Crea una nuova nota da zero o sovrascrive completamente una nota esistente.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Aggiunge nuove informazioni alla fine del contenuto di una nota esistente.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Recupera il contenuto di una nota creata precedentemente dal suo nome.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Dice all'utente l'ora e la data attuali.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Aggiunge un nuovo evento o appuntamento al calendario dell'utente.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "La data dell'evento DEVE essere in formato 'YYYY-MM-DD'. Se l'utente dice 'oggi' o 'domani', CALCOLA TU STESSO la data corrispondente in questo formato. Se non viene specificata alcuna data, usa quella di oggi." }, 
                        time: { type: "STRING", description: "L'ora dell'evento DEVE essere in formato 24 ore 'HH:MM' (esempio: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Cerca e trova una memoria (immagine, file, ecc.) che l'utente ha salvato precedentemente basandosi sulla sua descrizione. Usato per comandi come '... mostra', '... trova', '... ottieni'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Parole chiave per trovare la memoria (es: 'auto rossa')" } }, required: ["searchText"] } }
            ]
        }
    ],
    jv: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Njaluk informasi cuaca saiki kanggo kutha sing ditemtokake.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Ngirim email SAIKI. Kanggo ngirim memori minangka lampiran, gunakake parameter 'attachmentDescription'.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "Deskripsi memori sing wis disimpen sadurunge kanggo dilampirake ing email (contone: 'Istanbul lan Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Njadwalake email, cathetan, utawa file kanggo wektu tartamtu ing MASA DEPAN. Alat iki KUDU dipilih yen pangguna nggunakake ekspresi wektu kaya 'jam', 'mengko', 'sore'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Wektu tugas, KUDU ing format 24 jam 'HH:MM' (contone: '17:45')." },
                        noteName: { type: "STRING", description: "Jeneng cathetan sing wis disimpen kanggo dikirim liwat email." }, 
                        subject: { type: "STRING", description: "Subyek email sing bakal digawe saka awal." }, 
                        body: { type: "STRING", description: "Isi email sing bakal digawe saka awal." }, 
                        attachmentDescription: { type: "STRING", description: "Deskripsi memori (file) sing wis disimpen kanggo dilampirake ing email." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Nggawe cathetan anyar saka awal utawa nulis ulang cathetan sing wis ana kanthi lengkap.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Nambahake informasi anyar ing pungkasan isi cathetan sing wis ana.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Njaluk isi cathetan sing wis digawe sadurunge miturut jenenge.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Ngandhani pangguna wektu lan tanggal saiki.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Nambahake acara utawa janjian anyar ing tanggalan pangguna.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Tanggal acara KUDU ing format 'YYYY-MM-DD'. Yen pangguna ngomong 'dina iki' utawa 'sesuk', ITUNGEN DHEWE tanggal sing cocog ing format iki. Yen ora ana tanggal sing ditemtokake, gunakake dina iki." }, 
                        time: { type: "STRING", description: "Wektu acara KUDU ing format 24 jam 'HH:MM' (contone: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Nggoleki lan nemokake memori (gambar, file, lsp) sing wis disimpen dening pangguna miturut deskripsine. Digunakake kanggo prentah kaya '... tampilake', '... golek', '... jupuk'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Tembung kunci kanggo nemokake memori (contone: 'mobil abang')" } }, required: ["searchText"] } }
            ]
        }
    ],
    tl: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Kumukuha ng kasalukuyang impormasyon ng panahon para sa isang tinukoy na lungsod.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Nagpapadala ng email NGAYON. Upang magpadala ng alaala bilang attachment, gamitin ang parameter na 'attachmentDescription'.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "Isang paglalarawan ng isang naunang na-save na alaala na ilalakip sa email (hal. 'Istanbul at Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Nagtatakda ng email, tala, o file para sa isang partikular na oras sa HINAHARAP. DAPAT piliin ang tool na ito kung ang gumagamit ay gumagamit ng isang ekspresyon ng oras tulad ng 'oras', 'mamaya', 'gabi'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Ang oras ng gawain, DAPAT ay nasa 24-oras na format na 'HH:MM' (halimbawa: '17:45')." },
                        noteName: { type: "STRING", description: "Ang pangalan ng isang paunang na-save na tala na ipapadala sa pamamagitan ng email." }, 
                        subject: { type: "STRING", description: "Ang paksa ng isang email na lilikhain mula sa simula." }, 
                        body: { type: "STRING", description: "Ang nilalaman ng isang email na lilikhain mula sa simula." }, 
                        attachmentDescription: { type: "STRING", description: "Ang paglalarawan ng isang naunang na-save na alaala (file) na ilalakip sa email." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Lumilikha ng isang bagong tala mula sa simula o ganap na pinapatungan ang isang umiiral na tala.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Nagdaragdag ng bagong impormasyon sa dulo ng nilalaman ng isang umiiral na tala.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Kinukuha ang nilalaman ng isang naunang nilikha na tala sa pamamagitan ng pangalan.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Sinasabi sa gumagamit ang kasalukuyang oras at petsa.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Nagdaragdag ng isang bagong kaganapan o appointment sa kalendaryo ng gumagamit.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Ang petsa ng kaganapan ay DAPAT nasa format na 'YYYY-MM-DD'. Kung sinabi ng gumagamit na 'ngayon' o 'bukas', I-CALCULATE ang kaukulang petsa sa format na ito sa IYONG SARILI. Kung walang petsang tinukoy, gamitin ang araw na ito." }, 
                        time: { type: "STRING", description: "Ang oras ng kaganapan ay DAPAT nasa 24-oras na format na 'HH:MM' (halimbawa: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Naghahanap at nakakahanap ng isang alaala (imahe, file, atbp.) na naunang na-save ng gumagamit batay sa paglalarawan nito. Ginagamit para sa mga utos tulad ng '... ipakita', '... hanapin', '... kunin'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Mga keyword upang mahanap ang alaala (hal. 'pulang kotse')" } }, required: ["searchText"] } }
            ]
        }
    ],
    uz: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Belgilangan shahar uchun joriy ob-havo ma'lumotlarini oladi.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "E-xatni HOZIR yuboradi. Xotirani ilova sifatida yuborish uchun 'attachmentDescription' parametrini ishlating.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "E-xatga ilova qilinadigan oldindan saqlangan xotiraning tavsifi (masalan, 'Istanbul va Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "E-xat, eslatma yoki faylni KELAJAKdagi ma'lum bir vaqtga rejalashtiradi. Agar foydalanuvchi 'soat', 'keyinroq', 'kechqurun' kabi vaqt iboralarini ishlatsa, BU vosita ALBATTA tanlanishi kerak.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Vazifa vaqti, 24 soatlik 'HH:MM' formatida bo'lishi SHART (misol: '17:45')." },
                        noteName: { type: "STRING", description: "E-xat orqali yuboriladigan oldindan saqlangan eslatma nomi." }, 
                        subject: { type: "STRING", description: "Noldan yaratiladigan e-xat mavzusi." }, 
                        body: { type: "STRING", description: "Noldan yaratiladigan e-xat tarkibi." }, 
                        attachmentDescription: { type: "STRING", description: "E-xatga ilova qilinadigan oldindan saqlangan xotira (fayl) tavsifi." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Yangi eslatmani noldan yaratadi yoki mavjud eslatmani to'liq qayta yozadi.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Mavjud eslatma tarkibining oxiriga yangi ma'lumot qo'shadi.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Oldindan yaratilgan eslatma tarkibini uning nomi bo'yicha oladi.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Foydalanuvchiga joriy vaqt va sanani aytadi.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Foydalanuvchi taqvimiga yangi tadbir yoki uchrashuv qo'shadi.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Tadbir sanasi 'YYYY-MM-DD' formatida bo'lishi SHART. Agar foydalanuvchi 'bugun' yoki 'ertaga' desa, mos sanani shu formatda O'ZINGIZ HISOBLANG. Agar sana ko'rsatilmasa, bugungi kunni ishlating." }, 
                        time: { type: "STRING", description: "Tadbir vaqti, 24 soatlik 'HH:MM' formatida bo'lishi SHART (misol: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Foydalanuvchi oldindan saqlagan xotirani (rasm, fayl va h.k.) uning tavsifi asosida qidiradi va topadi. '... ko'rsat', '... top', '... olib kel' kabi buyruqlar uchun ishlatiladi.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Xotirani topish uchun ishlatiladigan kalit so'zlar (masalan, 'qizil mashina')" } }, required: ["searchText"] } }
            ]
        }
    ],
    nl: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Haalt de huidige weersinformatie op voor een opgegeven stad.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Verstuurt NU een e-mail. Om een herinnering als bijlage te verzenden, gebruik de parameter 'attachmentDescription'.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "Een beschrijving van een eerder opgeslagen herinnering die aan de e-mail moet worden toegevoegd (bijv. 'Istanbul en Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Plant een e-mail, notitie of bestand voor een specifieke tijd in de TOEKOMST. Deze tool MOET worden gekozen als de gebruiker een tijdsuitdrukking gebruikt zoals 'uur', 'later', 'avond'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "De tijd van de taak MOET in 24-uurs 'HH:MM' formaat zijn (voorbeeld: '17:45')." },
                        noteName: { type: "STRING", description: "De naam van een vooraf opgeslagen notitie die per e-mail wordt verzonden." }, 
                        subject: { type: "STRING", description: "Het onderwerp van een e-mail die van begin af aan wordt gemaakt." }, 
                        body: { type: "STRING", description: "De inhoud van een e-mail die van begin af aan wordt gemaakt." }, 
                        attachmentDescription: { type: "STRING", description: "De beschrijving van een eerder opgeslagen herinnering (bestand) die aan de e-mail moet worden toegevoegd." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Maakt een nieuwe notitie vanaf het begin of overschrijft een bestaande notitie volledig.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Voegt nieuwe informatie toe aan het einde van de inhoud van een bestaande notitie.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Haalt de inhoud op van een eerder gemaakte notitie op basis van de naam.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Vertelt de gebruiker de huidige tijd en datum.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Voegt een nieuw evenement of afspraak toe aan de kalender van de gebruiker.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "De datum van het evenement MOET in 'YYYY-MM-DD' formaat zijn. Als de gebruiker 'vandaag' of 'morgen' zegt, BEREKEN dan ZELF de overeenkomstige datum in dit formaat. Gebruik vandaag als er geen datum is opgegeven." }, 
                        time: { type: "STRING", description: "De tijd van het evenement MOET in 24-uurs 'HH:MM' formaat zijn (voorbeeld: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Zoekt en vindt een herinnering (afbeelding, bestand, etc.) die de gebruiker eerder heeft opgeslagen op basis van de beschrijving. Wordt gebruikt voor commando's zoals '... toon', '... vind', '... haal op'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Trefwoorden die gebruikt moeten worden om de herinnering te vinden (bijv. 'rode auto')" } }, required: ["searchText"] } }
            ]
        }
    ],
    el: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Λαμβάνει τις τρέχουσες πληροφορίες καιρού για μια καθορισμένη πόλη.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Στέλνει ένα email ΤΩΡΑ. Για να στείλετε μια ανάμνηση ως συνημμένο, χρησιμοποιήστε την παράμετρο 'attachmentDescription'.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "Μια περιγραφή μιας προηγουμένως αποθηκευμένης ανάμνησης για επισύναψη στο email (π.χ. 'Κωνσταντινούπολη και Γαλατάς')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Προγραμματίζει ένα email, μια σημείωση ή ένα αρχείο για μια συγκεκριμένη ώρα στο ΜΕΛΛΟΝ. Αυτό το εργαλείο ΠΡΕΠΕΙ να επιλεγεί εάν ο χρήστης χρησιμοποιεί μια έκφραση χρόνου όπως 'ώρα', 'αργότερα', 'βράδυ'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Η ώρα της εργασίας ΠΡΕΠΕΙ να είναι σε 24ωρη μορφή 'HH:MM' (παράδειγμα: '17:45')." },
                        noteName: { type: "STRING", description: "Το όνομα μιας προ-αποθηκευμένης σημείωσης που θα σταλεί μέσω email." }, 
                        subject: { type: "STRING", description: "Το θέμα ενός email που θα δημιουργηθεί από την αρχή." }, 
                        body: { type: "STRING", description: "Το περιεχόμενο ενός email που θα δημιουργηθεί από την αρχή." }, 
                        attachmentDescription: { type: "STRING", description: "Η περιγραφή μιας προηγουμένως αποθηκευμένης ανάμνησης (αρχείου) που θα επισυναφθεί στο email." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Δημιουργεί μια νέα σημείωση από την αρχή ή αντικαθιστά πλήρως μια υπάρχουσα σημείωση.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Προσθέτει νέες πληροφορίες στο τέλος του περιεχομένου μιας υπάρχουσας σημείωσης.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Ανακτά το περιεχόμενο μιας προηγουμένως δημιουργημένης σημείωσης με το όνομά της.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Λέει στον χρήστη την τρέχουσα ώρα και ημερομηνία.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Προσθέτει ένα νέο γεγονός ή ραντεβού στο ημερολόγιο του χρήστη.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Η ημερομηνία του γεγονότος ΠΡΕΠΕΙ να είναι σε μορφή 'YYYY-MM-DD'. Εάν ο χρήστης πει 'σήμερα' ή 'αύριο', ΥΠΟΛΟΓΙΣΤΕ ΜΟΝΟΙ ΣΑΣ την αντίστοιχη ημερομηνία σε αυτήν τη μορφή. Εάν δεν καθοριστεί ημερομηνία, χρησιμοποιήστε τη σημερινή." }, 
                        time: { type: "STRING", description: "Η ώρα του γεγονότος ΠΡΕΠΕΙ να είναι σε 24ωρη μορφή 'HH:MM' (παράδειγμα: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Αναζητά και βρίσκει μια ανάμνηση (εικόνα, αρχείο, κ.λπ.) που έχει αποθηκεύσει προηγουμένως ο χρήστης με βάση την περιγραφή της. Χρησιμοποιείται για εντολές όπως '... εμφάνιση', '... εύρεση', '... λήψη'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Λέξεις-κλειδιά για την εύρεση της ανάμνησης (π.χ. 'κόκκινο αυτοκίνητο')" } }, required: ["searchText"] } }
            ]
        }
    ],
    sv: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Hämtar aktuell väderinformation för en angiven stad.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Skickar ett e-postmeddelande NU. Använd parametern 'attachmentDescription' för att skicka ett minne som en bilaga.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "En beskrivning av ett tidigare sparat minne som ska bifogas e-postmeddelandet (t.ex. 'Istanbul och Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Schemalägger ett e-postmeddelande, en anteckning eller en fil för en specifik tid i FRAMTIDEN. Detta verktyg MÅSTE väljas om användaren använder ett tidsuttryck som 'timme', 'senare', 'kväll'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Tiden för uppgiften MÅSTE vara i 24-timmarsformat 'HH:MM' (exempel: '17:45')." },
                        noteName: { type: "STRING", description: "Namnet på en försparad anteckning som ska skickas via e-post." }, 
                        subject: { type: "STRING", description: "Ämnet för ett e-postmeddelande som ska skapas från grunden." }, 
                        body: { type: "STRING", description: "Innehållet i ett e-postmeddelande som ska skapas från grunden." }, 
                        attachmentDescription: { type: "STRING", description: "Beskrivningen av ett tidigare sparat minne (fil) som ska bifogas e-postmeddelandet." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Skapar en ny anteckning från grunden eller skriver över en befintlig anteckning helt.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Lägger till ny information i slutet av en befintlig antecknings innehåll.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Hämtar innehållet i en tidigare skapad anteckning med dess namn.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Berättar för användaren aktuell tid och datum.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Lägger till en ny händelse eller ett nytt möte i användarens kalender.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Händelsedatum MÅSTE vara i formatet 'YYYY-MM-DD'. Om användaren säger 'idag' eller 'imorgon', BERÄKNA motsvarande datum i detta format SJÄLV. Om inget datum anges, använd dagens datum." }, 
                        time: { type: "STRING", description: "Händelsetid MÅSTE vara i 24-timmarsformat 'HH:MM' (exempel: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Söker efter och hittar ett minne (bild, fil, etc.) som användaren tidigare har sparat baserat på dess beskrivning. Används för kommandon som '... visa', '... hitta', '... hämta'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Nyckelord för att hitta minnet (t.ex. 'röd bil')" } }, required: ["searchText"] } }
            ]
        }
    ],
    he: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "מקבל את נתוני מזג האוויר הנוכחיים בעיר שצוינה.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "שולח אימייל עכשיו. כדי לשלוח זיכרון כקובץ מצורף, השתמש בפרמטר 'attachmentDescription'.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "תיאור של זיכרון שנשמר בעבר ושיצורף לאימייל (לדוגמה: 'איסטנבול וגלאטה')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "מתזמן אימייל, פתק או קובץ לשעה ספציפית בעתיד. יש לבחור כלי זה בהכרח אם המשתמש משתמש בביטוי זמן כמו 'שעה', 'אחר כך', 'ערב'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "זמן המשימה חייב להיות בפורמט 24 שעות 'HH:MM' (דוגמה: '17:45')." },
                        noteName: { type: "STRING", description: "שם של פתק שנשמר מראש ויישלח באימייל." }, 
                        subject: { type: "STRING", description: "הנושא של אימייל שייווצר מאפס." }, 
                        body: { type: "STRING", description: "התוכן של אימייל שייווצר מאפס." }, 
                        attachmentDescription: { type: "STRING", description: "תיאור של זיכרון (קובץ) שנשמר בעבר ושיצורף לאימייל." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "יוצר פתק חדש מאפס או דורס לחלוטין פתק קיים.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "מוסיף מידע חדש לסוף התוכן של פתק קיים.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "מאחזר את התוכן של פתק שנוצר בעבר לפי שמו.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "אומר למשתמש את השעה והתאריך הנוכחיים.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "מוסיף אירוע או פגישה חדשים ליומן של המשתמש.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "תאריך האירוע חייב להיות בפורמט 'YYYY-MM-DD'. אם המשתמש אומר 'היום' או 'מחר', חשב בעצמך את התאריך המתאים בפורמט זה. אם לא צוין תאריך, השתמש בהיום." }, 
                        time: { type: "STRING", description: "שעת האירוע חייבת להיות בפורמט 24 שעות 'HH:MM' (דוגמה: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "מחפש ומוצא זיכרון (תמונה, קובץ וכו') שהמשתמש שמר בעבר, על סמך התיאור שלו. משמש לפקודות כמו '...הצג', '...מצא', '...הבא'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "מילות מפתח שישמשו למציאת הזיכרון (לדוגמה: 'מכונית אדומה')" } }, required: ["searchText"] } }
            ]
        }
    ],
    da: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Henter de aktuelle vejroplysninger for en bestemt by.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Sender en e-mail NU. For at sende et minde som en vedhæftning, brug parameteren 'attachmentDescription'.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "En beskrivelse af et tidligere gemt minde, der skal vedhæftes e-mailen (f.eks. 'Istanbul og Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Planlægger en e-mail, en note eller en fil til et bestemt tidspunkt i FREMTIDEN. Dette værktøj SKAL vælges, hvis brugeren anvender et tidsudtryk som 'time', 'senere', 'aften'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Tidspunktet for opgaven SKAL være i 24-timers 'HH:MM' format (eksempel: '17:45')." },
                        noteName: { type: "STRING", description: "Navnet på en tidligere gemt note, der skal sendes via e-mail." }, 
                        subject: { type: "STRING", description: "Emnet for en e-mail, der skal oprettes fra bunden." }, 
                        body: { type: "STRING", description: "Indholdet af en e-mail, der skal oprettes fra bunden." }, 
                        attachmentDescription: { type: "STRING", description: "En beskrivelse af et tidligere gemt minde (fil), der skal vedhæftes e-mailen." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Opretter en ny note fra bunden eller overskriver en eksisterende note fuldstændigt.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Tilføjer ny information til slutningen af en eksisterende notes indhold.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Henter indholdet af en tidligere oprettet note ud fra dens navn.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Fortæller brugeren den aktuelle tid og dato.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Tilføjer en ny begivenhed eller aftale til brugerens kalender.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Begivenhedsdatoen SKAL være i 'YYYY-MM-DD' format. Hvis brugeren siger 'i dag' eller 'i morgen', BEREGN den tilsvarende dato i dette format SELV. Hvis ingen dato er angivet, brug dags dato." }, 
                        time: { type: "STRING", description: "Begivenhedstidspunktet SKAL være i 24-timers 'HH:MM' format (eksempel: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Søger efter og finder et minde (billede, fil osv.), som brugeren tidligere har gemt, baseret på dets beskrivelse. Bruges til kommandoer som '... vis', '... find', '... hent'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Nøgleord der skal bruges til at finde mindet (f.eks. 'rød bil')" } }, required: ["searchText"] } }
            ]
        }
    ],
    fi: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Hakee määritetyn kaupungin nykyiset säätiedot.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Lähettää sähköpostin NYT. Lähettääksesi muiston liitteenä, käytä 'attachmentDescription'-parametria.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "Aiemmin tallennetun muiston kuvaus sähköpostin liitteeksi (esim. 'Istanbul ja Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Aikatauluttaa sähköpostin, muistiinpanon tai tiedoston tiettyyn aikaan TULEVAISUUDESSA. Tämä työkalu ON valittava, jos käyttäjä käyttää ajan ilmaisua kuten 'tunti', 'myöhemmin', 'ilta'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Tehtävän ajan TÄYTYY olla 24 tunnin 'HH:MM'-muodossa (esimerkki: '17:45')." },
                        noteName: { type: "STRING", description: "Sähköpostitse lähetettävän, aiemmin tallennetun muistiinpanon nimi." }, 
                        subject: { type: "STRING", description: "Tyhjästä luotavan sähköpostin aihe." }, 
                        body: { type: "STRING", description: "Tyhjästä luotavan sähköpostin sisältö." }, 
                        attachmentDescription: { type: "STRING", description: "Sähköpostiin liitettävän, aiemmin tallennetun muiston (tiedoston) kuvaus." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Luo uuden muistiinpanon tyhjästä tai korvaa olemassa olevan muistiinpanon kokonaan.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Lisää uutta tietoa olemassa olevan muistiinpanon sisällön loppuun.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Hakee aiemmin luodun muistiinpanon sisällön sen nimen perusteella.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Kertoo käyttäjälle nykyisen kellonajan ja päivämäärän.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Lisää uuden tapahtuman tai tapaamisen käyttäjän kalenteriin.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Tapahtuman päivämäärän TÄYTYY olla 'YYYY-MM-DD'-muodossa. Jos käyttäjä sanoo 'tänään' tai 'huomenna', LASKE vastaava päivämäärä tässä muodossa ITSE. Jos päivämäärää ei ole määritetty, käytä tätä päivää." }, 
                        time: { type: "STRING", description: "Tapahtuman ajan TÄYTYY olla 24 tunnin 'HH:MM'-muodossa (esimerkki: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Etsii ja löytää käyttäjän aiemmin tallentaman muiston (kuva, tiedosto jne.) sen kuvauksen perusteella. Käytetään komentoihin kuten '... näytä', '... etsi', '... hae'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Avainsanat muiston löytämiseksi (esim. 'punainen auto')" } }, required: ["searchText"] } }
            ]
        }
    ],
    no: [
        {
            functionDeclarations: [
                { name: "get_current_weather", description: "Henter gjeldende værinformasjon for en angitt by.", parameters: { type: "OBJECT", properties: { location: { type: "STRING" } }, required: ["location"] } },
                { name: "send_email", description: "Sender en e-post NÅ. For å sende et minne som vedlegg, bruk parameteren 'attachmentDescription'.", parameters: { type: "OBJECT", properties: { to: { type: "STRING" }, subject: { type: "STRING" }, body: { type: "STRING" }, attachmentDescription: { type: "STRING", description: "En beskrivelse av et tidligere lagret minne som skal legges ved e-posten (f.eks. 'Istanbul og Galata')." } }, required: ["to", "subject", "body"] } },
                { 
                    name: "schedule_task", 
                    description: "Planlegger en e-post, et notat eller en fil for et bestemt tidspunkt i FREMTIDEN. Dette verktøyet MÅ velges hvis brukeren bruker et tidsuttrykk som 'time', 'senere', 'kveld'.", 
                    parameters: { type: "OBJECT", properties: { 
                        time: { type: "STRING", description: "Tidspunktet for oppgaven MÅ være i 24-timersformatet 'HH:MM' (eksempel: '17:45')." },
                        noteName: { type: "STRING", description: "Navnet på et forhåndslagret notat som skal sendes via e-post." }, 
                        subject: { type: "STRING", description: "Emnet for en e-post som skal opprettes fra bunnen av." }, 
                        body: { type: "STRING", description: "Innholdet i en e-post som skal opprettes fra bunnen av." }, 
                        attachmentDescription: { type: "STRING", description: "Beskrivelsen av et tidligere lagret minne (fil) som skal legges ved e-posten." } 
                    }, required: ["time"] } 
                },
                { name: "create_note", description: "Oppretter et nytt notat fra bunnen av eller overskriver et eksisterende notat fullstendig.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, content: { type: "STRING" } }, required: ["noteName"] } },
                { name: "edit_note", description: "Legger til ny informasjon på slutten av innholdet i et eksisterende notat.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" }, newContent: { type: "STRING" } }, required: ["noteName", "newContent"] } },
                { name: "get_note", description: "Henter innholdet i et tidligere opprettet notat etter navn.", parameters: { type: "OBJECT", properties: { noteName: { type: "STRING" } }, required: ["noteName"] } },
                { name: "get_current_time", description: "Forteller brukeren gjeldende klokkeslett og dato.", parameters: { type: "OBJECT", properties: {} } },
                { 
                    name: "create_calendar_event", 
                    description: "Legger til en ny hendelse eller avtale i brukerens kalender.", 
                    parameters: { type: "OBJECT", properties: { 
                        title: { type: "STRING" }, 
                        date: { type: "STRING", description: "Datoen for hendelsen MÅ være i formatet 'YYYY-MM-DD'. Hvis brukeren sier 'i dag' eller 'i morgen', REGN UT den tilsvarende datoen i dette formatet SELV. Hvis ingen dato er angitt, bruk dagens dato." }, 
                        time: { type: "STRING", description: "Tidspunktet for hendelsen MÅ være i 24-timersformatet 'HH:MM' (eksempel: '14:30')." }, 
                        description: { type: "STRING" } 
                    }, required: ["title", "time"] } 
                },
                { name: "find_memory", description: "Søker etter og finner et minne (bilde, fil, osv.) som brukeren tidligere har lagret, basert på beskrivelsen. Brukes for kommandoer som '... vis', '... finn', '... hent'.", parameters: { type: "OBJECT", properties: { searchText: { type: "STRING", description: "Nøkkelord for å finne minnet (f.eks. 'rød bil')" } }, required: ["searchText"] } }
            ]
        }
    ]
};
// Sunucu yanıtları için çeviriler
const translations = {
  tr: {
    "welcome": "Merhaba! Nasıl yardımcı olabilirim?",
    "weather_error": "için hava durumu bilgisi alınamadı",
    "email_sent": "E-posta başarıyla gönderildi:",
    "email_error": "E-posta gönderilirken hata oluştu:",
    "note_saved": "notu kaydedildi. Yeni içerik:",
    "note_not_found": "adında bir not bulunamadı",
    "note_empty": "(not içeriği boş)",
    "note_db_error": "Not okunurken bir veritabanı hatası oluştu:",
    "current_time": "Şu anki saat",
    "current_date": "tarih",
    "calendar_added": "etkinliği takviminize eklendi.",
    "calendar_error": "Takvim etkinliği oluşturulamadı:",
    "task_scheduled": "Görev başarıyla zamanlandı.",
    "task_reminder": "konulu hatırlatma",
    "memory_saved": "anısı, kullanıcı adresi için veritabanına kaydedildi.",
    "memory_found": "açıklamasıyla anı bulundu.",
    "memory_not_found": "ile eşleşen anı bulunamadı",
    "memory_search_not_found": "'{searchText}' ile eşleşen bir anı bulunamadı.",
    "memory_decrypt_error": "Anı bulundu ancak şifresi çözülemedi.",
    "upload_success": "Anı Başarıyla Şifrelendi ve Kalıcı Olarak Kaydedildi!",
    "invalid_signature": "Geçersiz imza. Kimlik doğrulama başarısız.",
    "missing_info": "Eksik bilgi: Dosya, adres veya imza belirtilmemiş.",
    "server_error": "Bir hata oluştu: Sunucu hatası",
    "task_missing_time": "Görevi zamanlamak için bir saat belirtmelisiniz.",
    "task_invalid_time": "Geçersiz saat formatı. Lütfen 'SA:DK' formatında belirtin.",
    "task_note_subject": "Coopa Not Hatırlatıcısı: {noteName}",
    "task_note_body": "Hatırlamanız gereken notun içeriği aşağıdadır:\n\n\"{noteContent}\"",
    "task_file_subject": "Coopa Dosya Hatırlatıcısı: {attachmentDescription}",
    "task_file_body": "İstenen \"{attachmentDescription}\" anısı e-postaya eklenmiştir.",
    "task_error_insufficient_info": "Zamanlanmış görev için yetersiz bilgi bulundu (not, dosya veya e-posta içeriği eksik).",
    "task_success_message": "'{taskIdentifier}' görevi, {time} için başarıyla zamanlandı.",
    "email_attachment_not_found": "(Not: İstenen \"{attachmentDescription}\" anısı bulunamadı ve bu nedenle e-postaya eklenemedi.)",
    "task_scheduled_successfully": "Bir görev başarıyla zamanlandı",
    "note_retrieved_successfully": "Not içeriği başarıyla alındı",
    "weather_queried_successfully": "hava durumu bilgisi başarıyla sorgulandı",
    "note_created_successfully": "not başarıyla oluşturuldu",
    "note_edited_successfully": "nota yeni içerik eklendi",
    "time_info_provided": "Geçerli tarih ve saat bilgisi kullanıcıya verildi",
    "calendar_event_created": "takvim etkinliği başarıyla oluşturuldu",
    "memory_found_and_displayed": "aramasıyla eşleşen bir anı bulundu ve kullanıcıya gösterildi",
    "email_sent_successfully": "adresine bir e-posta başarıyla gönderildi",
    "missing_user_info": "İstekle birlikte kullanıcı adresi veya imza gönderilmedi",
    "prompt_empty": "Prompt boş olamaz",
    "invalid_ai_response": "Yapay zekadan geçersiz cevap alındı",
    "chatCleared": "Sohbet temizlendi. Yeni bir başlangıç yapabilirsiniz."
  },
  en: {
    "welcome": "Hello! How can I help?",
    "weather_error": "Weather information could not be retrieved for",
    "email_sent": "Email successfully sent:",
    "email_error": "An error occurred while sending the email:",
    "note_saved": "note saved. New content:",
    "note_not_found": "A note named was not found",
    "note_empty": "(note content is empty)",
    "note_db_error": "A database error occurred while reading the note:",
    "current_time": "The current time is",
    "current_date": "date",
    "calendar_added": "event has been added to your calendar.",
    "calendar_error": "Could not create calendar event:",
    "task_scheduled": "Task successfully scheduled.",
    "task_reminder": "reminder with subject",
    "memory_saved": "memory was saved to the database for the user address.",
    "memory_found": "memory was found with the description.",
    "memory_not_found": "memory matching was not found",
    "memory_search_not_found": "A memory matching '{searchText}' was not found.",
    "memory_decrypt_error": "Memory found but could not be decrypted.",
    "upload_success": "Memory Successfully Encrypted and Permanently Saved!",
    "invalid_signature": "Invalid signature. Authentication failed.",
    "missing_info": "Missing info: File, address, or signature not specified.",
    "server_error": "An error occurred: Server error",
    "task_missing_time": "You must specify a time to schedule the task.",
    "task_invalid_time": "Invalid time format. Please specify in 'HH:MM' format.",
    "task_note_subject": "Coopa Note Reminder: {noteName}",
    "task_note_body": "The content of the note you need to remember is below:\n\n\"{noteContent}\"",
    "task_file_subject": "Coopa File Reminder: {attachmentDescription}",
    "task_file_body": "The requested \"{attachmentDescription}\" memory has been attached to the email.",
    "task_error_insufficient_info": "Insufficient info for scheduled task (note, file, or email content is missing).",
    "task_success_message": "Task '{taskIdentifier}' was successfully scheduled for {time}.",
    "email_attachment_not_found": "(Note: The requested \"{attachmentDescription}\" memory was not found and therefore could not be attached to the email.)",
    "task_scheduled_successfully": "A task was successfully scheduled",
    "note_retrieved_successfully": "Note content successfully retrieved",
    "weather_queried_successfully": "weather information successfully queried for",
    "note_created_successfully": "note successfully created",
    "note_edited_successfully": "new content added to note",
    "time_info_provided": "Current date and time information was given to the user",
    "calendar_event_created": "calendar event successfully created",
    "memory_found_and_displayed": "a memory matching the search for was found and shown to the user",
    "email_sent_successfully": "an email was successfully sent to the address",
    "missing_user_info": "User address or signature was not sent with the request",
    "prompt_empty": "Prompt cannot be empty",
    "invalid_ai_response": "Invalid response received from AI",
    "chatCleared": "Chat cleared. You can start a new conversation."
  },
  zh: {
    "welcome": "你好！我能帮什么忙？",
    "weather_error": "无法获取天气信息",
    "email_sent": "邮件发送成功：",
    "email_error": "发送邮件时出错：",
    "note_saved": "笔记已保存。新内容：",
    "note_not_found": "找不到名为的笔记",
    "note_empty": "（笔记内容为空）",
    "note_db_error": "读取笔记时发生数据库错误：",
    "current_time": "当前时间是",
    "current_date": "日期",
    "calendar_added": "事件已添加到您的日历。",
    "calendar_error": "无法创建日历事件：",
    "task_scheduled": "任务已成功安排。",
    "task_reminder": "主题为的提醒",
    "memory_saved": "记忆已为用户地址保存到数据库。",
    "memory_found": "已找到描述为的记忆。",
    "memory_not_found": "未找到匹配的记忆",
    "memory_search_not_found": "未找到与“{searchText}”匹配的记忆。",
    "memory_decrypt_error": "找到记忆但无法解密。",
    "upload_success": "记忆已成功加密并永久保存！",
    "invalid_signature": "签名无效。身份验证失败。",
    "missing_info": "信息缺失：未指定文件、地址或签名。",
    "server_error": "发生错误：服务器错误",
    "task_missing_time": "您必须指定时间来安排任务。",
    "task_invalid_time": "时间格式无效。请使用“HH:MM”格式。",
    "task_note_subject": "Coopa 笔记提醒：{noteName}",
    "task_note_body": "您需要记住的笔记内容如下：\n\n“{noteContent}”",
    "task_file_subject": "Coopa 文件提醒：{attachmentDescription}",
    "task_file_body": "请求的“{attachmentDescription}”记忆已附加到邮件中。",
    "task_error_insufficient_info": "计划任务信息不足（缺少笔记、文件或邮件内容）。",
    "task_success_message": "任务“{taskIdentifier}”已成功安排在 {time}。",
    "email_attachment_not_found": "（注意：请求的“{attachmentDescription}”记忆未找到，因此无法附加到邮件中。）",
    "task_scheduled_successfully": "任务已成功安排",
    "note_retrieved_successfully": "笔记内容已成功检索",
    "weather_queried_successfully": "天气信息已成功查询",
    "note_created_successfully": "笔记已成功创建",
    "note_edited_successfully": "新内容已添加到笔记",
    "time_info_provided": "已向用户提供当前日期和时间信息",
    "calendar_event_created": "日历事件已成功创建",
    "memory_found_and_displayed": "找到与搜索匹配的记忆并向用户显示",
    "email_sent_successfully": "邮件已成功发送至地址",
    "missing_user_info": "请求中未发送用户地址或签名",
    "prompt_empty": "提示不能为空",
    "invalid_ai_response": "从 AI 收到无效响应",
    "chatCleared": "聊天已清除。您可以开始新的对话。"
  },
  hi: {
    "welcome": "नमस्ते! मैं कैसे मदद कर सकता हूँ?",
    "weather_error": "के लिए मौसम की जानकारी प्राप्त नहीं की जा सकी",
    "email_sent": "ईमेल सफलतापूर्वक भेजा गया:",
    "email_error": "ईमेल भेजते समय एक त्रुटि हुई:",
    "note_saved": "नोट सहेजा गया। नई सामग्री:",
    "note_not_found": "नाम का कोई नोट नहीं मिला",
    "note_empty": "(नोट की सामग्री खाली है)",
    "note_db_error": "नोट पढ़ते समय एक डेटाबेस त्रुटि हुई:",
    "current_time": "वर्तमान समय है",
    "current_date": "तारीख",
    "calendar_added": "ईवेंट आपके कैलेंडर में जोड़ा गया है।",
    "calendar_error": "कैलेंडर ईवेंट नहीं बनाया जा सका:",
    "task_scheduled": "कार्य सफलतापूर्वक निर्धारित किया गया।",
    "task_reminder": "विषय के साथ अनुस्मारक",
    "memory_saved": "उपयोगकर्ता पते के लिए मेमोरी डेटाबेस में सहेजी गई।",
    "memory_found": "विवरण के साथ मेमोरी मिली।",
    "memory_not_found": "से मेल खाने वाली कोई मेमोरी नहीं मिली",
    "memory_search_not_found": "'{searchText}' से मेल खाने वाली कोई मेमोरी नहीं मिली।",
    "memory_decrypt_error": "मेमोरी मिली लेकिन डिक्रिप्ट नहीं की जा सकी।",
    "upload_success": "मेमोरी सफलतापूर्वक एन्क्रिप्ट और स्थायी रूप से सहेजी गई!",
    "invalid_signature": "अमान्य हस्ताक्षर। प्रमाणीकरण विफल।",
    "missing_info": "गुम जानकारी: फ़ाइल, पता, या हस्ताक्षर निर्दिष्ट नहीं है।",
    "server_error": "एक त्रुटि हुई: सर्वर त्रुटि",
    "task_missing_time": "कार्य को निर्धारित करने के लिए आपको एक समय निर्दिष्ट करना होगा।",
    "task_invalid_time": "अमान्य समय प्रारूप। कृपया 'HH:MM' प्रारूप में निर्दिष्ट करें।",
    "task_note_subject": "कूपा नोट अनुस्मारक: {noteName}",
    "task_note_body": "आपको याद रखने वाले नोट की सामग्री नीचे दी गई है:\n\n\"{noteContent}\"",
    "task_file_subject": "कूपा फ़ाइल अनुस्मारक: {attachmentDescription}",
    "task_file_body": "अनुरोधित \"{attachmentDescription}\" मेमोरी ईमेल से संलग्न की गई है।",
    "task_error_insufficient_info": "अनुसूचित कार्य के लिए अपर्याप्त जानकारी (नोट, फ़ाइल, या ईमेल सामग्री गायब है)।",
    "task_success_message": "कार्य '{taskIdentifier}' सफलतापूर्वक {time} के लिए निर्धारित किया गया।",
    "email_attachment_not_found": "(नोट: अनुरोधित \"{attachmentDescription}\" मेमोरी नहीं मिली और इसलिए ईमेल से संलग्न नहीं की जा सकी।)",
    "task_scheduled_successfully": "एक कार्य सफलतापूर्वक निर्धारित किया गया",
    "note_retrieved_successfully": "नोट की सामग्री सफलतापूर्वक प्राप्त की गई",
    "weather_queried_successfully": "के लिए मौसम की जानकारी सफलतापूर्वक पूछी गई",
    "note_created_successfully": "नोट सफलतापूर्वक बनाया गया",
    "note_edited_successfully": "नोट में नई सामग्री जोड़ी गई",
    "time_info_provided": "उपयोगकर्ता को वर्तमान तारीख और समय की जानकारी दी गई",
    "calendar_event_created": "कैलेंडर ईवेंट सफलतापूर्वक बनाया गया",
    "memory_found_and_displayed": "के लिए खोज से मेल खाने वाली एक मेमोरी मिली और उपयोगकर्ता को दिखाई गई",
    "email_sent_successfully": "पते पर एक ईमेल सफलतापूर्वक भेजा गया",
    "missing_user_info": "अनुरोध के साथ उपयोगकर्ता का पता या हस्ताक्षर नहीं भेजा गया",
    "prompt_empty": "प्रॉम्प्ट खाली नहीं हो सकता",
    "invalid_ai_response": "AI से अमान्य प्रतिक्रिया मिली",
    "chatCleared": "चैट साफ़ हो गई है। आप एक नई बातचीत शुरू कर सकते हैं।"
  },
  es: {
    "welcome": "¡Hola! ¿Cómo puedo ayudar?",
    "weather_error": "No se pudo obtener la información del tiempo para",
    "email_sent": "Correo electrónico enviado con éxito:",
    "email_error": "Ocurrió un error al enviar el correo electrónico:",
    "note_saved": "nota guardada. Nuevo contenido:",
    "note_not_found": "No se encontró una nota llamada",
    "note_empty": "(contenido de la nota vacío)",
    "note_db_error": "Ocurrió un error en la base de datos al leer la nota:",
    "current_time": "La hora actual es",
    "current_date": "fecha",
    "calendar_added": "evento ha sido añadido a tu calendario.",
    "calendar_error": "No se pudo crear el evento del calendario:",
    "task_scheduled": "Tarea programada con éxito.",
    "task_reminder": "recordatorio con asunto",
    "memory_saved": "memoria fue guardada en la base de datos para la dirección del usuario.",
    "memory_found": "memoria fue encontrada con la descripción.",
    "memory_not_found": "no se encontró memoria que coincida con",
    "memory_search_not_found": "No se encontró ninguna memoria que coincida con '{searchText}'.",
    "memory_decrypt_error": "Memoria encontrada pero no se pudo descifrar.",
    "upload_success": "¡Memoria Cifrada y Guardada Permanentemente con Éxito!",
    "invalid_signature": "Firma inválida. Autenticación fallida.",
    "missing_info": "Información faltante: Archivo, dirección o firma no especificados.",
    "server_error": "Ocurrió un error: Error del servidor",
    "task_missing_time": "Debes especificar una hora para programar la tarea.",
    "task_invalid_time": "Formato de hora inválido. Por favor, especifique en formato 'HH:MM'.",
    "task_note_subject": "Recordatorio de Nota de Coopa: {noteName}",
    "task_note_body": "El contenido de la nota que necesitas recordar está a continuación:\n\n\"{noteContent}\"",
    "task_file_subject": "Recordatorio de Archivo de Coopa: {attachmentDescription}",
    "task_file_body": "La memoria \"{attachmentDescription}\" solicitada ha sido adjuntada al correo electrónico.",
    "task_error_insufficient_info": "Información insuficiente para la tarea programada (falta el contenido de la nota, archivo o correo electrónico).",
    "task_success_message": "La tarea '{taskIdentifier}' fue programada con éxito para las {time}.",
    "email_attachment_not_found": "(Nota: La memoria \"{attachmentDescription}\" solicitada no se encontró y por lo tanto no se pudo adjuntar al correo electrónico.)",
    "task_scheduled_successfully": "Una tarea fue programada con éxito",
    "note_retrieved_successfully": "Contenido de la nota recuperado con éxito",
    "weather_queried_successfully": "información del tiempo consultada con éxito para",
    "note_created_successfully": "nota creada con éxito",
    "note_edited_successfully": "nuevo contenido añadido a la nota",
    "time_info_provided": "Se proporcionó al usuario la información de fecha y hora actuales",
    "calendar_event_created": "evento del calendario creado con éxito",
    "memory_found_and_displayed": "se encontró una memoria que coincide con la búsqueda de y se mostró al usuario",
    "email_sent_successfully": "se envió un correo electrónico con éxito a la dirección",
    "missing_user_info": "La dirección del usuario o la firma no se enviaron con la solicitud",
    "prompt_empty": "El prompt no puede estar vacío",
    "invalid_ai_response": "Se recibió una respuesta inválida de la IA",
    "chatCleared": "Chat limpiado. Puede iniciar una nueva conversación."
  },
  fr: {
    "welcome": "Bonjour ! Comment puis-je aider ?",
    "weather_error": "Impossible de récupérer les informations météo pour",
    "email_sent": "E-mail envoyé avec succès :",
    "email_error": "Une erreur est survenue lors de l'envoi de l'e-mail :",
    "note_saved": "note enregistrée. Nouveau contenu :",
    "note_not_found": "Aucune note nommée n'a été trouvée",
    "note_empty": "(contenu de la note vide)",
    "note_db_error": "Une erreur de base de données est survenue lors de la lecture de la note :",
    "current_time": "L'heure actuelle est",
    "current_date": "date",
    "calendar_added": "l'événement a été ajouté à votre calendrier.",
    "calendar_error": "Impossible de créer l'événement du calendrier :",
    "task_scheduled": "Tâche planifiée avec succès.",
    "task_reminder": "rappel avec le sujet",
    "memory_saved": "la mémoire a été enregistrée dans la base de données pour l'adresse de l'utilisateur.",
    "memory_found": "la mémoire a été trouvée avec la description.",
    "memory_not_found": "aucune mémoire correspondante n'a été trouvée",
    "memory_search_not_found": "Aucune mémoire correspondant à '{searchText}' n'a été trouvée.",
    "memory_decrypt_error": "Mémoire trouvée mais n'a pas pu être déchiffrée.",
    "upload_success": "Mémoire Chiffrée et Enregistrée de Manière Permanente avec Succès !",
    "invalid_signature": "Signature invalide. Échec de l'authentification.",
    "missing_info": "Informations manquantes : Fichier, adresse ou signature non spécifiés.",
    "server_error": "Une erreur est survenue : Erreur de serveur",
    "task_missing_time": "Vous devez spécifier une heure pour planifier la tâche.",
    "task_invalid_time": "Format d'heure invalide. Veuillez spécifier au format 'HH:MM'.",
    "task_note_subject": "Rappel de Note Coopa : {noteName}",
    "task_note_body": "Le contenu de la note que vous devez vous rappeler se trouve ci-dessous :\n\n\"{noteContent}\"",
    "task_file_subject": "Rappel de Fichier Coopa : {attachmentDescription}",
    "task_file_body": "La mémoire \"{attachmentDescription}\" demandée a été jointe à l'e-mail.",
    "task_error_insufficient_info": "Informations insuffisantes pour la tâche planifiée (contenu de la note, du fichier ou de l'e-mail manquant).",
    "task_success_message": "La tâche '{taskIdentifier}' a été planifiée avec succès pour {time}.",
    "email_attachment_not_found": "(Note : La mémoire \"{attachmentDescription}\" demandée n'a pas été trouvée et n'a donc pas pu être jointe à l'e-mail.)",
    "task_scheduled_successfully": "Une tâche a été planifiée avec succès",
    "note_retrieved_successfully": "Contenu de la note récupéré avec succès",
    "weather_queried_successfully": "informations météo interrogées avec succès pour",
    "note_created_successfully": "note créée avec succès",
    "note_edited_successfully": "nouveau contenu ajouté à la note",
    "time_info_provided": "Les informations de date et d'heure actuelles ont été données à l'utilisateur",
    "calendar_event_created": "événement du calendrier créé avec succès",
    "memory_found_and_displayed": "une mémoire correspondant à la recherche de a été trouvée et montrée à l'utilisateur",
    "email_sent_successfully": "un e-mail a été envoyé avec succès à l'adresse",
    "missing_user_info": "L'adresse de l'utilisateur ou la signature n'a pas été envoyée avec la demande",
    "prompt_empty": "Le prompt ne peut pas être vide",
    "invalid_ai_response": "Réponse invalide reçue de l'IA",
    "chatCleared": "Discussion effacée. Vous pouvez commencer une nouvelle conversation."
  },
  ar: {
    "welcome": "مرحبًا! كيف يمكنني المساعدة؟",
    "weather_error": "لم يتمكن من استرداد معلومات الطقس لـ",
    "email_sent": "تم إرسال البريد الإلكتروني بنجاح:",
    "email_error": "حدث خطأ أثناء إرسال البريد الإلكتروني:",
    "note_saved": "تم حفظ الملاحظة. المحتوى الجديد:",
    "note_not_found": "لم يتم العثور على ملاحظة بالاسم",
    "note_empty": "(محتوى الملاحظة فارغ)",
    "note_db_error": "حدث خطأ في قاعدة البيانات أثناء قراءة الملاحظة:",
    "current_time": "الوقت الحالي هو",
    "current_date": "التاريخ",
    "calendar_added": "تمت إضافة الحدث إلى تقويمك.",
    "calendar_error": "تعذر إنشاء حدث التقويم:",
    "task_scheduled": "تمت جدولة المهمة بنجاح.",
    "task_reminder": "تذكير بموضوع",
    "memory_saved": "تم حفظ الذاكرة في قاعدة البيانات لعنوان المستخدم.",
    "memory_found": "تم العثور على الذاكرة مع الوصف.",
    "memory_not_found": "لم يتم العثور على ذاكرة مطابقة لـ",
    "memory_search_not_found": "لم يتم العثور على ذاكرة تطابق '{searchText}'.",
    "memory_decrypt_error": "تم العثور على الذاكرة ولكن لا يمكن فك تشفيرها.",
    "upload_success": "تم تشفير الذاكرة بنجاح وحفظها بشكل دائم!",
    "invalid_signature": "توقيع غير صالح. فشل المصادقة.",
    "missing_info": "معلومات ناقصة: لم يتم تحديد الملف أو العنوان أو التوقيع.",
    "server_error": "حدث خطأ: خطأ في الخادم",
    "task_missing_time": "يجب تحديد وقت لجدولة المهمة.",
    "task_invalid_time": "تنسيق الوقت غير صالح. يرجى التحديد بتنسيق 'HH:MM'.",
    "task_note_subject": "تذكير ملاحظة Coopa: {noteName}",
    "task_note_body": "محتوى الملاحظة التي تحتاج إلى تذكرها أدناه:\n\n\"{noteContent}\"",
    "task_file_subject": "تذكير ملف Coopa: {attachmentDescription}",
    "task_file_body": "تم إرفاق الذاكرة المطلوبة \"{attachmentDescription}\" بالبريد الإلكتروني.",
    "task_error_insufficient_info": "معلومات غير كافية للمهمة المجدولة (الملاحظة أو الملف أو محتوى البريد الإلكتروني مفقود).",
    "task_success_message": "تمت جدولة المهمة '{taskIdentifier}' بنجاح في {time}.",
    "email_attachment_not_found": "(ملاحظة: لم يتم العثور على الذاكرة المطلوبة \"{attachmentDescription}\" وبالتالي لا يمكن إرفاقها بالبريد الإلكتروني.)",
    "task_scheduled_successfully": "تمت جدولة مهمة بنجاح",
    "note_retrieved_successfully": "تم استرداد محتوى الملاحظة بنجاح",
    "weather_queried_successfully": "تم الاستعلام عن معلومات الطقس بنجاح لـ",
    "note_created_successfully": "تم إنشاء الملاحظة بنجاح",
    "note_edited_successfully": "تمت إضافة محتوى جديد إلى الملاحظة",
    "time_info_provided": "تم إعطاء معلومات التاريخ والوقت الحالية للمستخدم",
    "calendar_event_created": "تم إنشاء حدث التقويم بنجاح",
    "memory_found_and_displayed": "تم العثور على ذاكرة تطابق البحث عن وعرضها للمستخدم",
    "email_sent_successfully": "تم إرسال بريد إلكتروني بنجاح إلى العنوان",
    "missing_user_info": "لم يتم إرسال عنوان المستخدم أو التوقيع مع الطلب",
    "prompt_empty": "لا يمكن أن يكون Prompt فارغًا",
    "invalid_ai_response": "تم استلام رد غير صالح من الذكاء الاصطناعي",
    "chatCleared": "تم مسح المحادثة. يمكنك بدء محادثة جديدة."
  },
  bn: {
    "welcome": "স্বাগতম! আমি কিভাবে সাহায্য করতে পারি?",
    "weather_error": "এর জন্য আবহাওয়ার তথ্য পুনরুদ্ধার করা যায়নি",
    "email_sent": "ইমেল সফলভাবে পাঠানো হয়েছে:",
    "email_error": "ইমেল পাঠানোর সময় একটি ত্রুটি ঘটেছে:",
    "note_saved": "নোট সংরক্ষিত হয়েছে। নতুন বিষয়বস্তু:",
    "note_not_found": "নামের কোনো নোট পাওয়া যায়নি",
    "note_empty": "(নোটের বিষয়বস্তু খালি)",
    "note_db_error": "নোট পড়ার সময় একটি ডাটাবেস ত্রুটি ঘটেছে:",
    "current_time": "বর্তমান সময় হলো",
    "current_date": "তারিখ",
    "calendar_added": "ইভেন্টটি আপনার ক্যালেন্ডারে যোগ করা হয়েছে।",
    "calendar_error": "ক্যালেন্ডার ইভেন্ট তৈরি করা যায়নি:",
    "task_scheduled": "কাজ সফলভাবে নির্ধারিত হয়েছে।",
    "task_reminder": "বিষয় সহ অনুস্মারক",
    "memory_saved": "ব্যবহারকারীর ঠিকানার জন্য মেমরি ডাটাবেসে সংরক্ষিত হয়েছে।",
    "memory_found": "বর্ণনা সহ মেমরি পাওয়া গেছে।",
    "memory_not_found": "এর সাথে মিলে যাওয়া কোনো মেমরি পাওয়া যায়নি",
    "memory_search_not_found": "'{searchText}' এর সাথে মিলে যাওয়া কোনো মেমরি পাওয়া যায়নি।",
    "memory_decrypt_error": "মেমরি পাওয়া গেছে কিন্তু ডিক্রিপ্ট করা যায়নি।",
    "upload_success": "মেমরি সফলভাবে এনক্রিপ্ট এবং স্থায়ীভাবে সংরক্ষিত হয়েছে!",
    "invalid_signature": "অবৈধ স্বাক্ষর। প্রমাণীকরণ ব্যর্থ হয়েছে।",
    "missing_info": "তথ্য অনুপস্থিত: ফাইল, ঠিকানা বা স্বাক্ষর নির্দিষ্ট করা হয়নি।",
    "server_error": "একটি ত্রুটি ঘটেছে: সার্ভার ত্রুটি",
    "task_missing_time": "কাজ নির্ধারণের জন্য আপনাকে একটি সময় নির্দিষ্ট করতে হবে।",
    "task_invalid_time": "অবৈধ সময় বিন্যাস। অনুগ্রহ করে 'HH:MM' বিন্যাসে নির্দিষ্ট করুন।",
    "task_note_subject": "কুপা নোট অনুস্মারক: {noteName}",
    "task_note_body": "আপনার মনে রাখার জন্য নোটের বিষয়বস্তু নিচে দেওয়া হলো:\n\n\"{noteContent}\"",
    "task_file_subject": "কুপা ফাইল অনুস্মারক: {attachmentDescription}",
    "task_file_body": "অনুরোধ করা \"{attachmentDescription}\" মেমরিটি ইমেলে সংযুক্ত করা হয়েছে।",
    "task_error_insufficient_info": "নির্ধারিত কাজের জন্য অপর্যাপ্ত তথ্য (নোট, ফাইল বা ইমেল বিষয়বস্তু অনুপস্থিত)।",
    "task_success_message": "কাজ '{taskIdentifier}' সফলভাবে {time} এর জন্য নির্ধারিত হয়েছে।",
    "email_attachment_not_found": "(দ্রষ্টব্য: অনুরোধ করা \"{attachmentDescription}\" মেমরিটি পাওয়া যায়নি এবং তাই ইমেলে সংযুক্ত করা যায়নি।)",
    "task_scheduled_successfully": "একটি কাজ সফলভাবে নির্ধারিত হয়েছে",
    "note_retrieved_successfully": "নোটের বিষয়বস্তু সফলভাবে পুনরুদ্ধার করা হয়েছে",
    "weather_queried_successfully": "এর জন্য আবহাওয়ার তথ্য সফলভাবে জিজ্ঞাসা করা হয়েছে",
    "note_created_successfully": "নোট সফলভাবে তৈরি হয়েছে",
    "note_edited_successfully": "নোটে নতুন বিষয়বস্তু যোগ করা হয়েছে",
    "time_info_provided": "ব্যবহারকারীকে বর্তমান তারিখ এবং সময়ের তথ্য দেওয়া হয়েছে",
    "calendar_event_created": "ক্যালেন্ডার ইভেন্ট সফলভাবে তৈরি হয়েছে",
    "memory_found_and_displayed": "এর অনুসন্ধানের সাথে মিলে যাওয়া একটি মেমরি পাওয়া গেছে এবং ব্যবহারকারীকে দেখানো হয়েছে",
    "email_sent_successfully": "ঠিকানায় একটি ইমেল সফলভাবে পাঠানো হয়েছে",
    "missing_user_info": "অনুরোধের সাথে ব্যবহারকারীর ঠিকানা বা স্বাক্ষর পাঠানো হয়নি",
    "prompt_empty": "প্রম্পট খালি হতে পারে না",
    "invalid_ai_response": "AI থেকে অবৈধ প্রতিক্রিয়া প্রাপ্ত হয়েছে",
    "chatCleared": "চ্যাট পরিষ্কার করা হয়েছে। আপনি একটি নতুন কথোপকথন শুরু করতে পারেন।"
  },
  ru: {
    "welcome": "Здравствуйте! Чем могу помочь?",
    "weather_error": "Не удалось получить информацию о погоде для",
    "email_sent": "Письмо успешно отправлено:",
    "email_error": "Произошла ошибка при отправке письма:",
    "note_saved": "заметка сохранена. Новое содержание:",
    "note_not_found": "Заметка с названием не найдена",
    "note_empty": "(содержание заметки пусто)",
    "note_db_error": "Произошла ошибка базы данных при чтении заметки:",
    "current_time": "Текущее время",
    "current_date": "дата",
    "calendar_added": "событие добавлено в ваш календарь.",
    "calendar_error": "Не удалось создать событие в календаре:",
    "task_scheduled": "Задача успешно запланирована.",
    "task_reminder": "напоминание с темой",
    "memory_saved": "воспоминание сохранено в базе данных для адреса пользователя.",
    "memory_found": "воспоминание найдено с описанием.",
    "memory_not_found": "совпадающее воспоминание не найдено",
    "memory_search_not_found": "Не найдено воспоминание, соответствующее '{searchText}'.",
    "memory_decrypt_error": "Воспоминание найдено, но не может быть расшифровано.",
    "upload_success": "Воспоминание Успешно Зашифровано и Постоянно Сохранено!",
    "invalid_signature": "Неверная подпись. Сбой аутентификации.",
    "missing_info": "Отсутствует информация: Файл, адрес или подпись не указаны.",
    "server_error": "Произошла ошибка: Ошибка сервера",
    "task_missing_time": "Вы должны указать время для планирования задачи.",
    "task_invalid_time": "Неверный формат времени. Укажите в формате 'ЧЧ:ММ'.",
    "task_note_subject": "Напоминание о заметке Coopa: {noteName}",
    "task_note_body": "Содержание заметки, которое вам нужно запомнить, приведено ниже:\n\n«{noteContent}»",
    "task_file_subject": "Напоминание о файле Coopa: {attachmentDescription}",
    "task_file_body": "Запрошенное воспоминание «{attachmentDescription}» было прикреплено к письму.",
    "task_error_insufficient_info": "Недостаточно информации для запланированной задачи (отсутствует заметка, файл или содержание письма).",
    "task_success_message": "Задача «{taskIdentifier}» успешно запланирована на {time}.",
    "email_attachment_not_found": "(Примечание: Запрошенное воспоминание «{attachmentDescription}» не найдено и поэтому не могло быть прикреплено к письму.)",
    "task_scheduled_successfully": "Задача была успешно запланирована",
    "note_retrieved_successfully": "Содержание заметки успешно извлечено",
    "weather_queried_successfully": "информация о погоде успешно запрошена для",
    "note_created_successfully": "заметка успешно создана",
    "note_edited_successfully": "новое содержание добавлено в заметку",
    "time_info_provided": "Пользователю была предоставлена текущая информация о дате и времени",
    "calendar_event_created": "событие календаря успешно создано",
    "memory_found_and_displayed": "воспоминание, соответствующее поиску, было найдено и показано пользователю",
    "email_sent_successfully": "письмо было успешно отправлено на адрес",
    "missing_user_info": "Адрес пользователя или подпись не были отправлены с запросом",
    "prompt_empty": "Prompt не может быть пустым",
    "invalid_ai_response": "Получен неверный ответ от ИИ",
    "chatCleared": "Чат очищен. Вы можете начать новый разговор."
  },
  pt: {
    "welcome": "Olá! Como posso ajudar?",
    "weather_error": "Não foi possível obter as informações meteorológicas para",
    "email_sent": "E-mail enviado com sucesso:",
    "email_error": "Ocorreu um erro ao enviar o e-mail:",
    "note_saved": "nota salva. Novo conteúdo:",
    "note_not_found": "Nenhuma nota com o nome foi encontrada",
    "note_empty": "(o conteúdo da nota está vazio)",
    "note_db_error": "Ocorreu um erro de banco de dados ao ler a nota:",
    "current_time": "A hora atual é",
    "current_date": "data",
    "calendar_added": "evento foi adicionado ao seu calendário.",
    "calendar_error": "Não foi possível criar o evento do calendário:",
    "task_scheduled": "Tarefa agendada com sucesso.",
    "task_reminder": "lembrete com o assunto",
    "memory_saved": "memória foi salva no banco de dados para o endereço do usuário.",
    "memory_found": "memória foi encontrada com a descrição.",
    "memory_not_found": "nenhuma memória correspondente a foi encontrada",
    "memory_search_not_found": "Nenhuma memória correspondente a '{searchText}' foi encontrada.",
    "memory_decrypt_error": "Memória encontrada, mas não pôde ser descriptografada.",
    "upload_success": "Memória Criptografada e Salva Permanentemente com Sucesso!",
    "invalid_signature": "Assinatura inválida. Falha na autenticação.",
    "missing_info": "Informações ausentes: Arquivo, endereço ou assinatura não especificados.",
    "server_error": "Ocorreu um erro: Erro do servidor",
    "task_missing_time": "Você deve especificar um horário para agendar a tarefa.",
    "task_invalid_time": "Formato de hora inválido. Especifique no formato 'HH:MM'.",
    "task_note_subject": "Lembrete de Nota Coopa: {noteName}",
    "task_note_body": "O conteúdo da nota que você precisa lembrar está abaixo:\n\n\"{noteContent}\"",
    "task_file_subject": "Lembrete de Arquivo Coopa: {attachmentDescription}",
    "task_file_body": "A memória \"{attachmentDescription}\" solicitada foi anexada ao e-mail.",
    "task_error_insufficient_info": "Informações insuficientes para a tarefa agendada (nota, arquivo ou conteúdo do e-mail ausente).",
    "task_success_message": "A tarefa '{taskIdentifier}' foi agendada com sucesso para {time}.",
    "email_attachment_not_found": "(Nota: A memória \"{attachmentDescription}\" solicitada não foi encontrada e, portanto, não pôde ser anexada ao e-mail.)",
    "task_scheduled_successfully": "Uma tarefa foi agendada com sucesso",
    "note_retrieved_successfully": "Conteúdo da nota recuperado com sucesso",
    "weather_queried_successfully": "informações meteorológicas consultadas com sucesso para",
    "note_created_successfully": "nota criada com sucesso",
    "note_edited_successfully": "novo conteúdo adicionado à nota",
    "time_info_provided": "As informações de data e hora atuais foram fornecidas ao usuário",
    "calendar_event_created": "evento do calendário criado com sucesso",
    "memory_found_and_displayed": "uma memória correspondente à pesquisa por foi encontrada e exibida ao usuário",
    "email_sent_successfully": "um e-mail foi enviado com sucesso para o endereço",
    "missing_user_info": "Endereço do usuário ou assinatura não foi enviado com a solicitação",
    "prompt_empty": "O prompt não pode estar vazio",
    "invalid_ai_response": "Resposta inválida recebida da IA",
    "chatCleared": "Conversa limpa. Você pode começar uma nova conversa."
  },
  ur: {
    "welcome": "خوش آمدید! میں کیسے مدد کر سکتا ہوں؟",
    "weather_error": "کے لیے موسم کی معلومات حاصل نہیں کی جا سکیں۔",
    "email_sent": "ای میل کامیابی سے بھیج دی گئی:",
    "email_error": "ای میل بھیجتے وقت ایک خرابی پیش آئی:",
    "note_saved": "نوٹ محفوظ ہوگیا۔ نیا مواد:",
    "note_not_found": "نام کا کوئی نوٹ نہیں ملا",
    "note_empty": "(نوٹ کا مواد خالی ہے)",
    "note_db_error": "نوٹ پڑھتے وقت ڈیٹا بیس میں خرابی پیش آئی:",
    "current_time": "موجودہ وقت ہے",
    "current_date": "تاریخ",
    "calendar_added": "ایونٹ آپ کے کیلنڈر میں شامل کر دیا گیا ہے۔",
    "calendar_error": "کیلنڈر ایونٹ نہیں بنایا جا سکا:",
    "task_scheduled": "کام کامیابی سے شیڈول ہو گیا۔",
    "task_reminder": "موضوع کے ساتھ یاد دہانی",
    "memory_saved": "میموری صارف کے پتے کے لیے ڈیٹا بیس میں محفوظ ہوگئی۔",
    "memory_found": "تفصیل کے ساتھ میموری مل گئی۔",
    "memory_not_found": "سے مماثل کوئی میموری نہیں ملی",
    "memory_search_not_found": "'{searchText}' سے مماثل کوئی میموری نہیں ملی۔",
    "memory_decrypt_error": "میموری مل گئی لیکن اسے ڈکرپٹ نہیں کیا جا سکا۔",
    "upload_success": "میموری کامیابی سے انکرپٹ اور مستقل طور پر محفوظ ہوگئی!",
    "invalid_signature": "غلط دستخط۔ تصدیق ناکام ہوگئی۔",
    "missing_info": "گمشدہ معلومات: فائل، پتہ، یا دستخط کی وضاحت نہیں کی گئی۔",
    "server_error": "ایک خرابی پیش آئی: سرور کی خرابی",
    "task_missing_time": "کام کو شیڈول کرنے کے لیے آپ کو ایک وقت بتانا ہوگا۔",
    "task_invalid_time": "غلط وقت کی شکل۔ براہ کرم 'HH:MM' شکل میں بتائیں۔",
    "task_note_subject": "کوپا نوٹ یاد دہانی: {noteName}",
    "task_note_body": "آپ کو یاد رکھنے والے نوٹ کا مواد نیچے دیا گیا ہے:\n\n\"{noteContent}\"",
    "task_file_subject": "کوپا فائل یاد دہانی: {attachmentDescription}",
    "task_file_body": "درخواست کردہ \"{attachmentDescription}\" میموری ای میل کے ساتھ منسلک کر دی گئی ہے۔",
    "task_error_insufficient_info": "شیڈول کردہ کام کے لیے ناکافی معلومات (نوٹ، فائل، یا ای میل کا مواد غائب ہے)۔",
    "task_success_message": "کام '{taskIdentifier}' کامیابی سے {time} کے لیے شیڈول ہو گیا۔",
    "email_attachment_not_found": "(نوٹ: درخواست کردہ \"{attachmentDescription}\" میموری نہیں ملی اور اس لیے اسے ای میل کے ساتھ منسلک نہیں کیا جا سکا۔)",
    "task_scheduled_successfully": "ایک کام کامیابی سے شیڈول ہو گیا",
    "note_retrieved_successfully": "نوٹ کا مواد کامیابی سے حاصل کیا گیا",
    "weather_queried_successfully": "کے لیے موسم کی معلومات کامیابی سے پوچھی گئیں",
    "note_created_successfully": "نوٹ کامیابی سے بنایا گیا",
    "note_edited_successfully": "نوٹ میں نیا مواد شامل کیا گیا",
    "time_info_provided": "صارف کو موجودہ تاریخ اور وقت کی معلومات دی گئیں",
    "calendar_event_created": "کیلنڈر ایونٹ کامیابی سے بنایا گیا",
    "memory_found_and_displayed": "تلاش سے مماثل ایک میموری ملی اور صارف کو دکھائی گئی",
    "email_sent_successfully": "پتے پر ایک ای میل کامیابی سے بھیجی گئی",
    "missing_user_info": "درخواست کے ساتھ صارف کا پتہ یا دستخط نہیں بھیجا گیا",
    "prompt_empty": "پرامپٹ خالی نہیں ہو سکتا",
    "invalid_ai_response": "AI سے غلط جواب موصول ہوا",
    "chatCleared": "چیٹ صاف ہوگئی ہے۔ آپ ایک نئی گفتگو شروع کر سکتے ہیں۔"
  },
  ms: {
    "welcome": "Helo! Bagaimana saya boleh bantu?",
    "weather_error": "Maklumat cuaca tidak dapat diambil untuk",
    "email_sent": "E-mel berjaya dihantar:",
    "email_error": "Ralat berlaku semasa menghantar e-mel:",
    "note_saved": "nota disimpan. Kandungan baharu:",
    "note_not_found": "Nota bernama tidak ditemui",
    "note_empty": "(kandungan nota kosong)",
    "note_db_error": "Ralat pangkalan data berlaku semasa membaca nota:",
    "current_time": "Masa sekarang ialah",
    "current_date": "tarikh",
    "calendar_added": "acara telah ditambahkan pada kalendar anda.",
    "calendar_error": "Tidak dapat mencipta acara kalendar:",
    "task_scheduled": "Tugas berjaya dijadualkan.",
    "task_reminder": "peringatan dengan subjek",
    "memory_saved": "memori disimpan ke pangkalan data untuk alamat pengguna.",
    "memory_found": "memori ditemui dengan penerangan.",
    "memory_not_found": "tiada memori yang sepadan ditemui",
    "memory_search_not_found": "Tiada memori yang sepadan dengan '{searchText}' ditemui.",
    "memory_decrypt_error": "Memori ditemui tetapi tidak dapat dinyahsulit.",
    "upload_success": "Memori Berjaya Disulitkan dan Disimpan Secara Kekal!",
    "invalid_signature": "Tandatangan tidak sah. Pengesahan gagal.",
    "missing_info": "Maklumat hilang: Fail, alamat, atau tandatangan tidak dinyatakan.",
    "server_error": "Ralat berlaku: Ralat pelayan",
    "task_missing_time": "Anda mesti menyatakan masa untuk menjadualkan tugas.",
    "task_invalid_time": "Format masa tidak sah. Sila nyatakan dalam format 'HH:MM'.",
    "task_note_subject": "Peringatan Nota Coopa: {noteName}",
    "task_note_body": "Kandungan nota yang perlu anda ingat adalah di bawah:\n\n\"{noteContent}\"",
    "task_file_subject": "Peringatan Fail Coopa: {attachmentDescription}",
    "task_file_body": "Memori \"{attachmentDescription}\" yang diminta telah dilampirkan pada e-mel.",
    "task_error_insufficient_info": "Maklumat tidak mencukupi untuk tugas yang dijadualkan (nota, fail, atau kandungan e-mel tiada).",
    "task_success_message": "Tugas '{taskIdentifier}' berjaya dijadualkan untuk {time}.",
    "email_attachment_not_found": "(Nota: Memori \"{attachmentDescription}\" yang diminta tidak ditemui dan oleh itu tidak dapat dilampirkan pada e-mel.)",
    "task_scheduled_successfully": "Satu tugas telah berjaya dijadualkan",
    "note_retrieved_successfully": "Kandungan nota berjaya diambil",
    "weather_queried_successfully": "maklumat cuaca berjaya ditanya untuk",
    "note_created_successfully": "nota berjaya dicipta",
    "note_edited_successfully": "kandungan baharu ditambah pada nota",
    "time_info_provided": "Maklumat tarikh dan masa semasa telah diberikan kepada pengguna",
    "calendar_event_created": "acara kalendar berjaya dicipta",
    "memory_found_and_displayed": "satu memori yang sepadan dengan carian telah ditemui dan ditunjukkan kepada pengguna",
    "email_sent_successfully": "satu e-mel telah berjaya dihantar ke alamat",
    "missing_user_info": "Alamat pengguna atau tandatangan tidak dihantar bersama permintaan",
    "prompt_empty": "Prompt tidak boleh kosong",
    "invalid_ai_response": "Respons tidak sah diterima daripada AI",
    "chatCleared": "Sembang dikosongkan. Anda boleh memulakan perbualan baharu."
  },
  de: {
    "welcome": "Hallo! Wie kann ich helfen?",
    "weather_error": "Wetterinformationen für konnten nicht abgerufen werden",
    "email_sent": "E-Mail erfolgreich gesendet:",
    "email_error": "Beim Senden der E-Mail ist ein Fehler aufgetreten:",
    "note_saved": "Notiz gespeichert. Neuer Inhalt:",
    "note_not_found": "Eine Notiz mit dem Namen wurde nicht gefunden",
    "note_empty": "(Notizinhalt ist leer)",
    "note_db_error": "Beim Lesen der Notiz ist ein Datenbankfehler aufgetreten:",
    "current_time": "Die aktuelle Uhrzeit ist",
    "current_date": "Datum",
    "calendar_added": "Ereignis wurde Ihrem Kalender hinzugefügt.",
    "calendar_error": "Kalenderereignis konnte nicht erstellt werden:",
    "task_scheduled": "Aufgabe erfolgreich geplant.",
    "task_reminder": "Erinnerung mit Betreff",
    "memory_saved": "Erinnerung wurde für die Benutzeradresse in der Datenbank gespeichert.",
    "memory_found": "Erinnerung mit der Beschreibung wurde gefunden.",
    "memory_not_found": "keine passende Erinnerung gefunden",
    "memory_search_not_found": "Keine Erinnerung passend zu '{searchText}' gefunden.",
    "memory_decrypt_error": "Erinnerung gefunden, konnte aber nicht entschlüsselt werden.",
    "upload_success": "Erinnerung Erfolgreich Verschlüsselt und Dauerhaft Gespeichert!",
    "invalid_signature": "Ungültige Signatur. Authentifizierung fehlgeschlagen.",
    "missing_info": "Fehlende Informationen: Datei, Adresse oder Signatur nicht angegeben.",
    "server_error": "Ein Fehler ist aufgetreten: Serverfehler",
    "task_missing_time": "Sie müssen eine Zeit angeben, um die Aufgabe zu planen.",
    "task_invalid_time": "Ungültiges Zeitformat. Bitte im 'HH:MM'-Format angeben.",
    "task_note_subject": "Coopa-Notizerinnerung: {noteName}",
    "task_note_body": "Der Inhalt der Notiz, an die Sie sich erinnern müssen, lautet wie folgt:\n\n\"{noteContent}\"",
    "task_file_subject": "Coopa-Dateierinnerung: {attachmentDescription}",
    "task_file_body": "Die angeforderte Erinnerung \"{attachmentDescription}\" wurde der E-Mail beigefügt.",
    "task_error_insufficient_info": "Unzureichende Informationen für geplante Aufgabe (Notiz, Datei oder E-Mail-Inhalt fehlt).",
    "task_success_message": "Aufgabe '{taskIdentifier}' wurde erfolgreich für {time} geplant.",
    "email_attachment_not_found": "(Hinweis: Die angeforderte Erinnerung \"{attachmentDescription}\" wurde nicht gefunden und konnte daher nicht an die E-Mail angehängt werden.)",
    "task_scheduled_successfully": "Eine Aufgabe wurde erfolgreich geplant",
    "note_retrieved_successfully": "Notizinhalt erfolgreich abgerufen",
    "weather_queried_successfully": "Wetterinformationen erfolgreich abgefragt für",
    "note_created_successfully": "Notiz erfolgreich erstellt",
    "note_edited_successfully": "neuer Inhalt zur Notiz hinzugefügt",
    "time_info_provided": "Aktuelle Datums- und Zeitinformationen wurden dem Benutzer zur Verfügung gestellt",
    "calendar_event_created": "Kalenderereignis erfolgreich erstellt",
    "memory_found_and_displayed": "eine zur Suche passende Erinnerung wurde gefunden und dem Benutzer angezeigt",
    "email_sent_successfully": "eine E-Mail wurde erfolgreich an die Adresse gesendet",
    "missing_user_info": "Benutzeradresse oder Signatur wurde nicht mit der Anfrage gesendet",
    "prompt_empty": "Prompt darf nicht leer sein",
    "invalid_ai_response": "Ungültige Antwort von KI erhalten",
    "chatCleared": "Chat gelöscht. Sie können eine neue Konversation beginnen."
  },
  ja: {
    "welcome": "こんにちは！何かお手伝いできますか？",
    "weather_error": "の天気情報を取得できませんでした",
    "email_sent": "メールが正常に送信されました：",
    "email_error": "メール送信中にエラーが発生しました：",
    "note_saved": "ノートが保存されました。新しい内容：",
    "note_not_found": "という名前のノートが見つかりませんでした",
    "note_empty": "（ノートの内容は空です）",
    "note_db_error": "ノートの読み込み中にデータベースエラーが発生しました：",
    "current_time": "現在の時刻は",
    "current_date": "日付",
    "calendar_added": "イベントがカレンダーに追加されました。",
    "calendar_error": "カレンダーイベントを作成できませんでした：",
    "task_scheduled": "タスクが正常にスケジュールされました。",
    "task_reminder": "件名のリマインダー",
    "memory_saved": "メモリがユーザーアドレスのデータベースに保存されました。",
    "memory_found": "説明付きのメモリが見つかりました。",
    "memory_not_found": "に一致するメモリが見つかりませんでした",
    "memory_search_not_found": "'{searchText}'に一致するメモリが見つかりませんでした。",
    "memory_decrypt_error": "メモリは見つかりましたが、復号できませんでした。",
    "upload_success": "メモリが正常に暗号化され、永久に保存されました！",
    "invalid_signature": "無効な署名。認証に失敗しました。",
    "missing_info": "情報が不足しています：ファイル、アドレス、または署名が指定されていません。",
    "server_error": "エラーが発生しました：サーバーエラー",
    "task_missing_time": "タスクをスケジュールするには時間を指定する必要があります。",
    "task_invalid_time": "無効な時間形式です。「HH:MM」形式で指定してください。",
    "task_note_subject": "Coopaノートリマインダー：{noteName}",
    "task_note_body": "覚えておく必要のあるノートの内容は以下の通りです：\n\n「{noteContent}」",
    "task_file_subject": "Coopaファイルリマインダー：{attachmentDescription}",
    "task_file_body": "要求された「{attachmentDescription}」のメモリがメールに添付されました。",
    "task_error_insufficient_info": "スケジュールされたタスクの情報が不十分です（ノート、ファイル、またはメールの内容がありません）。",
    "task_success_message": "タスク「{taskIdentifier}」が{time}に正常にスケジュールされました。",
    "email_attachment_not_found": "（注：要求された「{attachmentDescription}」のメモリが見つからなかったため、メールに添付できませんでした。）",
    "task_scheduled_successfully": "タスクが正常にスケジュールされました",
    "note_retrieved_successfully": "ノートの内容が正常に取得されました",
    "weather_queried_successfully": "の天気情報が正常に照会されました",
    "note_created_successfully": "ノートが正常に作成されました",
    "note_edited_successfully": "ノートに新しい内容が追加されました",
    "time_info_provided": "現在の日付と時刻情報がユーザーに提供されました",
    "calendar_event_created": "カレンダーイベントが正常に作成されました",
    "memory_found_and_displayed": "の検索に一致するメモリが見つかり、ユーザーに表示されました",
    "email_sent_successfully": "アドレスにメールが正常に送信されました",
    "missing_user_info": "リクエストにユーザーアドレスまたは署名が送信されませんでした",
    "prompt_empty": "プロンプトは空にできません",
    "invalid_ai_response": "AIから無効な応答を受信しました",
    "chatCleared": "チャットがクリアされました。新しい会話を開始できます。"
  },
  fa: {
    "welcome": "سلام! چگونه می‌توانم کمک کنم؟",
    "weather_error": "اطلاعات آب و هوا برای بازیابی نشد",
    "email_sent": "ایمیل با موفقیت ارسال شد:",
    "email_error": "هنگام ارسال ایمیل خطایی رخ داد:",
    "note_saved": "یادداشت ذخیره شد. محتوای جدید:",
    "note_not_found": "یادداشتی با نام پیدا نشد",
    "note_empty": "(محتوای یادداشت خالی است)",
    "note_db_error": "هنگام خواندن یادداشت خطای پایگاه داده رخ داد:",
    "current_time": "ساعت فعلی",
    "current_date": "تاریخ",
    "calendar_added": "رویداد به تقویم شما اضافه شد.",
    "calendar_error": "امکان ایجاد رویداد تقویم وجود نداشت:",
    "task_scheduled": "وظیفه با موفقیت زمان‌بندی شد.",
    "task_reminder": "یادآوری با موضوع",
    "memory_saved": "خاطره برای آدرس کاربر در پایگاه داده ذخیره شد.",
    "memory_found": "خاطره با توضیحات پیدا شد.",
    "memory_not_found": "خاطره‌ای مطابق با پیدا نشد",
    "memory_search_not_found": "خاطره‌ای مطابق با '{searchText}' پیدا نشد.",
    "memory_decrypt_error": "خاطره پیدا شد اما رمزگشایی نشد.",
    "upload_success": "خاطره با موفقیت رمزگذاری و به طور دائم ذخیره شد!",
    "invalid_signature": "امضای نامعتبر. احراز هویت ناموفق بود.",
    "missing_info": "اطلاعات ناقص: فایل، آدرس یا امضا مشخص نشده است.",
    "server_error": "خطایی رخ داد: خطای سرور",
    "task_missing_time": "برای زمان‌بندی وظیفه باید زمانی را مشخص کنید.",
    "task_invalid_time": "فرمت زمان نامعتبر است. لطفاً با فرمت 'HH:MM' مشخص کنید.",
    "task_note_subject": "یادآوری یادداشت Coopa: {noteName}",
    "task_note_body": "محتوای یادداشتی که باید به خاطر بسپارید در زیر آمده است:\n\n\"{noteContent}\"",
    "task_file_subject": "یادآوری فایل Coopa: {attachmentDescription}",
    "task_file_body": "خاطره درخواستی «{attachmentDescription}» به ایمیل پیوست شده است.",
    "task_error_insufficient_info": "اطلاعات ناکافی برای وظیفه زمان‌بندی شده (یادداشت، فایل یا محتوای ایمیل موجود نیست).",
    "task_success_message": "وظیفه «{taskIdentifier}» با موفقیت برای {time} زمان‌بندی شد.",
    "email_attachment_not_found": "(توجه: خاطره درخواستی «{attachmentDescription}» پیدا نشد و بنابراین نمی‌توان آن را به ایمیل پیوست کرد.)",
    "task_scheduled_successfully": "یک وظیفه با موفقیت زمان‌بندی شد",
    "note_retrieved_successfully": "محتوای یادداشت با موفقیت بازیابی شد",
    "weather_queried_successfully": "اطلاعات آب و هوا با موفقیت برای استعلام شد",
    "note_created_successfully": "یادداشت با موفقیت ایجاد شد",
    "note_edited_successfully": "محتوای جدید به یادداشت اضافه شد",
    "time_info_provided": "اطلاعات تاریخ و زمان فعلی به کاربر داده شد",
    "calendar_event_created": "رویداد تقویم با موفقیت ایجاد شد",
    "memory_found_and_displayed": "خاطره‌ای مطابق با جستجو پیدا شد و به کاربر نمایش داده شد",
    "email_sent_successfully": "یک ایمیل با موفقیت به آدرس ارسال شد",
    "missing_user_info": "آدرس کاربر یا امضا با درخواست ارسال نشده است",
    "prompt_empty": "اعلان نمی‌تواند خالی باشد",
    "invalid_ai_response": "پاسخ نامعتبر از هوش مصنوعی دریافت شد",
    "chatCleared": "گفتگو پاک شد. می‌توانید یک گفتگوی جدید شروع کنید."
  },
  ha: {
    "welcome": "Sannu! Ta yaya zan iya taimakawa?",
    "weather_error": "Ba a iya samo bayanan yanayi na",
    "email_sent": "An aika imel cikin nasara:",
    "email_error": "An sami kuskure yayin aika imel:",
    "note_saved": "an adana rubutu. Sabon abun ciki:",
    "note_not_found": "Ba a sami rubutu mai suna ba",
    "note_empty": "(abun cikin rubutu fanko ne)",
    "note_db_error": "An sami kuskuren bayanai yayin karanta rubutu:",
    "current_time": "Lokaci na yanzu",
    "current_date": "kwanan wata",
    "calendar_added": "an ƙara taron a kalandarku.",
    "calendar_error": "Ba a iya ƙirƙirar taron kalanda ba:",
    "task_scheduled": "An shirya aiki cikin nasara.",
    "task_reminder": "tunatarwa tare da batun",
    "memory_saved": "an adana ƙwaƙwalwa a cikin bayanai don adireshin mai amfani.",
    "memory_found": "an sami ƙwaƙwalwa tare da bayanin.",
    "memory_not_found": "ba a sami ƙwaƙwalwar da ta dace da ba",
    "memory_search_not_found": "Ba a sami ƙwaƙwalwar da ta dace da '{searchText}' ba.",
    "memory_decrypt_error": "An sami ƙwaƙwalwa amma ba a iya buɗe ta ba.",
    "upload_success": "An yi nasarar Rufaffen Ƙwaƙwalwa da Adana ta Har abada!",
    "invalid_signature": "Sa hannu mara inganci. Tabbatarwa ta gaza.",
    "missing_info": "Bayanai da suka ɓace: Ba a fayyace fayil, adireshi, ko sa hannu ba.",
    "server_error": "An sami kuskure: Kuskuren sabar",
    "task_missing_time": "Dole ne ku fayyace lokaci don shirya aikin.",
    "task_invalid_time": "Tsarin lokaci mara inganci. Da fatan za a fayyace a cikin tsarin 'HH:MM'.",
    "task_note_subject": "Tunatarwar Rubutun Coopa: {noteName}",
    "task_note_body": "Abun cikin rubutun da kuke buƙatar tunawa yana ƙasa:\n\n\"{noteContent}\"",
    "task_file_subject": "Tunatarwar Fayil na Coopa: {attachmentDescription}",
    "task_file_body": "An haɗa ƙwaƙwalwar \"{attachmentDescription}\" da aka nema zuwa imel.",
    "task_error_insufficient_info": "Rashin isasshen bayani don aikin da aka tsara (rubutu, fayil, ko abun cikin imel ya ɓace).",
    "task_success_message": "An yi nasarar shirya aikin '{taskIdentifier}' don {time}.",
    "email_attachment_not_found": "(Lura: Ba a sami ƙwaƙwalwar \"{attachmentDescription}\" da aka nema ba kuma saboda haka ba za a iya haɗa ta da imel ba.)",
    "task_scheduled_successfully": "An shirya aiki cikin nasara",
    "note_retrieved_successfully": "An sami nasarar dawo da abun cikin rubutu",
    "weather_queried_successfully": "an yi nasarar tambayar bayanan yanayi na",
    "note_created_successfully": "an ƙirƙiri rubutu cikin nasara",
    "note_edited_successfully": "an ƙara sabon abun ciki a rubutu",
    "time_info_provided": "An ba mai amfani bayanan kwanan wata da lokaci na yanzu",
    "calendar_event_created": "an ƙirƙiri taron kalanda cikin nasara",
    "memory_found_and_displayed": "an sami ƙwaƙwalwar da ta dace da binciken kuma an nuna wa mai amfani",
    "email_sent_successfully": "an aika imel cikin nasara zuwa adireshin",
    "missing_user_info": "Ba a aika adireshin mai amfani ko sa hannu tare da buƙatar ba",
    "prompt_empty": "Prompt ba zai iya zama fanko ba",
    "invalid_ai_response": "An karɓi amsa mara inganci daga AI",
    "chatCleared": "An share hira. Kuna iya fara sabuwar hira."
  },
  sw: {
    "welcome": "Habari! Ninawezaje kusaidia?",
    "weather_error": "Taarifa za hali ya hewa za hazikuweza kupatikana",
    "email_sent": "Barua pepe imetumwa kwa mafanikio:",
    "email_error": "Hitilafu imetokea wakati wa kutuma barua pepe:",
    "note_saved": "dokezo limehifadhiwa. Maudhui mapya:",
    "note_not_found": "Hakuna dokezo lenye jina lilipatikana",
    "note_empty": "(maudhui ya dokezo ni tupu)",
    "note_db_error": "Hitilafu ya hifadhidata imetokea wakati wa kusoma dokezo:",
    "current_time": "Saa ya sasa ni",
    "current_date": "tarehe",
    "calendar_added": "tukio limeongezwa kwenye kalenda yako.",
    "calendar_error": "Haikuweza kuunda tukio la kalenda:",
    "task_scheduled": "Kazi imeratibiwa kwa mafanikio.",
    "task_reminder": "kikumbusho chenye mada",
    "memory_saved": "kumbukumbu imehifadhiwa kwenye hifadhidata kwa anwani ya mtumiaji.",
    "memory_found": "kumbukumbu imepatikana na maelezo.",
    "memory_not_found": "hakuna kumbukumbu inayolingana iliyopatikana",
    "memory_search_not_found": "Hakuna kumbukumbu inayolingana na '{searchText}' iliyopatikana.",
    "memory_decrypt_error": "Kumbukumbu imepatikana lakini haikuweza kusimbuliwa.",
    "upload_success": "Kumbukumbu Imesimbwa kwa Njia Fiche na Kuhifadhiwa Moja kwa Moja kwa Mafanikio!",
    "invalid_signature": "Sahihi batili. Uthibitishaji umeshindwa.",
    "missing_info": "Taarifa pungufu: Faili, anwani, au sahihi haijabainishwa.",
    "server_error": "Hitilafu imetokea: Hitilafu ya seva",
    "task_missing_time": "Ni lazima ubainishe saa ya kuratibu kazi.",
    "task_invalid_time": "Umbizo la saa si sahihi. Tafadhali bainisha katika umbizo la 'HH:MM'.",
    "task_note_subject": "Kikumbusho cha Dokezo la Coopa: {noteName}",
    "task_note_body": "Maudhui ya dokezo unayohitaji kukumbuka yako hapa chini:\n\n\"{noteContent}\"",
    "task_file_subject": "Kikumbusho cha Faili ya Coopa: {attachmentDescription}",
    "task_file_body": "Kumbukumbu ya \"{attachmentDescription}\" uliyoomba imeambatishwa kwenye barua pepe.",
    "task_error_insufficient_info": "Taarifa haitoshi kwa kazi iliyoratibiwa (dokezo, faili, au maudhui ya barua pepe hayapo).",
    "task_success_message": "Kazi '{taskIdentifier}' imeratibiwa kwa mafanikio kwa {time}.",
    "email_attachment_not_found": "(Kumbuka: Kumbukumbu ya \"{attachmentDescription}\" uliyoomba haikupatikana na kwa hivyo haikuweza kuambatishwa kwenye barua pepe.)",
    "task_scheduled_successfully": "Kazi imeratibiwa kwa mafanikio",
    "note_retrieved_successfully": "Maudhui ya dokezo yamerejeshwa kwa mafanikio",
    "weather_queried_successfully": "taarifa za hali ya hewa zimeulizwa kwa mafanikio kwa",
    "note_created_successfully": "dokezo limeundwa kwa mafanikio",
    "note_edited_successfully": "maudhui mapya yameongezwa kwenye dokezo",
    "time_info_provided": "Taarifa za tarehe na saa za sasa zimetolewa kwa mtumiaji",
    "calendar_event_created": "tukio la kalenda limeundwa kwa mafanikio",
    "memory_found_and_displayed": "kumbukumbu inayolingana na utafutaji imepatikana na kuonyeshwa kwa mtumiaji",
    "email_sent_successfully": "barua pepe imetumwa kwa mafanikio kwa anwani",
    "missing_user_info": "Anwani ya mtumiaji au sahihi haikutumwa na ombi",
    "prompt_empty": "Prompt haiwezi kuwa tupu",
    "invalid_ai_response": "Jibu batili limepokelewa kutoka kwa AI",
    "chatCleared": "Gumzo limefutwa. Unaweza kuanzisha mazungumzo mapya."
  },
  vi: {
    "welcome": "Xin chào! Tôi có thể giúp gì?",
    "weather_error": "Không thể truy xuất thông tin thời tiết cho",
    "email_sent": "Email đã được gửi thành công:",
    "email_error": "Đã xảy ra lỗi khi gửi email:",
    "note_saved": "ghi chú đã được lưu. Nội dung mới:",
    "note_not_found": "Không tìm thấy ghi chú có tên",
    "note_empty": "(nội dung ghi chú trống)",
    "note_db_error": "Đã xảy ra lỗi cơ sở dữ liệu khi đọc ghi chú:",
    "current_time": "Thời gian hiện tại là",
    "current_date": "ngày",
    "calendar_added": "sự kiện đã được thêm vào lịch của bạn.",
    "calendar_error": "Không thể tạo sự kiện lịch:",
    "task_scheduled": "Nhiệm vụ đã được lên lịch thành công.",
    "task_reminder": "lời nhắc với chủ đề",
    "memory_saved": "bộ nhớ đã được lưu vào cơ sở dữ liệu cho địa chỉ người dùng.",
    "memory_found": "bộ nhớ đã được tìm thấy với mô tả.",
    "memory_not_found": "không tìm thấy bộ nhớ phù hợp",
    "memory_search_not_found": "Không tìm thấy bộ nhớ nào khớp với '{searchText}'.",
    "memory_decrypt_error": "Đã tìm thấy bộ nhớ nhưng không thể giải mã.",
    "upload_success": "Bộ nhớ được mã hóa thành công và lưu trữ vĩnh viễn!",
    "invalid_signature": "Chữ ký không hợp lệ. Xác thực không thành công.",
    "missing_info": "Thiếu thông tin: Tệp, địa chỉ hoặc chữ ký không được chỉ định.",
    "server_error": "Đã xảy ra lỗi: Lỗi máy chủ",
    "task_missing_time": "Bạn phải chỉ định thời gian để lên lịch cho nhiệm vụ.",
    "task_invalid_time": "Định dạng thời gian không hợp lệ. Vui lòng chỉ định theo định dạng 'HH:MM'.",
    "task_note_subject": "Lời nhắc ghi chú Coopa: {noteName}",
    "task_note_body": "Nội dung của ghi chú bạn cần nhớ ở bên dưới:\n\n\"{noteContent}\"",
    "task_file_subject": "Lời nhắc tệp Coopa: {attachmentDescription}",
    "task_file_body": "Bộ nhớ \"{attachmentDescription}\" được yêu cầu đã được đính kèm vào email.",
    "task_error_insufficient_info": "Không đủ thông tin cho nhiệm vụ đã lên lịch (thiếu ghi chú, tệp hoặc nội dung email).",
    "task_success_message": "Nhiệm vụ '{taskIdentifier}' đã được lên lịch thành công cho {time}.",
    "email_attachment_not_found": "(Lưu ý: Không tìm thấy bộ nhớ \"{attachmentDescription}\" được yêu cầu và do đó không thể đính kèm vào email.)",
    "task_scheduled_successfully": "Một nhiệm vụ đã được lên lịch thành công",
    "note_retrieved_successfully": "Nội dung ghi chú đã được truy xuất thành công",
    "weather_queried_successfully": "thông tin thời tiết đã được truy vấn thành công cho",
    "note_created_successfully": "ghi chú đã được tạo thành công",
    "note_edited_successfully": "nội dung mới đã được thêm vào ghi chú",
    "time_info_provided": "Thông tin ngày và giờ hiện tại đã được cung cấp cho người dùng",
    "calendar_event_created": "sự kiện lịch đã được tạo thành công",
    "memory_found_and_displayed": "một bộ nhớ phù hợp với tìm kiếm đã được tìm thấy và hiển thị cho người dùng",
    "email_sent_successfully": "một email đã được gửi thành công đến địa chỉ",
    "missing_user_info": "Địa chỉ hoặc chữ ký của người dùng không được gửi cùng với yêu cầu",
    "prompt_empty": "Prompt không được để trống",
    "invalid_ai_response": "Đã nhận được phản hồi không hợp lệ từ AI",
    "chatCleared": "Cuộc trò chuyện đã được xóa. Bạn có thể bắt đầu một cuộc trò chuyện mới."
  },
  ko: {
    "welcome": "안녕하세요! 무엇을 도와드릴까요?",
    "weather_error": "의 날씨 정보를 가져올 수 없습니다",
    "email_sent": "이메일이 성공적으로 전송되었습니다:",
    "email_error": "이메일 전송 중 오류가 발생했습니다:",
    "note_saved": "노트가 저장되었습니다. 새 콘텐츠:",
    "note_not_found": "라는 이름의 노트를 찾을 수 없습니다",
    "note_empty": "(노트 내용이 비어 있음)",
    "note_db_error": "노트를 읽는 동안 데이터베이스 오류가 발생했습니다:",
    "current_time": "현재 시간은",
    "current_date": "날짜",
    "calendar_added": "이벤트가 캘린더에 추가되었습니다.",
    "calendar_error": "캘린더 이벤트를 만들 수 없습니다:",
    "task_scheduled": "작업이 성공적으로 예약되었습니다.",
    "task_reminder": "주제가 있는 미리 알림",
    "memory_saved": "메모리가 사용자 주소의 데이터베이스에 저장되었습니다.",
    "memory_found": "설명이 있는 메모리를 찾았습니다.",
    "memory_not_found": "와 일치하는 메모리를 찾을 수 없습니다",
    "memory_search_not_found": "'{searchText}'와 일치하는 메모리를 찾을 수 없습니다.",
    "memory_decrypt_error": "메모리를 찾았지만 해독할 수 없습니다.",
    "upload_success": "메모리가 성공적으로 암호화되어 영구적으로 저장되었습니다!",
    "invalid_signature": "잘못된 서명입니다. 인증에 실패했습니다.",
    "missing_info": "정보 누락: 파일, 주소 또는 서명이 지정되지 않았습니다.",
    "server_error": "오류가 발생했습니다: 서버 오류",
    "task_missing_time": "작업을 예약하려면 시간을 지정해야 합니다.",
    "task_invalid_time": "잘못된 시간 형식입니다. 'HH:MM' 형식으로 지정하십시오.",
    "task_note_subject": "Coopa 노트 미리 알림: {noteName}",
    "task_note_body": "기억해야 할 노트의 내용은 다음과 같습니다:\n\n\"{noteContent}\"",
    "task_file_subject": "Coopa 파일 미리 알림: {attachmentDescription}",
    "task_file_body": "요청한 \"{attachmentDescription}\" 메모리가 이메일에 첨부되었습니다.",
    "task_error_insufficient_info": "예약된 작업에 대한 정보가 충분하지 않습니다(노트, 파일 또는 이메일 내용 누락).",
    "task_success_message": "작업 '{taskIdentifier}'가 {time}에 성공적으로 예약되었습니다.",
    "email_attachment_not_found": "(참고: 요청한 \"{attachmentDescription}\" 메모리를 찾을 수 없어 이메일에 첨부할 수 없습니다.)",
    "task_scheduled_successfully": "작업이 성공적으로 예약되었습니다",
    "note_retrieved_successfully": "노트 내용이 성공적으로 검색되었습니다",
    "weather_queried_successfully": "의 날씨 정보가 성공적으로 조회되었습니다",
    "note_created_successfully": "노트가 성공적으로 생성되었습니다",
    "note_edited_successfully": "노트에 새 콘텐츠가 추가되었습니다",
    "time_info_provided": "사용자에게 현재 날짜 및 시간 정보가 제공되었습니다",
    "calendar_event_created": "캘린더 이벤트가 성공적으로 생성되었습니다",
    "memory_found_and_displayed": "에 대한 검색과 일치하는 메모리를 찾아 사용자에게 표시했습니다",
    "email_sent_successfully": "주소로 이메일이 성공적으로 전송되었습니다",
    "missing_user_info": "요청과 함께 사용자 주소 또는 서명이 전송되지 않았습니다",
    "prompt_empty": "프롬프트는 비워 둘 수 없습니다",
    "invalid_ai_response": "AI로부터 잘못된 응답을 받았습니다",
    "chatCleared": "채팅이 지워졌습니다. 새 대화를 시작할 수 있습니다."
  },
  it: {
    "welcome": "Ciao! Come posso aiutare?",
    "weather_error": "Impossibile recuperare le informazioni meteo per",
    "email_sent": "Email inviata con successo:",
    "email_error": "Si è verificato un errore durante l'invio dell'email:",
    "note_saved": "nota salvata. Nuovo contenuto:",
    "note_not_found": "Nessuna nota di nome è stata trovata",
    "note_empty": "(contenuto della nota vuoto)",
    "note_db_error": "Si è verificato un errore del database durante la lettura della nota:",
    "current_time": "L'ora attuale è",
    "current_date": "data",
    "calendar_added": "l'evento è stato aggiunto al tuo calendario.",
    "calendar_error": "Impossibile creare l'evento del calendario:",
    "task_scheduled": "Attività pianificata con successo.",
    "task_reminder": "promemoria con oggetto",
    "memory_saved": "la memoria è stata salvata nel database per l'indirizzo dell'utente.",
    "memory_found": "la memoria è stata trovata con la descrizione.",
    "memory_not_found": "nessuna memoria corrispondente è stata trovata",
    "memory_search_not_found": "Nessuna memoria corrispondente a '{searchText}' è stata trovata.",
    "memory_decrypt_error": "Memoria trovata ma non è stato possibile decifrarla.",
    "upload_success": "Memoria Crittografata e Salvata Permanentemente con Successo!",
    "invalid_signature": "Firma non valida. Autenticazione fallita.",
    "missing_info": "Informazioni mancanti: File, indirizzo o firma non specificati.",
    "server_error": "Si è verificato un errore: Errore del server",
    "task_missing_time": "È necessario specificare un'ora per pianificare l'attività.",
    "task_invalid_time": "Formato dell'ora non valido. Si prega di specificare nel formato 'HH:MM'.",
    "task_note_subject": "Promemoria Nota Coopa: {noteName}",
    "task_note_body": "Il contenuto della nota che devi ricordare è qui sotto:\n\n\"{noteContent}\"",
    "task_file_subject": "Promemoria File Coopa: {attachmentDescription}",
    "task_file_body": "La memoria \"{attachmentDescription}\" richiesta è stata allegata all'email.",
    "task_error_insufficient_info": "Informazioni insufficienti per l'attività pianificata (manca il contenuto della nota, del file o dell'email).",
    "task_success_message": "L'attività '{taskIdentifier}' è stata pianificata con successo per le {time}.",
    "email_attachment_not_found": "(Nota: La memoria \"{attachmentDescription}\" richiesta non è stata trovata e quindi non è stato possibile allegarla all'email.)",
    "task_scheduled_successfully": "Un'attività è stata pianificata con successo",
    "note_retrieved_successfully": "Contenuto della nota recuperato con successo",
    "weather_queried_successfully": "informazioni meteo interrogate con successo per",
    "note_created_successfully": "nota creata con successo",
    "note_edited_successfully": "nuovo contenuto aggiunto alla nota",
    "time_info_provided": "Le informazioni su data e ora correnti sono state fornite all'utente",
    "calendar_event_created": "evento del calendario creato con successo",
    "memory_found_and_displayed": "una memoria corrispondente alla ricerca di è stata trovata e mostrata all'utente",
    "email_sent_successfully": "un'email è stata inviata con successo all'indirizzo",
    "missing_user_info": "L'indirizzo dell'utente o la firma non sono stati inviati con la richiesta",
    "prompt_empty": "Il prompt non può essere vuoto",
    "invalid_ai_response": "Risposta non valida ricevuta dall'IA",
    "chatCleared": "Chat pulita. Puoi iniziare una nuova conversazione."
  },
  jv: {
    "welcome": "Halo! Kadospundi kula saged mbantu?",
    "weather_error": "Informasi cuaca kanggo ora bisa dijupuk",
    "email_sent": "Email kasil dikirim:",
    "email_error": "Ana kesalahan nalika ngirim email:",
    "note_saved": "cathetan disimpen. Isi anyar:",
    "note_not_found": "Cathetan kanthi jeneng ora ditemokake",
    "note_empty": "(isi cathetan kosong)",
    "note_db_error": "Ana kesalahan database nalika maca cathetan:",
    "current_time": "Wektu saiki",
    "current_date": "tanggal",
    "calendar_added": "acara ditambahake menyang tanggalan sampeyan.",
    "calendar_error": "Ora bisa nggawe acara tanggalan:",
    "task_scheduled": "Tugas kasil dijadwalake.",
    "task_reminder": "pangeling kanthi subyek",
    "memory_saved": "memori disimpen menyang database kanggo alamat pangguna.",
    "memory_found": "memori ditemokake kanthi katrangan.",
    "memory_not_found": "ora ana memori sing cocog",
    "memory_search_not_found": "Ora ana memori sing cocog karo '{searchText}'.",
    "memory_decrypt_error": "Memori ditemokake nanging ora bisa didekripsi.",
    "upload_success": "Memori Kasil Dienkripsi lan Disimpen kanthi Permanen!",
    "invalid_signature": "Tandha tangan ora sah. Otentikasi gagal.",
    "missing_info": "Informasi kurang: File, alamat, utawa tandha tangan ora ditemtokake.",
    "server_error": "Ana kesalahan: Kesalahan server",
    "task_missing_time": "Sampeyan kudu nemtokake wektu kanggo njadwalake tugas.",
    "task_invalid_time": "Format wektu ora sah. Mangga nemtokake ing format 'HH:MM'.",
    "task_note_subject": "Pangeling Cathetan Coopa: {noteName}",
    "task_note_body": "Isi cathetan sing kudu sampeyan elingi ana ing ngisor iki:\n\n\"{noteContent}\"",
    "task_file_subject": "Pangeling File Coopa: {attachmentDescription}",
    "task_file_body": "Memori \"{attachmentDescription}\" sing dijaluk wis dilampirake ing email.",
    "task_error_insufficient_info": "Informasi ora cukup kanggo tugas sing dijadwalake (cathetan, file, utawa isi email kurang).",
    "task_success_message": "Tugas '{taskIdentifier}' kasil dijadwalake kanggo {time}.",
    "email_attachment_not_found": "(Cathetan: Memori \"{attachmentDescription}\" sing dijaluk ora ditemokake lan mulane ora bisa dilampirake ing email.)",
    "task_scheduled_successfully": "Tugas kasil dijadwalake",
    "note_retrieved_successfully": "Isi cathetan kasil dijupuk",
    "weather_queried_successfully": "informasi cuaca kasil ditakokake kanggo",
    "note_created_successfully": "cathetan kasil digawe",
    "note_edited_successfully": "isi anyar ditambahake menyang cathetan",
    "time_info_provided": "Informasi tanggal lan wektu saiki diwenehake marang pangguna",
    "calendar_event_created": "acara tanggalan kasil digawe",
    "memory_found_and_displayed": "memori sing cocog karo panelusuran ditemokake lan ditampilake marang pangguna",
    "email_sent_successfully": "email kasil dikirim menyang alamat",
    "missing_user_info": "Alamat pangguna utawa tandha tangan ora dikirim bareng panjalukan",
    "prompt_empty": "Prompt ora bisa kosong",
    "invalid_ai_response": "Nampa tanggapan sing ora sah saka AI",
    "chatCleared": "Obrolan diresiki. Sampeyan bisa miwiti obrolan anyar."
  },
  tl: {
    "welcome": "Kamusta! Paano ako makakatulong?",
    "weather_error": "Hindi makuha ang impormasyon ng panahon para sa",
    "email_sent": "Matagumpay na naipadala ang email:",
    "email_error": "May naganap na error habang nagpapadala ng email:",
    "note_saved": "nai-save ang tala. Bagong nilalaman:",
    "note_not_found": "Walang nakitang tala na may pangalang",
    "note_empty": "(walang laman ang nilalaman ng tala)",
    "note_db_error": "May naganap na error sa database habang binabasa ang tala:",
    "current_time": "Ang kasalukuyang oras ay",
    "current_date": "petsa",
    "calendar_added": "naidagdag na ang kaganapan sa iyong kalendaryo.",
    "calendar_error": "Hindi makalikha ng kaganapan sa kalendaryo:",
    "task_scheduled": "Matagumpay na naiskedyul ang gawain.",
    "task_reminder": "paalala na may paksang",
    "memory_saved": "nai-save ang alaala sa database para sa address ng gumagamit.",
    "memory_found": "natagpuan ang alaala na may paglalarawan.",
    "memory_not_found": "walang nakitang tugmang alaala",
    "memory_search_not_found": "Walang nakitang alaala na tumutugma sa '{searchText}'.",
    "memory_decrypt_error": "Natagpuan ang alaala ngunit hindi ma-decrypt.",
    "upload_success": "Matagumpay na Na-encrypt at Permanenteng Nai-save ang Alaala!",
    "invalid_signature": "Hindi wastong lagda. Nabigo ang pagpapatunay.",
    "missing_info": "Kulang na impormasyon: Hindi tinukoy ang file, address, o lagda.",
    "server_error": "May naganap na error: Error sa server",
    "task_missing_time": "Dapat kang tumukoy ng oras upang ma-iskedyul ang gawain.",
    "task_invalid_time": "Hindi wastong format ng oras. Mangyaring tukuyin sa format na 'HH:MM'.",
    "task_note_subject": "Paalala sa Tala ng Coopa: {noteName}",
    "task_note_body": "Ang nilalaman ng tala na kailangan mong tandaan ay nasa ibaba:\n\n\"{noteContent}\"",
    "task_file_subject": "Paalala sa File ng Coopa: {attachmentDescription}",
    "task_file_body": "Ang hiniling na \"{attachmentDescription}\" na alaala ay naka-attach sa email.",
    "task_error_insufficient_info": "Hindi sapat na impormasyon para sa naka-iskedyul na gawain (nawawala ang tala, file, o nilalaman ng email).",
    "task_success_message": "Matagumpay na naiskedyul ang gawaing '{taskIdentifier}' para sa {time}.",
    "email_attachment_not_found": "(Tandaan: Hindi natagpuan ang hiniling na \"{attachmentDescription}\" na alaala at samakatuwid ay hindi mailakip sa email.)",
    "task_scheduled_successfully": "Matagumpay na naiskedyul ang isang gawain",
    "note_retrieved_successfully": "Matagumpay na nakuha ang nilalaman ng tala",
    "weather_queried_successfully": "matagumpay na na-query ang impormasyon ng panahon para sa",
    "note_created_successfully": "matagumpay na nalikha ang tala",
    "note_edited_successfully": "idinagdag ang bagong nilalaman sa tala",
    "time_info_provided": "Ang kasalukuyang impormasyon ng petsa at oras ay ibinigay sa gumagamit",
    "calendar_event_created": "matagumpay na nalikha ang kaganapan sa kalendaryo",
    "memory_found_and_displayed": "isang alaala na tumutugma sa paghahanap para sa ay natagpuan at ipinakita sa gumagamit",
    "email_sent_successfully": "matagumpay na naipadala ang isang email sa address",
    "missing_user_info": "Hindi ipinadala ang address o lagda ng gumagamit kasama ang kahilingan",
    "prompt_empty": "Hindi maaaring walang laman ang prompt",
    "invalid_ai_response": "Nakatanggap ng hindi wastong tugon mula sa AI",
    "chatCleared": "Na-clear ang chat. Maaari kang magsimula ng bagong pag-uusap."
  },
  uz: {
    "welcome": "Salom! Qanday yordam bera olaman?",
    "weather_error": "uchun ob-havo ma'lumotlarini olib bo'lmadi",
    "email_sent": "E-xat muvaffaqiyatli yuborildi:",
    "email_error": "E-xat yuborishda xatolik yuz berdi:",
    "note_saved": "eslatma saqlandi. Yangi tarkib:",
    "note_not_found": "nomli eslatma topilmadi",
    "note_empty": "(eslatma tarkibi bo'sh)",
    "note_db_error": "Eslatmani o'qishda ma'lumotlar bazasi xatoligi yuz berdi:",
    "current_time": "Hozirgi vaqt",
    "current_date": "sana",
    "calendar_added": "tadbiri taqvimingizga qo'shildi.",
    "calendar_error": "Taqvim tadbirini yaratib bo'lmadi:",
    "task_scheduled": "Vazifa muvaffaqiyatli rejalashtirildi.",
    "task_reminder": "mavzusidagi eslatma",
    "memory_saved": "xotirasi foydalanuvchi manzili uchun ma'lumotlar bazasiga saqlandi.",
    "memory_found": "tavsifi bilan xotira topildi.",
    "memory_not_found": "bilan mos keladigan xotira topilmadi",
    "memory_search_not_found": "'{searchText}' bilan mos keladigan xotira topilmadi.",
    "memory_decrypt_error": "Xotira topildi, ammo parolini ochib bo'lmadi.",
    "upload_success": "Xotira Muvaffaqiyatli Shifrlandi va Doimiy Saqlandi!",
    "invalid_signature": "Yaroqsiz imzo. Autentifikatsiya muvaffaqiyatsiz tugadi.",
    "missing_info": "Ma'lumot yetishmayapti: Fayl, manzil yoki imzo ko'rsatilmagan.",
    "server_error": "Xatolik yuz berdi: Server xatoligi",
    "task_missing_time": "Vazifani rejalashtirish uchun vaqtni belgilashingiz kerak.",
    "task_invalid_time": "Yaroqsiz vaqt formati. Iltimos, 'HH:MM' formatida belgilang.",
    "task_note_subject": "Coopa Eslatma Eslatmasi: {noteName}",
    "task_note_body": "Siz eslab qolishingiz kerak bo'lgan eslatma tarkibi quyidagicha:\n\n\"{noteContent}\"",
    "task_file_subject": "Coopa Fayl Eslatmasi: {attachmentDescription}",
    "task_file_body": "So'ralgan \"{attachmentDescription}\" xotirasi e-xatga ilova qilindi.",
    "task_error_insufficient_info": "Rejalashtirilgan vazifa uchun ma'lumot yetarli emas (eslatma, fayl yoki e-xat tarkibi yo'q).",
    "task_success_message": "'{taskIdentifier}' vazifasi {time} uchun muvaffaqiyatli rejalashtirildi.",
    "email_attachment_not_found": "(Eslatma: So'ralgan \"{attachmentDescription}\" xotirasi topilmadi va shuning uchun e-xatga ilova qilinmadi.)",
    "task_scheduled_successfully": "Vazifa muvaffaqiyatli rejalashtirildi",
    "note_retrieved_successfully": "Eslatma tarkibi muvaffaqiyatli olindi",
    "weather_queried_successfully": "ob-havo ma'lumotlari muvaffaqiyatli so'raldi",
    "note_created_successfully": "eslatma muvaffaqiyatli yaratildi",
    "note_edited_successfully": "eslatmaga yangi tarkib qo'shildi",
    "time_info_provided": "Foydalanuvchiga joriy sana va vaqt ma'lumotlari berildi",
    "calendar_event_created": "taqvim tadbiri muvaffaqiyatli yaratildi",
    "memory_found_and_displayed": "qidiruviga mos keladigan xotira topildi va foydalanuvchiga ko'rsatildi",
    "email_sent_successfully": "manziliga e-xat muvaffaqiyatli yuborildi",
    "missing_user_info": "So'rov bilan birga foydalanuvchi manzili yoki imzosi yuborilmadi",
    "prompt_empty": "Prompt bo'sh bo'lishi mumkin emas",
    "invalid_ai_response": "Sun'iy intellektdan yaroqsiz javob olindi",
    "chatCleared": "Suhbat tozalandi. Yangi suhbat boshlashingiz mumkin."
  },
  nl: {
    "welcome": "Hallo! Hoe kan ik helpen?",
    "weather_error": "Weerinformatie kon niet worden opgehaald voor",
    "email_sent": "E-mail succesvol verzonden:",
    "email_error": "Er is een fout opgetreden bij het verzenden van de e-mail:",
    "note_saved": "notitie opgeslagen. Nieuwe inhoud:",
    "note_not_found": "Een notitie met de naam is niet gevonden",
    "note_empty": "(notitie-inhoud is leeg)",
    "note_db_error": "Er is een databasefout opgetreden bij het lezen van de notitie:",
    "current_time": "De huidige tijd is",
    "current_date": "datum",
    "calendar_added": "evenement is aan je agenda toegevoegd.",
    "calendar_error": "Kon agenda-evenement niet aanmaken:",
    "task_scheduled": "Taak succesvol gepland.",
    "task_reminder": "herinnering met onderwerp",
    "memory_saved": "herinnering is opgeslagen in de database voor het gebruikersadres.",
    "memory_found": "herinnering is gevonden met de beschrijving.",
    "memory_not_found": "geen overeenkomende herinnering gevonden",
    "memory_search_not_found": "Een herinnering die overeenkomt met '{searchText}' is niet gevonden.",
    "memory_decrypt_error": "Herinnering gevonden, maar kon niet worden ontsleuteld.",
    "upload_success": "Herinnering Succesvol Versleuteld en Permanent Opgeslagen!",
    "invalid_signature": "Ongeldige handtekening. Authenticatie mislukt.",
    "missing_info": "Ontbrekende informatie: Bestand, adres of handtekening niet opgegeven.",
    "server_error": "Er is een fout opgetreden: Serverfout",
    "task_missing_time": "U moet een tijd opgeven om de taak te plannen.",
    "task_invalid_time": "Ongeldig tijdformaat. Geef op in 'UU:MM' formaat.",
    "task_note_subject": "Coopa Notitie Herinnering: {noteName}",
    "task_note_body": "De inhoud van de notitie die u moet onthouden, staat hieronder:\n\n\"{noteContent}\"",
    "task_file_subject": "Coopa Bestand Herinnering: {attachmentDescription}",
    "task_file_body": "De gevraagde \"{attachmentDescription}\" herinnering is aan de e-mail toegevoegd.",
    "task_error_insufficient_info": "Onvoldoende informatie voor geplande taak (notitie, bestand of e-mailinhoud ontbreekt).",
    "task_success_message": "Taak '{taskIdentifier}' is succesvol gepland voor {time}.",
    "email_attachment_not_found": "(Opmerking: De gevraagde \"{attachmentDescription}\" herinnering kon niet worden gevonden en kon daarom niet aan de e-mail worden toegevoegd.)",
    "task_scheduled_successfully": "Een taak is succesvol gepland",
    "note_retrieved_successfully": "Notitie-inhoud succesvol opgehaald",
    "weather_queried_successfully": "weerinformatie succesvol opgevraagd voor",
    "note_created_successfully": "notitie succesvol aangemaakt",
    "note_edited_successfully": "nieuwe inhoud toegevoegd aan notitie",
    "time_info_provided": "Huidige datum- en tijdinformatie werd aan de gebruiker gegeven",
    "calendar_event_created": "agenda-evenement succesvol aangemaakt",
    "memory_found_and_displayed": "een herinnering die overeenkwam met de zoekopdracht werd gevonden en aan de gebruiker getoond",
    "email_sent_successfully": "een e-mail is succesvol verzonden naar het adres",
    "missing_user_info": "Gebruikersadres of handtekening is niet meegestuurd met het verzoek",
    "prompt_empty": "Prompt mag niet leeg zijn",
    "invalid_ai_response": "Ongeldig antwoord ontvangen van AI",
    "chatCleared": "Chat gewist. U kunt een nieuw gesprek beginnen."
  },
  el: {
    "welcome": "Γεια σας! Πώς μπορώ να βοηθήσω;",
    "weather_error": "Δεν ήταν δυνατή η ανάκτηση πληροφοριών καιρού για",
    "email_sent": "Το email στάλθηκε με επιτυχία:",
    "email_error": "Παρουσιάστηκε σφάλμα κατά την αποστολή του email:",
    "note_saved": "η σημείωση αποθηκεύτηκε. Νέο περιεχόμενο:",
    "note_not_found": "Δεν βρέθηκε σημείωση με το όνομα",
    "note_empty": "(το περιεχόμενο της σημείωσης είναι κενό)",
    "note_db_error": "Παρουσιάστηκε σφάλμα βάσης δεδομένων κατά την ανάγνωση της σημείωσης:",
    "current_time": "Η τρέχουσα ώρα είναι",
    "current_date": "ημερομηνία",
    "calendar_added": "το γεγονός προστέθηκε στο ημερολόγιό σας.",
    "calendar_error": "Δεν ήταν δυνατή η δημιουργία γεγονότος ημερολογίου:",
    "task_scheduled": "Η εργασία προγραμματίστηκε με επιτυχία.",
    "task_reminder": "υπενθύμιση με θέμα",
    "memory_saved": "η ανάμνηση αποθηκεύτηκε στη βάση δεδομένων για τη διεύθυνση του χρήστη.",
    "memory_found": "η ανάμνηση βρέθηκε με την περιγραφή.",
    "memory_not_found": "δεν βρέθηκε ανάμνηση που να ταιριάζει",
    "memory_search_not_found": "Δεν βρέθηκε ανάμνηση που να ταιριάζει με το '{searchText}'.",
    "memory_decrypt_error": "Η ανάμνηση βρέθηκε αλλά δεν ήταν δυνατή η αποκρυπτογράφησή της.",
    "upload_success": "Η Ανάμνηση Κρυπτογραφήθηκε και Αποθηκεύτηκε Μόνιμα με Επιτυχία!",
    "invalid_signature": "Μη έγκυρη υπογραφή. Η επαλήθευση απέτυχε.",
    "missing_info": "Ελλιπείς πληροφορίες: Δεν καθορίστηκε αρχείο, διεύθυνση ή υπογραφή.",
    "server_error": "Παρουσιάστηκε σφάλμα: Σφάλμα διακομιστή",
    "task_missing_time": "Πρέπει να καθορίσετε μια ώρα για να προγραμματίσετε την εργασία.",
    "task_invalid_time": "Μη έγκυρη μορφή ώρας. Παρακαλώ καθορίστε σε μορφή 'HH:MM'.",
    "task_note_subject": "Υπενθύμιση Σημείωσης Coopa: {noteName}",
    "task_note_body": "Το περιεχόμενο της σημείωσης που πρέπει να θυμάστε βρίσκεται παρακάτω:\n\n\"{noteContent}\"",
    "task_file_subject": "Υπενθύμιση Αρχείου Coopa: {attachmentDescription}",
    "task_file_body": "Η ζητούμενη ανάμνηση \"{attachmentDescription}\" έχει επισυναφθεί στο email.",
    "task_error_insufficient_info": "Ανεπαρκείς πληροφορίες για την προγραμματισμένη εργασία (λείπει η σημείωση, το αρχείο ή το περιεχόμενο του email).",
    "task_success_message": "Η εργασία '{taskIdentifier}' προγραμματίστηκε με επιτυχία για τις {time}.",
    "email_attachment_not_found": "(Σημείωση: Η ζητούμενη ανάμνηση \"{attachmentDescription}\" δεν βρέθηκε και επομένως δεν ήταν δυνατή η επισύναψή της στο email.)",
    "task_scheduled_successfully": "Μια εργασία προγραμματίστηκε με επιτυχία",
    "note_retrieved_successfully": "Το περιεχόμενο της σημείωσης ανακτήθηκε με επιτυχία",
    "weather_queried_successfully": "οι πληροφορίες καιρού αναζητήθηκαν με επιτυχία για",
    "note_created_successfully": "η σημείωση δημιουργήθηκε με επιτυχία",
    "note_edited_successfully": "νέο περιεχόμενο προστέθηκε στη σημείωση",
    "time_info_provided": "Οι τρέχουσες πληροφορίες ημερομηνίας και ώρας δόθηκαν στον χρήστη",
    "calendar_event_created": "το γεγονός ημερολογίου δημιουργήθηκε με επιτυχία",
    "memory_found_and_displayed": "βρέθηκε μια ανάμνηση που ταιριάζει με την αναζήτηση και εμφανίστηκε στον χρήστη",
    "email_sent_successfully": "ένα email στάλθηκε με επιτυχία στη διεύθυνση",
    "missing_user_info": "Η διεύθυνση χρήστη ή η υπογραφή δεν στάλθηκε με το αίτημα",
    "prompt_empty": "Το prompt δεν μπορεί να είναι κενό",
    "invalid_ai_response": "Λήφθηκε μη έγκυρη απάντηση από την AI",
    "chatCleared": "Η συνομιλία διαγράφηκε. Μπορείτε να ξεκινήσετε μια νέα συνομιλία."
  },
  sv: {
    "welcome": "Hej! Hur kan jag hjälpa till?",
    "weather_error": "Kunde inte hämta väderinformation för",
    "email_sent": "E-postmeddelandet har skickats:",
    "email_error": "Ett fel uppstod när e-postmeddelandet skickades:",
    "note_saved": "anteckning sparad. Nytt innehåll:",
    "note_not_found": "En anteckning med namnet hittades inte",
    "note_empty": "(anteckningsinnehållet är tomt)",
    "note_db_error": "Ett databasfel uppstod när anteckningen lästes:",
    "current_time": "Aktuell tid är",
    "current_date": "datum",
    "calendar_added": "händelsen har lagts till i din kalender.",
    "calendar_error": "Kunde inte skapa kalenderhändelse:",
    "task_scheduled": "Uppgiften har schemalagts.",
    "task_reminder": "påminnelse med ämne",
    "memory_saved": "minnet sparades i databasen för användaradressen.",
    "memory_found": "minnet hittades med beskrivningen.",
    "memory_not_found": "inget matchande minne hittades",
    "memory_search_not_found": "Inget minne som matchar '{searchText}' hittades.",
    "memory_decrypt_error": "Minnet hittades men kunde inte dekrypteras.",
    "upload_success": "Minnet har krypterats och sparats permanent!",
    "invalid_signature": "Ogiltig signatur. Autentisering misslyckades.",
    "missing_info": "Information saknas: Fil, adress eller signatur har inte angetts.",
    "server_error": "Ett fel uppstod: Serverfel",
    "task_missing_time": "Du måste ange en tid för att schemalägga uppgiften.",
    "task_invalid_time": "Ogiltigt tidsformat. Ange i formatet 'HH:MM'.",
    "task_note_subject": "Coopa-anteckningspåminnelse: {noteName}",
    "task_note_body": "Innehållet i anteckningen du behöver komma ihåg finns nedan:\n\n\"{noteContent}\"",
    "task_file_subject": "Coopa-filpåminnelse: {attachmentDescription}",
    "task_file_body": "Det begärda minnet \"{attachmentDescription}\" har bifogats i e-postmeddelandet.",
    "task_error_insufficient_info": "Otillräcklig information för schemalagd uppgift (anteckning, fil eller e-postinnehåll saknas).",
    "task_success_message": "Uppgiften '{taskIdentifier}' har schemalagts för {time}.",
    "email_attachment_not_found": "(Obs: Det begärda minnet \"{attachmentDescription}\" hittades inte och kunde därför inte bifogas i e-postmeddelandet.)",
    "task_scheduled_successfully": "En uppgift har schemalagts",
    "note_retrieved_successfully": "Anteckningsinnehållet har hämtats",
    "weather_queried_successfully": "väderinformation har efterfrågats för",
    "note_created_successfully": "anteckningen har skapats",
    "note_edited_successfully": "nytt innehåll har lagts till i anteckningen",
    "time_info_provided": "Aktuell datum- och tidsinformation gavs till användaren",
    "calendar_event_created": "kalenderhändelsen har skapats",
    "memory_found_and_displayed": "ett minne som matchar sökningen hittades och visades för användaren",
    "email_sent_successfully": "ett e-postmeddelande har skickats till adressen",
    "missing_user_info": "Användaradress eller signatur skickades inte med begäran",
    "prompt_empty": "Prompten kan inte vara tom",
    "invalid_ai_response": "Ogiltigt svar mottogs från AI",
    "chatCleared": "Chatten har rensats. Du kan starta en ny konversation."
  },
  he: {
    "welcome": "שלום! איך אוכל לעזור?",
    "weather_error": "לא ניתן היה לאחזר מידע על מזג האוויר עבור",
    "email_sent": "האימייל נשלח בהצלחה:",
    "email_error": "אירעה שגיאה בעת שליחת האימייל:",
    "note_saved": "ההערה נשמרה. תוכן חדש:",
    "note_not_found": "לא נמצאה הערה בשם",
    "note_empty": "(תוכן ההערה ריק)",
    "note_db_error": "אירעה שגיאת מסד נתונים בעת קריאת ההערה:",
    "current_time": "השעה הנוכחית היא",
    "current_date": "תאריך",
    "calendar_added": "האירוע נוסף ליומן שלך.",
    "calendar_error": "לא ניתן היה ליצור אירוע ביומן:",
    "task_scheduled": "המשימה נקבעה בהצלחה.",
    "task_reminder": "תזכורת בנושא",
    "memory_saved": "הזיכרון נשמר במסד הנתונים עבור כתובת המשתמש.",
    "memory_found": "הזיכרון נמצא עם התיאור.",
    "memory_not_found": "לא נמצא זיכרון תואם ל",
    "memory_search_not_found": "לא נמצא זיכרון התואם ל-'{searchText}'.",
    "memory_decrypt_error": "הזיכרון נמצא אך לא ניתן היה לפענח אותו.",
    "upload_success": "הזיכרון הוצפן ונשמר לצמיתות בהצלחה!",
    "invalid_signature": "חתימה לא חוקית. האימות נכשל.",
    "missing_info": "מידע חסר: קובץ, כתובת או חתימה לא צוינו.",
    "server_error": "אירעה שגיאה: שגיאת שרת",
    "task_missing_time": "עליך לציין שעה כדי לתזמן את המשימה.",
    "task_invalid_time": "פורמט שעה לא חוקי. אנא ציין בפורמט 'HH:MM'.",
    "task_note_subject": "תזכורת להערה של Coopa: {noteName}",
    "task_note_body": "תוכן ההערה שאתה צריך לזכור נמצא למטה:\n\n\"{noteContent}\"",
    "task_file_subject": "תזכורת לקובץ של Coopa: {attachmentDescription}",
    "task_file_body": "הזיכרון המבוקש \"{attachmentDescription}\" צורף לאימייל.",
    "task_error_insufficient_info": "מידע לא מספיק למשימה המתוזמנת (הערה, קובץ או תוכן אימייל חסרים).",
    "task_success_message": "המשימה '{taskIdentifier}' נקבעה בהצלחה לשעה {time}.",
    "email_attachment_not_found": "(הערה: הזיכרון המבוקש \"{attachmentDescription}\" לא נמצא ולכן לא ניתן היה לצרף אותו לאימייל.)",
    "task_scheduled_successfully": "משימה נקבעה בהצלחה",
    "note_retrieved_successfully": "תוכן ההערה אוחזר בהצלחה",
    "weather_queried_successfully": "מידע על מזג האוויר נשאל בהצלחה עבור",
    "note_created_successfully": "ההערה נוצרה בהצלחה",
    "note_edited_successfully": "תוכן חדש נוסף להערה",
    "time_info_provided": "מידע על התאריך והשעה הנוכחיים נמסר למשתמש",
    "calendar_event_created": "אירוע יומן נוצר בהצלחה",
    "memory_found_and_displayed": "נמצא זיכרון התואם לחיפוש והוצג למשתמש",
    "email_sent_successfully": "אימייל נשלח בהצלחה לכתובת",
    "missing_user_info": "כתובת המשתמש או החתימה לא נשלחו עם הבקשה",
    "prompt_empty": "ההנחיה אינה יכולה להיות ריקה",
    "invalid_ai_response": "התקבלה תגובה לא חוקית מהבינה המלאכותית",
    "chatCleared": "הצ'אט נוקה. אתה יכול להתחיל שיחה חדשה."
  },
  da: {
    "welcome": "Hej! Hvordan kan jeg hjælpe?",
    "weather_error": "Vejroplysninger kunne ikke hentes for",
    "email_sent": "E-mail sendt med succes:",
    "email_error": "Der opstod en fejl under afsendelse af e-mail:",
    "note_saved": "note gemt. Nyt indhold:",
    "note_not_found": "En note med navnet blev ikke fundet",
    "note_empty": "(noteindhold er tomt)",
    "note_db_error": "Der opstod en databasefejl under læsning af noten:",
    "current_time": "Den nuværende tid er",
    "current_date": "dato",
    "calendar_added": "begivenhed er blevet føjet til din kalender.",
    "calendar_error": "Kunne ikke oprette kalenderbegivenhed:",
    "task_scheduled": "Opgave planlagt med succes.",
    "task_reminder": "påmindelse med emne",
    "memory_saved": "minde blev gemt i databasen for brugeradressen.",
    "memory_found": "minde blev fundet med beskrivelsen.",
    "memory_not_found": "intet minde matchende blev fundet",
    "memory_search_not_found": "Et minde, der matcher '{searchText}', blev ikke fundet.",
    "memory_decrypt_error": "Minde fundet, men kunne ikke dekrypteres.",
    "upload_success": "Minde Krypteret og Gemt Permanent med Succes!",
    "invalid_signature": "Ugyldig signatur. Godkendelse mislykkedes.",
    "missing_info": "Manglende oplysninger: Fil, adresse eller signatur ikke angivet.",
    "server_error": "Der opstod en fejl: Serverfejl",
    "task_missing_time": "Du skal angive et tidspunkt for at planlægge opgaven.",
    "task_invalid_time": "Ugyldigt tidsformat. Angiv venligst i 'HH:MM' format.",
    "task_note_subject": "Coopa Note Påmindelse: {noteName}",
    "task_note_body": "Indholdet af den note, du skal huske, er nedenfor:\n\n\"{noteContent}\"",
    "task_file_subject": "Coopa Fil Påmindelse: {attachmentDescription}",
    "task_file_body": "Det anmodede \"{attachmentDescription}\" minde er blevet vedhæftet e-mailen.",
    "task_error_insufficient_info": "Utilstrækkelige oplysninger for planlagt opgave (note, fil eller e-mail-indhold mangler).",
    "task_success_message": "Opgaven '{taskIdentifier}' blev succesfuldt planlagt til {time}.",
    "email_attachment_not_found": "(Bemærk: Det anmodede \"{attachmentDescription}\" minde blev ikke fundet og kunne derfor ikke vedhæftes e-mailen.)",
    "task_scheduled_successfully": "En opgave blev planlagt med succes",
    "note_retrieved_successfully": "Noteindhold hentet med succes",
    "weather_queried_successfully": "vejroplysninger blev spurgt med succes for",
    "note_created_successfully": "note oprettet med succes",
    "note_edited_successfully": "nyt indhold tilføjet til note",
    "time_info_provided": "Nuværende dato- og tidsoplysninger blev givet til brugeren",
    "calendar_event_created": "kalenderbegivenhed oprettet med succes",
    "memory_found_and_displayed": "et minde, der matchede søgningen, blev fundet og vist for brugeren",
    "email_sent_successfully": "en e-mail blev sendt med succes til adressen",
    "missing_user_info": "Brugeradresse eller signatur blev ikke sendt med anmodningen",
    "prompt_empty": "Prompt kan ikke være tom",
    "invalid_ai_response": "Ugyldigt svar modtaget fra AI",
    "chatCleared": "Chat ryddet. Du kan starte en ny samtale."
  },
  fi: {
    "welcome": "Hei! Kuinka voin auttaa?",
    "weather_error": "Säätietoja ei voitu hakea kohteelle",
    "email_sent": "Sähköposti lähetetty onnistuneesti:",
    "email_error": "Sähköpostia lähettäessä tapahtui virhe:",
    "note_saved": "muistiinpano tallennettu. Uusi sisältö:",
    "note_not_found": "Muistiinpanoa nimeltä ei löytynyt",
    "note_empty": "(muistiinpanon sisältö on tyhjä)",
    "note_db_error": "Tietokantavirhe muistiinpanoa lukiessa:",
    "current_time": "Nykyinen kellonaika on",
    "current_date": "päivämäärä",
    "calendar_added": "tapahtuma lisätty kalenteriisi.",
    "calendar_error": "Kalenteritapahtumaa ei voitu luoda:",
    "task_scheduled": "Tehtävä aikataulutettu onnistuneesti.",
    "task_reminder": "muistutus aiheella",
    "memory_saved": "muisto tallennettu tietokantaan käyttäjän osoitteelle.",
    "memory_found": "muisto löydetty kuvauksella.",
    "memory_not_found": "vastaavaa muistoa ei löytynyt",
    "memory_search_not_found": "Muistoa, joka vastaa hakua '{searchText}', ei löytynyt.",
    "memory_decrypt_error": "Muisto löytyi, mutta sen salausta ei voitu purkaa.",
    "upload_success": "Muisto Salattu ja Tallennettu Pysyvästi Onnistuneesti!",
    "invalid_signature": "Virheellinen allekirjoitus. Tunnistautuminen epäonnistui.",
    "missing_info": "Puuttuvia tietoja: Tiedostoa, osoitetta tai allekirjoitusta ei ole määritetty.",
    "server_error": "Tapahtui virhe: Palvelinvirhe",
    "task_missing_time": "Sinun on määritettävä aika tehtävän aikatauluttamiseksi.",
    "task_invalid_time": "Virheellinen aikamuoto. Määritä muodossa 'HH:MM'.",
    "task_note_subject": "Coopa-muistiinpanon muistutus: {noteName}",
    "task_note_body": "Muistettavan muistiinpanon sisältö on alla:\n\n\"{noteContent}\"",
    "task_file_subject": "Coopa-tiedoston muistutus: {attachmentDescription}",
    "task_file_body": "Pyydetty \"{attachmentDescription}\"-muisto on liitetty sähköpostiin.",
    "task_error_insufficient_info": "Riittämättömät tiedot ajoitetulle tehtävälle (muistiinpano, tiedosto tai sähköpostin sisältö puuttuu).",
    "task_success_message": "Tehtävä '{taskIdentifier}' on aikataulutettu onnistuneesti ajalle {time}.",
    "email_attachment_not_found": "(Huom: Pyydettyä \"{attachmentDescription}\"-muistoa ei löytynyt, joten sitä ei voitu liittää sähköpostiin.)",
    "task_scheduled_successfully": "Tehtävä aikataulutettiin onnistuneesti",
    "note_retrieved_successfully": "Muistiinpanon sisältö haettiin onnistuneesti",
    "weather_queried_successfully": "säätiedot kysyttiin onnistuneesti kohteelle",
    "note_created_successfully": "muistiinpano luotiin onnistuneesti",
    "note_edited_successfully": "uutta sisältöä lisättiin muistiinpanoon",
    "time_info_provided": "Nykyiset päivämäärä- ja aikatiedot annettiin käyttäjälle",
    "calendar_event_created": "kalenteritapahtuma luotiin onnistuneesti",
    "memory_found_and_displayed": "hakua vastaava muisto löytyi ja näytettiin käyttäjälle",
    "email_sent_successfully": "sähköposti lähetettiin onnistuneesti osoitteeseen",
    "missing_user_info": "Käyttäjän osoitetta tai allekirjoitusta ei lähetetty pyynnön mukana",
    "prompt_empty": "Kehote ei voi olla tyhjä",
    "invalid_ai_response": "Viallinen vastaus tekoälyltä",
    "chatCleared": "Keskustelu tyhjennetty. Voit aloittaa uuden keskustelun."
  },
  no: {
    "welcome": "Hei! Hvordan kan jeg hjelpe?",
    "weather_error": "Kunne ikke hente værinformasjon for",
    "email_sent": "E-post er sendt:",
    "email_error": "Det oppstod en feil under sending av e-post:",
    "note_saved": "notat lagret. Nytt innhold:",
    "note_not_found": "Fant ikke et notat med navnet",
    "note_empty": "(notatinnhold er tomt)",
    "note_db_error": "Det oppstod en databasefeil under lesing av notatet:",
    "current_time": "Nåværende klokkeslett er",
    "current_date": "dato",
    "calendar_added": "hendelse er lagt til i kalenderen din.",
    "calendar_error": "Kunne ikke opprette kalenderhendelse:",
    "task_scheduled": "Oppgaven er planlagt.",
    "task_reminder": "påminnelse med emne",
    "memory_saved": "minne er lagret i databasen for brukeradressen.",
    "memory_found": "minne funnet med beskrivelsen.",
    "memory_not_found": "fant ingen matchende minne",
    "memory_search_not_found": "Fant ingen minner som samsvarer med '{searchText}'.",
    "memory_decrypt_error": "Minne funnet, men kunne ikke dekrypteres.",
    "upload_success": "Minne Vellykket Kryptert og Permanent Lagret!",
    "invalid_signature": "Ugyldig signatur. Autentisering mislyktes.",
    "missing_info": "Mangler informasjon: Fil, adresse eller signatur er ikke spesifisert.",
    "server_error": "Det oppstod en feil: Serverfeil",
    "task_missing_time": "Du må angi et tidspunkt for å planlegge oppgaven.",
    "task_invalid_time": "Ugyldig tidsformat. Vennligst angi i 'HH:MM'-format.",
    "task_note_subject": "Coopa Notatpåminnelse: {noteName}",
    "task_note_body": "Innholdet i notatet du må huske er nedenfor:\n\n\"{noteContent}\"",
    "task_file_subject": "Coopa Filpåminnelse: {attachmentDescription}",
    "task_file_body": "Det forespurte minnet \"{attachmentDescription}\" er lagt ved e-posten.",
    "task_error_insufficient_info": "Utilstrekkelig informasjon for planlagt oppgave (mangler notat, fil eller e-postinnhold).",
    "task_success_message": "Oppgaven '{taskIdentifier}' er planlagt for {time}.",
    "email_attachment_not_found": "(Merk: Det forespurte minnet \"{attachmentDescription}\" ble ikke funnet og kunne derfor ikke legges ved e-posten.)",
    "task_scheduled_successfully": "En oppgave ble planlagt",
    "note_retrieved_successfully": "Notatinnholdet ble hentet",
    "weather_queried_successfully": "værinformasjon ble spurt for",
    "note_created_successfully": "notatet ble opprettet",
    "note_edited_successfully": "nytt innhold ble lagt til i notatet",
    "time_info_provided": "Gjeldende dato- og klokkeslettinformasjon ble gitt til brukeren",
    "calendar_event_created": "kalenderhendelsen ble opprettet",
    "memory_found_and_displayed": "et minne som samsvarte med søket ble funnet og vist til brukeren",
    "email_sent_successfully": "en e-post ble sendt til adressen",
    "missing_user_info": "Brukeradresse eller signatur ble ikke sendt med forespørselen",
    "prompt_empty": "Prompt kan ikke være tom",
    "invalid_ai_response": "Ugyldig svar mottatt fra AI",
    "chatCleared": "Samtalen er slettet. Du kan starte en ny samtale."
  }
};

// Çeviri fonksiyonu
function t(key, lang = 'tr', replacements = {}) {
    const langKey = lang in translations ? lang : 'tr';
    let text = translations[langKey][key] || key;

    for (const placeholder in replacements) {
        text = text.replace(`{${placeholder}}`, replacements[placeholder]);
    }
    return text;
}

// Dil belirleme fonksiyonu
function getUserLanguage(req) {
    const userSelectedLang = req.body.lang || req.query.lang;
    if (userSelectedLang && translations[userSelectedLang]) {
        return userSelectedLang;
    }
    
    const browserLang = req.headers['accept-language']?.split(',')[0].split('-')[0];
    if (browserLang && translations[browserLang]) {
        return browserLang;
    }
    return 'en'; // varsayılan
}

module.exports = {
    systemInstructions,
    toolsMultilingual,
    t,
    getUserLanguage
};