
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, AlertTriangle, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getExecutiveImage } from "@/utils/ai-executives";
import { useCompanyDetails } from "@/hooks/useCompanyDetails";
import { useAuth } from "@/context/AuthContext";
import { useBreakpoint } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Add the missing getStanceBadge function
const getStanceBadge = (stance: string) => {
  switch (stance.toLowerCase()) {
    case 'support':
    case 'positive':
    case 'agree':
    case 'for':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Supports</Badge>;
    case 'oppose':
    case 'negative':
    case 'disagree':
    case 'against':
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Opposes</Badge>;
    case 'neutral':
    case 'undecided':
      return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">Neutral</Badge>;
    case 'caution':
    case 'warning':
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Cautious</Badge>;
    default:
      return <Badge variant="outline" className="bg-slate-100">Unknown</Badge>;
  }
};

interface AIExecutiveBoardroomProps {
  companyId?: string | null;
}

export default function AIExecutiveBoardroom({ companyId }: AIExecutiveBoardroomProps) {
  const [topic, setTopic] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [executives, setExecutives] = useState<any[]>([]);
  const [discussion, setDiscussion] = useState<any[]>([]);
  const [conclusion, setConclusion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { profile } = useAuth();
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  const { riskAppetite } = useCompanyDetails(companyId);
  const [timeoutError, setTimeoutError] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    async function fetchBoardroomDebate() {
      if (!companyId && !profile?.company_id) {
        setError("No company ID available. Please set up your company profile first.");
        setIsLoading(false);
        return;
      }

      const targetCompanyId = companyId || profile?.company_id;
      setIsLoading(true);
      setError(null);
      setTimeoutError(false);
      
      // Set a timeout to show a message if the fetch takes too long
      timer = setTimeout(() => {
        setTimeoutError(true);
      }, 8000);

      try {
        // Check if the table exists and we have access
        const { data, error } = await supabase
          .from('ai_boardroom_debates')
          .select('*')
          .eq('company_id', targetCompanyId)
          .order('created_at', { ascending: false })
          .limit(1);

        // Clear the timeout since we got a response
        clearTimeout(timer);

        if (error) {
          console.error("Supabase error:", error);
          if (error.code === 'PGRST116') {
            // No data found for this company
            setError("No boardroom debate found for this company. Try starting a new debate.");
          } else if (error.code === '42P01') {
            // Table doesn't exist
            setError("Executive boardroom functionality is not available. The required database table is missing.");
          } else {
            throw new Error(`Failed to fetch boardroom debate: ${error.message}`);
          }
        } else if (data && data.length > 0) {
          const debateData = data[0];
          setTopic(debateData.topic);
          setSummary(debateData.summary || '');
          setExecutives(debateData.executives || []);
          setDiscussion(debateData.discussion || []);
          setConclusion(debateData.conclusion || '');
        } else {
          // No error but no data
          setError("No boardroom debates found. Start your first executive debate.");
        }
      } catch (err: any) {
        clearTimeout(timer);
        console.error("Error fetching boardroom debate:", err);
        setError(err.message || "Failed to load boardroom debate.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBoardroomDebate();
    
    return () => {
      clearTimeout(timer);
    };
  }, [companyId, profile?.company_id]);

  const handleStartNewDebate = () => {
    // This function would open a modal or navigate to a debate creation page
    toast.info("This feature is coming soon!");
  };

  const getExecutiveName = (executiveId: string) => {
    const executive = executives.find(exec => exec.id === executiveId);
    return executive ? executive.name : 'Unknown Executive';
  };

  // Create a default debate if we're stuck loading too long
  if (timeoutError && isLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">AI Executive Boardroom</CardTitle>
          <CardDescription>Taking longer than expected...</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <AlertTriangle className="h-10 w-10 text-amber-500 mb-4" />
          <p className="text-sm text-muted-foreground mb-4">The debate seems to be taking a while to load. There might be an issue with the connection.</p>
          <Button 
            variant="default" 
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Refresh the Page
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">AI Executive Boardroom</CardTitle>
          <CardDescription>Simulating a live debate among your AI executives</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Loading the latest boardroom discussion...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">AI Executive Boardroom</CardTitle>
          <CardDescription>Simulating a live debate among your AI executives</CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <div className="flex flex-col items-center text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={handleStartNewDebate}
              className="mt-2"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Start New Debate
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle case where we somehow passed all checks but still have no data
  if (!topic && !summary && discussion.length === 0) {
    return (
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">AI Executive Boardroom</CardTitle>
          <CardDescription>No active debates found</CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <div className="flex flex-col items-center text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">
              There are no active executive debates for your company. Would you like to start one?
            </p>
            <Button 
              variant="default" 
              onClick={handleStartNewDebate}
              className="mt-2"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Start New Debate
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">AI Executive Boardroom</CardTitle>
        <CardDescription>A simulated debate among your AI executives on key business strategies</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-md font-semibold">Topic of Discussion</h3>
          <p className="text-muted-foreground">{topic}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-md font-semibold">Summary</h3>
          <p className="text-muted-foreground">{summary}</p>
        </div>

        <div>
          <h3 className="text-md font-semibold">Executive Perspectives</h3>
          <Tabs defaultValue="discussion" className="space-y-4">
            <TabsList>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="conclusion">Conclusion</TabsTrigger>
            </TabsList>
            <TabsContent value="discussion" className="space-y-4">
              {discussion.length > 0 ? (
                discussion.map((item: any, index: number) => (
                  <div key={index} className="flex space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={getExecutiveImage(item.speaker)} />
                      <AvatarFallback>{item.speaker?.substring(0, 2) || 'EX'}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{item.speaker}</p>
                      <p className="text-xs text-muted-foreground">{item.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No discussion data available.</p>
              )}
            </TabsContent>
            <TabsContent value="conclusion">
              {conclusion ? (
                <p className="text-muted-foreground">{conclusion}</p>
              ) : (
                <p className="text-sm text-muted-foreground">No conclusion data available.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
