import {
  AlertCircle,
  AlertTriangle,
  Info,
  AlertCircle as AlertIcon,
} from "lucide-react";
export const AlertStatusIcon = ({ severity }) => {
  switch (severity) {
    case "critical":
      return <AlertIcon className="h-5 w-5 text-red-600" />;
    case "error":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case "info":
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
};
