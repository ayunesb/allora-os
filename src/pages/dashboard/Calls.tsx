
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useSelfLearning } from "@/hooks/useSelfLearning";
import { useAuthState } from "@/hooks/useAuthState";
import { useCallScripts } from "@/hooks/useCallScripts";
import { useCommunications } from "@/hooks/useCommunications";

// Import the components
import CallsHeader from "@/components/calls/CallsHeader";
import CallTabs from "@/components/calls/CallTabs";
import ScriptSection from "@/components/calls/ScriptSection";
import CommunicationTimeline from "@/components/calls/CommunicationTimeline";
import UpcomingCommunications from "@/components/calls/UpcomingCommunications";
import PastCommunications from "@/components/calls/PastCommunications";
import CommunicationActions from "@/components/calls/CommunicationActions";

export default function Calls() {
  const [activeTab, setActiveTab] = useState("timeline");
  const { callScripts, messageScripts, isLoading: scriptsLoading } = useCallScripts();
  const { 
    upcomingCommunications, 
    pastCommunications, 
    isLoading: communicationsLoading 
  } = useCommunications();

  const { user } = useAuthState();
  const { trackAction } = useSelfLearning();

  useEffect(() => {
    if (user?.id) {
      trackAction(
        'view_page',
        'page_view',
        'calls_page',
        'page',
        { tab: activeTab }
      );
    }
  }, [user, trackAction, activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (user?.id) {
      trackAction(
        'switch_tab',
        'page_view',
        `calls_${value}`,
        'tab',
        { from: activeTab, to: value }
      );
    }
  };

  const handleUseScript = (scriptId: string, scriptTitle: string) => {
    if (user?.id) {
      trackAction(
        'use_script',
        'strategy_view',
        scriptTitle,
        'call_script',
        { scriptId, scriptTitle }
      );
    }
    
    setActiveTab("timeline");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <CallsHeader />
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <CallTabs activeTab={activeTab} onTabChange={handleTabChange} />
        
        <TabsContent value="timeline" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CommunicationTimeline 
                upcomingCommunications={upcomingCommunications}
                pastCommunications={pastCommunications}
                isLoading={communicationsLoading}
              />
            </div>
            <div>
              <CommunicationActions />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-6">
          <UpcomingCommunications 
            communications={upcomingCommunications}
            isLoading={communicationsLoading}
          />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <PastCommunications 
            communications={pastCommunications}
            isLoading={communicationsLoading}
          />
        </TabsContent>
        
        <TabsContent value="scripts" className="space-y-6">
          {/* AI Call Scripts */}
          <ScriptSection 
            title="AI Generated Call Scripts"
            scripts={callScripts}
            onUseScript={handleUseScript}
            type="call"
            isAiSection={true}
          />
          
          {/* Standard Call Scripts */}
          <ScriptSection 
            title="Standard Call Scripts"
            scripts={callScripts}
            onUseScript={handleUseScript}
            type="call"
            isAiSection={false}
          />
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          {/* AI Message Templates */}
          <ScriptSection 
            title="AI Generated Message Templates"
            scripts={messageScripts}
            onUseScript={handleUseScript}
            type="message"
            isAiSection={true}
          />
          
          {/* Standard Message Templates */}
          <ScriptSection 
            title="Standard Message Templates"
            scripts={messageScripts}
            onUseScript={handleUseScript}
            type="message"
            isAiSection={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
