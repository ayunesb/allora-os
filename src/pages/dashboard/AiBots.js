import React from 'react';
import { PageTitle } from '@/components/ui/typography';
const AIBots = () => {
    return (<div className="container px-4 py-6">
      <PageTitle title="AI Bots" description="Configure and manage your AI assistants"/>
      
      <div className="mt-8">
        <p className="text-muted-foreground">
          This feature is coming soon. You will be able to customize and deploy AI assistants
          trained on your company data.
        </p>
      </div>
    </div>);
};
export default AIBots;
