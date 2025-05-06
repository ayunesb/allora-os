import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card"; // Fix import
import { Button } from "@/components/ui/button"; // Fix import
import { Input } from "@/components/ui/input"; // Fix import
import { Textarea } from "@/components/ui/textarea"; // Fix import
import { Form } from "@/components/ui/form"; // Fix import
import { Select } from "@/components/ui/select"; // Fix import
import campaignService from "@/services/campaignService"; // Fix import
import useAuth from "@/hooks/useAuth"; // Fix import
import Label from "../ui/label.js"; // Add file extension
import { TikTokIcon } from "@/components/icons/TikTokIcon"; // Fix import
import { toast } from "sonner";
// Form schema definition
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Campaign name must be at least 2 characters" }),
  platform: z.enum(["meta", "tiktok"]),
  budget: z.coerce.number().min(100, { message: "Minimum budget is $100" }),
  targetingAudience: z
    .string()
    .min(5, { message: "Please describe your target audience" }),
  targetingLocation: z
    .string()
    .min(2, { message: "Please specify a location" }),
  adTitle: z
    .string()
    .min(5, { message: "Ad title must be at least 5 characters" }),
  adDescription: z
    .string()
    .min(10, { message: "Ad description must be at least 10 characters" }),
});

interface CampaignCreateFormProps {
  onSubmit: (data: { name: string; budget: number; description?: string }) => void;
  initialValues?: { name: string; budget: number; description?: string };
}

export const CampaignCreateForm: React.FC<CampaignCreateFormProps> = ({
  onSubmit,
  initialValues = { name: "", budget: 0, description: "" },
}) => {
  const [name, setName] = useState(initialValues.name);
  const [budget, setBudget] = useState(initialValues.budget);
  const [description, setDescription] = useState(initialValues.description);

  const handleSubmit = () => {
    if (name.trim() && budget > 0) {
      onSubmit({ name, budget, description });
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Campaign Name" />
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        placeholder="Budget"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
      />
      <button onClick={handleSubmit}>Create Campaign</button>
    </form>
  );
};

export default function CampaignCreateFormComponent() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [managementFee, setManagementFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      platform: "meta",
      budget: 1000,
      targetingAudience: "",
      targetingLocation: "",
      adTitle: "",
      adDescription: "",
    },
  });
  const watchBudget = form.watch("budget");
  // Calculate management fee and total amount when budget changes
  useState(() => {
    const calculatedFee = Math.round(watchBudget * 0.1);
    setManagementFee(calculatedFee);
    setTotalAmount(watchBudget + calculatedFee);
  });
  const handleNextStep = () => {
    const currentValues = form.getValues();
    // Validate different fields based on current step
    if (step === 1) {
      const result = z
        .object({
          name: formSchema.shape.name,
          platform: formSchema.shape.platform,
          budget: formSchema.shape.budget,
        })
        .safeParse({
          name: currentValues.name,
          platform: currentValues.platform,
          budget: currentValues.budget,
        });
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          form.setError(issue.path[0], {
            type: "manual",
            message: issue.message,
          });
        });
        return;
      }
    } else if (step === 2) {
      const result = z
        .object({
          targetingAudience: formSchema.shape.targetingAudience,
          targetingLocation: formSchema.shape.targetingLocation,
        })
        .safeParse({
          targetingAudience: currentValues.targetingAudience,
          targetingLocation: currentValues.targetingLocation,
        });
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          form.setError(issue.path[0], {
            type: "manual",
            message: issue.message,
          });
        });
        return;
      }
    }
    setStep(step + 1);
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  const onSubmit = async (values: Record<string, string | number>) => { // Fix implicit 'any' type for 'values'
    setIsSubmitting(true);
    try {
      // Create the targeting and creatives objects
      const targeting = {
        audience: values.targetingAudience,
        location: values.targetingLocation,
      };
      const creatives = [
        {
          title: values.adTitle,
          description: values.adDescription,
        },
      ];
      // Create the campaign
      const campaignResult = await campaignService.createCampaign({
        name: values.name,
        platform: values.platform,
        budget: values.budget,
        targeting,
        creatives,
        company_id: profile?.company_id,
      });
      if (!campaignResult.success) {
        throw new Error(campaignResult.error || "Failed to create campaign");
      }
      const campaignId = campaignResult.campaignId;
      if (!campaignId) {
        throw new Error("No campaign ID returned");
      }
      // Create the checkout session
      const checkoutResult = await campaignService.createCampaignCheckout(
        campaignId,
        window.location.href,
      );
      if (!checkoutResult.success) {
        throw new Error(checkoutResult.error || "Failed to create checkout");
      }
      // Redirect to Stripe Checkout
      if (checkoutResult.url) {
        window.location.href = checkoutResult.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      handleError(error); // Fix 'unknown' type for 'error'
      toast.error(`Failed to process campaign: ${error.message}`);
      setIsSubmitting(false);
    }
  };
  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Summer Sale 2025" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Platform</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an ad platform" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="meta">
                        <div className="flex items-center">
                          <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                          Meta (Facebook/Instagram)
                        </div>
                      </SelectItem>
                      <SelectItem value="tiktok">
                        <div className="flex items-center">
                          <TikTokIcon className="mr-2 h-4 w-4" />
                          TikTok
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Budget (USD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="100"
                      step="100"
                      placeholder="1000"
                      {...field}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => { // Fix implicit 'any' type for 'e'
                        field.onChange(e);
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value)) {
                          const fee = Math.round(value * 0.1);
                          setManagementFee(fee);
                          setTotalAmount(value + fee);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>Minimum budget is $100</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-muted p-4 rounded-md space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ad Budget:</span>
                <span>${watchBudget}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Management Fee (10%):</span>
                <span>${managementFee}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total Amount:</span>
                <span>${totalAmount}</span>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <FormField
              control={form.control}
              name="targetingAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Audience</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="E.g., Males and females, ages 25-45, interested in fitness and nutrition"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetingLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g., United States, Canada"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
      case 3:
        return (
          <>
            <FormField
              control={form.control}
              name="adTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g., Summer Sale - 50% Off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="adDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="E.g., Don't miss our biggest sale of the year! Get 50% off all products until July 31."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div>
                <Label>Campaign Summary</Label>
                <div className="bg-muted p-4 rounded-md space-y-2 mt-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="font-medium">Campaign Name:</span>
                    <span>{form.getValues("name")}</span>

                    <span className="font-medium">Platform:</span>
                    <span>
                      {form.getValues("platform") === "meta"
                        ? "Meta (Facebook/Instagram)"
                        : "TikTok"}
                    </span>

                    <span className="font-medium">Budget:</span>
                    <span>${form.getValues("budget")}</span>

                    <span className="font-medium">Management Fee:</span>
                    <span>${managementFee}</span>

                    <span className="font-medium col-span-2 pt-2">
                      Location:
                    </span>
                    <span className="col-span-2">
                      {form.getValues("targetingLocation")}
                    </span>

                    <span className="font-medium col-span-2 pt-2">
                      Target Audience:
                    </span>
                    <span className="col-span-2">
                      {form.getValues("targetingAudience")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-md">
                <p className="text-sm">
                  By clicking "Create Campaign & Checkout", you agree to pay the
                  total amount of <strong>${totalAmount}</strong> which includes
                  your ad budget (${form.getValues("budget")}) and the 10%
                  management fee (${managementFee}).
                </p>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Ad Campaign</CardTitle>
        <CardDescription>
          {step === 1 && "Set up your campaign basics and budget"}
          {step === 2 && "Define your target audience"}
          {step === 3 && "Create your ad content and review"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {renderFormStep()}
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={handlePreviousStep}
            disabled={isSubmitting}
          >
            Previous
          </Button>
        )}

        <div className="ml-auto">
          {step < 3 ? (
            <Button
              type="button"
              onClick={handleNextStep}
              disabled={isSubmitting}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Create Campaign & Checkout"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

function handleError(error: unknown) { // Fix 'unknown' type for 'error'
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("An unknown error occurred");
  }
}
