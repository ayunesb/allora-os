interface Webhook {
  id: string;
  type: string;
  url: string;
  created_at?: string;
}
interface WebhookListProps {
  webhooks: Webhook[];
  isLoading: boolean;
  onAddWebhook: () => void;
  onEditWebhook: (webhook: Webhook) => void;
  onDeleteWebhook: (webhookId: string) => void;
  onTestWebhook: (webhookId: string) => void;
}
export default function WebhookList({
  webhooks,
  isLoading,
  onAddWebhook,
  onEditWebhook,
  onDeleteWebhook,
  onTestWebhook,
}: WebhookListProps): JSX.Element;
export {};
