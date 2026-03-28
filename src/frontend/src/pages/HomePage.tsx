import { useCallback, useEffect } from "react";
import AboutSection from "../components/AboutSection";
import BlogSection from "../components/BlogSection";
import { ChatBot } from "../components/ChatBot";
import ContactSection from "../components/ContactSection";
import CookieConsent from "../components/CookieConsent";
import ErmsSection from "../components/ErmsSection";
import FloatingButtons from "../components/FloatingButtons";
import Footer from "../components/Footer";
import HeroCarousel from "../components/HeroCarousel";
import Navbar from "../components/Navbar";
import PortfolioSection from "../components/PortfolioSection";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import TrustSection from "../components/TrustSection";
import VideoShowcaseSection from "../components/VideoShowcaseSection";
import { usePortfolioItems, useSeedData } from "../hooks/useQueries";

function SectionSep() {
  return <div className="section-sep mx-auto max-w-4xl" />;
}

export default function HomePage() {
  const { data: portfolioItems, isLoading } = usePortfolioItems();
  const seed = useSeedData();
  const { mutate: seedMutate, isPending: seedPending } = seed;

  const triggerSeed = useCallback(() => {
    seedMutate();
  }, [seedMutate]);

  useEffect(() => {
    if (
      !isLoading &&
      portfolioItems &&
      portfolioItems.length === 0 &&
      !seedPending
    ) {
      triggerSeed();
    }
  }, [isLoading, portfolioItems, seedPending, triggerSeed]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroCarousel />
        <SectionSep />
        <TrustSection />
        <SectionSep />
        <VideoShowcaseSection />
        <SectionSep />
        <ErmsSection />
        <SectionSep />
        <AboutSection />
        <SectionSep />
        <ServicesSection />
        <SectionSep />
        <PortfolioSection />
        <SectionSep />
        <TestimonialsSection />
        <SectionSep />
        <BlogSection />
        <SectionSep />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
      <FloatingButtons />
      <CookieConsent />
    </div>
  );
}
