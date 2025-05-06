import React from "react";
interface WebhookInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean | null;
  errorMessage?: string;
  validMessage?: string;
  validationMessage?: string | null;
  description?: string;
}
declare const WebhookInput: React.FC<WebhookInputProps>;
export default WebhookInput;
