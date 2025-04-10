
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="w-full bg-gradient-to-b from-[#0A0A23] to-background py-12 md:py-20">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <img 
          src="/lovable-uploads/fa68c49e-02d3-4f17-b128-a5b8f6f1665b.png" 
          alt="Allora AI Logo" 
          className="h-28 md:h-32 mb-8 animate-fadeIn"
        />
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-slideIn">
          <span className="text-primary">Allora AI</span> - Your AI Business Acceleration Platform
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slideIn" style={{animationDelay: '0.2s'}}>
          Launch. Grow. Dominate. The Future of Business is Here.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideIn" style={{animationDelay: '0.4s'}}>
          <Button size="lg" className="group transition-all duration-300 px-6 py-6" asChild>
            <Link to="/signup" className="flex items-center gap-2">
              Get Started 
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-primary/60 hover:border-primary px-6 py-6" asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
