import type { Msg } from "./common";

export const bookMsgs = {
  e_only_patients: {
    en: "Only patients can book appointments.",
    hi: "केवल मरीज़ अपॉइंटमेंट बुक कर सकते हैं।",
    pa: "ਸਿਰਫ਼ ਮਰੀਜ਼ ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰ ਸਕਦੇ ਹਨ।",
  },
  e_no_patient: {
    en: "Patient profile not found.",
    hi: "मरीज़ प्रोफ़ाइल नहीं मिली।",
    pa: "ਮਰੀਜ਼ ਪ੍ਰੋਫਾਈਲ ਨਹੀਂ ਮਿਲੀ।",
  },
  e_bad_slot: {
    en: "Invalid time slot.",
    hi: "समय स्लॉट मान्य नहीं है।",
    pa: "ਸਮਾਂ ਸਲਾਟ ਸਹੀ ਨਹੀਂ ਹੈ।",
  },
  e_no_doctor: {
    en: "Doctor not found.",
    hi: "डॉक्टर नहीं मिला।",
    pa: "ਡਾਕਟਰ ਨਹੀਂ ਮਿਲਿਆ।",
  },
  e_not_schedule: {
    en: "This time is not in the doctor's schedule.",
    hi: "यह समय डॉक्टर के शेड्यूल में नहीं है।",
    pa: "ਇਹ ਸਮਾਂ ਡਾਕਟਰ ਦੇ ਸ਼ਡਿਊਲ ਵਿੱਚ ਨਹੀਂ ਹੈ।",
  },
  e_passed: {
    en: "This time has already passed.",
    hi: "यह समय बीत चुका है।",
    pa: "ਇਹ ਸਮਾਂ ਲੰਘ ਚੁੱਕਾ ਹੈ।",
  },
  e_taken: {
    en: "Sorry, this slot was just booked. Please pick another.",
    hi: "क्षमा करें, यह स्लॉट अभी बुक हो गया है। कृपया कोई और चुनें।",
    pa: "ਮਾਫ਼ ਕਰਨਾ, ਇਹ ਸਲਾਟ ਹੁਣੇ ਬੁੱਕ ਹੋ ਗਿਆ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਕੋਈ ਹੋਰ ਚੁਣੋ।",
  },
  m_subject: {
    en: "Appointment confirmed with {doctor}",
    hi: "{doctor} के साथ अपॉइंटमेंट की पुष्टि हुई",
    pa: "{doctor} ਨਾਲ ਅਪਾਇੰਟਮੈਂਟ ਦੀ ਪੁਸ਼ਟੀ ਹੋਈ",
  },
  m_hello: { en: "Hello {name},", hi: "नमस्ते {name},", pa: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ {name}," },
  m_confirmed: {
    en: "Your appointment is confirmed.",
    hi: "आपकी अपॉइंटमेंट की पुष्टि हो गई है।",
    pa: "ਤੁਹਾਡੀ ਅਪਾਇੰਟਮੈਂਟ ਦੀ ਪੁਸ਼ਟੀ ਹੋ ਗਈ ਹੈ।",
  },
  m_doctor: { en: "Doctor", hi: "डॉक्टर", pa: "ਡਾਕਟਰ" },
  m_hospital: { en: "Hospital", hi: "अस्पताल", pa: "ਹਸਪਤਾਲ" },
  m_date: { en: "Date", hi: "तारीख", pa: "ਤਾਰੀਖ਼" },
  m_time: { en: "Time", hi: "समय", pa: "ਸਮਾਂ" },
  m_type: { en: "Type", hi: "प्रकार", pa: "ਕਿਸਮ" },
  m_cancel_hint: {
    en: "To cancel, sign in and open My appointments.",
    hi: "रद्द करने के लिए साइन इन करें और मेरी अपॉइंटमेंट खोलें।",
    pa: "ਰੱਦ ਕਰਨ ਲਈ ਸਾਈਨ ਇਨ ਕਰੋ ਅਤੇ ਮੇਰੀਆਂ ਅਪਾਇੰਟਮੈਂਟਾਂ ਖੋਲ੍ਹੋ।",
  },
} satisfies Record<string, Msg>;
