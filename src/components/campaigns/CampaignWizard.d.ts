import { z } from 'zod';
declare const campaignSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    platform: z.ZodEnum<["meta", "tiktok", "email", "whatsapp", "Google"]>;
    budget: z.ZodNumber;
    goal: z.ZodOptional<z.ZodString>;
    audience: z.ZodOptional<z.ZodString>;
    adCopy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    description?: string;
    platform?: "meta" | "email" | "whatsapp" | "tiktok" | "Google";
    budget?: number;
    goal?: string;
    adCopy?: string;
    audience?: string;
}, {
    name?: string;
    description?: string;
    platform?: "meta" | "email" | "whatsapp" | "tiktok" | "Google";
    budget?: number;
    goal?: string;
    adCopy?: string;
    audience?: string;
}>;
type CampaignFormValues = z.infer<typeof campaignSchema>;
interface CampaignWizardProps {
    onSubmit: (campaign: any) => void;
    initialValues?: Partial<CampaignFormValues>;
}
export declare function CampaignWizard({ onSubmit, initialValues }: CampaignWizardProps): JSX.Element;
export default CampaignWizard;
