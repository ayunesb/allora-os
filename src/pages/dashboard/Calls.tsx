
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useSelfLearning } from "@/hooks/useSelfLearning";
import { useAuthState } from "@/hooks/useAuthState";
import { useCallScripts } from "@/hooks/useCallScripts";

// Import the refactored components
import CallsHeader from "@/components/calls/CallsHeader";
import CallTabs from "@/components/calls/CallTabs";
import ScriptSection from "@/components/calls/ScriptSection";
import PhoneDialer from "@/components/calls/PhoneDialer";
import MessageSender from "@/components/calls/MessageSender";

export default function Calls() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [activeTab, setActiveTab] = useState("scripts");
  const { callScripts, messageScripts, isLoading: scriptsLoading } = useCallScripts();

  const { user } = useAuthState();
  const { trackAction } = useSelfLearning();

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
    
    setActiveTab("dialer");
  };

  return (
    <div>
      <CallsHeader />
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <CallTabs activeTab={activeTab} onTabChange={handleTabChange} />
        
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
        
        <TabsContent value="dialer">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PhoneDialer 
              phoneNumber={phoneNumber} 
              onPhoneNumberChange={setPhoneNumber}
            />
            
            <MessageSender 
              phoneNumber={phoneNumber} 
              onPhoneNumberChange={setPhoneNumber}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
