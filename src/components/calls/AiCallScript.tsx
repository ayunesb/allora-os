
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRoleTitle } from "@/utils/consultation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Play, Lightbulb } from "lucide-react";
import { toast } from "sonner";

interface Bot {
  name: string;
  role: string;
  avatar?: string;
}

interface Collaborator extends Bot {
  contribution: string;
}

interface AiCallScriptProps {
  id: string;
  title: string;
  target: string;
  duration: string;
  primaryBot: Bot;
  collaborators: Collaborator[];
  onUse: (scriptId: string, title: string) => void;
}

export default function AiCallScript({
  id,
  title,
  target,
  duration,
  primaryBot,
  collaborators,
  onUse
}: AiCallScriptProps) {
  const handleDownload = () => {
    toast.info("Preparing call script for download...");
    // In a real app, this would download the script as PDF or text
    setTimeout(() => {
      toast.success("Call script downloaded successfully");
    }, 1500);
  };
  
  return (
    <Card className="dashboard-card border-amber-200/50 transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">
            <Lightbulb className="mr-1.5 h-3.5 w-3.5" />
            AI Generated
          </Badge>
        </div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={primaryBot.avatar} alt={primaryBot.name} />
            <AvatarFallback>{primaryBot.name[0]}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <span className="font-medium">{primaryBot.name}</span>
            <span className="text-muted-foreground ml-1 text-xs">
              ({formatRoleTitle(primaryBot.role)})
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Target:</span>
            <span>{target}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Duration:</span>
            <span>{duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span className="text-green-400">Ready</span>
          </div>
        </div>
        
        {collaborators.length > 0 && (
          <div className="mt-4 border-t pt-3">
            <div className="text-xs text-muted-foreground mb-1">Contributors:</div>
            <div className="flex flex-wrap gap-1">
              {collaborators.map((collaborator, idx) => (
                <Badge variant="secondary" key={idx} className="text-xs">
                  {collaborator.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-3">
        <div className="flex space-x-2 w-full">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onUse(id, title)}>
            <Play className="mr-2 h-4 w-4" />
            Use
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
