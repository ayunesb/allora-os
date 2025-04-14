
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Allora AI
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
          AI-powered executive advisory platform to help businesses make strategic decisions and develop growth strategies.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/features">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
