
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="w-full bg-gradient-to-b from-[#0A0A23] to-background relative py-16 md:py-24 overflow-hidden">
      {/* Animated particle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particles-container">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-primary/20"
              style={{
                width: `${Math.random() * 12 + 2}px`,
                height: `${Math.random() * 12 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `float ${Math.random() * 10 + 10}s linear infinite, pulse ${Math.random() * 4 + 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
        <img 
          src="/lovable-uploads/fa68c49e-02d3-4f17-b128-a5b8f6f1665b.png" 
          alt="Allora AI Logo" 
          className="h-28 md:h-32 mb-8 animate-float"
        />
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slideIn gradient-text">
          <span className="text-white">Allora AI</span> - Your AI Business Acceleration Platform
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-slideIn" style={{animationDelay: '0.2s'}}>
          Launch. Grow. Dominate. The Future of Business is Here.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slideIn" style={{animationDelay: '0.4s'}}>
          <Button size="lg" variant="gradient" className="group button-glow animate-glow transition-all duration-300 px-8 py-7" asChild>
            <Link to="/signup" className="flex items-center gap-2">
              Get Started 
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-primary/60 hover:border-primary px-8 py-7 glass" asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
