import type { Msg } from "./common";

export const pages11 = {
  enq_title: { en: "Ask a Question", hi: "प्रश्न पूछें", pa: "ਸਵਾਲ ਪੁੱਛੋ" },
  enq_sub: {
    en: "Send your question about a doctor. The doctor or hospital team will reply to you.",
    hi: "किसी डॉक्टर के बारे में अपना प्रश्न भेजें। डॉक्टर या अस्पताल की टीम आपको जवाब देगी।",
    pa: "ਕਿਸੇ ਡਾਕਟਰ ਬਾਰੇ ਆਪਣਾ ਸਵਾਲ ਭੇਜੋ। ਡਾਕਟਰ ਜਾਂ ਹਸਪਤਾਲ ਦੀ ਟੀਮ ਤੁਹਾਨੂੰ ਜਵਾਬ ਦੇਵੇਗੀ।",
  },
  enq_doctor: { en: "Which doctor is this about?", hi: "यह किस डॉक्टर के बारे में है?", pa: "ਇਹ ਕਿਸ ਡਾਕਟਰ ਬਾਰੇ ਹੈ?" },
  enq_general: { en: "General question (no specific doctor)", hi: "सामान्य प्रश्न (कोई विशेष डॉक्टर नहीं)", pa: "ਆਮ ਸਵਾਲ (ਕੋਈ ਖ਼ਾਸ ਡਾਕਟਰ ਨਹੀਂ)" },
  enq_name: { en: "Your name", hi: "आपका नाम", pa: "ਤੁਹਾਡਾ ਨਾਮ" },
  enq_email: { en: "Your email", hi: "आपका ईमेल", pa: "ਤੁਹਾਡੀ ਈਮੇਲ" },
  enq_phone: { en: "Phone (optional)", hi: "फ़ोन (वैकल्पिक)", pa: "ਫ਼ੋਨ (ਵਿਕਲਪਿਕ)" },
  enq_message: { en: "Your question", hi: "आपका प्रश्न", pa: "ਤੁਹਾਡਾ ਸਵਾਲ" },
  enq_send: { en: "Send enquiry", hi: "प्रश्न भेजें", pa: "ਸਵਾਲ ਭੇਜੋ" },
  enq_sent_title: { en: "Enquiry sent", hi: "प्रश्न भेज दिया गया", pa: "ਸਵਾਲ ਭੇਜ ਦਿੱਤਾ ਗਿਆ" },
  enq_sent_text: {
    en: "Thank you. We will reply to your email soon.",
    hi: "धन्यवाद। हम जल्द ही आपके ईमेल पर जवाब देंगे।",
    pa: "ਧੰਨਵਾਦ। ਅਸੀਂ ਜਲਦੀ ਹੀ ਤੁਹਾਡੀ ਈਮੇਲ ਤੇ ਜਵਾਬ ਦੇਵਾਂਗੇ।",
  },
  enq_error: {
    en: "Please enter your name, a valid email and a question of at least 5 characters.",
    hi: "कृपया अपना नाम, सही ईमेल और कम से कम 5 अक्षरों का प्रश्न लिखें।",
    pa: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਨਾਮ, ਸਹੀ ਈਮੇਲ ਅਤੇ ਘੱਟੋ-ਘੱਟ 5 ਅੱਖਰਾਂ ਦਾ ਸਵਾਲ ਲਿਖੋ।",
  },
  enq_another: { en: "Send another question", hi: "एक और प्रश्न भेजें", pa: "ਇੱਕ ਹੋਰ ਸਵਾਲ ਭੇਜੋ" },
} satisfies Record<string, Msg>;
