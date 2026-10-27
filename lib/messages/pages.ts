import type { Msg } from "./common";

export const pages = {
  doctors_title: { en: "Find your doctor", hi: "अपना डॉक्टर खोजें", pa: "ਆਪਣਾ ਡਾਕਟਰ ਲੱਭੋ" },
  doctors_sub: {
    en: "Search by name or specialty, then book a time that suits you.",
    hi: "नाम या विशेषज्ञता से खोजें, फिर अपने अनुकूल समय बुक करें।",
    pa: "ਨਾਮ ਜਾਂ ਵਿਸ਼ੇਸ਼ਤਾ ਨਾਲ ਲੱਭੋ, ਫਿਰ ਆਪਣੇ ਅਨੁਕੂਲ ਸਮਾਂ ਬੁੱਕ ਕਰੋ।",
  },
  search_ph: {
    en: "Search doctors or specialties...",
    hi: "डॉक्टर या विशेषज्ञता खोजें...",
    pa: "ਡਾਕਟਰ ਜਾਂ ਵਿਸ਼ੇਸ਼ਤਾ ਲੱਭੋ...",
  },
  all_spec: { en: "All specialties", hi: "सभी विशेषज्ञताएँ", pa: "ਸਾਰੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ" },
  search_btn: { en: "Search", hi: "खोजें", pa: "ਲੱਭੋ" },
  clear: { en: "Clear", hi: "साफ़ करें", pa: "ਸਾਫ਼ ਕਰੋ" },
  available: { en: "Available doctors", hi: "उपलब्ध डॉक्टर", pa: "ਉਪਲਬਧ ਡਾਕਟਰ" },
  none: {
    en: "No doctors match your search. Try a different name or specialty.",
    hi: "आपकी खोज से कोई डॉक्टर मेल नहीं खाता। कोई दूसरा नाम या विशेषज्ञता आज़माएँ।",
    pa: "ਤੁਹਾਡੀ ਖੋਜ ਨਾਲ ਕੋਈ ਡਾਕਟਰ ਮੇਲ ਨਹੀਂ ਖਾਂਦਾ। ਕੋਈ ਹੋਰ ਨਾਮ ਜਾਂ ਵਿਸ਼ੇਸ਼ਤਾ ਅਜ਼ਮਾਓ।",
  },
  years: { en: "years of experience", hi: "वर्ष का अनुभव", pa: "ਸਾਲ ਦਾ ਤਜਰਬਾ" },
  view_book: {
    en: "View profile & book",
    hi: "प्रोफ़ाइल देखें और बुक करें",
    pa: "ਪ੍ਰੋਫਾਈਲ ਵੇਖੋ ਅਤੇ ਬੁੱਕ ਕਰੋ",
  },
} satisfies Record<string, Msg>;
