"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, CheckCircle2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I need help with UAE employment services.")}`;

function calculateGratuity(
  startDate: string,
  endDate: string,
  salary: number,
  contractType: string
): number {
  if (!startDate || !endDate || !salary) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const yearsWorked = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

  if (yearsWorked < 1) return 0;

  const dailySalary = salary / 30;

  if (contractType === "unlimited") {
    if (yearsWorked < 3) return dailySalary * 7 * yearsWorked;
    if (yearsWorked < 5) return dailySalary * 14 * yearsWorked;
    return Math.min(dailySalary * 21 * yearsWorked, salary * 24);
  } else {
    return Math.min(dailySalary * 21 * yearsWorked, salary * 24);
  }
}

export default function ToolsPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [salary, setSalary] = useState("");
  const [contractType, setContractType] = useState("unlimited");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const gratuity = calculateGratuity(startDate, endDate, Number(salary), contractType);
    setResult(gratuity);
  };

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
              UAE <span className="gold-gradient-text font-semibold">Tools & Calculators</span>
            </h1>
            <p className="text-lg text-gray-600 mt-6">Helpful tools for UAE residents and employees</p>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-8" />
          </div>

          {/* EOS Calculator */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-[#C9A962]/10 flex items-center justify-center">
                <Calculator className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">End of Service (EOS) Gratuity Calculator</h2>
                <p className="text-sm text-gray-500">Calculate your UAE gratuity entitlement</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">Employment Start Date</Label>
                <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Employment End Date</Label>
                <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Basic Monthly Salary (AED)</Label>
                <Input id="salary" type="number" placeholder="e.g. 5000" value={salary} onChange={(e) => setSalary(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractType">Contract Type</Label>
                <Select value={contractType} onValueChange={setContractType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unlimited">Unlimited (Open-ended)</SelectItem>
                    <SelectItem value="limited">Limited (Fixed-term)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleCalculate} className="btn-gold rounded-md">
              <Calculator className="h-4 w-4 mr-2" /> Calculate Gratuity
            </Button>

            {result !== null && (
              <div className="mt-6 p-6 bg-[#C9A962]/5 border border-[#C9A962]/20 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Your Gratuity Entitlement</h3>
                <div className="text-3xl font-light text-gold">
                  AED {result.toLocaleString("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  This is an estimate based on UAE Labour Law. Contact us for a precise calculation.
                </p>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">How Gratuity is Calculated</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Less than 1 year: No gratuity</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> 1-3 years: 21 days per year of service</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> 3+ years: 30 days per year of service</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Maximum: 2 years salary cap</li>
              </ul>
            </div>
          </div>

          {/* Golden Visa Eligibility */}
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Golden Visa Eligibility Checker</h2>
            <p className="text-gray-600 mb-6">Check if you qualify for the UAE Golden Visa based on your profile.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Property Owner (AED 2M+)", key: "property" },
                { label: "Business Investor", key: "investor" },
                { label: "Entrepreneur with approved startup", key: "entrepreneur" },
                { label: "Doctor / Healthcare Professional", key: "doctor" },
                { label: "Engineer / Technical Specialist", key: "engineer" },
                { label: "Scientist / Researcher", key: "scientist" },
                { label: "Artist / Creative Professional", key: "artist" },
                { label: "Top University Graduate (GPA 3.75+)", key: "student" },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-[#C9A962]/5 border border-[#C9A962]/20 rounded-lg">
              <p className="text-sm text-gray-700">
                If you match any of the above criteria, you may be eligible for UAE Golden Visa.
                Contact us for a free eligibility assessment.
              </p>
            </div>
            <div className="mt-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-md">
                  <SiWhatsapp className="h-4 w-4 mr-2" /> Check Eligibility on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
