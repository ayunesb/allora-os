import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
const APIKeyInput = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  isSecret = true,
}) => {
  const [showSecret, setShowSecret] = useState(false);
  // Function to mask API keys for display
  const maskApiKey = (key) => {
    if (!key) return "";
    if (key.length <= 8) return "••••••••";
    // For longer keys, show first and last 4 characters
    return `${key.substring(0, 4)}••••••••${key.substring(key.length - 4)}`;
  };
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex relative">
        <Input
          id={id}
          type={isSecret && !showSecret ? "password" : "text"}
          placeholder={placeholder || "Enter API key"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pr-10"
        />
        {isSecret && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={() => setShowSecret(!showSecret)}
          >
            {showSecret ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
export default APIKeyInput;
