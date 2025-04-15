
import React, { useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { completeOnboarding } from '@/utils/onboarding';
import { toast } from 'sonner';

const OnboardingComplete = () => {
  const navigate = useNavigate();
  const { profile, refreshProfile } = useAuth();
  
  useEffect(() => {
    const finalizeOnboarding = async () => {
      try {
        if (profile?.id && profile.company_id) {
          await completeOnboarding(profile.id, profile.company_id, profile.industry || '');
          refreshProfile();
        }
      } catch (error) {
        console.error("Error completing onboarding:", error);
      }
    };
    
    finalizeOnboarding();
  }, [profile, refreshProfile]);
  
  const handleComplete = () => {
    toast.success("Onboarding completed successfully!");
    navigate('/dashboard');
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Setup Complete!</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          You're all set to start using Allora AI.
        </p>
      </div>

      <Card className="mb-8 border-primary/20">
        <CardHeader className="text-center pb-2">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-2xl">Your AI Executive Team is Ready</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4 pb-8">
          <p className="text-lg">
            We've set up your AI executives based on your company profile.
            They're ready to help you make strategic decisions and grow your business.
          </p>
          
          <div className="flex flex-col items-center space-y-2">
            <p className="font-medium">What's next?</p>
            <ul className="text-left space-y-2 max-w-md">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Explore your AI Executive Boardroom</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Review suggested strategies</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Set up your first campaign</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Track leads and manage communications</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button size="lg" onClick={handleComplete}>
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OnboardingComplete;
