
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface CeoMessageProps {
  riskAppetite: 'low' | 'medium' | 'high';
}

export default function CeoMessage({ riskAppetite }: CeoMessageProps) {
  const { profile } = useAuth();
  
  return (
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
        <Button size="sm" variant="default" asChild>
          <Link to="/dashboard/ai-bots">Schedule Strategy Meeting</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
