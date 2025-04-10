
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  Clock, 
  Download, 
  CheckCircle2 
} from "lucide-react";
import DocumentStatusBadge from "./DocumentStatusBadge";

interface DocumentItemProps {
  id: string;
  name: string;
  currentVersion: string;
  lastUpdated: string;
  status: "current" | "outdated" | "update-available";
  nextUpdateDue?: string;
  autoUpdatesEnabled: boolean;
  onUpdate: (docId: string) => void;
  onToggleAutoUpdate: (docId: string) => void;
}

export default function DocumentListItem({
  id,
  name,
  currentVersion,
  lastUpdated,
  status,
  nextUpdateDue,
  autoUpdatesEnabled,
  onUpdate,
  onToggleAutoUpdate
}: DocumentItemProps) {
  return (
    <div 
      className={`p-4 border rounded-lg transition-colors ${
        status === "outdated" 
          ? "border-red-300 bg-red-50/10" 
          : status === "update-available" 
            ? "border-amber-300 bg-amber-50/10" 
            : "border-gray-200"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{name}</h4>
            <DocumentStatusBadge status={status} />
          </div>
          <div className="flex flex-col text-sm text-muted-foreground mt-1 gap-1">
            <div className="flex items-center">
              <span className="inline-block w-24">Version:</span> 
              {currentVersion}
            </div>
            <div className="flex items-center">
              <span className="inline-block w-24">Last updated:</span>
              <Clock className="h-3 w-3 mr-1" /> 
              {lastUpdated}
            </div>
            {nextUpdateDue && (
              <div className="flex items-center">
                <span className="inline-block w-24">Next review:</span>
                {nextUpdateDue}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 ml-auto">
          {status === "update-available" && (
            <Button 
              size="sm" 
              onClick={() => onUpdate(id)}
              className="bg-amber-500 hover:bg-amber-600"
            >
              Update Now
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onToggleAutoUpdate(id)}
          >
            {autoUpdatesEnabled ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                Auto-updates On
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
                Auto-updates Off
              </>
            )}
          </Button>
          
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
