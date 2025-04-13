
import { Badge } from "@/components/ui/badge";

interface AlertBadgeProps {
  severity: string;
}

export const AlertBadge = ({ severity }: AlertBadgeProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'error':
        return 'bg-red-400 text-white';
      case 'warning':
        return 'bg-amber-500 text-white';
      case 'info':
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <Badge className={getSeverityColor(severity)}>
      {severity}
    </Badge>
  );
};
