interface StripeWebhookSectionProps {
  stripeWebhook: string;
  onStripeWebhookChange: (value: string) => void;
  onTestWebhook: () => void;
  isTestLoading: boolean;
  isValid?: boolean | null;
}
declare const StripeWebhookSection: ({
  stripeWebhook,
  onStripeWebhookChange,
  onTestWebhook,
  isTestLoading,
  isValid: externalIsValid,
}: StripeWebhookSectionProps) => JSX.Element;
export default StripeWebhookSection;
