
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const OnboardingIntegrations = () => {
  const navigate = useNavigate();
  
  const handleNext = () => {
    navigate('/onboarding/ai-workflow');
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Connect Your Services</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Integrate your existing services with Allora AI to enhance your experience.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>
            Connect your existing tools and services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-dashed border-2 p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <PlusCircle className="h-8 w-8 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Connect CRM</h3>
                  <p className="text-sm text-muted-foreground">Salesforce, HubSpot, etc.</p>
                </div>
              </div>
            </Card>
            
            <Card className="border-dashed border-2 p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <PlusCircle className="h-8 w-8 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Connect Calendar</h3>
                  <p className="text-sm text-muted-foreground">Google Calendar, Outlook</p>
                </div>
              </div>
            </Card>
            
            <Card className="border-dashed border-2 p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <PlusCircle className="h-8 w-8 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Connect Email</h3>
                  <p className="text-sm text-muted-foreground">Gmail, Outlook, etc.</p>
                </div>
              </div>
            </Card>
            
            <Card className="border-dashed border-2 p-4 cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <PlusCircle className="h-8 w-8 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Connect Analytics</h3>
                  <p className="text-sm text-muted-foreground">Google Analytics, etc.</p>
                </div>
              </div>
            </Card>
          </div>
          
          <p className="text-sm text-muted-foreground">
            You can skip this step and add integrations later.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/onboarding/team')}>
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

export default OnboardingIntegrations;
