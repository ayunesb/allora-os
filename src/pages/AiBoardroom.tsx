
import React from "react";
import { Helmet } from "react-helmet-async";
import AIExecutiveBoardroom from "@/components/ai-boardroom/AIExecutiveBoardroom";

export default function AiBoardroom() {
  return (
    <>
      <Helmet>
        <title>AI Executive Boardroom - Allora AI</title>
      </Helmet>
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">AI Executive Boardroom</h1>
            <p className="text-muted-foreground">Strategic discussions and insights from your AI executive team</p>
          </div>
          
          <AIExecutiveBoardroom companyId={null} />
        </div>
      </div>
    </>
  );
}
