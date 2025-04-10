
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  useEffect(() => {
    async function fetchBoardroomDebate() {
      if (!companyId) return;

      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('ai_boardroom_debates')
          .select('*')
          .eq('company_id', companyId)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          throw new Error(`Failed to fetch boardroom debate: ${error.message}`);
        }

        if (data) {
          setTopic(data.topic);
          setSummary(data.summary);
          setExecutives(data.executives);
          setDiscussion(data.discussion);
          setConclusion(data.conclusion);
        } else {
          setError("No boardroom debate found for this company.");
        }
      } catch (err: any) {
        console.error("Error fetching boardroom debate:", err);
        setError(err.message || "Failed to load boardroom debate.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBoardroomDebate();
  }, [companyId]);

  const getExecutiveName = (executiveId: string) => {
    const executive = executives.find(exec => exec.id === executiveId);
    return executive ? executive.name : 'Unknown Executive';
  };

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
              {discussion.map((item: any, index: number) => (
                <div key={index} className="flex space-x-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={getExecutiveImage(item.speaker)} />
                    <AvatarFallback>{item.speaker.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{item.speaker}</p>
                    <p className="text-xs text-muted-foreground">{item.message}</p>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="conclusion">
              <p className="text-muted-foreground">{conclusion}</p>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
