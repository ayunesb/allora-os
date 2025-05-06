interface ZapierWebhookSectionProps {
  zapierWebhook: string;
  onZapierWebhookChange: (value: string) => void;
  onTestWebhook: () => void;
  isTestLoading: boolean;
}
declare const ZapierWebhookSection: ({
  zapierWebhook,
  onZapierWebhookChange,
  onTestWebhook,
  isTestLoading,
}: ZapierWebhookSectionProps) => JSX.Element;
export default ZapierWebhookSection;
