
import React from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import TrustBadges from "@/components/home/TrustBadges";
import InteractiveDemo from "@/components/home/InteractiveDemo";
import OutcomeShowcase from "@/components/home/OutcomeShowcase";
import CookieConsent from "@/components/CookieConsent";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Index() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Explicitly set isLoggedIn to false in public pages */}
        <Navbar isLoggedIn={false} />
        
        <main className="flex flex-col items-center flex-grow">
          {/* Hero Section */}
          <Hero />
          
          {/* Trust Badges Section */}
          <TrustBadges />
          
          {/* Interactive Demo Section */}
          <InteractiveDemo />
          
          {/* Outcome Showcase Section */}
          <OutcomeShowcase />
          
          {/* Features Section */}
          <Features />
          
          {/* Testimonials Section */}
          <Testimonials />
          
          {/* Final CTA Section */}
          <CallToAction />
        </main>

        <Footer />
        
        {/* GDPR Cookie Consent Banner */}
        <CookieConsent />
      </div>
    </ErrorBoundary>
  );
}
