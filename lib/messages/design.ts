import type { Msg } from "./common";

export const design = {
  hero_a: { en: "Trusted healthcare,", hi: "भरोसेमंद स्वास्थ्य सेवा,", pa: "ਭਰੋਸੇਮੰਦ ਸਿਹਤ ਸੇਵਾ," },
  hero_b: { en: "closer to you.", hi: "आपके और करीब।", pa: "ਤੁਹਾਡੇ ਹੋਰ ਨੇੜੇ।" },
  mock_welcome: { en: "Welcome", hi: "स्वागत है", pa: "ਜੀ ਆਇਆਂ ਨੂੰ" },
  mock_headline: { en: "Find your doctor", hi: "अपना डॉक्टर खोजें", pa: "ਆਪਣਾ ਡਾਕਟਰ ਲੱਭੋ" },
  mock_status: {
    en: "Open slots available today",
    hi: "आज खाली स्लॉट उपलब्ध हैं",
    pa: "ਅੱਜ ਖਾਲੀ ਸਲਾਟ ਉਪਲਬਧ ਹਨ",
  },
  mock_t1: { en: "Find doctors", hi: "डॉक्टर खोजें", pa: "ਡਾਕਟਰ ਲੱਭੋ" },
  mock_t2: { en: "Appointments", hi: "अपॉइंटमेंट", pa: "ਅਪਾਇੰਟਮੈਂਟਾਂ" },
  mock_t3: { en: "Prescriptions", hi: "प्रिस्क्रिप्शन", pa: "ਨੁਸਖ਼ੇ" },
  mock_t4: { en: "Health records", hi: "हेल्थ रिकॉर्ड", pa: "ਹੈਲਥ ਰਿਕਾਰਡ" },
  mock_upcoming: { en: "Upcoming", hi: "आगामी", pa: "ਆਉਣ ਵਾਲੀ" },
  mock_i1_title: {
    en: "Appointment confirmed",
    hi: "अपॉइंटमेंट की पुष्टि हुई",
    pa: "ਅਪਾਇੰਟਮੈਂਟ ਦੀ ਪੁਸ਼ਟੀ ਹੋਈ",
  },
  mock_i1_sub: {
    en: "Dr. Neha Sharma · Cardiology",
    hi: "डॉ. नेहा शर्मा · हृदय रोग",
    pa: "ਡਾ. ਨੇਹਾ ਸ਼ਰਮਾ · ਦਿਲ ਦੇ ਰੋਗ",
  },
  mock_i1_btn: { en: "View", hi: "देखें", pa: "ਵੇਖੋ" },
  mock_i2_title: { en: "Prescription ready", hi: "प्रिस्क्रिप्शन तैयार", pa: "ਨੁਸਖ਼ਾ ਤਿਆਰ" },
  mock_i2_sub: {
    en: "Tap to read",
    hi: "पढ़ने के लिए टैप करें",
    pa: "ਪੜ੍ਹਨ ਲਈ ਟੈਪ ਕਰੋ",
  },
} satisfies Record<string, Msg>;
