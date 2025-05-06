type ZapierTriggerButtonProps = {
  webhookType?: "newUser" | "newLead" | "newCampaign" | "taskComplete";
  event?: string;
  payload?: Record<string, any>;
  label: string | null;
  onResult?: (success: boolean) => void;
  autoTrigger?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
};
export default function ZapierTriggerButton({
  webhookType,
  event,
  payload,
  label,
  onResult,
  autoTrigger,
  size,
  variant,
  className,
}: ZapierTriggerButtonProps): JSX.Element;
export {};
