
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={toggleVoiceInterface}
            >
              {isVoiceEnabled ? (
                <Volume2 className="h-4 w-4 text-primary" />
              ) : (
                <VolumeX className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="sr-only">
                {isVoiceEnabled ? "Disable voice" : "Enable voice"}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{isVoiceEnabled ? "Disable voice interface" : "Enable voice interface"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isListening ? "default" : "outline"}
              size="icon"
              className={`h-8 w-8 rounded-full relative ${isListening ? "bg-red-500 hover:bg-red-600" : ""}`}
              onClick={startVoiceRecognition}
              disabled={!isVoiceEnabled}
            >
              {isListening ? (
                <MicOff className="h-4 w-4 text-white" />
              ) : (
                <Mic className={`h-4 w-4 ${isVoiceEnabled ? "text-primary" : "text-muted-foreground"}`} />
              )}
              
              <AnimatePresence>
                {isListening && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute inset-0 rounded-full bg-red-500/20"
                    style={{ 
                      animation: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                    }}
                  />
                )}
              </AnimatePresence>
              
              <span className="sr-only">
                {isListening ? "Stop listening" : "Start voice input"}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{isListening ? "Stop listening" : "Start voice input"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
