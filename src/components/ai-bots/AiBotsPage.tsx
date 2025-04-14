import React, { useState, useEffect, useTransition, Suspense } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useBreakpoint } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Lightbulb, 
  Brain, 
  MessageSquare, 
  Users, 
  Settings, 
  Zap 
} from 'lucide-react';

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

const TabLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh] animate-pulse">
    <div className="text-center space-y-4">
      <Zap className="mx-auto h-12 w-12 text-primary/50" />
      <p className="text-muted-foreground">Loading AI capabilities...</p>
    </div>
  </div>
);

export const AiBotsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("boardroom");
  const [selectedBot, setSelectedBot] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  const { profile } = useAuth();
  const companyId = profile?.company_id || null;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    startTransition(() => {
      if (location.hash === '#debate') {
        setActiveTab('debate');
      }
    });
  }, [location.hash]);

  const handleTabChange = (value: string) => {
    startTransition(() => {
      setActiveTab(value);
      if (value === 'debate') {
        navigate('/dashboard/ai-bots#debate');
      } else {
        navigate('/dashboard/ai-bots');
      }
    });
  };

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

  if (isPending) {
    return <TabLoadingFallback />;
  }

  return (
    <div className="w-full space-y-8 max-w-full overflow-hidden">
      <AiBotsHeader isMobileView={isMobileView} />

      <Tabs 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="w-full max-w-full"
      >
        <AiBotsTabsList 
          isMobileView={isMobileView} 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />

        <TabsContent value="boardroom" className="mt-6 w-full max-w-full">
          <ErrorBoundary>
            <Suspense fallback={<TabLoadingFallback />}>
              <AIExecutiveBoardroom companyId={companyId} />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="debate" className="mt-6 w-full max-w-full">
          <ErrorBoundary>
            <DebateStarterPage />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="bots" className="mt-6 w-full max-w-full">
          <ErrorBoundary>
            <BotsTabContent onSelectBot={setSelectedBot} setActiveTab={setActiveTab} />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="insights" className="mt-6 w-full max-w-full">
          <ErrorBoundary>
            <BotInsightsSection />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="chat" className="mt-6 w-full max-w-full">
          <ErrorBoundary>
            <BotChatPanel 
              selectedBot={selectedBot} 
              onSelectBot={setSelectedBot} 
              allBots={allBots} 
            />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="roster" className="mt-6 w-full max-w-full">
          <ErrorBoundary>
            <ExecutiveRoster />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="history" className="mt-6 w-full max-w-full">
          <ErrorBoundary>
            <ConsultationHistory />
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AiBotsPage;
