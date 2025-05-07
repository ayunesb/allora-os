var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
const formSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),
    content: z
        .string()
        .min(1, "Content is required")
        .max(2000, "Content must be less than 2000 characters"),
    platform: z.enum(["Facebook", "Twitter", "LinkedIn", "Instagram", "TikTok"]),
    scheduled_date: z.date({
        required_error: "Please select a date",
    }),
    content_type: z.enum(["text", "image", "video", "link", "carousel"]),
    link_url: z
        .string()
        .url("Please enter a valid URL")
        .optional()
        .or(z.literal("")),
});
export function DialogCreate({ open, onOpenChange, onSubmit, defaultValues, isEditing = false, }) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || {
            title: "",
            content: "",
            platform: "Facebook",
            scheduled_date: new Date(),
            content_type: "text",
            link_url: "",
        },
    });
    const handleSubmit = (data) => __awaiter(this, void 0, void 0, function* () {
        yield onSubmit(data);
        form.reset();
    });
    React.useEffect(() => {
        if (open && defaultValues) {
            form.reset(defaultValues);
        }
    }, [open, defaultValues, form]);
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: isEditing ? "Edit Post" : "Create New Post" }) }), _jsx(Form, Object.assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(handleSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "title", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Title" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Enter post title" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "content", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Content" }), _jsx(FormControl, { children: _jsx(Textarea, Object.assign({ placeholder: "Write your post content..." }, field, { className: "h-20" })) }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "platform", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Platform" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select platform" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "Facebook", children: "Facebook" }), _jsx(SelectItem, { value: "Twitter", children: "Twitter" }), _jsx(SelectItem, { value: "LinkedIn", children: "LinkedIn" }), _jsx(SelectItem, { value: "Instagram", children: "Instagram" }), _jsx(SelectItem, { value: "TikTok", children: "TikTok" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "content_type", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Content Type" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select type" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "text", children: "Text" }), _jsx(SelectItem, { value: "image", children: "Image" }), _jsx(SelectItem, { value: "video", children: "Video" }), _jsx(SelectItem, { value: "link", children: "Link" }), _jsx(SelectItem, { value: "carousel", children: "Carousel" })] })] }), _jsx(FormMessage, {})] })) })] }), _jsx(FormField, { control: form.control, name: "scheduled_date", render: ({ field }) => (_jsxs(FormItem, { className: "flex flex-col", children: [_jsx(FormLabel, { children: "Schedule Date" }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(FormControl, { children: _jsxs(Button, { variant: "outline", className: cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground"), children: [field.value ? (format(field.value, "PPP")) : (_jsx("span", { children: "Pick a date" })), _jsx(CalendarIcon, { className: "ml-auto h-4 w-4 opacity-50" })] }) }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "single", selected: field.value, onSelect: field.onChange, initialFocus: true }) })] }), _jsx(FormMessage, {})] })) }), form.watch("content_type") === "link" && (_jsx(FormField, { control: form.control, name: "link_url", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Link URL" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "https://example.com" }, field)) }), _jsx(FormMessage, {})] })) })), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: isEditing ? "Save Changes" : "Create Post" }) })] }) }))] }) }));
}
export default DialogCreate;
