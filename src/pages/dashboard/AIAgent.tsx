import React from 'react';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import { AgentQueryInterface } from '@/components/ai-agents/AgentQueryInterface';
import { useUser } from '@/hooks/useUser';
import { useCompanyId } from '@/hooks/useCompanyId';
export default function AIAgent() {
    const { user } = useUser();
    const companyId = useCompanyId();
    const initialContext = {
        userId: user?.id,
        companyId,
        date: new Date().toISOString(),
        userRole: user?.user_metadata?.role || 'user'
    };
    return (<div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <TypographyH1>AI Agent</TypographyH1>
        <TypographyP>
          Ask questions or make requests to your AI-powered LangChain agent. This agent can access 
          various tools and services to help you with your business needs.
        </TypographyP>
      </div>
      
      <div className="mt-8">
        <AgentQueryInterface initialContext={initialContext} placeholder="Ask about leads, campaigns, analyze data, or request business insights..."/>
      </div>
    </div>);
}
