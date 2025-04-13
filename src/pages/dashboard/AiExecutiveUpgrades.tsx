
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpgradeExecutiveBot } from "@/components/ai-executives/UpgradeExecutiveBot";
import { UpgradeAllExecutives } from "@/components/ai-executives/UpgradeAllExecutives";
import { executiveBots } from '@/backend/executiveBots';
import { formatRoleTitle } from '@/utils/consultation/botRoleUtils';
import { UpgradedExecutiveBot } from '@/utils/executive-os/integrationService';

export default function AiExecutiveUpgrades() {
  const [activeTab, setActiveTab] = useState("ceo");
  const [upgradedBots, setUpgradedBots] = useState<UpgradedExecutiveBot[]>([]);
  
  const handleUpgradeComplete = (upgradedBot: UpgradedExecutiveBot) => {
    setUpgradedBots(prev => {
      // Remove any existing entry for this bot
      const filtered = prev.filter(bot => bot.name !== upgradedBot.name);
      // Add the new upgraded bot
      return [...filtered, upgradedBot];
    });
  };
  
  const handleBulkUpgradeComplete = (newUpgradedBots: UpgradedExecutiveBot[]) => {
    setUpgradedBots(prev => {
      // Create a map of existing bots for easy lookup
      const existingBots = new Map(prev.map(bot => [bot.name, bot]));
      
      // Merge with new bots, overwriting any existing entries
      for (const bot of newUpgradedBots) {
        existingBots.set(bot.name, bot);
      }
      
      return Array.from(existingBots.values());
    });
  };
  
  // Check if a bot is upgraded
  const isBotUpgraded = (botName: string) => {
    return upgradedBots.some(bot => bot.name === botName);
  };
  
  return (
    <>
      <Helmet>
        <title>AI Executive Upgrades - Allora AI</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Executive Upgrades</h1>
            <p className="text-muted-foreground mt-1">
              Upgrade your AI executives with the Allora Executive OS and personalized cognitive enhancements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Tabs defaultValue="ceo" onValueChange={setActiveTab} className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    {Object.keys(executiveBots).map(role => (
                      <TabsTrigger key={role} value={role} className="capitalize">
                        {role}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                {Object.entries(executiveBots).map(([role, bots]) => (
                  <TabsContent key={role} value={role} className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {bots.map((botName) => (
                        <UpgradeExecutiveBot
                          key={`${role}-${botName}`}
                          botName={botName}
                          botRole={formatRoleTitle(role)}
                          onUpgradeComplete={handleUpgradeComplete}
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            <div className="space-y-6">
              <UpgradeAllExecutives onUpgradeComplete={handleBulkUpgradeComplete} />
              
              <div className="border border-border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Executive OS Features</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0">1</div>
                    <span>First Principles & OODA Loop Thinking Models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0">2</div>
                    <span>Daily Decision Frameworks & Eisenhower Matrix</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0">3</div>
                    <span>5-Level Delegation System</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0">4</div>
                    <span>Crisis Management & Strategic Sprints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-primary/10 text-primary rounded-full h-5 w-5 flex items-center justify-center mt-0.5 shrink-0">5</div>
                    <span>Personalized Cognitive Boosts & Mental Models</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
