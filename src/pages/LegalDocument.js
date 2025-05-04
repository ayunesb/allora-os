import { useParams } from 'react-router-dom';
import DocumentLegalContent from '@/components/compliance/legal/DocumentLegalContent';
export default function LegalDocument() {
    const { id = '' } = useParams();
    // Content mapping based on document id
    const documentContentMap = {
        'terms-of-service': {
            title: 'Terms of Service',
            description: 'Our terms for using the platform',
            content: 'These are the Terms of Service for our platform...'
        },
        'privacy-policy': {
            title: 'Privacy Policy',
            description: 'How we collect and use your data',
            content: 'This Privacy Policy describes our policies on the collection, use, and disclosure of your information...'
        },
        'cookies': {
            title: 'Cookie Policy',
            description: 'How we use cookies and similar technologies',
            content: 'Our Cookie Policy explains how we use cookies and similar technologies...'
        },
        'refund-policy': {
            title: 'Refund Policy',
            description: 'Our refund and cancellation terms',
            content: 'This Refund Policy outlines our procedures and rules for refunds and cancellations...'
        },
        'data-processing': {
            title: 'Data Processing Agreement',
            description: 'Terms for processing personal data',
            content: 'This Data Processing Agreement supplements our Terms of Service...'
        },
        'messaging-consent': {
            title: 'Messaging Consent',
            description: 'Terms for communication consent',
            content: 'This Messaging Consent document outlines how we communicate with you...'
        }
    };
    // Get document content or use defaults if not found
    const documentContent = documentContentMap[id] || {
        title: 'Legal Document',
        description: 'This legal document could not be found',
        content: ''
    };
    return (<div className="container mx-auto py-8 px-4">
      <DocumentLegalContent title={documentContent.title} description={documentContent.description} content={documentContent.content}/>
    </div>);
}
