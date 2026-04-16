"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "react-icons/si";

type CommonKey = keyof ReturnType<typeof useLanguage>["t"]["common"];

interface Props {
  href: string;
  labelKey: CommonKey;
  size?: "sm" | "lg" | "default";
  variant?: "whatsapp" | "outline-gold" | "dark-outline";
  className?: string;
  fullWidth?: boolean;
}

export default function TranslatedButton({
  href,
  labelKey,
  size = "lg",
  variant = "whatsapp",
  className = "",
  fullWidth = false,
}: Props) {
  const { t } = useLanguage();
  const label = t.common[labelKey];

  const baseClass = fullWidth ? "w-full sm:w-auto " : "";

  if (variant === "whatsapp") {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={fullWidth ? "w-full sm:w-auto" : ""}>
        <Button size={size} className={`bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md ${baseClass}${className}`}>
          <SiWhatsapp className="h-5 w-5 mr-2" />
          {label}
        </Button>
      </a>
    );
  }

  if (variant === "outline-gold") {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={fullWidth ? "w-full sm:w-auto" : ""}>
        <Button size={size} variant="outline" className={`border-[#C9A962] text-[#A88B4A] hover:bg-[#C9A962]/10 rounded-md ${baseClass}${className}`}>
          {label}
        </Button>
      </a>
    );
  }

  // dark-outline (used in dark CTA sections)
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={fullWidth ? "w-full sm:w-auto" : ""}>
      <Button size={size} className={`bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md ${baseClass}${className}`}>
        <SiWhatsapp className="h-5 w-5 mr-2" />
        {label}
      </Button>
    </a>
  );
}
