
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Join thousands of businesses using Allora AI to create winning strategies and accelerate growth.
      </p>
      <Button size="lg" className="px-8" asChild>
        <Link to="/signup">Start Your Free Trial</Link>
      </Button>
    </div>
  );
};

export default CallToAction;
