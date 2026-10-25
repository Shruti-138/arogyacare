import type { Msg } from "./common";

export const landing = {
  badge: { en: "Your health, our priority", hi: "आपकी सेहत, हमारी प्राथमिकता", pa: "ਤੁਹਾਡੀ ਸਿਹਤ, ਸਾਡੀ ਤਰਜੀਹ" },
  hero2_title: {
    en: "Trusted healthcare, closer to you.",
    hi: "भरोसेमंद स्वास्थ्य सेवा, आपके और करीब।",
    pa: "ਭਰੋਸੇਮੰਦ ਸਿਹਤ ਸੇਵਾ, ਤੁਹਾਡੇ ਹੋਰ ਨੇੜੇ।",
  },
  hero2_sub: {
    en: "Find the right doctor, book appointments, and manage your health journey—all in one place.",
    hi: "सही डॉक्टर खोजें, अपॉइंटमेंट बुक करें और अपनी स्वास्थ्य यात्रा को प्रबंधित करें—सब कुछ एक ही जगह।",
    pa: "ਸਹੀ ਡਾਕਟਰ ਲੱਭੋ, ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ ਅਤੇ ਆਪਣੀ ਸਿਹਤ ਯਾਤਰਾ ਦਾ ਪ੍ਰਬੰਧ ਕਰੋ—ਸਭ ਕੁਝ ਇੱਕੋ ਥਾਂ।",
  },
  cta_explore: { en: "Explore Services", hi: "सेवाएँ देखें", pa: "ਸੇਵਾਵਾਂ ਵੇਖੋ" },
  float_1: { en: "Appointments made simple", hi: "अपॉइंटमेंट अब आसान", pa: "ਅਪਾਇੰਟਮੈਂਟ ਹੁਣ ਆਸਾਨ" },
  float_2: { en: "Patient-first care", hi: "मरीज़ पहले की देखभाल", pa: "ਮਰੀਜ਼ ਪਹਿਲਾਂ ਦੀ ਦੇਖਭਾਲ" },

  q1_title: { en: "Find a Specialist", hi: "विशेषज्ञ खोजें", pa: "ਮਾਹਿਰ ਲੱਭੋ" },
  q1_desc: {
    en: "Search from our wide network of experienced doctors.",
    hi: "अनुभवी डॉक्टरों के हमारे विस्तृत नेटवर्क में से खोजें।",
    pa: "ਤਜਰਬੇਕਾਰ ਡਾਕਟਰਾਂ ਦੇ ਸਾਡੇ ਵਿਸ਼ਾਲ ਨੈੱਟਵਰਕ ਵਿੱਚੋਂ ਲੱਭੋ।",
  },
  q2_title: { en: "Book a Visit", hi: "विज़िट बुक करें", pa: "ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ" },
  q2_desc: {
    en: "Choose your preferred date and time, in just a few clicks.",
    hi: "कुछ ही क्लिक में अपनी पसंदीदा तारीख और समय चुनें।",
    pa: "ਕੁਝ ਕਲਿੱਕਾਂ ਵਿੱਚ ਆਪਣੀ ਪਸੰਦ ਦੀ ਤਾਰੀਖ਼ ਅਤੇ ਸਮਾਂ ਚੁਣੋ।",
  },
  q3_title: { en: "Digital Health Records", hi: "डिजिटल हेल्थ रिकॉर्ड", pa: "ਡਿਜੀਟਲ ਹੈਲਥ ਰਿਕਾਰਡ" },
  q3_desc: {
    en: "Access your prescriptions, reports and medical history anytime.",
    hi: "अपने प्रिस्क्रिप्शन, रिपोर्ट और मेडिकल इतिहास कभी भी देखें।",
    pa: "ਆਪਣੇ ਨੁਸਖ਼ੇ, ਰਿਪੋਰਟਾਂ ਅਤੇ ਮੈਡੀਕਲ ਇਤਿਹਾਸ ਕਦੇ ਵੀ ਦੇਖੋ।",
  },
  q4_title: { en: "Follow-up Care", hi: "फॉलो-अप देखभाल", pa: "ਫਾਲੋ-ਅੱਪ ਦੇਖਭਾਲ" },
  q4_desc: {
    en: "Get reminders for medicines, appointments and check-ups.",
    hi: "दवाइयों, अपॉइंटमेंट और चेक-अप के रिमाइंडर पाएँ।",
    pa: "ਦਵਾਈਆਂ, ਅਪਾਇੰਟਮੈਂਟਾਂ ਅਤੇ ਚੈੱਕ-ਅੱਪ ਲਈ ਰਿਮਾਈਂਡਰ ਪ੍ਰਾਪਤ ਕਰੋ।",
  },

  trust_title: {
    en: "Care designed around you",
    hi: "आपको ध्यान में रखकर बनी देखभाल",
    pa: "ਤੁਹਾਡੇ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤੀ ਦੇਖਭਾਲ",
  },
  trust_1_title: { en: "Verified doctors", hi: "सत्यापित डॉक्टर", pa: "ਪ੍ਰਮਾਣਿਤ ਡਾਕਟਰ" },
  trust_1_desc: {
    en: "Qualified & experienced professionals",
    hi: "योग्य और अनुभवी पेशेवर",
    pa: "ਯੋਗ ਅਤੇ ਤਜਰਬੇਕਾਰ ਪੇਸ਼ੇਵਰ",
  },
  trust_2_title: { en: "Secure health records", hi: "सुरक्षित स्वास्थ्य रिकॉर्ड", pa: "ਸੁਰੱਖਿਅਤ ਸਿਹਤ ਰਿਕਾਰਡ" },
  trust_2_desc: {
    en: "Your data, always protected",
    hi: "आपका डेटा, हमेशा सुरक्षित",
    pa: "ਤੁਹਾਡਾ ਡਾਟਾ, ਹਮੇਸ਼ਾ ਸੁਰੱਖਿਅਤ",
  },
  trust_3_title: {
    en: "Easy appointment booking",
    hi: "आसान अपॉइंटमेंट बुकिंग",
    pa: "ਆਸਾਨ ਅਪਾਇੰਟਮੈਂਟ ਬੁਕਿੰਗ",
  },
  trust_3_desc: {
    en: "Save time, get the care you need",
    hi: "समय बचाएँ, ज़रूरी देखभाल पाएँ",
    pa: "ਸਮਾਂ ਬਚਾਓ, ਲੋੜੀਂਦੀ ਦੇਖਭਾਲ ਪ੍ਰਾਪਤ ਕਰੋ",
  },
} satisfies Record<string, Msg>;
