import type { Msg } from "./common";

export const notfound = {
  nf_title: { en: "Page not found", hi: "पेज नहीं मिला", pa: "ਪੰਨਾ ਨਹੀਂ ਮਿਲਿਆ" },
  nf_text: {
    en: "The page you are looking for does not exist or may have moved.",
    hi: "आप जिस पेज को खोज रहे हैं वह मौजूद नहीं है या हो सकता है स्थानांतरित हो गया हो।",
    pa: "ਜਿਸ ਪੰਨੇ ਨੂੰ ਤੁਸੀਂ ਲੱਭ ਰਹੇ ਹੋ ਉਹ ਮੌਜੂਦ ਨਹੀਂ ਹੈ ਜਾਂ ਹੋ ਸਕਦਾ ਹੈ ਇਸਨੂੰ ਹਟਾ ਦਿੱਤਾ ਗਿਆ ਹੋਵੇ।",
  },
  nf_home: { en: "Go to home", hi: "होम पर जाएँ", pa: "ਹੋਮ ਉੱਤੇ ਜਾਓ" },
  nf_find: { en: "Find a Doctor", hi: "डॉक्टर खोजें", pa: "ਡਾਕਟਰ ਲੱਭੋ" },
} satisfies Record<string, Msg>;
