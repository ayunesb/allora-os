import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Download, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCallScriptTracking } from "@/hooks/useCallScriptTracking";
import AiCallScriptFeedback from "./AiCallScriptFeedback";

interface AiCallScriptProps {
  id: string;
  title: string;
  target: string;
  duration: string;
  primaryBot: any;
  collaborators?: any[];
  onUse: (id: string, title: string) => void;
  type: 'call' | 'message';
}

export default function AiCallScript({
  id,
  title,
  target,
  duration,
  primaryBot,
  collaborators = [],
  onUse,
  type
}: AiCallScriptProps) {
  const { trackScriptUse, trackScriptView } = useCallScriptTracking();
  
  const handleUse = () => {
    trackScriptUse(id, title, type, primaryBot);
    onUse(id, title);
  };
  
  // Track view when component renders
  React.useEffect(() => {
    trackScriptView(id, title, type);
  }, [id, title, type, trackScriptView]);
  
  return (
    <div className="border rounded-lg p-4 bg-card h-full flex flex-col">
      <div className="flex gap-3 items-start mb-3">
        <Avatar className="h-10 w-10 border border-primary/20">
          <AvatarImage src={`/avatars/${primaryBot.name.toLowerCase().replace(/\s+/g, '-')}.png`} alt={primaryBot.name} />
          <AvatarFallback>{primaryBot.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div>
          <h3 className="font-semibold mb-1 pr-6">{title}</h3>
          <Badge variant="outline" className="bg-primary/5">
            {type === 'call' ? 'Call Script' : 'Message Template'}
          </Badge>
        </div>
      </div>
      
      <div className="space-y-2 mb-4 text-sm flex-grow">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Created by:</span>
          <span className="font-medium">{primaryBot.name}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Target:</span>
          <span>{target}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Duration:</span>
          <span>{duration}</span>
        </div>
        
        {collaborators.length > 0 && (
          <div>
            <span className="text-muted-foreground block mb-1">Collaborated with:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {collaborators.map((bot, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {bot.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex space-x-2 mt-auto">
        <Button variant="default" size="sm" className="flex-1" onClick={handleUse}>
          <Play className="mr-2 h-4 w-4" />
          Use
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
      
      <AiCallScriptFeedback 
        id={id} 
        title={title} 
        type={type} 
        primaryBot={primaryBot} 
      />
    </div>
  );
}
