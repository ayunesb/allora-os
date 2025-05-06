import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
const webhookFormSchema = z.object({
  type: z.string().min(1, { message: "Webhook type is required" }),
  url: z.string().url({ message: "Please enter a valid URL" }),
});
export default function WebhookForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}) {
  const form = useForm({
    resolver: zodResolver(webhookFormSchema),
    defaultValues: initialData || {
      type: "",
      url: "",
    },
  });
  const handleSubmit = async (values) => {
    try {
      await onSubmit(values);
      if (!initialData) {
        form.reset();
      }
      toast.success(
        `Webhook ${initialData ? "updated" : "created"} successfully`,
      );
    } catch (error) {
      console.error("Error submitting webhook:", error);
      toast.error("Failed to save webhook");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webhook Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select webhook type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="strategy_created">
                    Strategy Created
                  </SelectItem>
                  <SelectItem value="campaign_updated">
                    Campaign Updated
                  </SelectItem>
                  <SelectItem value="lead_captured">Lead Captured</SelectItem>
                  <SelectItem value="payment_received">
                    Payment Received
                  </SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Webhook URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/webhook"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Webhook"
              : "Create Webhook"}
        </Button>
      </form>
    </Form>
  );
}
