
import { useState, useEffect } from "react";
import { useCompliance } from "@/context/ComplianceContext";
import DocumentHeader from "./DocumentHeader";
import DocumentListItem from "./DocumentListItem";

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
      <DocumentHeader 
        onCheckForUpdates={checkForUpdates}
        isCheckingUpdates={isCheckingUpdates}
        lastChecked={lastChecked}
      />
      
      <div className="space-y-4">
        {documents.map(doc => (
          <DocumentListItem
            key={doc.id}
            id={doc.id}
            name={doc.name}
            currentVersion={doc.currentVersion}
            lastUpdated={doc.lastUpdated}
            status={doc.status}
            nextUpdateDue={doc.nextUpdateDue}
            autoUpdatesEnabled={doc.autoUpdatesEnabled}
            onUpdate={handleAutoUpdate}
            onToggleAutoUpdate={toggleAutoUpdates}
          />
        ))}
      </div>
    </div>
  );
}
