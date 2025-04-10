
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { lazy, Suspense } from "react";
import Footer from "@/components/Footer";
import { ChevronRight, Stars, Award, BarChart3, Zap, AlertCircle, Send } from "lucide-react";
import ZapierTriggerButton from "@/components/integrations/ZapierTriggerButton";
import { BusinessEventType, BusinessEventPayload, triggerBusinessEvent } from "@/lib/zapier";
import { toast } from "sonner";

// Lazy load non-critical components
const LazyFeatureBlock = lazy(() => import("@/components/home/FeatureBlock"));
const LazyTestimonial = lazy(() => import("@/components/home/Testimonial"));

// Feature data
const features = [
  {
    emoji: "🚀",
    title: "AI Strategy Generation",
    description: "Get personalized business strategies created by our AI executive team.",
    icon: <Stars className="h-6 w-6 text-primary" />
  },
  {
    emoji: "💼",
    title: "Virtual Executive Team",
    description: "Access the expertise of AI personas modeled after top executives.",
    icon: <Award className="h-6 w-6 text-primary" />
  },
  {
    emoji: "📊",
    title: "Lead Management",
    description: "Track and nurture leads with our AI-powered CRM tools.",
    icon: <BarChart3 className="h-6 w-6 text-primary" />
  }
];

// Testimonial data
const testimonials = [
  {
    quote: "Allora AI transformed our business strategy overnight. The executive insights were game-changing for our growth.",
    author: "Sarah Johnson",
    role: "CEO, TechInnovate",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    quote: "Working with the AI executive team feels like having a board of directors in my pocket. Incredible value for startups.",
    author: "Michael Chen",
    role: "Founder, Growth Ventures",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e"
  }
];

// Business events for demo
const demoBusinessEvents: { title: string, type: BusinessEventType, payload: BusinessEventPayload }[] = [
  {
    title: "New Lead Added",
    type: "lead_created",
    payload: {
      entityId: "lead_demo",
      entityType: "lead",
      name: "John Smith",
      company: "Acme Inc",
      email: "john@example.com",
      status: "New",
      source: "Website Demo",
      botName: "Mike Weinberg",
      timestamp: new Date().toISOString()
    }
  },
  {
    title: "Strategy Approved",
    type: "strategy_approved",
    payload: {
      entityId: "strat_demo",
      entityType: "strategy",
      strategyName: "Market Expansion",
      botName: "Elon Musk",
      timestamp: new Date().toISOString()
    }
  }
];

export default function Index() {
  console.log("Rendering Index page with Navbar isLoggedIn=false");
  
  const handleTriggerBusinessEvent = async (event: { title: string, type: BusinessEventType, payload: BusinessEventPayload }) => {
    try {
      const result = await triggerBusinessEvent(event.type, event.payload);
      
      if (result.success) {
        toast.success(`${event.title} event triggered successfully!`);
      } else {
        toast.error(`Failed to trigger ${event.title} event: ${result.message || "Unknown error"}`);
      }
    } catch (error: any) {
      console.error(`Error triggering event:`, error);
      toast.error(`Error: ${error.message || "An error occurred"}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Explicitly set isLoggedIn to false in public pages */}
      <Navbar isLoggedIn={false} />
      
      <main className="flex flex-col items-center flex-grow">
        {/* Hero Section - Enhanced with better visual hierarchy */}
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
        
        {/* Zapier Integration Demo */}
        <div className="w-full bg-primary/10 py-8 mt-8">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-primary mr-2" />
              <h2 className="text-2xl font-bold">Automatic Zapier Integration</h2>
            </div>
            <p className="mb-6 max-w-2xl mx-auto">
              Allora AI now integrates seamlessly with Zapier with automatic business events, allowing you to automate workflows instantly when important actions happen.
            </p>
            
            {/* Event-driven automation explanation */}
            <div className="mx-auto max-w-3xl mb-8 p-4 bg-white/50 border border-primary/20 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Event-Driven Automation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                When real business events happen in Allora AI, they automatically trigger your Zapier workflows:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex items-start gap-2 text-left">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Lead Management</p>
                    <p className="text-xs text-muted-foreground">New leads automatically sync to your CRM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 text-left">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Campaign Launches</p>
                    <p className="text-xs text-muted-foreground">Auto-track your marketing campaigns</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 text-left">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Send className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Email Campaigns</p>
                    <p className="text-xs text-muted-foreground">Trigger email sequences automatically</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 text-left">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Revenue Tracking</p>
                    <p className="text-xs text-muted-foreground">Monitor financial milestones in real-time</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Note about CORS */}
            <div className="mx-auto max-w-xl mb-6 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-amber-800 text-left">
                Due to browser security restrictions (CORS), webhook requests may show errors in the console 
                but will still reach Zapier. Check your Zap's task history to confirm receipt.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {demoBusinessEvents.map((event, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={() => handleTriggerBusinessEvent(event)}
                >
                  <Zap className="h-4 w-4" />
                  Demo: {event.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Features Section - Enhanced visual appeal */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Powerful AI Business Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Suspense key={index} fallback={
                <div className="bg-card p-6 rounded-lg border border-border animate-pulse h-48"></div>
              }>
                <LazyFeatureBlock
                  emoji={feature.emoji}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  delay={index * 0.2}
                />
              </Suspense>
            ))}
          </div>
        </div>
        
        {/* Testimonials Section - Added for social proof */}
        <div className="w-full bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              What Our Clients Say
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Suspense key={index} fallback={
                  <div className="bg-card p-6 rounded-lg border border-border animate-pulse h-48"></div>
                }>
                  <LazyTestimonial
                    quote={testimonial.quote}
                    author={testimonial.author}
                    role={testimonial.role}
                    avatar={testimonial.avatar}
                    delay={index * 0.2}
                  />
                </Suspense>
              ))}
            </div>
          </div>
        </div>
        
        {/* Final CTA Section */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using Allora AI to create winning strategies and accelerate growth.
          </p>
          <Button size="lg" className="px-8" asChild>
            <Link to="/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};
