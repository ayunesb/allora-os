import { BusinessEventType } from "@/hooks/useZapier";
interface ZapierWebhookDemoTabsProps {
  webhookUrl: string;
  isTriggering: string | null;
  triggerSample: (event: string, payload: Record<string, any>) => Promise<void>;
  triggerBusinessSample: (
    eventType: BusinessEventType,
    payload: Record<string, any>,
  ) => Promise<void>;
}
export declare function ZapierWebhookDemoTabs({
  webhookUrl,
  isTriggering,
  triggerSample,
  triggerBusinessSample,
}: ZapierWebhookDemoTabsProps): JSX.Element;
export default ZapierWebhookDemoTabs;
