import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useProductionData } from "@/hooks/useProductionData";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function ProductionDataAlert() {
  const [showAlert, setShowAlert] = useState(true);
  const {
    isProductionReady,
    isProductionMode,
    validateProductionData,
    forceProductionMode,
  } = useProductionData();
  const navigate = useNavigate();
  // Check if the alert has been dismissed before
  useEffect(() => {
    const isDismissed = localStorage.getItem("production-alert-dismissed");
    if (isDismissed === "true") {
      setShowAlert(false);
    }
  }, []);
  const handleDismiss = () => {
    localStorage.setItem("production-alert-dismissed", "true");
    setShowAlert(false);
  };
  const handleSetupProduction = () => {
    navigate("/admin/launch-verification");
  };
  const handleForceProduction = () => {
    forceProductionMode(true);
    setShowAlert(false);
  };
  if (!showAlert || isProductionMode) {
    return null;
  }
  return (
    <Alert
      variant={isProductionReady ? "default" : "destructive"}
      className={
        isProductionReady
          ? "border-risk-low-light bg-risk-low-light/20 text-risk-low-DEFAULT dark:text-risk-low-dark"
          : "border-amber-300 bg-amber-50 text-amber-900"
      }
    >
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-3">
          {isProductionReady ? (
            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          )}
          <div>
            <AlertTitle
              className={
                isProductionReady
                  ? "text-risk-low-DEFAULT dark:text-risk-low-dark"
                  : "text-amber-800"
              }
            >
              {isProductionReady
                ? "Ready for Production"
                : "Development Environment"}
            </AlertTitle>
            <AlertDescription
              className={
                isProductionReady
                  ? "text-risk-low-DEFAULT/80 dark:text-risk-low-dark/80 mt-1"
                  : "text-amber-700 mt-1"
              }
            >
              {isProductionReady
                ? "Your data is validated and ready for production use."
                : "You're viewing demo data. Set up production data before going live."}
            </AlertDescription>
          </div>
        </div>
        <div className="flex gap-2">
          {!isProductionReady && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSetupProduction}
              className="border-amber-400 bg-amber-100 hover:bg-amber-200 text-amber-900"
            >
              Setup Production
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleForceProduction}
            className="border-green-400 bg-green-100 hover:bg-green-200 text-green-900"
          >
            Use Real Data
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="text-amber-900 hover:bg-amber-100"
          >
            Dismiss
          </Button>
        </div>
      </div>
    </Alert>
  );
}
