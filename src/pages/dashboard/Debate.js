import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DebateContainer from "@/components/debate/DebateContainer";
import AIChatDashboard from "./AIChat";
export default function Debate() {
    return (<div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Executive Debate</h1>
        <p className="text-muted-foreground mt-2">
          Generate strategic insights through a simulated debate among AI executives
        </p>
      </div>
      
      <Tabs defaultValue="debate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="debate">Debate Simulator</TabsTrigger>
          <TabsTrigger value="chat">Executive Chat</TabsTrigger>
        </TabsList>
        
        <TabsContent value="debate" className="space-y-4">
          <DebateContainer />
        </TabsContent>
        
        <TabsContent value="chat" className="space-y-4">
          <AIChatDashboard />
        </TabsContent>
      </Tabs>
    </div>);
}
