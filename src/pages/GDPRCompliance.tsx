
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GDPRCompliance() {
  const navigate = useNavigate();
  
  return (
    <div className="container py-10 max-w-4xl mx-auto px-4 sm:px-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/legal')} 
        className="mb-6 flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Legal Documents
      </Button>
      
      <Card className="border-primary/10 shadow-md">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-2xl">GDPR Compliance</CardTitle>
          <CardDescription>
            How we comply with the General Data Protection Regulation
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">Overview</h2>
                <p className="text-muted-foreground">
                  At Allora AI, we are committed to ensuring the privacy and protection of your personal data in compliance with the General Data Protection Regulation (GDPR) of the European Union.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">Data Controller</h2>
                <p className="text-muted-foreground mb-3">
                  Allora AI acts as a data controller for the personal information collected through our platform. This means we determine the purposes and means of processing your personal data.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">Personal Data We Collect</h2>
                <p className="text-muted-foreground mb-3">
                  We collect and process the following categories of personal data:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Identity information (name, username)</li>
                  <li>Contact information (email address, phone number)</li>
                  <li>Account information (login credentials, preferences)</li>
                  <li>Usage data (how you interact with our services)</li>
                  <li>Business information (company details, industry, goals)</li>
                  <li>Technical data (IP address, browser type, device information)</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">Legal Basis for Processing</h2>
                <p className="text-muted-foreground mb-3">
                  We process your personal data on the following legal grounds:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Contractual necessity:</strong> Processing necessary for the performance of our contract with you</li>
                  <li><strong>Legitimate interests:</strong> Processing necessary for our legitimate business interests</li>
                  <li><strong>Consent:</strong> Processing based on your specific consent</li>
                  <li><strong>Legal obligation:</strong> Processing necessary to comply with our legal obligations</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">Your Rights Under GDPR</h2>
                <p className="text-muted-foreground mb-3">
                  As a data subject, you have the following rights under the GDPR:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong>Right to access:</strong> You can request a copy of your personal data</li>
                  <li><strong>Right to rectification:</strong> You can request correction of inaccurate data</li>
                  <li><strong>Right to erasure:</strong> You can request deletion of your data under certain circumstances</li>
                  <li><strong>Right to restrict processing:</strong> You can request limitation of processing under certain circumstances</li>
                  <li><strong>Right to data portability:</strong> You can request transfer of your data to another service</li>
                  <li><strong>Right to object:</strong> You can object to processing based on legitimate interests</li>
                  <li><strong>Rights related to automated decision making:</strong> You can request human intervention for decisions based solely on automated processing</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">Data Retention</h2>
                <p className="text-muted-foreground">
                  We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including legal, accounting, or reporting requirements. Different types of personal data may be retained for different periods.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">International Transfers</h2>
                <p className="text-muted-foreground">
                  Your personal data may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country. We ensure appropriate safeguards are in place to protect your personal data in compliance with GDPR requirements.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">Data Breach Notification</h2>
                <p className="text-muted-foreground">
                  In the event of a personal data breach that poses a risk to your rights and freedoms, we will notify the relevant supervisory authority without undue delay and, when required, inform affected individuals in accordance with GDPR requirements.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
                <p className="text-muted-foreground">
                  If you have any questions or concerns about our GDPR compliance or wish to exercise your rights as a data subject, please contact our Data Protection Officer at gdpr@allora-ai.com.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">Updates to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this GDPR compliance statement from time to time. The most current version will always be available on our website.
                </p>
              </section>
              
              <p className="text-sm text-muted-foreground pt-6 italic">
                Last updated: April 14, 2025
              </p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
