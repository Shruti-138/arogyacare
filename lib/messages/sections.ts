import type { Msg } from "./common";

export const sections = {
  net_badge: { en: "The ArogyaCare network", hi: "आरोग्यकेयर नेटवर्क", pa: "ਆਰੋਗਿਆਕੇਅਰ ਨੈੱਟਵਰਕ" },
  net_title: { en: "Care that reaches everyone", hi: "हर किसी तक पहुँचती देखभाल", pa: "ਹਰ ਕਿਸੇ ਤੱਕ ਪਹੁੰਚਦੀ ਦੇਖਭਾਲ" },
  net_sub: {
    en: "ArogyaCare brings patients, doctors and hospitals together on one platform, so getting care is simpler for everyone.",
    hi: "आरोग्यकेयर मरीज़ों, डॉक्टरों और अस्पतालों को एक ही प्लेटफ़ॉर्म पर लाता है, ताकि इलाज पाना सबके लिए आसान हो।",
    pa: "ਆਰੋਗਿਆਕੇਅਰ ਮਰੀਜ਼ਾਂ, ਡਾਕਟਰਾਂ ਅਤੇ ਹਸਪਤਾਲਾਂ ਨੂੰ ਇੱਕੋ ਪਲੇਟਫਾਰਮ ਉੱਤੇ ਲਿਆਉਂਦਾ ਹੈ, ਤਾਂ ਜੋ ਇਲਾਜ ਪ੍ਰਾਪਤ ਕਰਨਾ ਸਭ ਲਈ ਆਸਾਨ ਹੋਵੇ।",
  },
  aud_patient_sub: {
    en: "Find a doctor, book a slot and keep your records in one place.",
    hi: "डॉक्टर खोजें, स्लॉट बुक करें और अपने रिकॉर्ड एक ही जगह रखें।",
    pa: "ਡਾਕਟਰ ਲੱਭੋ, ਸਲਾਟ ਬੁੱਕ ਕਰੋ ਅਤੇ ਆਪਣੇ ਰਿਕਾਰਡ ਇੱਕੋ ਥਾਂ ਰੱਖੋ।",
  },
  aud_doctor_sub: {
    en: "Spend your time on patients, not paperwork.",
    hi: "अपना समय कागज़ी कार्रवाई पर नहीं, मरीज़ों पर लगाएँ।",
    pa: "ਆਪਣਾ ਸਮਾਂ ਕਾਗਜ਼ੀ ਕਾਰਵਾਈ ਉੱਤੇ ਨਹੀਂ, ਮਰੀਜ਼ਾਂ ਉੱਤੇ ਲਗਾਓ।",
  },
  aud_hospital_sub: {
    en: "Run your hospital's appointments from one dashboard.",
    hi: "अपने अस्पताल की अपॉइंटमेंट एक ही डैशबोर्ड से संभालें।",
    pa: "ਆਪਣੇ ਹਸਪਤਾਲ ਦੀਆਂ ਅਪਾਇੰਟਮੈਂਟਾਂ ਇੱਕੋ ਡੈਸ਼ਬੋਰਡ ਤੋਂ ਸੰਭਾਲੋ।",
  },
  aud_cta_doctor: { en: "Doctor sign in", hi: "डॉक्टर साइन इन", pa: "ਡਾਕਟਰ ਸਾਈਨ ਇਨ" },
  aud_cta_hospital: { en: "Hospital sign in", hi: "अस्पताल साइन इन", pa: "ਹਸਪਤਾਲ ਸਾਈਨ ਇਨ" },

  flow_title: { en: "From booking to prescription", hi: "बुकिंग से प्रिस्क्रिप्शन तक", pa: "ਬੁਕਿੰਗ ਤੋਂ ਨੁਸਖ਼ੇ ਤੱਕ" },
  flow_1: { en: "The patient books a slot online", hi: "मरीज़ ऑनलाइन स्लॉट बुक करता है", pa: "ਮਰੀਜ਼ ਔਨਲਾਈਨ ਸਲਾਟ ਬੁੱਕ ਕਰਦਾ ਹੈ" },
  flow_2: { en: "The doctor sees the booking on the dashboard", hi: "डॉक्टर डैशबोर्ड पर बुकिंग देखता है", pa: "ਡਾਕਟਰ ਡੈਸ਼ਬੋਰਡ ਉੱਤੇ ਬੁਕਿੰਗ ਦੇਖਦਾ ਹੈ" },
  flow_3: { en: "The consultation takes place", hi: "परामर्श होता है", pa: "ਸਲਾਹ-ਮਸ਼ਵਰਾ ਹੁੰਦਾ ਹੈ" },
  flow_4: {
    en: "A digital prescription reaches the patient's account",
    hi: "डिजिटल प्रिस्क्रिप्शन मरीज़ के खाते में पहुँचता है",
    pa: "ਡਿਜੀਟਲ ਨੁਸਖ਼ਾ ਮਰੀਜ਼ ਦੇ ਖਾਤੇ ਵਿੱਚ ਪਹੁੰਚਦਾ ਹੈ",
  },

  hiw_badge: { en: "How it works", hi: "यह कैसे काम करता है", pa: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ" },
  hiw_title: { en: "Get started in four steps", hi: "चार चरणों में शुरू करें", pa: "ਚਾਰ ਪੜਾਵਾਂ ਵਿੱਚ ਸ਼ੁਰੂ ਕਰੋ" },
  hiw_sub: {
    en: "From sign-up to your first appointment.",
    hi: "साइन-अप से लेकर आपकी पहली अपॉइंटमेंट तक।",
    pa: "ਸਾਈਨ-ਅੱਪ ਤੋਂ ਲੈ ਕੇ ਤੁਹਾਡੀ ਪਹਿਲੀ ਅਪਾਇੰਟਮੈਂਟ ਤੱਕ।",
  },
  hiw_1_title: { en: "Create your account", hi: "अपना खाता बनाएँ", pa: "ਆਪਣਾ ਖਾਤਾ ਬਣਾਓ" },
  hiw_1_desc: {
    en: "Register as a patient with your name, email and phone.",
    hi: "अपने नाम, ईमेल और फ़ोन से मरीज़ के रूप में रजिस्टर करें।",
    pa: "ਆਪਣੇ ਨਾਮ, ਈਮੇਲ ਅਤੇ ਫ਼ੋਨ ਨਾਲ ਮਰੀਜ਼ ਵਜੋਂ ਰਜਿਸਟਰ ਕਰੋ।",
  },
  hiw_2_title: { en: "Find a doctor", hi: "डॉक्टर खोजें", pa: "ਡਾਕਟਰ ਲੱਭੋ" },
  hiw_2_desc: {
    en: "Search by name or specialty and open the doctor's profile.",
    hi: "नाम या विशेषज्ञता से खोजें और डॉक्टर की प्रोफ़ाइल खोलें।",
    pa: "ਨਾਮ ਜਾਂ ਵਿਸ਼ੇਸ਼ਤਾ ਨਾਲ ਲੱਭੋ ਅਤੇ ਡਾਕਟਰ ਦੀ ਪ੍ਰੋਫਾਈਲ ਖੋਲ੍ਹੋ।",
  },
  hiw_3_title: { en: "Pick a time slot", hi: "समय स्लॉट चुनें", pa: "ਸਮਾਂ ਸਲਾਟ ਚੁਣੋ" },
  hiw_3_desc: {
    en: "Choose a day and an open time that suits you.",
    hi: "अपने अनुकूल दिन और खाली समय चुनें।",
    pa: "ਆਪਣੇ ਅਨੁਕੂਲ ਦਿਨ ਅਤੇ ਖਾਲੀ ਸਮਾਂ ਚੁਣੋ।",
  },
  hiw_4_title: { en: "Get care and records", hi: "इलाज और रिकॉर्ड पाएँ", pa: "ਇਲਾਜ ਅਤੇ ਰਿਕਾਰਡ ਪ੍ਰਾਪਤ ਕਰੋ" },
  hiw_4_desc: {
    en: "Visit the doctor and find your prescription in your account.",
    hi: "डॉक्टर से मिलें और अपना प्रिस्क्रिप्शन अपने खाते में पाएँ।",
    pa: "ਡਾਕਟਰ ਨੂੰ ਮਿਲੋ ਅਤੇ ਆਪਣਾ ਨੁਸਖ਼ਾ ਆਪਣੇ ਖਾਤੇ ਵਿੱਚ ਲੱਭੋ।",
  },
} satisfies Record<string, Msg>;
