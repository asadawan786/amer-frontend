"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { apiRequest } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const WHATSAPP_URL = `https://wa.me/971504512311?text=${encodeURIComponent("Hello! I want to inquire about your services.")}`;

const services = [
  "Golden Visa", "Family Visa", "Emirates ID", "Visa Renewal", "Visa Cancellation",
  "Business Setup", "Free Zone Company", "Embassy Attestation", "Translation Services",
  "Equivalency Certificate", "Ministry of Education", "Notary Public", "Mobile Number Update",
  "DHA Medical Fitness", "Typing Services", "Dubai Municipality", "DEQ Services",
  "Tasheel Services", "Health Card", "PRO Services", "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", company: "", service: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({ title: "Missing Information", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await apiRequest("POST", "/api/inquiries", formData);
      if (res.ok) {
        setSubmitted(true);
        toast({ title: "Inquiry Submitted", description: "We'll get back to you within 24 hours." });
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast({ title: "Submission Failed", description: "Please try again or contact us on WhatsApp.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">
              Contact <span className="gold-gradient-text font-semibold">Us</span>
            </h1>
            <p className="text-lg text-gray-600 mt-6">
              Get in touch for any visa or government service inquiries. WhatsApp is the fastest way to reach us!
            </p>
            <div className="w-16 h-0.5 bg-gold mt-8" />
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="p-8 border border-gray-200 bg-white rounded-lg">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="h-16 w-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-8 w-8 text-gold" />
                    </div>
                    <h2 className="text-2xl font-medium text-gray-900 mb-2">Thank You!</h2>
                    <p className="text-gray-500 mb-6">Your inquiry has been received. We will contact you within 24 hours.</p>
                    <Button variant="outline" className="btn-outline-gold rounded-md"
                      onClick={() => { setSubmitted(false); setFormData({ fullName: "", email: "", phone: "", company: "", service: "", message: "" }); }}>
                      Submit Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input id="fullName" placeholder="Your full name" value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" placeholder="your@email.com" value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone / WhatsApp *</Label>
                        <Input id="phone" placeholder="+971 XX XXX XXXX" value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Needed</Label>
                        <Select value={formData.service} onValueChange={(v) => setFormData({ ...formData, service: v })}>
                          <SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger>
                          <SelectContent>
                            {services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea id="message" placeholder="Tell us about your requirements..." rows={4}
                        value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                    </div>
                    <Button type="submit" size="lg" className="btn-gold rounded-md" disabled={loading}>
                      {loading ? "Submitting..." : <><Send className="mr-2 h-4 w-4" /> Submit Inquiry</>}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-6 border border-gray-200 bg-white rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-gray-600 hover:text-[#25D366]">
                    <SiWhatsapp className="h-5 w-5 text-[#25D366] mt-0.5" />
                    <div><div className="font-medium text-gray-900">WhatsApp</div><div className="text-sm">+971 50 451 2311</div></div>
                  </a>
                  <a href="tel:+971504512311" className="flex items-start gap-3 text-gray-600 hover:text-gray-900">
                    <Phone className="h-5 w-5 text-gold mt-0.5" />
                    <div><div className="font-medium text-gray-900">Phone</div><div className="text-sm">+971 50 451 2311</div></div>
                  </a>
                  <a href="mailto:info@amer.center" className="flex items-start gap-3 text-gray-600 hover:text-gray-900">
                    <Mail className="h-5 w-5 text-gold mt-0.5" />
                    <div><div className="font-medium text-gray-900">Email</div><div className="text-sm">info@amer.center</div></div>
                  </a>
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin className="h-5 w-5 text-gold mt-0.5" />
                    <div><div className="font-medium text-gray-900">Location</div><div className="text-sm">Inside Dubai Immigration Building, DAFZA - Al Twar, Dubai</div></div>
                  </div>
                </div>
              </div>
              <div className="p-6 border border-gray-200 bg-white rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Business Hours</h3>
                <div className="flex items-start gap-3 text-gray-600">
                  <Clock className="h-5 w-5 text-gold mt-0.5" />
                  <div>
                    <div className="text-sm">Sunday - Thursday</div>
                    <div className="font-medium text-gray-900">9:00 AM - 6:00 PM</div>
                    <div className="text-sm mt-2">Friday - Saturday</div>
                    <div className="font-medium text-gray-900">Closed</div>
                  </div>
                </div>
              </div>
              <div className="p-6 border border-[#C9A962]/30 bg-[#C9A962]/5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Fastest Response?</h3>
                <p className="text-sm text-gray-600 mb-4">WhatsApp is the quickest way to get help!</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white">
                    <SiWhatsapp className="h-4 w-4 mr-2" /> WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoogleMapEmbed />
    </>
  );
}
