
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Navbar isLoggedIn={false} />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center mt-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Allora AI - Business Acceleration Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered executive advisory to accelerate your business growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
