
import { useState, useEffect } from "react";
import BotCard from "@/components/BotCard";
import ExecutiveRoster from "@/components/ExecutiveRoster";
import ConsultationHistory from "@/components/ConsultationHistory";
import UserPreferencesDialog from "@/components/UserPreferencesDialog";
import BotChatPanel from "@/components/bot-chat/BotChatPanel";
import BotInsightsSection from "@/components/bot-insights/BotInsightsSection";
import AIExecutiveBoardroom from "@/components/ai-boardroom/AIExecutiveBoardroom";
import { executiveBots } from "@/backend/executiveBots";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Brain, 
  History, 
  Bot, 
  Search,
  BadgeInfo,
  Settings,
  MessageSquare,
  Lightbulb
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { formatRoleTitle, getBotExpertise } from "@/utils/consultation";
import { useBreakpoint } from "@/hooks/use-mobile";

export default function AiBots() {
  const [activeTab, setActiveTab] = useState("boardroom");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [selectedBot, setSelectedBot] = useState<any>(null);
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);

  const allBots = Object.entries(executiveBots).flatMap(([role, names]) => 
    names.map(name => ({
      name,
      role,
      title: formatRoleTitle(role),
      specialty: getBotExpertise(role),
      avatar: `/avatars/${name.toLowerCase().replace(/\s+/g, '-')}.png`
    }))
  );

  const filteredBots = allBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bot.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || bot.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  // Handle selecting a bot to chat with
  const handleSelectBot = (bot: any) => {
    setSelectedBot(bot);
    setActiveTab("chat");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className={`${isMobileView ? 'text-xl' : 'text-3xl'} font-bold tracking-tight`}>AI Executive Boardroom</h1>
          <p className="text-muted-foreground mt-2">
            Your virtual boardroom with world-class AI executives for strategic business guidance.
          </p>
        </div>
        <UserPreferencesDialog triggerLabel={isMobileView ? "Settings" : "Response Settings"} />
      </div>

      <Tabs defaultValue="boardroom" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className={`mb-6 ${isMobileView ? 'flex-wrap gap-1' : ''}`}>
          <TabsTrigger value="boardroom" className={`flex items-center gap-1 ${isMobileView ? 'text-xs px-2 py-1' : 'gap-2'}`}>
            <Brain className="h-4 w-4" />
            <span className={isMobileView ? "sr-only" : ""}>Executive Boardroom</span>
          </TabsTrigger>
          <TabsTrigger value="bots" className={`flex items-center gap-1 ${isMobileView ? 'text-xs px-2 py-1' : 'gap-2'}`}>
            <Bot className="h-4 w-4" />
            <span className={isMobileView ? "sr-only" : ""}>Executive Advisors</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className={`flex items-center gap-1 ${isMobileView ? 'text-xs px-2 py-1' : 'gap-2'}`}>
            <Lightbulb className="h-4 w-4" />
            <span className={isMobileView ? "sr-only" : ""}>AI Insights</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className={`flex items-center gap-1 ${isMobileView ? 'text-xs px-2 py-1' : 'gap-2'}`}>
            <MessageSquare className="h-4 w-4" />
            <span className={isMobileView ? "sr-only" : ""}>AI Chat</span>
          </TabsTrigger>
          <TabsTrigger value="roster" className={`flex items-center gap-1 ${isMobileView ? 'text-xs px-2 py-1' : 'gap-2'}`}>
            <Brain className="h-4 w-4" />
            <span className={isMobileView ? "sr-only" : ""}>Full Roster</span>
          </TabsTrigger>
          <TabsTrigger value="history" className={`flex items-center gap-1 ${isMobileView ? 'text-xs px-2 py-1' : 'gap-2'}`}>
            <History className="h-4 w-4" />
            <span className={isMobileView ? "sr-only" : ""}>Consultation History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="boardroom">
          <AIExecutiveBoardroom />
        </TabsContent>

        <TabsContent value="bots">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search advisors..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {Object.keys(executiveBots).map(role => (
                  <SelectItem key={role} value={role}>
                    {formatRoleTitle(role)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filteredBots.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <BadgeInfo className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No advisors found</h3>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any executive advisors matching your search criteria. 
                  Try adjusting your filters or search query.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBots.map((bot) => (
                <BotCard 
                  key={`${bot.role}-${bot.name}`} 
                  bot={bot}
                  onSelect={() => handleSelectBot(bot)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights">
          <BotInsightsSection />
        </TabsContent>

        <TabsContent value="chat">
          <BotChatPanel 
            selectedBot={selectedBot} 
            onSelectBot={setSelectedBot} 
            allBots={allBots} 
          />
        </TabsContent>

        <TabsContent value="roster">
          <ExecutiveRoster />
        </TabsContent>

        <TabsContent value="history">
          <ConsultationHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
