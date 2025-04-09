
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface APIKeyInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isSecret?: boolean;
}

const APIKeyInput = ({ id, label, value, onChange, placeholder, isSecret = true }: APIKeyInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input 
        id={id} 
        type={isSecret ? "password" : "text"} 
        placeholder={placeholder || "********"} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default APIKeyInput;
