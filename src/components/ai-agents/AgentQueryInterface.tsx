
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAgentQuery } from '@/utils/langchain/hooks/useAgentQuery';
import { PageLoader } from '@/components/ui/page-loader';
import { Badge } from '@/components/ui/badge';
import { AlignLeft, Clock, Settings, Tool } from 'lucide-react';

interface AgentQueryInterfaceProps {
  title?: string;
  placeholder?: string;
  initialContext?: Record<string, any>;
  onResult?: (result: string) => void;
}

export function AgentQueryInterface({
  title = "Ask your AI Agent",
  placeholder = "Enter your question or request...",
  initialContext = {},
  onResult
}: AgentQueryInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const [showToolCalls, setShowToolCalls] = useState(false);
  
  const {
    executeQuery,
    result,
    toolCalls,
    isLoading,
    error,
    setContext
  } = useAgentQuery({
    onSuccess: (data) => {
      if (onResult && data.result) {
        onResult(data.result);
      }
    },
    enabled: false
  });
  
  // Set initial context when component mounts
  React.useEffect(() => {
    if (Object.keys(initialContext).length > 0) {
      setContext(initialContext);
    }
  }, [initialContext, setContext]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    try {
      await executeQuery(inputValue);
    } catch (err) {
      console.error("Error executing query:", err);
    }
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
          <Badge variant="outline" className="ml-2">LangChain</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <Textarea
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="min-h-[100px] resize-none"
            disabled={isLoading}
          />
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading || !inputValue.trim()}>
              {isLoading ? "Processing..." : "Submit"}
            </Button>
          </div>
        </form>
        
        {isLoading && (
          <PageLoader message="Processing your request..." />
        )}
        
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-md">
            {error instanceof Error ? error.message : String(error)}
          </div>
        )}
        
        {result && !isLoading && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <AlignLeft size={18} className="text-primary" /> Response
              </h3>
              
              {toolCalls.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowToolCalls(!showToolCalls)}
                >
                  <Tool size={16} className="mr-2" />
                  {showToolCalls ? "Hide Tools" : "Show Tools"}
                </Button>
              )}
            </div>
            
            <div className="p-4 bg-muted/40 rounded-md whitespace-pre-wrap">
              {result}
            </div>
            
            {showToolCalls && toolCalls.length > 0 && (
              <div className="mt-4 p-4 bg-muted/20 rounded-md">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Settings size={16} /> Tool Executions ({toolCalls.length})
                </h4>
                <div className="space-y-2">
                  {toolCalls.map((call, idx) => (
                    <div key={idx} className="p-2 bg-background border rounded-sm text-xs">
                      <div className="font-bold">{call.tool}</div>
                      <div className="text-muted-foreground">
                        Input: {JSON.stringify(call.input)}
                      </div>
                      <div className="mt-1 text-muted-foreground">
                        Output: {typeof call.output === 'object' 
                          ? JSON.stringify(call.output) 
                          : String(call.output)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock size={14} />
          {new Date().toLocaleString()}
        </div>
        <div>Powered by LangChain.js</div>
      </CardFooter>
    </Card>
  );
}
