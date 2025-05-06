interface Webhook {
  id: string;
  type: string;
  url: string;
  created_at?: string;
}
interface WebhookCardProps {
  webhook: Webhook;
  onEdit: (webhook: Webhook) => void;
  onDelete: (webhookId: string) => void;
  onTest: (webhookId: string) => void;
}
export default function WebhookCard({
  webhook,
  onEdit,
  onDelete,
  onTest,
}: WebhookCardProps): JSX.Element;
export {};
