interface IndustryProps {
  industry: string;
  setIndustry: (industry: string) => void;
  errorMessage?: string | null;
}
export declare function Industry({
  industry,
  setIndustry,
  errorMessage,
}: IndustryProps): import("react").JSX.Element;
export {};
