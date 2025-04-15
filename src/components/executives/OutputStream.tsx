
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronsRight, Bot } from 'lucide-react';

interface OutputStreamProps {
  text: string;
  executive: string;
  isLoading?: boolean;
  toolOutput?: string;
}

export const OutputStream: React.FC<OutputStreamProps> = ({
  text,
  executive,
  isLoading = false,
  toolOutput
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  // Simulate typewriter effect
  useEffect(() => {
    if (isLoading) {
      setDisplayedText('');
      setIsComplete(false);
      return;
    }
    
    setDisplayedText('');
    setIsComplete(false);
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 10); // Adjust speed as needed
    
    return () => clearInterval(interval);
  }, [text, isLoading]);
  
  // Style based on executive role
  const getExecutiveColor = (role: string): string => {
    const colors: Record<string, string> = {
      'CEO': 'bg-purple-100 text-purple-800',
      'CFO': 'bg-emerald-100 text-emerald-800',
      'CTO': 'bg-blue-100 text-blue-800',
      'CMO': 'bg-amber-100 text-amber-800',
      'COO': 'bg-indigo-100 text-indigo-800'
    };
    
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <Bot size={16} />
          </div>
          <Badge className={getExecutiveColor(executive)}>{executive}</Badge>
          {isComplete && (
            <Badge variant="outline" className="ml-auto">
              Complete
            </Badge>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="whitespace-pre-line">
            {isLoading ? (
              <p className="text-muted-foreground">
                <ChevronsRight className="inline h-4 w-4 animate-pulse" /> 
                Thinking...
              </p>
            ) : (
              <>
                <p className="leading-relaxed">{displayedText}</p>
                {!isComplete && (
                  <span className="inline-block h-4 w-0.5 bg-primary animate-pulse ml-0.5"></span>
                )}
              </>
            )}
          </div>
          
          {toolOutput && isComplete && (
            <div className="mt-4 p-3 bg-muted rounded-md">
              <h4 className="text-sm font-medium mb-1">Tool Execution Result:</h4>
              <p className="text-sm">{toolOutput}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
