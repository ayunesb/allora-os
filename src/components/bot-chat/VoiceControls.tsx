
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VoiceControlsProps {
  isVoiceEnabled: boolean;
  isListening: boolean;
  toggleVoiceInterface: () => void;
  startVoiceRecognition: () => void;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  isVoiceEnabled,
  isListening,
  toggleVoiceInterface,
  startVoiceRecognition
}) => {
  return (
    <TooltipProvider>
      <div className="flex items-center space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleVoiceInterface}
              className={isVoiceEnabled ? "text-primary" : "text-muted-foreground"}
            >
              {isVoiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            {isVoiceEnabled ? "Disable voice responses" : "Enable voice responses"}
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={startVoiceRecognition}
              disabled={isListening}
              className={isListening ? "text-primary animate-pulse" : "text-muted-foreground"}
            >
              {isListening ? <Mic size={20} /> : <MicOff size={20} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            {isListening ? "Listening..." : "Start voice input"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
