import type { Msg } from "./common";

export const pages2 = {
  back: { en: "All doctors", hi: "सभी डॉक्टर", pa: "ਸਾਰੇ ਡਾਕਟਰ" },
  choose_day: { en: "Choose a day", hi: "दिन चुनें", pa: "ਦਿਨ ਚੁਣੋ" },
  slots_on: {
    en: "Available slots on {day}",
    hi: "{day} के उपलब्ध स्लॉट",
    pa: "{day} ਦੇ ਉਪਲਬਧ ਸਲਾਟ",
  },
  tap_hint: {
    en: "Tap a time to book it.",
    hi: "बुक करने के लिए समय पर टैप करें।",
    pa: "ਬੁੱਕ ਕਰਨ ਲਈ ਸਮੇਂ ਉੱਤੇ ਟੈਪ ਕਰੋ।",
  },
  no_slots: {
    en: "No slots available on this day. Please choose another day.",
    hi: "इस दिन कोई स्लॉट उपलब्ध नहीं है। कृपया कोई और दिन चुनें।",
    pa: "ਇਸ ਦਿਨ ਕੋਈ ਸਲਾਟ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਕੋਈ ਹੋਰ ਦਿਨ ਚੁਣੋ।",
  },
  signin_note: {
    en: "Sign in as a patient to book a slot.",
    hi: "स्लॉट बुक करने के लिए मरीज़ के रूप में साइन इन करें।",
    pa: "ਸਲਾਟ ਬੁੱਕ ਕਰਨ ਲਈ ਮਰੀਜ਼ ਵਜੋਂ ਸਾਈਨ ਇਨ ਕਰੋ।",
  },
  only_patients: {
    en: "Only patient accounts can book appointments.",
    hi: "केवल मरीज़ खाते अपॉइंटमेंट बुक कर सकते हैं।",
    pa: "ਸਿਰਫ਼ ਮਰੀਜ਼ ਖਾਤੇ ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰ ਸਕਦੇ ਹਨ।",
  },
  booked_msg: {
    en: "Your appointment is booked for {day} at {time}.",
    hi: "आपकी अपॉइंटमेंट {day} को {time} के लिए बुक हो गई है।",
    pa: "ਤੁਹਾਡੀ ਅਪਾਇੰਟਮੈਂਟ {day} ਨੂੰ {time} ਲਈ ਬੁੱਕ ਹੋ ਗਈ ਹੈ।",
  },
} satisfies Record<string, Msg>;
