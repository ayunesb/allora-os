
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useBreakpoint } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useLocation, useNavigate } from "react-router-dom";
import { AiBotsHeader } from "./AiBotsHeader";
import { AiBotsTabsList } from "./AiBotsTabsList";
import { BotsTabContent } from "./tabContents/BotsTabContent";
import AIExecutiveBoardroom from "@/components/ai-boardroom/AIExecutiveBoardroom";
import DebateStarterPage from "@/components/ai-debate/DebateStarterPage";
import BotInsightsSection from "@/components/bot-insights/BotInsightsSection";
import BotChatPanel from "@/components/bot-chat/BotChatPanel";
import ExecutiveRoster from "@/components/ExecutiveRoster";
import ConsultationHistory from "@/components/ConsultationHistory";
import { executiveBots } from "@/backend/executiveBots";
import { formatRoleTitle, getBotExpertise, getBotOutputLocation } from "@/utils/consultation";

export const AiBotsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("boardroom");
  const [selectedBot, setSelectedBot] = useState<any>(null);
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  const { profile } = useAuth();
  const companyId = profile?.company_id || null;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a hash in the URL that should trigger a tab change
    if (location.hash === '#debate') {
      setActiveTab('debate');
    }
  }, [location.hash]);

  // Handle tab changes and update URL
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'debate') {
      navigate('/dashboard/ai-bots#debate');
    } else {
      navigate('/dashboard/ai-bots');
    }
  };

  // Generate the full list of executive bots with all their metadata
  const allBots = Object.entries(executiveBots).flatMap(([role, names]) => 
    names.map(name => ({
      name,
      role,
      title: formatRoleTitle(role),
      specialty: getBotExpertise(role),
      outputLocation: getBotOutputLocation(role),
      avatar: `/avatars/${name.toLowerCase().replace(/\s+/g, '-')}.png`
    }))
  );

  return (
    <div className="space-y-8">
      <AiBotsHeader isMobileView={isMobileView} />

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <AiBotsTabsList isMobileView={isMobileView} />

        <TabsContent value="boardroom">
          <ErrorBoundary>
            <AIExecutiveBoardroom companyId={companyId} />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="debate">
          <ErrorBoundary>
            <DebateStarterPage />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="bots">
          <BotsTabContent onSelectBot={setSelectedBot} setActiveTab={setActiveTab} />
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
};
