"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";

const languages: { code: Language; label: string; labelShort: string }[] = [
  { code: "en", label: "English",  labelShort: "EN" },
  { code: "ar", label: "العربية",  labelShort: "AR" },
  { code: "hi", label: "हिन्दी",   labelShort: "HI" },
  { code: "ru", label: "Русский",  labelShort: "RU" },
  { code: "fa", label: "فارسی",    labelShort: "FA" },
  { code: "ur", label: "اردو",     labelShort: "UR" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === language) ?? languages[0];

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleSelect = (lang: Language) => {
    setOpen(false);
    localStorage.setItem("amer-language", lang);
    setLanguage(lang);
    setTimeout(() => window.location.reload(), 50);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
      >
        <Globe className="h-4 w-4 text-gray-400" />
        <span className="font-medium">{current.labelShort}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-100 shadow-lg rounded-md py-1 z-[9999]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between ${
                language === lang.code
                  ? "text-[#C9A962] font-medium bg-[#C9A962]/5"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span>{lang.label}</span>
              {language === lang.code && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A962]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
