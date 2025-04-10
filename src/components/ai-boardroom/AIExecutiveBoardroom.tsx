
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Brain, MessageSquare, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCompanyDetails } from "@/hooks/useCompanyDetails";
import { Skeleton } from "@/components/ui/skeleton";

type ExecutiveMessage = {
  id: string;
  name: string;
  role: string;
  message: string;
  stance: 'for' | 'against' | 'neutral';
  timestamp: Date;
};

type DebateThread = {
  id: string;
  topic: string;
  messages: ExecutiveMessage[];
  conclusion: string;
  status: 'in-progress' | 'concluded';
};

// Sample debate topics based on business goals
const debateTopics = [
  'Expansion Strategy',
  'Revenue Growth',
  'Market Positioning',
  'Product Development',
  'Operational Efficiency'
];

// AI Executive details
const executives = [
  { name: 'Elon Musk', role: 'Innovation Expert', avatar: '/avatars/elon-musk.png' },
  { name: 'Satya Nadella', role: 'Tech Strategist', avatar: '/avatars/satya-nadella.png' },
  { name: 'Warren Buffett', role: 'Investment Advisor', avatar: '/avatars/warren-buffett.png' },
  { name: 'Jeff Bezos', role: 'Customer Obsession Lead', avatar: '/avatars/jeff-bezos.png' },
  { name: 'Steve Jobs', role: 'Product Visionary', avatar: '/avatars/steve-jobs.png' },
  { name: 'Sheryl Sandberg', role: 'Operations Expert', avatar: '/avatars/sheryl-sandberg.png' }
];

// Generate a debate based on company details
const generateDebate = (companyIndustry?: string, companyRisk?: string): DebateThread => {
  const industry = companyIndustry || 'Technology';
  const riskLevel = companyRisk || 'Medium';
  
  // Select a random debate topic
  const topic = debateTopics[Math.floor(Math.random() * debateTopics.length)];
  
  // Select 3-4 random executives to participate
  const shuffledExecutives = [...executives].sort(() => 0.5 - Math.random());
  const debateParticipants = shuffledExecutives.slice(0, 3 + Math.floor(Math.random() * 2));
  
  // Generate message thread
  const messages: ExecutiveMessage[] = [];
  
  // Initial proposal
  const proposer = debateParticipants[0];
  messages.push({
    id: '1',
    name: proposer.name,
    role: proposer.role,
    message: `I propose we focus on ${topic.toLowerCase()} for ${industry}. Given the current market conditions, this would provide the highest ROI with ${riskLevel.toLowerCase()} risk.`,
    stance: 'for',
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  });
  
  // Second executive challenges
  const challenger = debateParticipants[1];
  messages.push({
    id: '2',
    name: challenger.name,
    role: challenger.role,
    message: `I disagree. The ${topic.toLowerCase()} direction isn't aligned with current market trends in ${industry}. We should consider alternatives that better match our ${riskLevel.toLowerCase()} risk appetite.`,
    stance: 'against',
    timestamp: new Date(Date.now() - 1000 * 60 * 25) // 25 minutes ago
  });
  
  // Third executive offers middle ground
  const mediator = debateParticipants[2];
  messages.push({
    id: '3',
    name: mediator.name,
    role: mediator.role,
    message: `I see both perspectives. Perhaps we could adopt a phased approach to ${topic.toLowerCase()}, starting with lower-risk initiatives and scaling based on results. This aligns with our ${riskLevel.toLowerCase()} risk profile while capturing market opportunities.`,
    stance: 'neutral',
    timestamp: new Date(Date.now() - 1000 * 60 * 20) // 20 minutes ago
  });
  
  // Original proposer responds
  messages.push({
    id: '4',
    name: proposer.name,
    role: proposer.role,
    message: `That's a reasonable approach. My market data shows that early movers in ${industry} who take calculated risks on ${topic.toLowerCase()} see 3x returns within 18 months. We should act decisively but prudently.`,
    stance: 'for',
    timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  });
  
  // Add a 4th executive if there is one
  if (debateParticipants.length > 3) {
    const fourthExec = debateParticipants[3];
    messages.push({
      id: '5',
      name: fourthExec.name,
      role: fourthExec.role,
      message: `I've analyzed similar ${industry} companies that have executed ${topic.toLowerCase()} initiatives. Success correlates strongly with proper timing and execution rather than the strategy itself. Let's ensure we have the right team in place first.`,
      stance: Math.random() > 0.5 ? 'for' : 'against',
      timestamp: new Date(Date.now() - 1000 * 60 * 10) // 10 minutes ago
    });
  }
  
  // Final consensus message
  messages.push({
    id: '6',
    name: mediator.name,
    role: mediator.role,
    message: `Based on our discussion, I propose a final recommendation: Move forward with a strategic ${topic.toLowerCase()} initiative tailored for the ${industry} sector, with appropriate risk controls to maintain our ${riskLevel.toLowerCase()} risk profile. We'll establish clear KPIs and review progress quarterly.`,
    stance: 'neutral',
    timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
  });
  
  return {
    id: Math.random().toString(36).substring(2, 11),
    topic: `${industry} ${topic} Strategy`,
    messages,
    conclusion: `The Executive AI team recommends proceeding with a phased ${topic.toLowerCase()} approach, balancing innovation with our ${riskLevel.toLowerCase()} risk profile. Implementation should begin within the next quarter with quarterly review gates.`,
    status: 'concluded'
  };
};

export default function AIExecutiveBoardroom() {
  const [activeTab, setActiveTab] = useState('latest');
  const [debates, setDebates] = useState<DebateThread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { profile } = useAuth();
  const { companyDetails, riskAppetite } = useCompanyDetails(profile?.company_id);
  
  useEffect(() => {
    const loadDebates = async () => {
      setIsLoading(true);
      
      // In a real implementation, you would fetch debates from an API
      // For now, we'll generate sample debates
      setTimeout(() => {
        const industry = companyDetails?.industry || profile?.industry;
        const risk = riskAppetite;
        
        // Generate 3 sample debates
        const generatedDebates = [
          generateDebate(industry, risk),
          generateDebate(industry, risk),
          generateDebate(industry, risk)
        ];
        
        setDebates(generatedDebates);
        setIsLoading(false);
      }, 1000);
    };
    
    loadDebates();
  }, [companyDetails, profile, riskAppetite]);
  
  const refreshDebates = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const industry = companyDetails?.industry || profile?.industry;
      const risk = riskAppetite;
      
      // Generate new debates
      const generatedDebates = [
        generateDebate(industry, risk),
        generateDebate(industry, risk),
        generateDebate(industry, risk)
      ];
      
      setDebates(generatedDebates);
      setIsLoading(false);
    }, 1000);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const getStanceBadge = (stance: 'for' | 'against' | 'neutral') => {
    switch (stance) {
      case 'for':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">In Favor</Badge>;
      case 'against':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Against</Badge>;
      case 'neutral':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Neutral</Badge>;
    }
  };
  
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">AI Executive Boardroom</CardTitle>
            <CardDescription>
              Watch your virtual executive team debate the best strategies for your business
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={refreshDebates} disabled={isLoading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Debates
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="latest" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="latest">Latest Debate</TabsTrigger>
            <TabsTrigger value="all">All Debates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="latest">
            {isLoading ? (
              <DebateLoadingSkeleton />
            ) : debates.length > 0 ? (
              <DebateThread debate={debates[0]} />
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No debates available yet.</p>
                <Button variant="outline" className="mt-4" onClick={refreshDebates}>
                  Generate New Debate
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : debates.length > 0 ? (
              <div className="space-y-4">
                {debates.map(debate => (
                  <Card key={debate.id} className="hover:bg-muted/50 transition-colors">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{debate.topic}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {debate.messages.slice(0, 3).map(msg => (
                          <Avatar key={msg.id} className="h-6 w-6">
                            <AvatarImage src={executives.find(e => e.name === msg.name)?.avatar} />
                            <AvatarFallback>{getInitials(msg.name)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {debate.messages.length > 3 && (
                          <Badge variant="outline" className="h-6 rounded-full">
                            +{debate.messages.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {debate.conclusion}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No debates available yet.</p>
                <Button variant="outline" className="mt-4" onClick={refreshDebates}>
                  Generate New Debates
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function DebateThread({ debate }: { debate: DebateThread }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">{debate.topic}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Brain className="h-4 w-4" />
          <span>{debate.messages.length} messages from {new Set(debate.messages.map(m => m.name)).size} executives</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {debate.messages.map((message) => (
          <div key={message.id} className="flex gap-4">
            <Avatar className="h-10 w-10 mt-1">
              <AvatarImage 
                src={executives.find(e => e.name === message.name)?.avatar} 
                alt={message.name} 
              />
              <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{message.name}</span>
                <span className="text-xs text-muted-foreground">
                  {message.role}
                </span>
                {getStanceBadge(message.stance)}
              </div>
              
              <p className="text-sm">
                {message.message}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  <span>Agree</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown className="h-3 w-3" />
                  <span>Disagree</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Card className="bg-muted/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Final Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{debate.conclusion}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function DebateLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-3/4" />
      
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
      
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
