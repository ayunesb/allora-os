import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { PopoverClose } from "@radix-ui/react-popover";
import { CompanyProfile } from '@/types/unified-types';

const salesChannels = [
  {
    label: "Online Advertising",
    value: "online_advertising",
  },
  {
    label: "Social Media Marketing",
    value: "social_media_marketing",
  },
  {
    label: "Email Marketing",
    value: "email_marketing",
  },
  {
    label: "Content Marketing",
    value: "content_marketing",
  },
  {
    label: "Affiliate Marketing",
    value: "affiliate_marketing",
  },
  {
    label: "Search Engine Optimization (SEO)",
    value: "search_engine_optimization",
  },
  {
    label: "Direct Sales",
    value: "direct_sales",
  },
  {
    label: "Partnerships",
    value: "partnerships",
  },
  {
    label: "Events and Trade Shows",
    value: "events_and_trade_shows",
  },
  {
    label: "Referral Programs",
    value: "referral_programs",
  },
];

const pricingModels = [
  {
    label: "Freemium",
    value: "freemium",
  },
  {
    label: "Subscription",
    value: "subscription",
  },
  {
    label: "One-time Purchase",
    value: "one_time_purchase",
  },
  {
    label: "Usage-based",
    value: "usage_based",
  },
  {
    label: "Tiered Pricing",
    value: "tiered_pricing",
  },
  {
    label: "Value-based Pricing",
    value: "value_based_pricing",
  },
  {
    label: "Cost-plus Pricing",
    value: "cost_plus_pricing",
  },
  {
    label: "Competitive Pricing",
    value: "competitive_pricing",
  },
  {
    label: "Dynamic Pricing",
    value: "dynamic_pricing",
  },
  {
    label: "Fixed Pricing",
    value: "fixed_pricing",
  },
];

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  industry: z.string().min(2, {
    message: "Industry must be at least 2 characters.",
  }),
  targetCustomer: z.string().optional(),
  websiteUrl: z.string().optional(),
  salesChannels: z.array(z.string()).optional(),
  pricingModel: z.string().optional(),
});

interface CompanyProfileFormProps {
  onSubmit: (data: CompanyProfile) => void;
  initialValues?: CompanyProfile;
  loading?: boolean;
}

type CompanyProfileFormValues = z.infer<typeof formSchema>;

export function CompanyProfileForm({ onSubmit, initialValues, loading }: CompanyProfileFormProps) {
  const form = useForm<CompanyProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: initialValues?.company || "",
      industry: initialValues?.industry || "",
      targetCustomer: initialValues?.target_customer || "",
      websiteUrl: initialValues?.website_url || "",
      salesChannels: initialValues?.sales_channels || [],
      pricingModel: initialValues?.pricing_model || "",
    },
  });

  const handleSubmit = async (values: CompanyProfileFormValues) => {
    // Create a properly formatted CompanyProfile object
    const companyProfile: CompanyProfile = {
      name: values.companyName, // Map companyName to name to match CompanyProfile type
      company: values.companyName, // For backwards compatibility
      industry: values.industry,
      target_customer: values.targetCustomer,
      website_url: values.websiteUrl,
      sales_channels: values.salesChannels,
      pricing_model: values.pricingModel
    };

    // Call the onSubmit prop with the formatted profile
    onSubmit(companyProfile);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Corp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Input placeholder="Technology" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetCustomer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Customer</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Small to medium-sized businesses"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input placeholder="https://acme.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salesChannels"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sales Channels</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={field.value ? true : undefined}
                    >
                      {field.value?.length > 0
                        ? field.value.map((value) => {
                            const channel = salesChannels.find(
                              (channel) => channel.value === value
                            );
                            return channel?.label;
                          }).join(', ')
                        : "Select sales channels..."}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No channels found.</CommandEmpty>
                      <CommandGroup>
                        {salesChannels.map((channel) => (
                          <CommandItem
                            key={channel.value}
                            onSelect={() => {
                              if (field.value?.includes(channel.value)) {
                                field.onChange(
                                  field.value?.filter(
                                    (value) => value !== channel.value
                                  )
                                );
                              } else {
                                field.onChange([
                                  ...(field.value || []),
                                  channel.value,
                                ]);
                              }
                            }}
                          >
                            <Checkbox
                              checked={field.value?.includes(channel.value)}
                              className="mr-2 h-4 w-4"
                            />
                            {channel.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pricingModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pricing Model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a pricing model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {pricingModels.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
