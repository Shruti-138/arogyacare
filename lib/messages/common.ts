export type Msg = { en: string; hi: string; pa: string };

export const common = {
  tagline: {
    en: "Care That Connects",
    hi: "देखभाल जो जोड़ती है",
    pa: "ਦੇਖਭਾਲ ਜੋ ਜੋੜਦੀ ਹੈ",
  },
  nav_doctors: { en: "Doctors", hi: "डॉक्टर", pa: "ਡਾਕਟਰ" },
  nav_appointments: {
    en: "My appointments",
    hi: "मेरी अपॉइंटमेंट",
    pa: "ਮੇਰੀਆਂ ਅਪਾਇੰਟਮੈਂਟਾਂ",
  },
  nav_prescriptions: {
    en: "Prescriptions",
    hi: "प्रिस्क्रिप्शन",
    pa: "ਨੁਸਖ਼ੇ",
  },
  nav_dashboard: { en: "Dashboard", hi: "डैशबोर्ड", pa: "ਡੈਸ਼ਬੋਰਡ" },
  nav_admin: { en: "Admin", hi: "एडमिन", pa: "ਐਡਮਿਨ" },
  sign_in: { en: "Sign in", hi: "साइन इन", pa: "ਸਾਈਨ ਇਨ" },
  register: { en: "Register", hi: "रजिस्टर करें", pa: "ਰਜਿਸਟਰ ਕਰੋ" },
  sign_out: { en: "Sign out", hi: "साइन आउट", pa: "ਸਾਈਨ ਆਉਟ" },
  language: { en: "Language", hi: "भाषा", pa: "ਭਾਸ਼ਾ" },
} satisfies Record<string, Msg>;
