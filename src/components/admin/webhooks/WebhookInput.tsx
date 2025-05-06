import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";
const WebhookInput = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  isValid,
  errorMessage = "Invalid URL",
  validMessage = "Valid URL",
  validationMessage,
  description,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`pr-10 ${
            isValid === true
              ? "border-green-500 focus-visible:ring-green-500"
              : isValid === false
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
          }`}
        />
        {isValid !== null && (
          <div className="absolute right-3 top-2.5">
            {isValid ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        )}
      </div>

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {validationMessage && (
        <p className={`text-xs ${isValid ? "text-green-500" : "text-red-500"}`}>
          {validationMessage}
        </p>
      )}
    </div>
  );
};
export default WebhookInput;
