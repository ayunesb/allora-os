import React from "react";
import { WebhookType } from "@/utils/webhookValidation";
interface WebhookFormProps {
  title: string;
  description: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onTest: () => Promise<boolean>;
  onSave: () => void;
  isSaving: boolean;
  isValid: boolean;
  isTestLoading: boolean;
  webhookType: WebhookType;
}
declare const WebhookForm: React.FC<WebhookFormProps>;
export default WebhookForm;
