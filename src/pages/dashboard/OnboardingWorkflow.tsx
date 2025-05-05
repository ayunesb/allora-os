import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useExecutiveWorkflow } from '@/context/ExecutiveWorkflowContext';
import CompanyProfileForm from '@/components/onboarding/CompanyProfileForm';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
export default function OnboardingWorkflow() {
    const { profile } = useAuth();
    const { hasGeneratedContent, isLoading } = useExecutiveWorkflow();
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();
    // If content has been generated, show completion state
    if (hasGeneratedContent) {
        return (<div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="border-green-200">
          <CardHeader className="pb-4">
            <div className="flex flex-col items-center text-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-2"/>
              <CardTitle className="text-2xl">AI Executive Workflow Generated!</CardTitle>
              <CardDescription className="text-lg">
                Your AI executive team has created strategies, campaigns, and scripts based on your company profile.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={() => navigate('/dashboard/strategies')} className="flex items-center justify-between" size="lg">
                <span>View Business Strategies</span>
                <ArrowRight className="ml-2 h-4 w-4"/>
              </Button>
              <Button onClick={() => navigate('/dashboard/campaigns')} className="flex items-center justify-between" variant="outline" size="lg">
                <span>View Marketing Campaigns</span>
                <ArrowRight className="ml-2 h-4 w-4"/>
              </Button>
              <Button onClick={() => navigate('/dashboard/calls')} className="flex items-center justify-between" variant="outline" size="lg">
                <span>View Communication Scripts</span>
                <ArrowRight className="ml-2 h-4 w-4"/>
              </Button>
              <Button onClick={() => navigate('/dashboard/ai-bots')} className="flex items-center justify-between" variant="outline" size="lg">
                <span>View AI Executive Debate</span>
                <ArrowRight className="ml-2 h-4 w-4"/>
              </Button>
            </div>
            <Button onClick={() => navigate('/dashboard')} className="w-full mt-4" variant="secondary">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>);
    }
    return (<div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <BrainCircuit className="h-16 w-16 text-primary"/>
        </div>
        <h1 className="text-3xl font-bold">AI Executive Workflow</h1>
        <p className="text-muted-foreground mt-2">
          Get personalized business strategies, marketing campaigns, and communication scripts from your AI executive team
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-1">
            <TabsTrigger value="profile" disabled={isLoading}>
              Company Profile
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>
                Provide information about your company to generate personalized AI executive recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CompanyProfileForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>);
}
