import type { Msg } from "./common";

export const pages7 = {
  in_person: { en: "In-person visit", hi: "व्यक्तिगत विज़िट", pa: "ਆਹਮੋ-ਸਾਹਮਣੇ ਮੁਲਾਕਾਤ" },
  video_call: { en: "Video consultation", hi: "वीडियो परामर्श", pa: "ਵੀਡੀਓ ਸਲਾਹ-ਮਸ਼ਵਰਾ" },
  video_hint: {
    en: "A Join button appears on your appointment page shortly before the time.",
    hi: "समय से कुछ पहले आपके अपॉइंटमेंट पेज पर जुड़ने का बटन दिखेगा।",
    pa: "ਸਮੇਂ ਤੋਂ ਕੁਝ ਪਹਿਲਾਂ ਤੁਹਾਡੇ ਅਪਾਇੰਟਮੈਂਟ ਪੰਨੇ ਉੱਤੇ ਜੁੜਨ ਦਾ ਬਟਨ ਦਿਖੇਗਾ।",
  },
  join_call: { en: "Join video call", hi: "वीडियो कॉल से जुड़ें", pa: "ਵੀਡੀਓ ਕਾਲ ਨਾਲ ਜੁੜੋ" },
  online_badge: { en: "Video", hi: "वीडियो", pa: "ਵੀਡੀਓ" },
  join_later: {
    en: "The video call opens 15 minutes before the appointment.",
    hi: "वीडियो कॉल अपॉइंटमेंट से 15 मिनट पहले खुलती है।",
    pa: "ਵੀਡੀਓ ਕਾਲ ਅਪਾਇੰਟਮੈਂਟ ਤੋਂ 15 ਮਿੰਟ ਪਹਿਲਾਂ ਖੁੱਲ੍ਹਦੀ ਹੈ।",
  },
} satisfies Record<string, Msg>;
