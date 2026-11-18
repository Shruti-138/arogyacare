import type { Msg } from "./common";

export const reminders = {
  rem_title: {
    en: "Appointment reminder",
    hi: "अपॉइंटमेंट रिमाइंडर",
    pa: "ਅਪਾਇੰਟਮੈਂਟ ਰਿਮਾਈਂਡਰ",
  },
  rem_text: {
    en: "You have an appointment with {doctor} {when} at {time}.",
    hi: "{doctor} के साथ आपकी अपॉइंटमेंट {when} {time} पर है।",
    pa: "{doctor} ਨਾਲ ਤੁਹਾਡੀ ਅਪਾਇੰਟਮੈਂਟ {when} {time} ਉੱਤੇ ਹੈ।",
  },
  when_today: { en: "today", hi: "आज", pa: "ਅੱਜ" },
  when_tomorrow: { en: "tomorrow", hi: "कल", pa: "ਕੱਲ੍ਹ" },
  rem_view: {
    en: "View appointments",
    hi: "अपॉइंटमेंट देखें",
    pa: "ਅਪਾਇੰਟਮੈਂਟਾਂ ਵੇਖੋ",
  },
} satisfies Record<string, Msg>;
