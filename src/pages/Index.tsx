
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { RocketIcon, Zap, TrendingUp, Users, Bot } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <RocketIcon className="h-16 w-16 text-primary animate-pulse-slow" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="gradient-text">Allora AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10">
            Launch. Grow. Dominate. The Future of Business is Here.
          </p>
          
          <Link to="/login">
            <Button className="allora-button text-lg group">
              Get Started
              <Zap className="ml-2 h-5 w-5 group-hover:animate-pulse" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Powered by AI Executive Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="dashboard-card">
              <TrendingUp className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Business Strategies</h3>
              <p className="text-gray-300">AI-generated strategic plans tailored to your business goals.</p>
            </div>
            
            <div className="dashboard-card">
              <Zap className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Marketing Campaigns</h3>
              <p className="text-gray-300">Automated campaigns that drive growth and engagement.</p>
            </div>
            
            <div className="dashboard-card">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Lead Generation</h3>
              <p className="text-gray-300">Intelligent lead generation and qualification systems.</p>
            </div>
            
            <div className="dashboard-card">
              <Bot className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Executive Team</h3>
              <p className="text-gray-300">Elon Musk, Jeff Bezos, and other AI personas working for you.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border/40">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Allora AI | 
            <Link to="/legal" className="text-primary/80 hover:text-primary ml-2 mr-2">
              Legal
            </Link> | 
            <Link to="/privacy" className="text-primary/80 hover:text-primary ml-2">
              Privacy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
