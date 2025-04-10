
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  Clock, 
  Download, 
  CheckCircle2 
} from "lucide-react";
import { toast } from "sonner";
import { useCompliance } from "@/context/ComplianceContext";

interface DocumentVersion {
  id: string;
  name: string;
  currentVersion: string;
  lastUpdated: string;
  status: "current" | "outdated" | "update-available";
  nextUpdateDue?: string;
  autoUpdatesEnabled: boolean;
}

export default function DocumentVersionTracker() {
  const { 
    pendingUpdates, 
    checkForUpdates, 
    applyUpdate, 
    setAutoUpdate,
    isCheckingUpdates,
    lastChecked
  } = useCompliance();
  
  const [documents, setDocuments] = useState<DocumentVersion[]>([
    {
      id: "privacy-policy",
      name: "Privacy Policy",
      currentVersion: "v2.3",
      lastUpdated: "2025-02-15",
      status: "current",
      nextUpdateDue: "2025-05-15",
      autoUpdatesEnabled: true
    },
    {
      id: "terms-of-service",
      name: "Terms of Service",
      currentVersion: "v1.9",
      lastUpdated: "2025-01-10",
      status: pendingUpdates.includes("terms-of-service") ? "update-available" : "current",
      nextUpdateDue: "2025-04-10",
      autoUpdatesEnabled: true
    },
    {
      id: "data-processing",
      name: "Data Processing Agreement",
      currentVersion: "v1.2",
      lastUpdated: "2024-11-05",
      status: pendingUpdates.includes("data-processing") ? "update-available" : "outdated",
      nextUpdateDue: "2025-02-05",
      autoUpdatesEnabled: false
    },
    {
      id: "breach-notification",
      name: "Breach Notification Policy",
      currentVersion: "v1.0",
      lastUpdated: "2024-12-20",
      status: "current",
      nextUpdateDue: "2025-06-20",
      autoUpdatesEnabled: true
    }
  ]);

  // Update document statuses when pendingUpdates changes
  useEffect(() => {
    setDocuments(prevDocs => 
      prevDocs.map(doc => ({
        ...doc,
        status: pendingUpdates.includes(doc.id) 
          ? "update-available" 
          : doc.status === "update-available" ? "current" : doc.status
      }))
    );
  }, [pendingUpdates]);

  const getStatusBadge = (status: DocumentVersion["status"]) => {
    switch (status) {
      case "current":
        return <Badge className="bg-green-500">Current</Badge>;
      case "outdated":
        return <Badge variant="destructive">Outdated</Badge>;
      case "update-available":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Update Available</Badge>;
      default:
        return null;
    }
  };

  const handleAutoUpdate = (docId: string) => {
    // Call the context method to apply the update
    applyUpdate(docId).then(() => {
      // Update local state after successful update
      setDocuments(docs => 
        docs.map(doc => 
          doc.id === docId 
            ? { 
                ...doc, 
                status: "current", 
                lastUpdated: new Date().toISOString().split('T')[0],
                currentVersion: incrementVersion(doc.currentVersion),
                nextUpdateDue: getNextUpdateDue()
              } 
            : doc
        )
      );
    });
  };

  const toggleAutoUpdates = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;
    
    const newStatus = !doc.autoUpdatesEnabled;
    
    // Call the context method to set auto-update preference
    setAutoUpdate(docId, newStatus).then(() => {
      // Update local state after successful toggle
      setDocuments(docs => 
        docs.map(d => 
          d.id === docId 
            ? { ...d, autoUpdatesEnabled: newStatus } 
            : d
        )
      );
    });
  };

  // Helper functions
  const incrementVersion = (version: string): string => {
    const parts = version.split('v')[1].split('.');
    const minor = parseInt(parts[1]) + 1;
    return `v${parts[0]}.${minor}`;
  };

  const getNextUpdateDue = (): string => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Document Version Tracker</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => checkForUpdates()}
          disabled={isCheckingUpdates}
        >
          {isCheckingUpdates ? "Checking..." : "Check for Updates"}
        </Button>
      </div>
      
      {lastChecked && (
        <p className="text-sm text-muted-foreground mb-4">
          Last checked: {lastChecked.toLocaleString()}
        </p>
      )}
      
      <div className="space-y-4">
        {documents.map(doc => (
          <div 
            key={doc.id} 
            className={`p-4 border rounded-lg transition-colors ${
              doc.status === "outdated" 
                ? "border-red-300 bg-red-50/10" 
                : doc.status === "update-available" 
                  ? "border-amber-300 bg-amber-50/10" 
                  : "border-gray-200"
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{doc.name}</h4>
                  {getStatusBadge(doc.status)}
                </div>
                <div className="flex flex-col text-sm text-muted-foreground mt-1 gap-1">
                  <div className="flex items-center">
                    <span className="inline-block w-24">Version:</span> 
                    {doc.currentVersion}
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-24">Last updated:</span>
                    <Clock className="h-3 w-3 mr-1" /> 
                    {doc.lastUpdated}
                  </div>
                  {doc.nextUpdateDue && (
                    <div className="flex items-center">
                      <span className="inline-block w-24">Next review:</span>
                      {doc.nextUpdateDue}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 ml-auto">
                {doc.status === "update-available" && (
                  <Button 
                    size="sm" 
                    onClick={() => handleAutoUpdate(doc.id)}
                    className="bg-amber-500 hover:bg-amber-600"
                  >
                    Update Now
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleAutoUpdates(doc.id)}
                >
                  {doc.autoUpdatesEnabled ? (
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
        ))}
      </div>
    </div>
  );
}
