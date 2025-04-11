
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <div className="bg-accent text-white py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Accelerate Your Business Growth Today</h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Join thousands of forward-thinking businesses using Allora AI to create winning strategies and drive exceptional results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-accent hover:bg-white/90 px-8 group" asChild>
            <Link to="/signup" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Start Your Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8" asChild>
            <Link to="/pricing">View Enterprise Plans</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-white/70">
          No credit card required. 14-day free trial with full platform access.
        </p>
      </div>
    </div>
  );
};

export default CallToAction;
