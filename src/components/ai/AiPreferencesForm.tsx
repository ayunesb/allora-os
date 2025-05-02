
import React from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Textarea } from '@/components/ui/textarea';

// Define the form schema
const formSchema = z.object({
  focusIndustries: z.string(),
  competitorAnalysis: z.boolean(),
  marketTrends: z.boolean(),
  customerFeedback: z.boolean(),
  additionalContext: z.string().optional(),
  riskTolerance: z.enum(['low', 'medium', 'high']),
});

type FormValues = z.infer<typeof formSchema>;

export function AiPreferencesForm() {
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      focusIndustries: '',
      competitorAnalysis: true,
      marketTrends: true,
      customerFeedback: false,
      additionalContext: '',
      riskTolerance: 'medium',
    },
  });

  // Form submission
  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    // In a real app, you would save these preferences
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="focusIndustries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Focus Industries</FormLabel>
              <FormControl>
                <Input placeholder="e.g. SaaS, E-commerce, Healthcare" {...field} />
              </FormControl>
              <FormDescription>
                Industries the AI should focus on for strategy development
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Strategy Components</h3>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="competitorAnalysis"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Competitor Analysis</FormLabel>
                    <FormDescription>
                      Include competitor analysis in strategies
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="marketTrends"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Market Trends</FormLabel>
                    <FormDescription>
                      Include market trend analysis in strategies
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="customerFeedback"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Customer Feedback</FormLabel>
                    <FormDescription>
                      Integrate customer feedback into strategy development
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="additionalContext"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Context</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Add any additional context for the AI executives..." 
                  {...field} 
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Preferences</Button>
      </form>
    </Form>
  );
}

export default AiPreferencesForm;
