import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "Amer Center Dubai | #1 Golden Visa, Emirates ID & Visa Services | Dubai Immigration Building",
  description:
    "Official Amer Center inside Dubai Immigration Building DAFZA Al Twar. Apply for Golden Visa, Family Visa, Emirates ID, Visa Renewal via WhatsApp. 8+ years trusted service.",
  keywords: ["Amer Center Dubai", "مركز آمر دبي", "Golden Visa Dubai", "Emirates ID", "Family Visa Dubai"],
};

export default function HomePage() {
  return <HomeContent />;
}
