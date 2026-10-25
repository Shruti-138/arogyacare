export type Msg = { en: string; hi: string; pa: string };

export const common = {
  tagline: { en: "Care That Connects", hi: "देखभाल जो जोड़ती है", pa: "ਦੇਖਭਾਲ ਜੋ ਜੋੜਦੀ ਹੈ" },
  nav_home: { en: "Home", hi: "होम", pa: "ਹੋਮ" },
  nav_doctors: { en: "Find a Doctor", hi: "डॉक्टर खोजें", pa: "ਡਾਕਟਰ ਲੱਭੋ" },
  nav_services: { en: "Services", hi: "सेवाएँ", pa: "ਸੇਵਾਵਾਂ" },
  nav_about: { en: "About Us", hi: "हमारे बारे में", pa: "ਸਾਡੇ ਬਾਰੇ" },
  nav_appointments: { en: "My appointments", hi: "मेरी अपॉइंटमेंट", pa: "ਮੇਰੀਆਂ ਅਪਾਇੰਟਮੈਂਟਾਂ" },
  nav_prescriptions: { en: "Prescriptions", hi: "प्रिस्क्रिप्शन", pa: "ਨੁਸਖ਼ੇ" },
  nav_dashboard: { en: "Dashboard", hi: "डैशबोर्ड", pa: "ਡੈਸ਼ਬੋਰਡ" },
  nav_admin: { en: "Admin", hi: "एडमिन", pa: "ਐਡਮਿਨ" },
  sign_in: { en: "Sign In", hi: "साइन इन", pa: "ਸਾਈਨ ਇਨ" },
  register: { en: "Register", hi: "रजिस्टर करें", pa: "ਰਜਿਸਟਰ ਕਰੋ" },
  sign_out: { en: "Sign out", hi: "साइन आउट", pa: "ਸਾਈਨ ਆਉਟ" },
  language: { en: "Language", hi: "भाषा", pa: "ਭਾਸ਼ਾ" },
  book_appointment: { en: "Book Appointment", hi: "अपॉइंटमेंट बुक करें", pa: "ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ" },
} satisfies Record<string, Msg>;
