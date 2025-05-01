import React, { useState, useEffect, useTransition, Suspense } from 'react';
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
  Zap,
  Bot,
  Sparkles,
  Loader2,
  BrainCircuit,
  Target,
  GanttChart
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
      <motion.div 
        className="absolute inset-0 rounded-full bg-primary/10" 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <BrainCircuit className="w-8 h-8 text-primary" />
      </div>
    </div>
    <div className="space-y-2 text-center">
      <p className="text-lg font-medium text-gradient-blue-green bg-clip-text text-transparent">Initializing Executive Intelligence</p>
      <p className="text-sm text-muted-foreground">
        Connecting to advanced cognitive frameworks...
      </p>
      <div className="flex items-center justify-center space-x-1 pt-2">
        {[0, 1, 2].map((i) => (
          <motion.div 
            key={i} 
            className="w-2 h-2 rounded-full bg-primary/50"
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut" 
            }}
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
    }, 1200);
    
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
          <motion.div 
            className="absolute inset-0 rounded-full bg-primary/10" 
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full bg-primary/20" 
            animate={{ 
              scale: [1.1, 1.3, 1.1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <BrainCircuit className="w-16 h-16 text-primary" />
            </motion.div>
          </div>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        >
          Activating Executive Intelligence
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-muted-foreground text-center max-w-md mt-2"
        >
          Initializing cognitive frameworks and strategic models
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 flex gap-2"
        >
          {["Strategic", "Operational", "Analytical", "Innovative"].map((capability, index) => (
            <motion.div
              key={capability}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + (index * 0.1) }}
              className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5"
            >
              {capability}
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  if (isPending) {
    return <TabLoadingFallback />;
  }

  // Create tab icons map for consistent usage
  const tabIcons = {
    boardroom: BrainCircuit,
    debate: MessageSquare,
    bots: Bot,
    insights: Lightbulb,
    chat: MessageSquare,
    roster: Users,
    history: GanttChart
  };

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
          tabIcons={tabIcons}
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
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-dots [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)] pointer-events-none opacity-30" />
                <ErrorBoundary>
                  <Suspense fallback={<TabLoadingFallback />}>
                    <AIExecutiveBoardroom companyId={companyId} />
                  </Suspense>
                </ErrorBoundary>
              </div>
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
