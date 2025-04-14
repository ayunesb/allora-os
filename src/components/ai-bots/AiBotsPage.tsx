
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
  Zap,
  Bot,
  Sparkles,
  Loader2,
  Wand2
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
import { motion, AnimatePresence } from "framer-motion";

const TabLoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh]">
    <div className="relative w-24 h-24 mb-6">
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary/50 animate-spin" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Bot className="w-8 h-8 text-primary/70" />
      </div>
    </div>
    <div className="space-y-2 text-center">
      <p className="text-lg font-medium text-primary/80">Initializing AI capabilities</p>
      <p className="text-sm text-muted-foreground">
        Connecting to advanced executive intelligence...
      </p>
      <div className="flex items-center justify-center space-x-1 pt-2">
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className="w-2 h-2 rounded-full bg-primary/30 animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

export const AiBotsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("boardroom");
  const [selectedBot, setSelectedBot] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  const { profile } = useAuth();
  const companyId = profile?.company_id || null;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Initial load animation
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

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

  if (isInitialLoad) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-32 h-32 mb-8"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-primary/5 animate-ping" style={{ animationDuration: "3s" }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Wand2 className="w-16 h-16 text-primary/70" />
          </div>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl font-semibold text-primary"
        >
          Activating Executive AI
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-muted-foreground text-center max-w-md mt-2"
        >
          Connecting to your AI executive team for strategy insights and debate
        </motion.p>
      </div>
    );
  }

  if (isPending) {
    return <TabLoadingFallback />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-8 max-w-full overflow-hidden"
    >
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

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};

export default AiBotsPage;
