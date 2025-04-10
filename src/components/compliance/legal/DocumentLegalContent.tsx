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
          <h2>1. Introduction</h2>
          <p>
            Welcome to Allora AI. These Terms of Service govern your use of our website, products, and services.
            By accessing or using our services, you agree to be bound by these Terms.
          </p>

          <h2>2. Use of Services</h2>
          <p>
            Our platform provides AI-powered business strategy tools and insights. You agree to use these services only
            for lawful purposes and in accordance with these Terms.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate and complete information. You are responsible
            for safeguarding your account credentials and for all activities that occur under your account.
          </p>

          <h2>4. Privacy Policy</h2>
          <p>
            Your use of our services is also governed by our Privacy Policy, which can be found <Link to="/privacy">here</Link>.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            Our services and content are protected by copyright, trademark, and other intellectual property laws.
            You may not reproduce, distribute, or create derivative works without our permission.
          </p>

          <h2>6. Termination</h2>
          <p>
            We may terminate or suspend your account and access to our services at our sole discretion, without notice,
            for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages resulting from your use or inability to use our services.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. It is your responsibility to review these Terms periodically.
            Your continued use of our services after any changes indicates your acceptance of the modified Terms.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@alloraai.com.
          </p>
        </div>
      ),
    },
    "privacy-policy": {
      title: "Privacy Policy",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            At Allora AI, your privacy is a top priority. This Privacy Policy explains how we collect, use, and protect your information.
          </p>

          <h2>2. Information We Collect</h2>
          <ul>
            <li>Personal Information: Name, email, company, payment info.</li>
            <li>Account Information: Login credentials, preferences.</li>
            <li>Usage Data: Pages visited, features used.</li>
            <li>Device Data: IP address, browser type, device info.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and personalize services.</li>
            <li>Communicate with you.</li>
            <li>Improve and secure our services.</li>
          </ul>

          <h2>4. Sharing of Information</h2>
          <p>
            We do not sell your personal information. We may share it with service providers (e.g., Supabase, Stripe, Twilio).
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You may request to access, correct, or delete your data.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We use technical and organizational measures to protect your data.
          </p>

          <h2>7. Cookies</h2>
          <p>
            See our <Link to="/cookies">Cookie Policy</Link> for information on how we use cookies.
          </p>

          <h2>8. Changes to Privacy Policy</h2>
          <p>
            We may update this policy and will notify users of significant changes.
          </p>

          <h2>9. Contact</h2>
          <p>
            If you have any questions, contact us at support@alloraai.com.
          </p>
        </div>
      ),
    },
    // Additional documents could be added here
    "cookies": {
      title: "Cookie Policy",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>Allora AI uses cookies to enhance your browsing experience.</p>
          
          <h2>2. What Are Cookies?</h2>
          <p>Cookies are small data files stored on your device to help websites operate efficiently.</p>
          
          <h2>3. How We Use Cookies</h2>
          <ul>
            <li>Essential Cookies: Authentication and security.</li>
            <li>Analytics Cookies: Understanding user behavior.</li>
            <li>Marketing Cookies: Personalized advertising.</li>
          </ul>
          
          <h2>4. Managing Cookies</h2>
          <p>You can control cookies through your browser settings.</p>
          
          <h2>5. Contact</h2>
          <p>For any questions, email support@alloraai.com.</p>
        </div>
      ),
    },
    "data-processing": {
      title: "Data Processing Agreement",
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Allora AI processes personal data on behalf of users in compliance with GDPR and related regulations.
            We implement security measures, engage subprocessors under strict terms, and protect user rights.
          </p>
          <p>
            Contact support@alloraai.com for a signed copy.
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
              <p className="text-sm text-muted-foreground mt-8">Last updated: April 9, 2025</p>
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
