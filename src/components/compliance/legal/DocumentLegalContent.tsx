import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from "@/components/Navbar";
import { useCompliance } from "@/context/ComplianceContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import DocumentStatusBadge from "../reports/document-tracker/DocumentStatusBadge";

interface DocumentContent {
  [key: string]: {
    title: string;
    content: React.ReactNode;
  };
}

export default function DocumentLegalContent() {
  const { documentId } = useParams<{ documentId: string }>();
  const { 
    pendingUpdates, 
    applyUpdate, 
    isApplyingUpdate,
    checkForUpdates 
  } = useCompliance();
  
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  
  const needsUpdate = pendingUpdates.includes(documentId || "");
  
  const handleApplyUpdate = () => {
    if (documentId) {
      applyUpdate(documentId);
    }
  };

  useEffect(() => {
    // When the component mounts, check if this document needs an update
    checkForUpdates();
    setLastChecked(new Date());
  }, [checkForUpdates]);

  // These content sections would ideally come from a database or CMS
  // but for demonstration we're keeping them inline
  const documents: DocumentContent = {
    "terms-of-service": {
      title: "Terms of Service",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-sm">Effective Date: April 12, 2025</p>
          
          <p>Welcome to Allora AI ("Allora", "we", "us", "our"). By accessing or using our platform (https://all-or-a.online), you agree to these Terms of Service.</p>
          
          <h2>1. Compliance Statements</h2>
          <ul>
            <li><strong>GDPR Compliance:</strong> We comply with the General Data Protection Regulation (GDPR) and respect the rights of EU citizens regarding their personal data.</li>
            <li><strong>HIPAA Compliance:</strong> If healthcare data is collected, we implement appropriate safeguards according to the Health Insurance Portability and Accountability Act (HIPAA).</li>
            <li><strong>PCI DSS Compliance:</strong> All payment processing follows Payment Card Industry Data Security Standards (PCI DSS).</li>
            <li><strong>SOX Compliance:</strong> We adhere to Sarbanes-Oxley (SOX) principles for financial transparency and security controls where applicable.</li>
          </ul>
          
          <h2>2. AI Advisory Limitations</h2>
          <p>Our AI-driven services offer advisory support. They do not replace professional legal, medical, financial, or other human advice. You must verify critical decisions with qualified professionals.</p>
          
          <h2>3. Payment Security</h2>
          <p>Allora processes payments securely through Stripe, maintaining PCI DSS Level 1 compliance. All sensitive payment information is encrypted and tokenized.</p>
          
          <h2>4. Data Encryption Standards</h2>
          <p>Allora uses TLS 1.3 encryption for all data in transit and AES-256 encryption for all stored data.</p>
          
          <h2>5. Cookie Consent</h2>
          <p>We use cookies to personalize your experience. Users in the EU will see a cookie consent banner in compliance with GDPR.</p>
          
          <h2>6. User Agreement</h2>
          <p>By using Allora, you agree not to misuse our services. You accept responsibility for all activities under your account.</p>
          
          <h2>7. Contact</h2>
          <p>Questions? Contact us at <a href="mailto:support@all-or-a.com">support@all-or-a.com</a>.</p>
        </div>
      ),
    },
    "privacy-policy": {
      title: "Privacy Policy",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-sm">Effective Date: April 12, 2025</p>
          
          <p>Allora AI respects your privacy. This Privacy Policy describes how we collect, use, and protect your personal information.</p>
          
          <h2>1. GDPR Compliance</h2>
          <p>EU citizens have the right to:</p>
          <ul>
            <li>Access their personal data</li>
            <li>Request data portability</li>
            <li>Request correction or erasure of data</li>
            <li>Object to processing under specific circumstances</li>
          </ul>
          <p>You may contact <a href="mailto:support@all-or-a.com">support@all-or-a.com</a> to exercise these rights.</p>
          
          <h2>2. HIPAA Compliance</h2>
          <p>If Allora collects healthcare-related data, we apply HIPAA safeguards to protect sensitive health information, including administrative, physical, and technical protections.</p>
          
          <h2>3. PCI DSS Compliance</h2>
          <p>All payment transactions are encrypted, and payment data is processed securely by Stripe according to PCI DSS Level 1 standards.</p>
          
          <h2>4. Cookies</h2>
          <p>We use cookies for performance, analytics, and personalization. Please review our <Link to="/legal/cookies" className="text-primary underline">Cookie Policy</Link> for full details.</p>
          
          <h2>5. Data Security</h2>
          <p>We employ TLS 1.3 and AES-256 encryption standards to protect your data.</p>
          
          <h2>6. Contact</h2>
          <p>For any questions or requests regarding your personal data, email us at <a href="mailto:support@all-or-a.com">support@all-or-a.com</a>.</p>
        </div>
      ),
    },
    "cookies": {
      title: "Cookie Policy",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-sm">Effective Date: April 12, 2025</p>
          
          <p>This Cookie Policy explains how Allora AI uses cookies and similar technologies.</p>
          
          <h2>1. GDPR Consent Notice</h2>
          <p>EU users are shown a consent banner when they first visit our site. You can accept or reject non-essential cookies.</p>
          
          <h2>2. Cookies We Use</h2>
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">Cookie</th>
                <th className="text-left py-2 px-3">Purpose</th>
                <th className="text-left py-2 px-3">Essential</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-3">Session Cookies</td>
                <td className="py-2 px-3">Maintain user session</td>
                <td className="py-2 px-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Analytics Cookies (Google Analytics)</td>
                <td className="py-2 px-3">Track usage metrics</td>
                <td className="py-2 px-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-3">Preference Cookies</td>
                <td className="py-2 px-3">Save user preferences</td>
                <td className="py-2 px-3">No</td>
              </tr>
            </tbody>
          </table>
          
          <h2>3. How to Modify Cookies</h2>
          <p>You can adjust your browser settings to manage cookies or withdraw consent at any time. Learn more in your browser's help section.</p>
          
          <h2>4. Link to Privacy Policy</h2>
          <p>Please review our full <Link to="/legal/privacy-policy" className="text-primary underline">Privacy Policy</Link> for more details.</p>
        </div>
      ),
    },
    "compliance": {
      title: "Data Protection & Compliance Policy",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-sm">Effective Date: April 12, 2025</p>
          
          <p>Allora AI is committed to protecting your data through strict compliance with global standards.</p>
          
          <h2>1. GDPR Compliance</h2>
          <ul>
            <li>Lawful, fair, and transparent data processing</li>
            <li>Data minimization and accuracy</li>
            <li>Strong user rights (access, erasure, portability)</li>
          </ul>
          
          <h2>2. HIPAA Compliance</h2>
          <ul>
            <li>Protection of any collected healthcare data</li>
            <li>Administrative, technical, and physical safeguards</li>
          </ul>
          
          <h2>3. PCI DSS Compliance</h2>
          <ul>
            <li>Stripe processes all payments</li>
            <li>Encryption of cardholder data</li>
            <li>Tokenization to reduce card data storage risks</li>
          </ul>
          
          <h2>4. SOX Compliance</h2>
          <ul>
            <li>Internal controls over data integrity and security</li>
            <li>Financial records maintained with transparency</li>
          </ul>
          
          <h2>5. Data Encryption Standards</h2>
          <ul>
            <li>TLS 1.3 for data in transit</li>
            <li>AES-256 encryption for stored data</li>
            <li>Secure API connections</li>
          </ul>
          
          <h2>6. Data Storage Practices</h2>
          <ul>
            <li>Supabase (database storage with encryption at rest)</li>
            <li>Stripe (payment gateway)</li>
            <li>Twilio (secure communications)</li>
          </ul>
        </div>
      ),
    },
    "messaging-consent": {
      title: "Messaging Consent",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-sm">Effective Date: April 10, 2025</p>
          
          <p>By consenting to receive messages from Allora AI, you agree to the following:</p>
          
          <h2>1. Consent to Electronic Communication</h2>
          <p>You are consenting to receive messages, notifications, alerts, and other communications from Allora AI via:</p>
          <ul>
            <li>SMS/Text messaging</li>
            <li>WhatsApp</li>
            <li>Email</li>
            <li>In-app notifications</li>
            <li>Automated phone calls</li>
          </ul>
          
          <h2>2. Types of Messages</h2>
          <p>You may receive:</p>
          <ul>
            <li>Service updates and announcements</li>
            <li>Marketing information and promotions</li>
            <li>Account notifications</li>
            <li>Business recommendations from our AI</li>
            <li>Reminders about upcoming features or expiring offers</li>
          </ul>
          
          <h2>3. Frequency</h2>
          <p>Message frequency varies based on your account activity and preferences.</p>
          
          <h2>4. Opting Out</h2>
          <p>You can opt out of communications at any time by:</p>
          <ul>
            <li>Replying STOP to any text message</li>
            <li>Adjusting preferences in your account settings</li>
            <li>Contacting support@all-or-a.com</li>
          </ul>
          
          <h2>5. Carrier Rates May Apply</h2>
          <p>Standard message and data rates may apply for SMS and WhatsApp communications.</p>
          
          <h2>Contact</h2>
          <p>For questions about your messaging consent, contact <a href="mailto:support@all-or-a.com">support@all-or-a.com</a></p>
        </div>
      ),
    },
    "refund-policy": {
      title: "Cancellation & Refund Policy",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-sm">Effective Date: April 10, 2025</p>
          
          <h2>1. Cancellation Policy</h2>
          <p>Subscriptions may be canceled by providing at least 3 business days notice prior to renewal.</p>
          
          <h2>2. Refund Policy</h2>
          <p>No refunds are provided after service activation.</p>
          
          <h2>3. Upgrades</h2>
          <p>Upgrades will automatically be processed when usage thresholds are exceeded.</p>
          
          <h2>4. Downgrade</h2>
          <p>You may downgrade your subscription before the next billing cycle. Changes will be applied at the start of the next billing period.</p>
          
          <h2>5. Contact</h2>
          <p>For questions about our Cancellation & Refund Policy, contact:<br />
          📧 <a href="mailto:support@all-or-a.com">support@all-or-a.com</a></p>
        </div>
      ),
    },
    "data-processing": {
      title: "Data Processing Agreement",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-sm">Effective Date: April 10, 2025</p>
          
          <p>
            Allora AI processes personal data on behalf of users in compliance with GDPR and related regulations.
            We implement security measures, engage subprocessors under strict terms, and protect user rights.
          </p>
          <p>
            Contact support@all-or-a.com for a signed copy.
          </p>
        </div>
      ),
    },
  };

  if (!documentId || !documents[documentId]) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isLoggedIn={false} />
        <div className="container mx-auto px-4 py-8 flex-1">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center">Document Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">Sorry, the document you're looking for doesn't exist.</p>
              <div className="flex justify-center mt-4">
                <Button asChild>
                  <Link to="/">Return Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={false} />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            {needsUpdate && (
              <Button 
                onClick={handleApplyUpdate}
                disabled={isApplyingUpdate}
                className="bg-amber-500 hover:bg-amber-600"
                size="sm"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isApplyingUpdate ? "animate-spin" : ""}`} />
                {isApplyingUpdate ? "Updating..." : "Update to Latest Version"}
              </Button>
            )}
          </div>
          
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl md:text-3xl">{documents[documentId].title}</CardTitle>
              {needsUpdate && <DocumentStatusBadge status="update-available" />}
            </CardHeader>
            <CardContent>
              {documents[documentId].content}
              <p className="text-sm text-muted-foreground mt-8">Last updated: April 12, 2025</p>
            </CardContent>
          </Card>
          
          {lastChecked && (
            <p className="text-sm text-muted-foreground mt-4 text-right">
              Last checked for updates: {lastChecked.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
