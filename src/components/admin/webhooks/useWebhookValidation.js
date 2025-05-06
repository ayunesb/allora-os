"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWebhookValidation = useWebhookValidation;
var react_1 = require("react");
var webhookValidation_1 = require("@/utils/webhookValidation");
function useWebhookValidation(type) {
  var _a = (0, react_1.useState)(null),
    isValid = _a[0],
    setIsValid = _a[1];
  var _b = (0, react_1.useState)(null),
    validationMessage = _b[0],
    setValidationMessage = _b[1];
  var validateUrl = (0, react_1.useCallback)(
    function (url) {
      // If empty, reset validation
      if (!url.trim()) {
        setIsValid(null);
        setValidationMessage(null);
        return;
      }
      try {
        // Validate using our utility function
        var isValidFormat = (0, webhookValidation_1.validateWebhookUrlFormat)(
          url,
          type,
        );
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
    isValid: isValid,
    validationMessage: validationMessage,
    validateUrl: validateUrl,
  };
}
exports.default = useWebhookValidation;
