import type { Msg } from "./common";

export const pages3 = {
  login_title: { en: "Welcome back", hi: "वापसी पर स्वागत है", pa: "ਮੁੜ ਜੀ ਆਇਆਂ ਨੂੰ" },
  login_sub: {
    en: "Sign in to manage your appointments and prescriptions.",
    hi: "अपनी अपॉइंटमेंट और प्रिस्क्रिप्शन प्रबंधित करने के लिए साइन इन करें।",
    pa: "ਆਪਣੀਆਂ ਅਪਾਇੰਟਮੈਂਟਾਂ ਅਤੇ ਨੁਸਖ਼ਿਆਂ ਦਾ ਪ੍ਰਬੰਧ ਕਰਨ ਲਈ ਸਾਈਨ ਇਨ ਕਰੋ।",
  },
  email: { en: "Email", hi: "ईमेल", pa: "ਈਮੇਲ" },
  password: { en: "Password", hi: "पासवर्ड", pa: "ਪਾਸਵਰਡ" },
  signin_btn: { en: "Sign in", hi: "साइन इन करें", pa: "ਸਾਈਨ ਇਨ ਕਰੋ" },
  signing_in: { en: "Signing in...", hi: "साइन इन हो रहा है...", pa: "ਸਾਈਨ ਇਨ ਹੋ ਰਿਹਾ ਹੈ..." },
  new_here: { en: "New to ArogyaCare?", hi: "आरोग्यकेयर पर नए हैं?", pa: "ਆਰੋਗਿਆਕੇਅਰ ਉੱਤੇ ਨਵੇਂ ਹੋ?" },
  create_link: { en: "Create an account", hi: "खाता बनाएँ", pa: "ਖਾਤਾ ਬਣਾਓ" },
  err_missing: {
    en: "Please enter your email and password.",
    hi: "कृपया अपना ईमेल और पासवर्ड दर्ज करें।",
    pa: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਈਮੇਲ ਅਤੇ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ।",
  },
  err_invalid: {
    en: "Invalid email or password.",
    hi: "ईमेल या पासवर्ड गलत है।",
    pa: "ਈਮੇਲ ਜਾਂ ਪਾਸਵਰਡ ਗਲਤ ਹੈ।",
  },

  reg_title: { en: "Create your account", hi: "अपना खाता बनाएँ", pa: "ਆਪਣਾ ਖਾਤਾ ਬਣਾਓ" },
  reg_sub: {
    en: "Join ArogyaCare as a patient and book your first appointment.",
    hi: "मरीज़ के रूप में आरोग्यकेयर से जुड़ें और अपनी पहली अपॉइंटमेंट बुक करें।",
    pa: "ਮਰੀਜ਼ ਵਜੋਂ ਆਰੋਗਿਆਕੇਅਰ ਨਾਲ ਜੁੜੋ ਅਤੇ ਆਪਣੀ ਪਹਿਲੀ ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ।",
  },
  full_name: { en: "Full name", hi: "पूरा नाम", pa: "ਪੂਰਾ ਨਾਮ" },
  phone_opt: { en: "Phone (optional)", hi: "फ़ोन (वैकल्पिक)", pa: "ਫ਼ੋਨ (ਵਿਕਲਪਿਕ)" },
  pw_hint: {
    en: "Password (at least 8 characters)",
    hi: "पासवर्ड (कम से कम 8 अक्षर)",
    pa: "ਪਾਸਵਰਡ (ਘੱਟੋ-ਘੱਟ 8 ਅੱਖਰ)",
  },
  create_btn: { en: "Create account", hi: "खाता बनाएँ", pa: "ਖਾਤਾ ਬਣਾਓ" },
  creating: { en: "Creating account...", hi: "खाता बन रहा है...", pa: "ਖਾਤਾ ਬਣ ਰਿਹਾ ਹੈ..." },
  have_account: { en: "Already have an account?", hi: "पहले से खाता है?", pa: "ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ?" },
  signin_link: { en: "Sign in", hi: "साइन इन करें", pa: "ਸਾਈਨ ਇਨ ਕਰੋ" },
  err_name: {
    en: "Please enter your full name.",
    hi: "कृपया अपना पूरा नाम दर्ज करें।",
    pa: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ।",
  },
  err_email: {
    en: "Please enter a valid email address.",
    hi: "कृपया मान्य ईमेल पता दर्ज करें।",
    pa: "ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ ਈਮੇਲ ਪਤਾ ਦਰਜ ਕਰੋ।",
  },
  err_pw: {
    en: "Password must be at least 8 characters.",
    hi: "पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।",
    pa: "ਪਾਸਵਰਡ ਘੱਟੋ-ਘੱਟ 8 ਅੱਖਰਾਂ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ।",
  },
  err_exists: {
    en: "An account with this email already exists.",
    hi: "इस ईमेल से खाता पहले से मौजूद है।",
    pa: "ਇਸ ਈਮੇਲ ਨਾਲ ਖਾਤਾ ਪਹਿਲਾਂ ਤੋਂ ਮੌਜੂਦ ਹੈ।",
  },
} satisfies Record<string, Msg>;
