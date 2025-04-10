
import { useState, useEffect } from "react";
import { useCompliance } from "@/context/ComplianceContext";
import DocumentItem from "./DocumentItem";

interface PolicyDocument {
  id: string;
  name: string;
  version: string;
  path: string;
  lastUpdated: string;
  updateAvailable: boolean;
}

export default function DocumentList() {
  const { pendingUpdates } = useCompliance();
  const [updatingDocId, setUpdatingDocId] = useState<string | null>(null);
  
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

  // Monitor updates being applied
  useEffect(() => {
    const handleUpdateComplete = (docId: string) => {
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
    };
    
    // Listen for update completions
    if (updatingDocId) {
      // Simulate update completion - in a real implementation this would be an event listener
      const timer = setTimeout(() => {
        handleUpdateComplete(updatingDocId);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [updatingDocId]);
  
  const incrementVersion = (version: string): string => {
    const parts = version.split('v')[1].split('.');
    const minor = parseInt(parts[1]) + 1;
    return `v${parts[0]}.${minor}`;
  };

  return (
    <ul className="space-y-4">
      {documents.map(doc => (
        <DocumentItem 
          key={doc.id}
          document={doc}
          updatingDocId={updatingDocId}
        />
      ))}
    </ul>
  );
}
