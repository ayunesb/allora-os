import { useState, useCallback } from "react";
import { WebhookType } from "@/types/fixed/Webhook";
import { validateWebhookUrlFormat } from "@/utils/webhookValidation";

interface ValidationResult {
  isValid: boolean | null;
  validationMessage: string | null;
}

export function useWebhookValidation(type: WebhookType) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const validateUrl = useCallback(
    (url: string) => {
      // If empty, reset validation
      if (!url.trim()) {
        setIsValid(null);
        setValidationMessage(null);
        return;
      }

      try {
        // Validate using our utility function
        const isValidFormat = validateWebhookUrlFormat(url, type);
        setIsValid(isValidFormat);

        if (!isValidFormat) {
          switch (type) {
            case "stripe":
              setValidationMessage(
                "Invalid Stripe webhook URL format. Must start with https://api.stripe.com/",
              );
              break;
            case "zapier":
              setValidationMessage(
                "Invalid Zapier webhook URL. Must start with https://hooks.zapier.com/",
              );
              break;
            case "github":
              setValidationMessage(
                "Invalid GitHub webhook URL. Must start with https://api.github.com/",
              );
              break;
            case "slack":
              setValidationMessage(
                "Invalid Slack webhook URL. Must start with https://hooks.slack.com/",
              );
              break;
            case "custom":
              setValidationMessage(
                "Invalid URL format. Must use HTTPS protocol.",
              );
              break;
            default:
              setValidationMessage("Invalid webhook URL");
          }
        } else {
          setValidationMessage(null);
        }
      } catch (error) {
        setIsValid(false);
        setValidationMessage("Invalid URL format");
      }
    },
    [type],
  );

  return {
    isValid,
    validationMessage,
    validateUrl,
  };
}

export default useWebhookValidation;
