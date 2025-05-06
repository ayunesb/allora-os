import { z } from "zod";
declare const campaignSchema: z.ZodObject<
  {
    name: z.ZodString;
    platform: z.ZodEnum<["meta", "tiktok", "email", "whatsapp"]>;
    budget: z.ZodNumber;
  },
  "strip",
  z.ZodTypeAny,
  {
    name?: string;
    platform?: "meta" | "email" | "whatsapp" | "tiktok";
    budget?: number;
  },
  {
    name?: string;
    platform?: "meta" | "email" | "whatsapp" | "tiktok";
    budget?: number;
  }
>;
export type CampaignFormValues = z.infer<typeof campaignSchema>;
type CampaignFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CampaignFormValues) => void;
  defaultValues?: CampaignFormValues;
  isSubmitting: boolean;
  isEditing: boolean;
};
export default function CampaignFormDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  isSubmitting,
  isEditing,
}: CampaignFormDialogProps): import("react").JSX.Element;
export {};
