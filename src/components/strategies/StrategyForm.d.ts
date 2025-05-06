import React from "react";
import { z } from "zod";
declare const strategySchema: z.ZodObject<
  {
    title: z.ZodString;
    description: z.ZodString;
    riskLevel: z.ZodEnum<["Low", "Medium", "High"]>;
  },
  "strip",
  z.ZodTypeAny,
  {
    title?: string;
    description?: string;
    riskLevel?: "Low" | "Medium" | "High";
  },
  {
    title?: string;
    description?: string;
    riskLevel?: "Low" | "Medium" | "High";
  }
>;
export type StrategyFormValues = z.infer<typeof strategySchema>;
interface StrategyFormProps {
  defaultValues: StrategyFormValues;
  onSubmit: (data: StrategyFormValues) => void;
  isSubmitting: boolean;
  isEditing: boolean;
}
declare const StrategyForm: React.FC<StrategyFormProps>;
export default StrategyForm;
