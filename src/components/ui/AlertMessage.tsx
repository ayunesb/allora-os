
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function AlertMessage({
  title = 'Something went wrong',
  description,
  variant = "destructive",
}: {
  title?: string;
  description: string;
  variant?: "default" | "destructive" | "warning" | "info";
}) {
  return (
    <Alert variant={variant} className="mt-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
