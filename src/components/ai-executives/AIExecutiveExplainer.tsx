
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Info, MessageSquare, PlusCircle, RocketIcon, SparklesIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';

interface ExecutiveRole {
  role: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  capabilities: string[];
  examples: string[];
}

const executiveRoles: ExecutiveRole[] = [
  {
    role: "ceo",
    title: "CEO Advisor",
    description: "Provides strategic vision and leadership guidance for your business",
    icon: <RocketIcon className="h-5 w-5" />,
    capabilities: [
      "Develop long-term business strategies",
      "Analyze competitive landscape",
      "Guide overall company direction",
      "Make high-level business recommendations"
    ],
    examples: [
      "What growth strategies should we focus on this quarter?",
      "How can we position ourselves against our competitors?",
      "What are the biggest risks to our business model?"
    ]
  },
  {
    role: "cfo",
    title: "CFO Advisor",
    description: "Offers financial insights and investment guidance",
    icon: <SparklesIcon className="h-5 w-5" />,
    capabilities: [
      "Analyze financial performance",
      "Create budget projections",
      "Develop risk management strategies",
      "Provide investment advice"
    ],
    examples: [
      "How should we allocate our marketing budget?",
      "What's the ROI potential of this new initiative?",
      "How can we improve our cash flow management?"
    ]
  },
  {
    role: "strategy",
    title: "Strategy Consultant",
    description: "Provides specialized advice on business growth and optimization",
    icon: <Brain className="h-5 w-5" />,
    capabilities: [
      "Market expansion strategies",
      "Business model innovation",
      "Process optimization",
      "Customer acquisition strategies"
    ],
    examples: [
      "How can we optimize our customer acquisition funnel?",
      "What market segments should we explore next?",
      "How can we improve our operational efficiency?"
    ]
  }
];

export function AIExecutiveExplainer() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<ExecutiveRole | null>(null);
  const navigate = useNavigate();
  
  const handleOpenRoleDialog = (role: ExecutiveRole) => {
    setSelectedRole(role);
    setIsDialogOpen(true);
  };
  
  const startConversation = () => {
    if (selectedRole) {
      navigate('/dashboard/ai-bots?role=' + selectedRole.role);
      setIsDialogOpen(false);
    }
  };
  
  const navigateToDebate = () => {
    navigate('/dashboard/ai-bots#debate');
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/30 border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-primary mt-1" />
          <div>
            <h3 className="text-lg font-medium mb-2">How AI Executives Work</h3>
            <p className="text-muted-foreground">
              Our AI executives model the thinking and expertise of world-class business leaders. 
              They analyze your business context and provide personalized guidance on strategies, 
              decisions, and growth opportunities.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {executiveRoles.map((role) => (
          <Card key={role.role} className="cursor-pointer hover:border-primary/50 transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center text-lg">
                  {role.icon}
                  <span className="ml-2">{role.title}</span>
                </CardTitle>
              </div>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="text-sm font-medium mb-2">How they can help:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {role.capabilities.slice(0, 3).map((capability, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleOpenRoleDialog(role)}
              >
                <Info className="mr-2 h-4 w-4" />
                Learn More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
        <Button onClick={navigateToDebate} className="flex-1 max-w-md mx-auto">
          <MessageSquare className="mr-2 h-4 w-4" />
          Start Executive Board Meeting
        </Button>
        <Button variant="outline" onClick={() => navigate('/dashboard/ai-bots')} className="flex-1 max-w-md mx-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Explore All Executives
        </Button>
      </div>
      
      {selectedRole && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {selectedRole.icon}
                <span className="ml-2">{selectedRole.title}</span>
              </DialogTitle>
              <DialogDescription>
                {selectedRole.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <h3 className="font-medium mb-2">Key capabilities:</h3>
              <ul className="space-y-1 mb-4">
                {selectedRole.capabilities.map((capability, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="mr-2">•</span>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="font-medium mb-2">Example questions to ask:</h3>
              <ul className="space-y-1">
                {selectedRole.examples.map((example, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="mr-2">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
              <Button onClick={startConversation}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Conversation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default AIExecutiveExplainer;
