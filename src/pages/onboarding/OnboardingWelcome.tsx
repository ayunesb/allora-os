
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const OnboardingWelcome = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const handleContinue = () => {
    navigate('/onboarding/company');
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Allora AI</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your AI-powered executive advisory platform. Let's get you set up with a personalized experience.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Welcome, {profile?.name || 'there'}!</CardTitle>
          <CardDescription>
            Allora AI will help you make better business decisions with AI-powered insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Here's what you can expect from Allora AI:</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-primary/5">
                <h3 className="font-medium mb-2">AI Executive Team</h3>
                <p className="text-sm text-muted-foreground">
                  Access a virtual board of AI executives with specialized expertise in different business domains.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg bg-primary/5">
                <h3 className="font-medium mb-2">Strategic Decision Making</h3>
                <p className="text-sm text-muted-foreground">
                  Get data-driven insights and recommendations tailored to your business context.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg bg-primary/5">
                <h3 className="font-medium mb-2">Real-world Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with your business tools like Stripe, Calendly, and more for actionable intelligence.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg bg-primary/5">
                <h3 className="font-medium mb-2">Personalized Strategy</h3>
                <p className="text-sm text-muted-foreground">
                  Receive strategies tailored to your industry, company size, and risk appetite.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleContinue}>
            Continue to Setup
          </Button>
        </CardFooter>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>This will only take a few minutes to complete. Your information helps us personalize your experience.</p>
      </div>
    </div>
  );
};

export default OnboardingWelcome;
