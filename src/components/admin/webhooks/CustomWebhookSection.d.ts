interface CustomWebhookSectionProps {
  customWebhook: string;
  onCustomWebhookChange: (value: string) => void;
  onTestWebhook: () => void;
  isTestLoading: boolean;
  webhookName?: string;
}
declare const CustomWebhookSection: ({
  customWebhook,
  onCustomWebhookChange,
  onTestWebhook,
  isTestLoading,
  webhookName,
}: CustomWebhookSectionProps) => JSX.Element;
export default CustomWebhookSection;
