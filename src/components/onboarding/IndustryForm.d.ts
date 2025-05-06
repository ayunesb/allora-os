type IndustryFormProps = {
  industry: string;
  setIndustry: (industry: string) => void;
  error?: string;
};
export default function IndustryForm({
  industry,
  setIndustry,
  error,
}: IndustryFormProps): import("react").JSX.Element;
export {};
