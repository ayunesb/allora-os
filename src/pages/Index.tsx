
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { lazy, Suspense } from "react";

// Lazy load non-critical components
const LazyFeatureBlock = lazy(() => import("@/components/home/FeatureBlock"));

// Feature data
const features = [
  {
    emoji: "🚀",
    title: "AI Strategy Generation",
    description: "Get personalized business strategies created by our AI executive team."
  },
  {
    emoji: "💼",
    title: "Virtual Executive Team",
    description: "Access the expertise of AI personas modeled after top executives."
  },
  {
    emoji: "📊",
    title: "Lead Management",
    description: "Track and nurture leads with our AI-powered CRM tools."
  }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center text-center">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-primary">Allora AI</span> - Your AI Business Acceleration Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Launch. Grow. Dominate. The Future of Business is Here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mt-16">
          {features.map((feature, index) => (
            <Suspense key={index} fallback={
              <div className="bg-card p-6 rounded-lg border border-border animate-pulse h-48"></div>
            }>
              <LazyFeatureBlock
                emoji={feature.emoji}
                title={feature.title}
                description={feature.description}
              />
            </Suspense>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <p className="text-muted-foreground">
            © 2025 Allora AI | 
            <Link to="/legal" className="mx-2 hover:underline">Legal</Link> | 
            <Link to="/privacy" className="mx-2 hover:underline">Privacy</Link> | 
            <Link to="/admin" className="mx-2 hover:underline">Admin</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
