
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DocumentItem from './DocumentItem';
import { useCompliance } from "@/context/ComplianceContext";

const DocumentList: React.FC = () => {
  const { pendingUpdates, isApplyingUpdate, applyUpdate } = useCompliance();
  const [updatingDocId, setUpdatingDocId] = useState<string | null>(null);

  const documents = [
    {
      id: 'terms-of-service',
      name: 'Terms of Service',
      version: 'v2.0',
      path: '/legal/terms-of-service',
      lastUpdated: 'April 10, 2025',
      updateAvailable: pendingUpdates.includes('terms-of-service')
    },
    {
      id: 'privacy-policy',
      name: 'Privacy Policy',
      version: 'v2.4',
      path: '/legal/privacy-policy',
      lastUpdated: 'April 10, 2025',
      updateAvailable: pendingUpdates.includes('privacy-policy')
    },
    {
      id: 'cookies',
      name: 'Cookie Policy',
      version: 'v1.1',
      path: '/legal/cookies',
      lastUpdated: 'April 10, 2025',
      updateAvailable: pendingUpdates.includes('cookies')
    },
    {
      id: 'refund-policy',
      name: 'Cancellation & Refund Policy',
      version: 'v1.0',
      path: '/legal/refund-policy',
      lastUpdated: 'April 10, 2025',
      updateAvailable: pendingUpdates.includes('refund-policy')
    },
    {
      id: 'data-processing',
      name: 'Data Processing Agreement',
      version: 'v1.3',
      path: '/legal/data-processing',
      lastUpdated: 'April 10, 2025',
      updateAvailable: pendingUpdates.includes('data-processing')
    },
    {
      id: 'messaging-consent',
      name: 'Messaging Consent',
      version: 'v1.0',
      path: '/legal/messaging-consent',
      lastUpdated: 'April 10, 2025',
      updateAvailable: pendingUpdates.includes('messaging-consent')
    }
  ];
  
  const handleUpdateDocument = async (docId: string) => {
    setUpdatingDocId(docId);
    await applyUpdate(docId);
    setUpdatingDocId(null);
  };

  return (
    <ul className="space-y-3">
      {documents.map((doc) => (
        <DocumentItem
          key={doc.id}
          document={doc}
          updatingDocId={updatingDocId}
        />
      ))}
    </ul>
  );
};

export default DocumentList;
