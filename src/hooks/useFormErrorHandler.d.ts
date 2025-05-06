import { FieldValues, UseFormReturn, FieldErrors } from "react-hook-form";
type ServerValidationErrors = Record<string, string[]>;
interface UseFormErrorHandlerOptions {
  showToast?: boolean;
  logErrors?: boolean;
}
export declare function useFormErrorHandler<T extends FieldValues>(
  form: UseFormReturn<T>,
  options?: UseFormErrorHandlerOptions,
): {
  serverErrors: Record<string, string>;
  getServerError: (field: string) => string;
  clearServerErrors: () => void;
  handleServerValidationErrors: (errors: ServerValidationErrors) => void;
  handleSubmissionError: (error: any) => void;
  formatClientErrors: (errors: FieldErrors<T>) => Record<string, string>;
};
export {};
