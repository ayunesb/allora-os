
import React from 'react';
import { PageTitle } from '@/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const AIChat = () => {
  return (
    <div className="container px-4 py-6">
      <PageTitle
        title="AI Chat"
        description="Chat with your AI executives and get real-time insights"
      />
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Executive Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Start a conversation with your AI executives. Ask questions, get strategic advice, 
              and receive insights tailored to your business needs.
            </p>
            
            <div className="p-8 text-center border border-dashed rounded-lg">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">Chat Interface Coming Soon</h3>
              <p className="text-sm text-muted-foreground">
                The AI chat interface is currently in development and will be available soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIChat;
