import * as z from "zod";
declare const companyProfileSchema: z.ZodObject<
  {
    name: z.ZodString;
    industry: z.ZodString;
    website: z.ZodUnion<[z.ZodString, z.ZodString]>;
    description: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    size?: string;
    name?: string;
    description?: string;
    industry?: string;
    website?: string;
  },
  {
    size?: string;
    name?: string;
    description?: string;
    industry?: string;
    website?: string;
  }
>;
export type CompanyProfileFormValues = z.infer<typeof companyProfileSchema>;
interface CompanyProfileFormProps {
  onSubmit: (data: CompanyProfileFormValues) => void;
  initialValues?: Partial<CompanyProfileFormValues>;
  isLoading?: boolean;
}
export default function CompanyProfileForm({
  onSubmit,
  initialValues,
  isLoading,
}: CompanyProfileFormProps): JSX.Element;
export {};
