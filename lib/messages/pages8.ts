import type { Msg } from "./common";

export const pages8 = {
  nav_lab: { en: "Lab reports", hi: "लैब रिपोर्ट", pa: "ਲੈਬ ਰਿਪੋਰਟਾਂ" },
  lab_title: { en: "Lab Reports", hi: "लैब रिपोर्ट", pa: "ਲੈਬ ਰਿਪੋਰਟਾਂ" },
  lab_sub: {
    en: "Your diagnostic reports from your doctors appear here.",
    hi: "आपके डॉक्टरों की डायग्नोस्टिक रिपोर्ट यहाँ दिखती हैं।",
    pa: "ਤੁਹਾਡੇ ਡਾਕਟਰਾਂ ਦੀਆਂ ਡਾਇਗਨੌਸਟਿਕ ਰਿਪੋਰਟਾਂ ਇੱਥੇ ਦਿਖਾਈ ਦਿੰਦੀਆਂ ਹਨ।",
  },
  lab_none: {
    en: "You have no lab reports yet. They appear here after your doctor adds them.",
    hi: "अभी आपकी कोई लैब रिपोर्ट नहीं है। डॉक्टर के जोड़ने के बाद वे यहाँ दिखेंगी।",
    pa: "ਹਾਲੇ ਤੁਹਾਡੀ ਕੋਈ ਲੈਬ ਰਿਪੋਰਟ ਨਹੀਂ ਹੈ। ਡਾਕਟਰ ਵੱਲੋਂ ਜੋੜਨ ਤੋਂ ਬਾਅਦ ਇਹ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੀਆਂ।",
  },
  lab_col_test: { en: "Test", hi: "जाँच", pa: "ਜਾਂਚ" },
  lab_col_result: { en: "Result", hi: "परिणाम", pa: "ਨਤੀਜਾ" },
  lab_col_unit: { en: "Unit", hi: "इकाई", pa: "ਇਕਾਈ" },
  lab_col_range: { en: "Normal range", hi: "सामान्य सीमा", pa: "ਆਮ ਸੀਮਾ" },
  lab_col_status: { en: "Status", hi: "स्थिति", pa: "ਸਥਿਤੀ" },
  lab_normal: { en: "Normal", hi: "सामान्य", pa: "ਆਮ" },
  lab_high: { en: "High", hi: "उच्च", pa: "ਵੱਧ" },
  lab_low: { en: "Low", hi: "कम", pa: "ਘੱਟ" },
  lab_notes: { en: "Doctor's notes", hi: "डॉक्टर के नोट्स", pa: "ਡਾਕਟਰ ਦੇ ਨੋਟਸ" },
  lab_only_patients: {
    en: "Only patient accounts have this page.",
    hi: "यह पेज केवल मरीज़ खातों के लिए है।",
    pa: "ਇਹ ਪੰਨਾ ਸਿਰਫ਼ ਮਰੀਜ਼ ਖਾਤਿਆਂ ਲਈ ਹੈ।",
  },
  lab_only_doctors: {
    en: "Only doctor accounts have this page.",
    hi: "यह पेज केवल डॉक्टर खातों के लिए है।",
    pa: "ਇਹ ਪੰਨਾ ਸਿਰਫ਼ ਡਾਕਟਰ ਖਾਤਿਆਂ ਲਈ ਹੈ।",
  },
  lab_doc_sub: {
    en: "Add diagnostic results for patients whose visit is completed.",
    hi: "जिन मरीज़ों की विज़िट पूरी हो चुकी है, उनके लिए डायग्नोस्टिक परिणाम जोड़ें।",
    pa: "ਜਿਨ੍ਹਾਂ ਮਰੀਜ਼ਾਂ ਦੀ ਮੁਲਾਕਾਤ ਪੂਰੀ ਹੋ ਚੁੱਕੀ ਹੈ, ਉਨ੍ਹਾਂ ਲਈ ਡਾਇਗਨੌਸਟਿਕ ਨਤੀਜੇ ਜੋੜੋ।",
  },
  lab_doc_none: {
    en: "No completed visits yet. Mark a visit as completed on your dashboard first.",
    hi: "अभी कोई पूरी हुई विज़िट नहीं है। पहले अपने डैशबोर्ड पर किसी विज़िट को पूरी हुई चिह्नित करें।",
    pa: "ਹਾਲੇ ਕੋਈ ਪੂਰੀ ਹੋਈ ਮੁਲਾਕਾਤ ਨਹੀਂ ਹੈ। ਪਹਿਲਾਂ ਆਪਣੇ ਡੈਸ਼ਬੋਰਡ ਉੱਤੇ ਕਿਸੇ ਮੁਲਾਕਾਤ ਨੂੰ ਪੂਰੀ ਹੋਈ ਵਜੋਂ ਚਿੰਨ੍ਹਿਤ ਕਰੋ।",
  },
  lab_add: { en: "Add lab report", hi: "लैब रिपोर्ट जोड़ें", pa: "ਲੈਬ ਰਿਪੋਰਟ ਜੋੜੋ" },
  lab_test_name: { en: "Test name", hi: "जाँच का नाम", pa: "ਜਾਂਚ ਦਾ ਨਾਮ" },
  lab_test_ph: {
    en: "e.g. Complete Blood Count",
    hi: "जैसे: कंप्लीट ब्लड काउंट",
    pa: "ਜਿਵੇਂ: ਕੰਪਲੀਟ ਬਲੱਡ ਕਾਊਂਟ",
  },
  lab_results: { en: "Results (one per line)", hi: "परिणाम (हर पंक्ति में एक)", pa: "ਨਤੀਜੇ (ਹਰ ਲਾਈਨ ਵਿੱਚ ਇੱਕ)" },
  lab_results_hint: {
    en: "Format: name | value | unit | normal range",
    hi: "प्रारूप: नाम | मान | इकाई | सामान्य सीमा",
    pa: "ਫਾਰਮੈਟ: ਨਾਮ | ਮੁੱਲ | ਇਕਾਈ | ਆਮ ਸੀਮਾ",
  },
  lab_results_ph: {
    en: "Hemoglobin | 13.2 | g/dL | 12-16\nWBC | 11800 | /µL | 4000-11000",
    hi: "हीमोग्लोबिन | 13.2 | g/dL | 12-16\nWBC | 11800 | /µL | 4000-11000",
    pa: "ਹੀਮੋਗਲੋਬਿਨ | 13.2 | g/dL | 12-16\nWBC | 11800 | /µL | 4000-11000",
  },
  lab_notes_ph: { en: "Notes (optional)", hi: "नोट्स (वैकल्पिक)", pa: "ਨੋਟਸ (ਵਿਕਲਪਿਕ)" },
  lab_save: { en: "Save report", hi: "रिपोर्ट सहेजें", pa: "ਰਿਪੋਰਟ ਸੰਭਾਲੋ" },
  lab_saving: { en: "Saving...", hi: "सहेजा जा रहा है...", pa: "ਸੰਭਾਲਿਆ ਜਾ ਰਿਹਾ ਹੈ..." },
  lab_saved: { en: "Lab report saved.", hi: "लैब रिपोर्ट सहेज ली गई।", pa: "ਲੈਬ ਰਿਪੋਰਟ ਸੰਭਾਲ ਲਈ ਗਈ।" },
  lab_added: { en: "Reports added", hi: "जोड़ी गई रिपोर्ट", pa: "ਜੋੜੀਆਂ ਗਈਆਂ ਰਿਪੋਰਟਾਂ" },
  lab_e_forbidden: {
    en: "You can only add reports for your own completed visits.",
    hi: "आप केवल अपनी पूरी हुई विज़िट के लिए रिपोर्ट जोड़ सकते हैं।",
    pa: "ਤੁਸੀਂ ਸਿਰਫ਼ ਆਪਣੀਆਂ ਪੂਰੀਆਂ ਹੋਈਆਂ ਮੁਲਾਕਾਤਾਂ ਲਈ ਰਿਪੋਰਟ ਜੋੜ ਸਕਦੇ ਹੋ।",
  },
  lab_e_test: {
    en: "Please enter a test name.",
    hi: "कृपया जाँच का नाम दर्ज करें।",
    pa: "ਕਿਰਪਾ ਕਰਕੇ ਜਾਂਚ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ।",
  },
  lab_e_results: {
    en: "Enter at least one result line like: name | value | unit | range.",
    hi: "कम से कम एक परिणाम पंक्ति दर्ज करें: नाम | मान | इकाई | सीमा।",
    pa: "ਘੱਟੋ-ਘੱਟ ਇੱਕ ਨਤੀਜਾ ਲਾਈਨ ਦਰਜ ਕਰੋ: ਨਾਮ | ਮੁੱਲ | ਇਕਾਈ | ਸੀਮਾ।",
  },
  lab_e_notes: {
    en: "Notes must be under 1000 characters.",
    hi: "नोट्स 1000 अक्षरों से कम होने चाहिए।",
    pa: "ਨੋਟਸ 1000 ਅੱਖਰਾਂ ਤੋਂ ਘੱਟ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ।",
  },
  lab_e_failed: {
    en: "Could not save the report. Please try again.",
    hi: "रिपोर्ट सहेजी नहीं जा सकी। कृपया फिर से प्रयास करें।",
    pa: "ਰਿਪੋਰਟ ਸੰਭਾਲੀ ਨਹੀਂ ਜਾ ਸਕੀ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
  },
} satisfies Record<string, Msg>;
