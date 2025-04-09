
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WebhookInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean | null;
  errorMessage: string;
  validMessage: string;
  validationMessage?: string | null;
  description?: string;
  className?: string;
}

const WebhookInput = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  isValid,
  errorMessage,
  validMessage,
  validationMessage,
  description,
  className
}: WebhookInputProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="flex items-center gap-2">
        {label}
        {isValid === false && 
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </TooltipTrigger>
              <TooltipContent>{validationMessage || errorMessage}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        }
        {isValid === true && 
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </TooltipTrigger>
              <TooltipContent>{validMessage}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        }
      </Label>
      <Input 
        id={id} 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        className={isValid === false ? "border-destructive" : ""}
      />
      {validationMessage && isValid === false && (
        <p className="text-xs text-destructive">
          {validationMessage}
        </p>
      )}
      {description && (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};

export default WebhookInput;
