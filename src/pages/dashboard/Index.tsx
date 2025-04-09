
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, BarChart, Phone, Users, Bot, ThumbsUp, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import StrategyBoard from "@/components/StrategyBoard";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
import { generateStrategy } from "@/utils/strategy";

export default function Dashboard() {
  const { profile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [pendingApprovals, setPendingApprovals] = useState(3);
  const [aiRecommendations, setAiRecommendations] = useState<{ title: string; description: string; type: string }[]>([]);
  const [riskAppetite, setRiskAppetite] = useState<'low' | 'medium' | 'high'>('medium');
  
  // Fetch company details and generate recommendations on component mount
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (!profile?.company_id) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('details')
          .eq('id', profile.company_id)
          .single();
          
        if (error) throw error;
        
        // Extract company details and ensure it's an object
        const companyDetails = data?.details as Record<string, any> || {};
        
        // Now we can safely check if riskAppetite exists and set it
        if (companyDetails.riskAppetite && 
            ['low', 'medium', 'high'].includes(companyDetails.riskAppetite)) {
          setRiskAppetite(companyDetails.riskAppetite as 'low' | 'medium' | 'high');
        }

        // Generate AI recommendations based on company details
        generateAiRecommendations(companyDetails);
      } catch (error) {
        console.error("Error fetching company details:", error);
        toast.error("Failed to load company information");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompanyDetails();
  }, [profile]);
  
  // Generate AI recommendations based on company profile
  const generateAiRecommendations = (companyDetails: Record<string, any>) => {
    // In a real app, this would call an AI service
    // For now, we'll generate some example recommendations
    const industry = profile?.industry || "Technology";
    const companySize = companyDetails.companySize || "Small";
    const recommendations = [
      {
        title: `${industry} Market Expansion`,
        description: `Based on your ${riskAppetite} risk profile, I recommend exploring new ${industry.toLowerCase()} market segments with a phased approach.`,
        type: "strategy"
      },
      {
        title: "Targeted LinkedIn Campaign",
        description: `I've drafted a ${companySize.toLowerCase()}-business optimized campaign targeting decision-makers in your industry.`,
        type: "campaign"
      },
      {
        title: "Cold Call Script Update",
        description: "I've analyzed your most successful calls and prepared an enhanced script that emphasizes your unique value proposition.",
        type: "call"
      },
      {
        title: "Executive Team Meeting",
        description: "Schedule a strategy session with your AI executive team to align on Q3 objectives.",
        type: "meeting"
      }
    ];
    
    setAiRecommendations(recommendations);
  };

  const handleApproveRecommendation = (index: number) => {
    toast.success("Recommendation approved and added to your workspace");
    
    // Remove the approved recommendation
    setAiRecommendations(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
    
    // Decrease pending approvals
    setPendingApprovals(prev => Math.max(0, prev - 1));
  };

  // For initial loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
        
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground">
            Let's grow your business with AI-powered strategies
          </p>
        </div>
        
        {pendingApprovals > 0 && (
          <Button asChild variant="default">
            <Link to="/dashboard/approvals">
              <ThumbsUp className="mr-2 h-4 w-4" />
              {pendingApprovals} Pending Approvals
            </Link>
          </Button>
        )}
      </div>
      
      {/* CEO Strategy Summary */}
      <Card className="mb-8 border-primary/20">
        <CardHeader className="bg-primary/5">
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-xl">Message from Your AI CEO</CardTitle>
              <CardDescription>
                Strategy recommendation based on your company profile
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Priority
              </Badge>
              <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                <Clock className="mr-1 h-3 w-3" /> 2 days ago
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4">
            Based on the information you've provided about {profile?.company || "your company"} during onboarding,
            I recommend focusing on a <strong>{riskAppetite} risk</strong> growth strategy for the next quarter.
            Our analysis shows significant opportunity in the {profile?.industry || "your industry"} sector, especially
            with the current market conditions.
          </p>
          <p>
            I've generated several targeted strategies and campaign ideas that align with your business objectives.
            Review and approve them below to begin implementation with the help of your AI executive team.
          </p>
        </CardContent>
        <CardFooter className="border-t bg-muted/20 justify-between">
          <div className="text-sm text-muted-foreground">
            From: <span className="font-medium">Elon Musk, AI CEO</span>
          </div>
          <Button size="sm" variant="default">
            <Link to="/dashboard/ai-bots">Schedule Strategy Meeting</Link>
          </Button>
        </CardFooter>
      </Card>
      
      {/* AI Recommendations */}
      <h2 className="text-2xl font-bold mb-4">AI Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {aiRecommendations.map((rec, index) => (
          <Card key={index} className="border-primary/10 hover:border-primary/30 transition-all">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className="text-lg">{rec.title}</CardTitle>
                <Badge variant="outline" className="capitalize">
                  {rec.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{rec.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" size="sm" onClick={() => handleApproveRecommendation(index)}>
                <ThumbsUp className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button variant="ghost" size="sm">
                <Link to={`/dashboard/${rec.type === 'strategy' ? 'strategies' : rec.type === 'campaign' ? 'campaigns' : 'calls'}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Strategy Board */}
      <StrategyBoard />
      
      {/* Quick Access Links */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { icon: <TrendingUp className="h-6 w-6" />, title: "Strategies", path: "/dashboard/strategies" },
          { icon: <BarChart className="h-6 w-6" />, title: "Campaigns", path: "/dashboard/campaigns" },
          { icon: <Phone className="h-6 w-6" />, title: "Calls", path: "/dashboard/calls" },
          { icon: <Users className="h-6 w-6" />, title: "Leads", path: "/dashboard/leads" },
          { icon: <Bot className="h-6 w-6" />, title: "AI Team", path: "/dashboard/ai-bots" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center p-4 bg-card border rounded-lg hover:bg-accent/10 transition-colors"
          >
            <div className="mr-3 text-primary">{item.icon}</div>
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
