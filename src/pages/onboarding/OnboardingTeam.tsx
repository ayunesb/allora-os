import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
const OnboardingTeam = () => {
  const navigate = useNavigate();
  const handleFinish = () => {
    navigate("/dashboard");
  };
  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Team Setup</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Invite your team members to collaborate with your AI executives.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Invite Team Members</CardTitle>
          </div>
          <CardDescription>
            Add your colleagues to collaborate on strategies and campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Team invitation form would go here */}
          <p className="text-muted-foreground">
            Team invitations coming soon...
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/onboarding/company")}
          >
            Back
          </Button>
          <Button onClick={handleFinish}>Finish Setup</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default OnboardingTeam;
