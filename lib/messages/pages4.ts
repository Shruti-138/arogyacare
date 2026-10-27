import type { Msg } from "./common";

export const pages4 = {
  appts_title: { en: "My Appointments", hi: "मेरी अपॉइंटमेंट", pa: "ਮੇਰੀਆਂ ਅਪਾਇੰਟਮੈਂਟਾਂ" },
  appts_sub: {
    en: "See your upcoming and past visits.",
    hi: "अपनी आगामी और पिछली विज़िट देखें।",
    pa: "ਆਪਣੀਆਂ ਆਉਣ ਵਾਲੀਆਂ ਅਤੇ ਪਿਛਲੀਆਂ ਮੁਲਾਕਾਤਾਂ ਦੇਖੋ।",
  },
  upcoming: { en: "Upcoming", hi: "आगामी", pa: "ਆਉਣ ਵਾਲੀਆਂ" },
  past: { en: "Past", hi: "पिछली", pa: "ਪਿਛਲੀਆਂ" },
  no_upcoming: {
    en: "You have no upcoming appointments.",
    hi: "आपकी कोई आगामी अपॉइंटमेंट नहीं है।",
    pa: "ਤੁਹਾਡੀ ਕੋਈ ਆਉਣ ਵਾਲੀ ਅਪਾਇੰਟਮੈਂਟ ਨਹੀਂ ਹੈ।",
  },
  find_doc: { en: "Find a doctor", hi: "डॉक्टर खोजें", pa: "ਡਾਕਟਰ ਲੱਭੋ" },
  cancel: { en: "Cancel", hi: "रद्द करें", pa: "ਰੱਦ ਕਰੋ" },
  only_patients: {
    en: "Only patient accounts have this page.",
    hi: "यह पेज केवल मरीज़ खातों के लिए है।",
    pa: "ਇਹ ਪੰਨਾ ਸਿਰਫ਼ ਮਰੀਜ਼ ਖਾਤਿਆਂ ਲਈ ਹੈ।",
  },
  no_profile: {
    en: "Patient profile not found.",
    hi: "मरीज़ प्रोफ़ाइल नहीं मिली।",
    pa: "ਮਰੀਜ਼ ਪ੍ਰੋਫਾਈਲ ਨਹੀਂ ਮਿਲੀ।",
  },
  st_pending: { en: "Pending", hi: "लंबित", pa: "ਬਾਕੀ" },
  st_confirmed: { en: "Confirmed", hi: "पुष्टि हो गई", pa: "ਪੁਸ਼ਟੀ ਹੋਈ" },
  st_completed: { en: "Completed", hi: "पूरी हुई", pa: "ਪੂਰੀ ਹੋਈ" },
  st_cancelled: { en: "Cancelled", hi: "रद्द", pa: "ਰੱਦ" },
  rx_title: { en: "My Prescriptions", hi: "मेरे प्रिस्क्रिप्शन", pa: "ਮੇਰੇ ਨੁਸਖ਼ੇ" },
  rx_sub: {
    en: "Prescriptions from your doctors appear here.",
    hi: "आपके डॉक्टरों के प्रिस्क्रिप्शन यहाँ दिखते हैं।",
    pa: "ਤੁਹਾਡੇ ਡਾਕਟਰਾਂ ਦੇ ਨੁਸਖ਼ੇ ਇੱਥੇ ਦਿਖਾਈ ਦਿੰਦੇ ਹਨ।",
  },
  rx_none: {
    en: "You have no prescriptions yet. They appear here after a doctor completes your visit.",
    hi: "अभी आपका कोई प्रिस्क्रिप्शन नहीं है। डॉक्टर के विज़िट पूरी करने के बाद वे यहाँ दिखेंगे।",
    pa: "ਹਾਲੇ ਤੁਹਾਡਾ ਕੋਈ ਨੁਸਖ਼ਾ ਨਹੀਂ ਹੈ। ਡਾਕਟਰ ਵੱਲੋਂ ਮੁਲਾਕਾਤ ਪੂਰੀ ਕਰਨ ਤੋਂ ਬਾਅਦ ਇਹ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੇ।",
  },
  medicines: { en: "Medicines", hi: "दवाइयाँ", pa: "ਦਵਾਈਆਂ" },
  notes: { en: "Notes", hi: "नोट्स", pa: "ਨੋਟਸ" },
} satisfies Record<string, Msg>;
