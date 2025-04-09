
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

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
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">AI Strategy Generation</h3>
            <p className="text-muted-foreground">
              Get personalized business strategies created by our AI executive team.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="text-3xl mb-4">💼</div>
            <h3 className="text-xl font-semibold mb-2">Virtual Executive Team</h3>
            <p className="text-muted-foreground">
              Access the expertise of AI personas modeled after top executives.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Lead Management</h3>
            <p className="text-muted-foreground">
              Track and nurture leads with our AI-powered CRM tools.
            </p>
          </div>
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
