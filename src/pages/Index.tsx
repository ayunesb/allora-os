
import React from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Explicitly set isLoggedIn to false in public pages */}
      <Navbar isLoggedIn={false} />
      
      <main className="flex flex-col items-center flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <Features />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Final CTA Section */}
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
