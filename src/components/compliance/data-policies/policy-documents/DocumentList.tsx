
import React from 'react';
import { Link } from 'react-router-dom';
import DocumentItem from './DocumentItem';

const DocumentList: React.FC = () => {
  const documents = [
    {
      id: 'terms-of-service',
      title: 'Terms of Service',
      lastUpdated: 'April 10, 2025',
      status: 'current',
    },
    {
      id: 'privacy-policy',
      title: 'Privacy Policy',
      lastUpdated: 'April 10, 2025',
      status: 'current',
    },
    {
      id: 'cookies',
      title: 'Cookie Policy',
      lastUpdated: 'April 10, 2025',
      status: 'current',
    },
    {
      id: 'refund-policy',
      title: 'Cancellation & Refund Policy',
      lastUpdated: 'April 10, 2025',
      status: 'current',
    },
    {
      id: 'data-processing',
      title: 'Data Processing Agreement',
      lastUpdated: 'April 10, 2025',
      status: 'current',
    }
  ];
  
  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <Link to={`/legal/${doc.id}`} key={doc.id}>
          <DocumentItem document={doc} />
        </Link>
      ))}
    </div>
  );
};

export default DocumentList;
