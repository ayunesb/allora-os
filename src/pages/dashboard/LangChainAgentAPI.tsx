import React, { useState } from 'react';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import { AgentQueryInterface } from '@/components/ai-agents/AgentQueryInterface';
import { useUser } from '@/hooks/useUser';
import { useCompanyId } from '@/hooks/useCompanyId';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export default function LangChainAgentAPI() {
    const { user } = useUser();
    const companyId = useCompanyId();
    const [apiEndpoint, setApiEndpoint] = useState(localStorage.getItem('langchain_api_endpoint') || '');
    const initialContext = {
        userId: user?.id,
        companyId,
        date: new Date().toISOString(),
        userRole: user?.user_metadata?.role || 'user'
    };
    return (<div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <TypographyH1>LangChain Agent API</TypographyH1>
        <TypographyP>
          Connect to your external LangChain Agent API to leverage AI-powered agents with access to various tools and services.
        </TypographyP>
      </div>
      
      <Alert variant="info" className="mb-6">
        <InfoIcon className="h-4 w-4"/>
        <AlertTitle>API Configuration</AlertTitle>
        <AlertDescription>
          You can deploy your LangChain Agent API separately and connect it to Allora AI using the endpoint URL.
          This allows you to run resource-intensive AI agents outside your main application.
        </AlertDescription>
      </Alert>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="apiEndpoint" className="font-medium">
                LangChain Agent API Endpoint
              </label>
              <input id="apiEndpoint" type="text" className="w-full p-2 border rounded-md" placeholder="https://your-langchain-api.example.com/api/langchain-agent" value={apiEndpoint} onChange={(e) => {
            setApiEndpoint(e.target.value);
            localStorage.setItem('langchain_api_endpoint', e.target.value);
        }}/>
              <p className="text-sm text-muted-foreground">
                Enter the full URL to your deployed LangChain Agent API endpoint.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <AgentQueryInterface initialContext={initialContext} placeholder="Ask about leads, campaigns, analyze data, or request business insights..."/>
      </div>
    </div>);
}
