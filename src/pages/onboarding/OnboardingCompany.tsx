
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Building } from 'lucide-react';

const OnboardingCompany = () => {
  const navigate = useNavigate();
  
  const handleNext = () => {
    navigate('/onboarding/team');
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Company Information</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tell us about your business so we can tailor our AI executives to your needs.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            <CardTitle>Company Details</CardTitle>
          </div>
          <CardDescription>
            Information about your company helps us create relevant business strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Company form fields would go here */}
          <p className="text-muted-foreground">Company form coming soon...</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/onboarding/profile')}>
            Back
          </Button>
          <Button onClick={handleNext}>
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingCompany;
