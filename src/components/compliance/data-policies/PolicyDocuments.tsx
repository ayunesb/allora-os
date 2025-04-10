
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCompliance } from "@/context/ComplianceContext";

interface PolicyDocument {
  id: string;
  name: string;
  version: string;
  path: string;
  lastUpdated: string;
  updateAvailable: boolean;
}

export default function PolicyDocuments() {
  const { pendingUpdates, applyUpdate, isApplyingUpdate } = useCompliance();
  
  const [documents, setDocuments] = useState<PolicyDocument[]>([
    {
      id: "privacy-policy",
      name: "Privacy Policy",
      version: "v2.3",
      path: "/privacy",
      lastUpdated: "2025-03-15",
      updateAvailable: false
    },
    {
      id: "terms-of-service",
      name: "Terms of Service",
      version: "v1.9",
      path: "/legal",
      lastUpdated: "2025-02-10",
      updateAvailable: false
    },
    {
      id: "data-processing",
      name: "Data Processing Agreement",
      version: "v1.2",
      path: "/legal/data-processing",
      lastUpdated: "2024-11-05",
      updateAvailable: false
    },
    {
      id: "breach-notification",
      name: "Breach Notification Policy",
      version: "v1.0",
      path: "/legal/breach-notification",
      lastUpdated: "2024-12-20",
      updateAvailable: false
    }
  ]);

  // Update document statuses when pendingUpdates changes
  useEffect(() => {
    setDocuments(prevDocs => 
      prevDocs.map(doc => ({
        ...doc,
        updateAvailable: pendingUpdates.includes(doc.id)
      }))
    );
  }, [pendingUpdates]);

  const [updatingDocId, setUpdatingDocId] = useState<string | null>(null);

  const handleUpdateDocument = (docId: string) => {
    setUpdatingDocId(docId);
    
    // Use the applyUpdate function from the ComplianceContext
    applyUpdate(docId).then(() => {
      setDocuments(docs => 
        docs.map(doc => 
          doc.id === docId 
            ? { 
                ...doc, 
                updateAvailable: false, 
                version: incrementVersion(doc.version),
                lastUpdated: new Date().toISOString().split('T')[0]
              } 
            : doc
        )
      );
      
      setUpdatingDocId(null);
    });
  };

  const incrementVersion = (version: string): string => {
    const parts = version.split('v')[1].split('.');
    const minor = parseInt(parts[1]) + 1;
    return `v${parts[0]}.${minor}`;
  };

  return (
    <ul className="space-y-4">
      {documents.map(doc => (
        <li key={doc.id} className="flex justify-between items-center p-3 border rounded-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span>{doc.name}</span>
              {doc.updateAvailable && (
                <Badge variant="outline" className="border-amber-500 text-amber-500">
                  Update Available
                </Badge>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="mr-2">Version: {doc.version}</span>
              <span>Last updated: {doc.lastUpdated}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            {doc.updateAvailable && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-amber-500 border-amber-500"
                      onClick={() => handleUpdateDocument(doc.id)}
                      disabled={updatingDocId === doc.id || isApplyingUpdate}
                    >
                      <RefreshCw className={`h-4 w-4 mr-1 ${updatingDocId === doc.id ? "animate-spin" : ""}`} />
                      {updatingDocId === doc.id ? "Updating..." : "Update"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Update to the latest version</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            <Button variant="outline" size="sm" asChild>
              <Link to={doc.path}>
                <ExternalLink className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
            
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
