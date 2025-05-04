import { z } from "zod";
declare const formSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    platform: z.ZodEnum<["Facebook", "Twitter", "LinkedIn", "Instagram", "TikTok"]>;
    scheduled_date: z.ZodDate;
    content_type: z.ZodEnum<["text", "image", "video", "link", "carousel"]>;
    link_url: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
}, "strip", z.ZodTypeAny, {
    content?: string;
    title?: string;
    platform?: "Facebook" | "Twitter" | "Instagram" | "LinkedIn" | "TikTok";
    scheduled_date?: Date;
    content_type?: "text" | "link" | "video" | "image" | "carousel";
    link_url?: string;
}, {
    content?: string;
    title?: string;
    platform?: "Facebook" | "Twitter" | "Instagram" | "LinkedIn" | "TikTok";
    scheduled_date?: Date;
    content_type?: "text" | "link" | "video" | "image" | "carousel";
    link_url?: string;
}>;
export type PostFormValues = z.infer<typeof formSchema>;
interface DialogCreateProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: PostFormValues) => Promise<any>;
    defaultValues?: Partial<PostFormValues>;
    isEditing?: boolean;
}
export declare function DialogCreate({ open, onOpenChange, onSubmit, defaultValues, isEditing, }: DialogCreateProps): JSX.Element;
export default DialogCreate;
