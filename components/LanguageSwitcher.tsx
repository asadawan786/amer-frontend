"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";

const languages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "hi", label: "हिन्दी" },
  { code: "ru", label: "Русский" },
  { code: "fa", label: "فارسی" },
  { code: "ur", label: "اردو" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    localStorage.setItem("amer-language", lang);
    setLanguage(lang);
    // Small delay ensures localStorage persists on mobile before DOM update
    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  return (
    <div className="flex items-center gap-0.5 bg-gray-100 rounded-full p-0.5 overflow-x-auto max-w-full">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => handleLanguageChange(lang.code)}
          className={`px-2 py-1 text-[10px] sm:text-xs font-medium rounded-full transition-all touch-manipulation whitespace-nowrap ${
            language === lang.code
              ? "bg-[#C9A962] text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
