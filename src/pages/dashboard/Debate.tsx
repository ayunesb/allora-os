
import React from "react";
import DebateContainer from "@/components/debate/DebateContainer";

export default function Debate() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Executive Debate</h1>
        <p className="text-muted-foreground mt-2">
          Generate strategic insights through a simulated debate among AI executives
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <DebateContainer />
      </div>
    </div>
  );
}
