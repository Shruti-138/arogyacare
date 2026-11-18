import type { Msg } from "./common";

export const mails = {
  c_subject: {
    en: "Appointment cancelled with {doctor}",
    hi: "{doctor} के साथ अपॉइंटमेंट रद्द की गई",
    pa: "{doctor} ਨਾਲ ਅਪਾਇੰਟਮੈਂਟ ਰੱਦ ਕੀਤੀ ਗਈ",
  },
  c_body: {
    en: "Your appointment has been cancelled.",
    hi: "आपकी अपॉइंटमेंट रद्द कर दी गई है।",
    pa: "ਤੁਹਾਡੀ ਅਪਾਇੰਟਮੈਂਟ ਰੱਦ ਕਰ ਦਿੱਤੀ ਗਈ ਹੈ।",
  },
  c_again: {
    en: "You can book a new appointment any time.",
    hi: "आप कभी भी नई अपॉइंटमेंट बुक कर सकते हैं।",
    pa: "ਤੁਸੀਂ ਕਦੇ ਵੀ ਨਵੀਂ ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰ ਸਕਦੇ ਹੋ।",
  },
  l_subject: {
    en: "Your lab report is ready: {test}",
    hi: "आपकी लैब रिपोर्ट तैयार है: {test}",
    pa: "ਤੁਹਾਡੀ ਲੈਬ ਰਿਪੋਰਟ ਤਿਆਰ ਹੈ: {test}",
  },
  l_body: {
    en: "{doctor} has added a lab report to your account: {test}.",
    hi: "{doctor} ने आपके खाते में लैब रिपोर्ट जोड़ी है: {test}।",
    pa: "{doctor} ਨੇ ਤੁਹਾਡੇ ਖਾਤੇ ਵਿੱਚ ਲੈਬ ਰਿਪੋਰਟ ਜੋੜੀ ਹੈ: {test}।",
  },
  l_open: {
    en: "Sign in and open Lab reports to read it.",
    hi: "इसे पढ़ने के लिए साइन इन करें और लैब रिपोर्ट खोलें।",
    pa: "ਇਸਨੂੰ ਪੜ੍ਹਨ ਲਈ ਸਾਈਨ ਇਨ ਕਰੋ ਅਤੇ ਲੈਬ ਰਿਪੋਰਟਾਂ ਖੋਲ੍ਹੋ।",
  },
} satisfies Record<string, Msg>;
