import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreVertical, CheckCircle, UserPlus, MessageSquare, HelpCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ExecutivePersona } from "@/types/executives";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { PageTitle } from "@/components/ui/page-title";
import ExecutiveMessages from '@/components/executives/ExecutiveMessages';

export default function ExecutiveDetail() {
  const router = useRouter();
  const { name } = router.query;
  const { user } = useAuth();
  
  const [executive, setExecutive] = useState<ExecutivePersona | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchExecutive = async () => {
      setIsLoading(true);
      try {
        // Mock data loading
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockExecutive: ExecutivePersona = {
          id: "1",
          name: name as string || "AI CEO",
          title: "Chief Executive Officer",
          shortTitle: "CEO",
          avatar: "/assets/avatars/ai-ceo.png",
          color: "bg-green-500",
          introduction: "Experienced in strategic leadership and business growth.",
          expertise: ["Strategy", "Leadership", "Business Development"],
          leadership: {
            style: "Visionary",
            strengths: "Decision-making, Communication",
            philosophy: "Lead by example and empower the team."
          },
          background: {
            education: "MBA, Harvard Business School",
            experience: "15+ years in executive management"
          },
          approach: "Data-driven and customer-focused.",
          communicationStyle: "Clear, concise, and persuasive.",
          questionExamples: [
            "What are our key strategic priorities?",
            "How can we improve our market position?",
            "What are the biggest risks facing the company?"
          ]
        };
        
        setExecutive(mockExecutive);
      } catch (error) {
        console.error("Failed to load executive:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (name) {
      fetchExecutive();
    }
  }, [name]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!executive) {
    return <div>Executive not found</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <PageTitle title={executive.name} description={executive.title}>
          {executive.name}
        </PageTitle>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Executive Profile</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                Add to Team
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                View Help
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={executive.avatar} alt={executive.name} />
              <AvatarFallback>{executive.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{executive.name}</h3>
              <p className="text-sm text-muted-foreground">{executive.title}</p>
              <Badge className="mt-2 rounded-md">AI Executive</Badge>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Introduction</h4>
              <p className="text-sm text-muted-foreground">{executive.introduction}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Expertise</h4>
              <div className="flex gap-2">
                {executive.expertise.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ExecutiveMessages 
        executiveName={executive.name}
        executiveRole={executive.title}
        avatarUrl={executive.avatar}
      />
    </div>
  );
}
