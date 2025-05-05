import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAgentQuery } from '@/utils/langchain/hooks/useAgentQuery';
import { useExternalLangChainAPI } from '@/utils/langchain/hooks/useExternalLangChainAPI';
import { PageLoader } from '@/components/ui/page-loader';
import { Badge } from '@/components/ui/badge';
import { AlignLeft, Clock, Settings, Wrench } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
export function AgentQueryInterface({ title = "Ask your AI Agent", placeholder = "Enter your question or request...", initialContext = {}, onResult }) {
    const [inputValue, setInputValue] = useState('');
    const [showToolCalls, setShowToolCalls] = useState(false);
    const [useExternalAPI, setUseExternalAPI] = useState(() => {
        return localStorage.getItem('use_external_langchain_api') === 'true';
    });
    const { executeQuery, result: internalResult, toolCalls, isLoading: isInternalLoading, error: internalError, setContext } = useAgentQuery({
        onSuccess: (data) => {
            if (onResult && data.result && !useExternalAPI) {
                onResult(data.result);
            }
        },
        enabled: false
    });
    const { executeQuery: executeExternalQuery, result: externalResult, isLoading: isExternalLoading, error: externalError } = useExternalLangChainAPI();
    // Determine which result, loading state, and error to use based on the API choice
    const result = useExternalAPI ? externalResult : internalResult;
    const isLoading = useExternalAPI ? isExternalLoading : isInternalLoading;
    const error = useExternalAPI ? externalError : internalError;
    // Set initial context when component mounts
    useEffect(() => {
        if (Object.keys(initialContext).length > 0) {
            setContext(initialContext);
        }
    }, [initialContext, setContext]);
    // Handle API toggle change
    const handleApiToggle = (checked) => {
        setUseExternalAPI(checked);
        localStorage.setItem('use_external_langchain_api', checked ? 'true' : 'false');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim())
            return;
        try {
            if (useExternalAPI) {
                const result = await executeExternalQuery({
                    query: inputValue,
                    context: initialContext
                });
                if (onResult && result.result) {
                    onResult(result.result);
                }
            }
            else {
                await executeQuery(inputValue);
            }
        }
        catch (err) {
            console.error("Error executing query:", err);
        }
    };
    return (<Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            {title}
            <Badge variant="outline" className="ml-2">
              {useExternalAPI ? "External API" : "LangChain"}
            </Badge>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="api-toggle" className="text-sm">
              {useExternalAPI ? "Using External API" : "Using Built-in API"}
            </Label>
            <Switch id="api-toggle" checked={useExternalAPI} onCheckedChange={handleApiToggle}/>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <Textarea placeholder={placeholder} value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="min-h-[100px] resize-none" disabled={isLoading}/>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading || !inputValue.trim()}>
              {isLoading ? "Processing..." : "Submit"}
            </Button>
          </div>
        </form>
        
        {isLoading && (<PageLoader message="Processing your request..."/>)}
        
        {error && (<div className="p-4 bg-red-50 text-red-600 rounded-md">
            {error instanceof Error ? error.message : String(error)}
          </div>)}
        
        {result && !isLoading && (<div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <AlignLeft size={18} className="text-primary"/> Response
              </h3>
              
              {!useExternalAPI && toolCalls && toolCalls.length > 0 && (<Button variant="outline" size="sm" onClick={() => setShowToolCalls(!showToolCalls)}>
                  <Wrench size={16} className="mr-2"/>
                  {showToolCalls ? "Hide Tools" : "Show Tools"}
                </Button>)}
            </div>
            
            <div className="p-4 bg-muted/40 rounded-md whitespace-pre-wrap">
              {result}
            </div>
            
            {!useExternalAPI && showToolCalls && toolCalls && toolCalls.length > 0 && (<div className="mt-4 p-4 bg-muted/20 rounded-md">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Settings size={16}/> Tool Executions ({toolCalls.length})
                </h4>
                <div className="space-y-2">
                  {toolCalls.map((call, idx) => (<div key={idx} className="p-2 bg-background border rounded-sm text-xs">
                      <div className="font-bold">{call.tool}</div>
                      <div className="text-muted-foreground">
                        Input: {JSON.stringify(call.input)}
                      </div>
                      <div className="mt-1 text-muted-foreground">
                        Output: {typeof call.output === 'object'
                        ? JSON.stringify(call.output)
                        : String(call.output)}
                      </div>
                    </div>))}
                </div>
              </div>)}
          </div>)}
      </CardContent>
      
      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock size={14}/>
          {new Date().toLocaleString()}
        </div>
        <div>
          {useExternalAPI
            ? "Powered by External LangChain API"
            : "Powered by LangChain.tsx"}
        </div>
      </CardFooter>
    </Card>);
}
