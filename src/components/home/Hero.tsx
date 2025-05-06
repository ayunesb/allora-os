import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Shield,
  ShieldCheck,
  Lock,
  CheckCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const Hero = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center py-16 md:py-24 overflow-hidden bg-gradient-to-br from-[#0A0F24] via-[#1B1B3A] to-[#2C2C54] bg-fixed">
      {/* Animated particle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="particles-container">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${Math.random() * 6 + 1}px`,
                height: `${Math.random() * 6 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                animation: `floatParticle ${Math.random() * 15 + 20}s linear infinite, pulseParticle ${Math.random() * 4 + 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 flex flex-col items-center text-center relative z-10 py-12 md:py-16">
        <img
          src="/lovable-uploads/fa68c49e-02d3-4f17-b128-a5b8f6f1665b.png"
          alt="Allora AI Logo"
          className="h-28 md:h-36 mb-10 animate-float"
        />

        <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-slideIn tracking-wide text-[#EDEDED]">
          Allora AI - Your AI Business Acceleration Platform
        </h1>
        <p
          className="text-xl text-gray-300/80 mb-10 max-w-2xl mx-auto animate-slideIn font-normal"
          style={{ animationDelay: "0.2s" }}
        >
          Launch. Grow. Dominate. The Future of Business is Here.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-6 justify-center animate-slideIn"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#6A5ACD] to-[#8A2BE2] text-white px-8 py-7 rounded-xl group transition-all duration-300 hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] hover:scale-105"
            asChild
          >
            <Link to="/signup" className="flex items-center gap-2">
              Get Started
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:text-white/100 hover:border-white/40 px-8 py-7 transition-all duration-300"
            asChild
          >
            <Link to="/login">Login</Link>
          </Button>
        </div>

        {/* Compliance Badges Section */}
        <div className="mt-16 flex flex-wrap justify-center gap-4 md:gap-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="text-white/90 font-medium">
                    GDPR Compliant
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[200px]">
                  Our platform adheres to all GDPR requirements for data
                  protection
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-white/90 font-medium">
                    SOC 2 Certified
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[200px]">
                  Validated security controls and procedures to protect your
                  data
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                  <Lock className="h-5 w-5 text-primary" />
                  <span className="text-white/90 font-medium">
                    Bank-Level Security
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[200px]">
                  Enterprise-grade encryption for all your business data
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-white/90 font-medium">ISO 27001</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[200px]">
                  Internationally recognized information security standard
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
export default Hero;
