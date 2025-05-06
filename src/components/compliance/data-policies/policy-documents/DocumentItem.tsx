import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, ExternalLink, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useCompliance } from "@/context/ComplianceContext";
export default function DocumentItem({ document, updatingDocId }) {
  const { applyUpdate, isApplyingUpdate } = useCompliance();
  const handleUpdateDocument = (docId) => {
    applyUpdate(docId);
  };
  return (
    <li className="flex justify-between items-center p-3 border rounded-md">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span>{document.name}</span>
          {document.updateAvailable && (
            <Badge
              variant="outline"
              className="border-amber-500 text-amber-500"
            >
              Update Available
            </Badge>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="mr-2">Version: {document.version}</span>
          <span>Last updated: {document.lastUpdated}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        {document.updateAvailable && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-amber-500 border-amber-500"
                  onClick={() => handleUpdateDocument(document.id)}
                  disabled={updatingDocId === document.id || isApplyingUpdate}
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-1 ${updatingDocId === document.id ? "animate-spin" : ""}`}
                  />
                  {updatingDocId === document.id ? "Updating..." : "Update"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Update to the latest version</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        <Button variant="outline" size="sm" asChild>
          <Link to={document.path}>
            <ExternalLink className="h-4 w-4 mr-1" />
            View
          </Link>
        </Button>

        <Button variant="ghost" size="sm">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </li>
  );
}
