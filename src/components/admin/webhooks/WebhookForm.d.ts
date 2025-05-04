import * as z from 'zod';
declare const webhookFormSchema: z.ZodObject<{
    type: z.ZodString;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type?: string;
    url?: string;
}, {
    type?: string;
    url?: string;
}>;
type WebhookFormValues = z.infer<typeof webhookFormSchema>;
interface WebhookFormProps {
    initialData?: {
        type: string;
        url: string;
    };
    onSubmit: (values: WebhookFormValues) => Promise<void>;
    isSubmitting?: boolean;
}
export default function WebhookForm({ initialData, onSubmit, isSubmitting }: WebhookFormProps): JSX.Element;
export {};
