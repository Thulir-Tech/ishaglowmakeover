"use client"; 

import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";
import HeroSection from "@/components/custom/HeroSection";
import AboutSection from "@/components/custom/AboutSection";
import ServicesSection from "@/components/custom/ServicesSection";
import PackagesSection from "@/components/custom/PackagesSection";
import FaqSection from "@/components/custom/FAQSection";
import ContactSection from "@/components/custom/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <NavBar />
      <main className="pt-20">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PackagesSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
