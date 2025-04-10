
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
          <p className="text-sm">Effective Date: April 10, 2025</p>
          
          <p>Welcome to Allora AI ("Company", "we", "our", "us"). These Terms govern your use of our website, mobile app, APIs, and services (collectively, the "Services").</p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the Services, you agree to these Terms. If you do not agree, do not use the Services.</p>
          
          <h2>2. Services Provided</h2>
          <p>Allora AI provides AI-powered business strategy generation, lead generation, automated communications (including WhatsApp, SMS, Email), campaign management, and CRM workflows.</p>
          
          <h2>3. User Obligations</h2>
          <ul>
            <li>You must provide accurate account information.</li>
            <li>You are responsible for all activity under your account.</li>
            <li>You must obtain explicit consent before sending communications to leads via Email, WhatsApp, SMS, or Zapier workflows.</li>
            <li>You agree to comply with all applicable privacy, consumer protection, and marketing laws (including GDPR, CCPA, TCPA, and CAN-SPAM).</li>
          </ul>
          
          <h2>4. Subscription Payments and Refunds</h2>
          <ul>
            <li>Allora AI offers monthly subscription plans via Stripe.</li>
            <li>No refunds are offered after service activation.</li>
            <li>Subscription fees auto-renew unless canceled with 3 business days notice.</li>
            <li>Upgrades are automatically triggered when usage exceeds plan limits.</li>
          </ul>
          
          <h2>5. Use of APIs and Integrations</h2>
          <ul>
            <li>Your use of external APIs (Stripe, Twilio, Postmark, Heygen, Shopify, Zapier) is subject to each provider's terms.</li>
            <li>You must not misuse third-party services connected through Allora AI.</li>
          </ul>
          
          <h2>6. Intellectual Property</h2>
          <ul>
            <li>Allora AI owns all rights to platform software, branding, and materials.</li>
            <li>You may not copy, modify, reverse-engineer, or distribute our services.</li>
          </ul>
          
          <h2>7. Limitation of Liability</h2>
          <ul>
            <li>To the maximum extent permitted by law, Allora AI is not liable for indirect, special, or consequential damages.</li>
            <li>Our total liability is capped at the amount you paid us in the last 3 months.</li>
          </ul>
          
          <h2>8. Indemnification</h2>
          <p>You agree to defend and indemnify Allora AI against claims arising from your use of our services or violation of these Terms.</p>
          
          <h2>9. Dispute Resolution</h2>
          <ul>
            <li>Disputes will be resolved through binding arbitration in California, USA.</li>
            <li>You waive the right to participate in class actions.</li>
          </ul>
          
          <h2>10. Changes to Terms</h2>
          <p>We may modify these Terms. Changes become effective immediately upon posting.</p>
          
          <h2>11. Contact</h2>
          <p>For legal questions, contact:<br />
          📧 <a href="mailto:support@all-or-a.com">support@all-or-a.com</a></p>
        </div>
      ),
    },
    "privacy-policy": {
      title: "Privacy Policy",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-sm">Effective Date: April 10, 2025</p>
          
          <p>Allora AI ("Company", "we", "our", "us") respects your privacy.</p>
          
          <h2>1. Data We Collect</h2>
          <ul>
            <li>Personal data: Name, Email, Company Info, Phone Number.</li>
            <li>Business Data: Campaigns, Leads, CRM actions.</li>
            <li>Communications Data: WhatsApp messages, SMS, Emails, Zapier Events.</li>
            <li>Payment Information: Handled securely via Stripe.</li>
          </ul>
          
          <h2>2. How We Use Data</h2>
          <ul>
            <li>To deliver AI strategies and campaigns.</li>
            <li>To send communications via Email, WhatsApp, SMS.</li>
            <li>To automate workflows via APIs (Zapier, Shopify, Postmark, Twilio).</li>
          </ul>
          
          <h2>3. Sharing of Data</h2>
          <ul>
            <li>We share data with service providers under strict confidentiality (Stripe, Twilio, Zapier, etc.).</li>
            <li>We do not sell your personal data.</li>
          </ul>
          
          <h2>4. Data Retention</h2>
          <p>Data is kept as long as necessary for services, or as legally required.</p>
          
          <h2>5. Data Security</h2>
          <ul>
            <li>We use encryption, firewalls, and secure servers.</li>
            <li>No system can guarantee 100% security.</li>
          </ul>
          
          <h2>6. Your Rights</h2>
          <ul>
            <li>You have the right to access, correct, or delete your data.</li>
            <li>You can withdraw consent at any time.</li>
          </ul>
          
          <h2>7. International Transfers</h2>
          <p>Data may be transferred outside your country in compliance with applicable laws.</p>
          
          <h2>8. Contact</h2>
          <p>For privacy questions, contact:<br />
          📧 <a href="mailto:support@all-or-a.com">support@all-or-a.com</a></p>
        </div>
      ),
    },
    "cookies": {
      title: "Cookie Policy",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-sm">Effective Date: April 10, 2025</p>
          
          <p>We use cookies and similar tracking technologies to improve your experience.</p>
          
          <h2>1. Types of Cookies</h2>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for basic functionality.</li>
            <li><strong>Analytics Cookies:</strong> Used for usage tracking (Google Analytics).</li>
            <li><strong>Marketing Cookies:</strong> Used for retargeting ads (if enabled).</li>
          </ul>
          
          <h2>2. Managing Cookies</h2>
          <ul>
            <li>You can opt out of non-essential cookies using our Cookie Consent Manager.</li>
            <li>You may disable cookies in your browser settings.</li>
          </ul>
          
          <h2>3. Third-Party Cookies</h2>
          <p>We use third-party services that may place cookies on your device, including:</p>
          <ul>
            <li>Google Analytics</li>
            <li>Stripe</li>
            <li>Other analytics and marketing tools</li>
          </ul>
          
          <h2>4. Contact</h2>
          <p>For questions about our Cookie Policy, contact:<br />
          📧 <a href="mailto:support@all-or-a.com">support@all-or-a.com</a></p>
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
              <p className="text-sm text-muted-foreground mt-8">Last updated: April 10, 2025</p>
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
