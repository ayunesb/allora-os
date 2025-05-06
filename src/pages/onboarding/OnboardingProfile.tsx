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
const OnboardingProfile = () => {
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/onboarding/company");
  };
  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tell us about yourself so we can personalize your experience.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
          <CardDescription>
            Help us understand your role and experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Profile form fields would go here */}
          <p className="text-muted-foreground">Profile form coming soon...</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/onboarding")}>
            Back
          </Button>
          <Button onClick={handleNext}>Continue</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default OnboardingProfile;
