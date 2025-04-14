
import React from 'react';
import { PageTitle } from '@/components/ui/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, UserCheck, FileText, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PageErrorBoundary } from '@/components/errorHandling/PageErrorBoundary';

const GDPRCompliancePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageErrorBoundary pageName="GDPR Compliance">
      <div className="container max-w-4xl py-8">
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <PageTitle title="GDPR Compliance">GDPR Compliance</PageTitle>
        </div>

        <Card className="mb-8">
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center">
              <Shield className="mr-2 h-6 w-6 text-primary" />
              <CardTitle>Our Commitment to GDPR</CardTitle>
            </div>
            <CardDescription>
              How Allora AI ensures compliance with the General Data Protection Regulation
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <p>
                At Allora AI, we are committed to ensuring the privacy and protection of your data in compliance with the General Data Protection Regulation (GDPR). This page outlines how we adhere to GDPR principles and what rights you have regarding your personal data.
              </p>

              <div className="rounded-lg bg-muted p-4">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <UserCheck className="mr-2 h-5 w-5 text-primary" />
                  Your Rights Under GDPR
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Right to access your personal data</li>
                  <li>Right to rectification of inaccurate personal data</li>
                  <li>Right to erasure ("right to be forgotten")</li>
                  <li>Right to restriction of processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                  <li>Rights related to automated decision making and profiling</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-primary" />
                  How We Ensure GDPR Compliance
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Data Minimization</h4>
                    <p className="text-sm text-muted-foreground">We only collect and process data that is necessary for the specific purposes we've communicated to you.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Lawful Processing</h4>
                    <p className="text-sm text-muted-foreground">We ensure that all data processing activities have a valid legal basis under GDPR.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Transparency</h4>
                    <p className="text-sm text-muted-foreground">We provide clear information about how we collect, use, and share your data.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Data Security</h4>
                    <p className="text-sm text-muted-foreground">We implement appropriate technical and organizational measures to protect your data.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Data Retention</h4>
                    <p className="text-sm text-muted-foreground">We retain personal data only for as long as necessary for the purposes for which it was collected.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center">
              <FileText className="mr-2 h-6 w-6 text-primary" />
              <CardTitle>Data Processing Agreement</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              If you are a business customer using our services to process personal data, we offer a Data Processing Agreement (DPA) that outlines our respective responsibilities under GDPR.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline">Download Sample DPA</Button>
              <Button>Request a DPA</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>For more detailed information on our data practices, please refer to our:</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" asChild>
                <Link to="/privacy">Privacy Policy</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/cookie-policy">Cookie Policy</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/cookie-settings">Cookie Settings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            If you have any questions about our GDPR compliance or wish to exercise your rights, please contact our Data Protection Officer at{' '}
            <a href="mailto:dpo@alloraai.com" className="text-primary hover:underline">
              dpo@alloraai.com
            </a>
          </p>
        </div>
      </div>
    </PageErrorBoundary>
  );
};

export default GDPRCompliancePage;
