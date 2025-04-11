
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type GoalsFormProps = {
  goals: string[];
  toggleGoal: (goal: string) => void;
  companyName: string;
  industry: string;
  error?: string;
  companyDetails?: Record<string, any>;
  updateCompanyDetails?: (details: Record<string, any>) => void;
};

// Business goals options
const businessGoals = [
  { id: "increase_revenue", label: "Increase Revenue" },
  { id: "expand_markets", label: "Expand to New Markets" },
  { id: "launch_products", label: "Launch New Products" },
  { id: "improve_retention", label: "Improve Customer Retention" },
  { id: "automate_operations", label: "Automate Operations" },
  { id: "raise_funding", label: "Raise Funding" },
  { id: "improve_efficiency", label: "Improve Operational Efficiency" },
  { id: "scale_team", label: "Scale Team & Talent" },
];

// Time horizon options
const timeHorizons = [
  { value: "6_months", label: "6 months" },
  { value: "12_months", label: "12 months" },
  { value: "18_months", label: "18 months" },
  { value: "24_months", label: "24 months" },
];

export default function GoalsForm({
  goals,
  toggleGoal,
  companyName,
  industry,
  error,
  companyDetails = {},
  updateCompanyDetails = () => {},
}: GoalsFormProps) {
  // Company name display for the form
  const displayCompanyName = companyName || "Your company";

  // Handle updating company time horizon
  const handleTimeHorizonChange = (value: string) => {
    if (updateCompanyDetails) {
      updateCompanyDetails({ timeHorizon: value });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Business Goals</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Select the primary goals for {displayCompanyName} in the {industry} industry.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-3">Primary Business Goals <span className="text-destructive">*</span></p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {businessGoals.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={item.id}
                  checked={goals.includes(item.id)}
                  onCheckedChange={() => toggleGoal(item.id)}
                />
                <label
                  htmlFor={item.id}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4 py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="ml-2 text-xs">{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2 pt-2">
          <Label htmlFor="time-horizon">Time Horizon for Achieving Goals</Label>
          <Select
            value={companyDetails?.timeHorizon || ""}
            onValueChange={handleTimeHorizonChange}
          >
            <SelectTrigger id="time-horizon">
              <SelectValue placeholder="Select time horizon" />
            </SelectTrigger>
            <SelectContent>
              {timeHorizons.map((horizon) => (
                <SelectItem key={horizon.value} value={horizon.value}>
                  {horizon.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
