import type { Msg } from "./common";

export const pages9 = {
  hosp_page_title: { en: "Hospitals", hi: "अस्पताल", pa: "ਹਸਪਤਾਲ" },
  hosp_page_sub: {
    en: "Find the hospital nearest to you and see which doctors sit there.",
    hi: "अपने नज़दीकी अस्पताल को खोजें और देखें कि वहाँ कौन से डॉक्टर बैठते हैं।",
    pa: "ਆਪਣੇ ਨੇੜੇ ਦਾ ਹਸਪਤਾਲ ਲੱਭੋ ਅਤੇ ਦੇਖੋ ਕਿ ਉੱਥੇ ਕਿਹੜੇ ਡਾਕਟਰ ਬੈਠਦੇ ਹਨ।",
  },
  hosp_none: {
    en: "No hospitals listed yet.",
    hi: "अभी कोई अस्पताल सूचीबद्ध नहीं है।",
    pa: "ਹਾਲੇ ਕੋਈ ਹਸਪਤਾਲ ਸੂਚੀਬੱਧ ਨਹੀਂ ਹੈ।",
  },
  hosp_doctors: { en: "Doctors: {n}", hi: "डॉक्टर: {n}", pa: "ਡਾਕਟਰ: {n}" },
  hosp_view: { en: "View doctors", hi: "डॉक्टर देखें", pa: "ਡਾਕਟਰ ਦੇਖੋ" },
  nav_hospitals: { en: "Hospitals", hi: "अस्पताल", pa: "ਹਸਪਤਾਲ" },
} satisfies Record<string, Msg>;
