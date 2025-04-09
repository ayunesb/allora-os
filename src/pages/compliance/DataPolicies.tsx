
import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Download, FileText, Lock, Shield } from "lucide-react";
import ComplianceLayout from "@/components/ComplianceLayout";

export default function DataPolicies() {
  const [dataPolicies, setDataPolicies] = useState({
    dataDeletion: true,
    dataMinimization: false,
    dataEncryption: true,
    dataRetention: true,
    accessControl: true,
    thirdPartySharing: false
  });
  
  const handlePolicyToggle = (policy: keyof typeof dataPolicies) => {
    setDataPolicies({
      ...dataPolicies,
      [policy]: !dataPolicies[policy]
    });
  };
  
  return (
    <ComplianceLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                Data Handling Policies
              </CardTitle>
              <CardDescription>
                Configure how customer data is processed, stored, and shared
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-deletion" className="text-base">Data Deletion Requests</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically process data deletion requests
                  </p>
                </div>
                <Switch
                  id="data-deletion"
                  checked={dataPolicies.dataDeletion}
                  onCheckedChange={() => handlePolicyToggle('dataDeletion')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-minimization" className="text-base">Data Minimization</Label>
                  <p className="text-sm text-muted-foreground">
                    Only collect necessary data for business purposes
                  </p>
                </div>
                <Switch
                  id="data-minimization"
                  checked={dataPolicies.dataMinimization}
                  onCheckedChange={() => handlePolicyToggle('dataMinimization')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-encryption" className="text-base">Data Encryption</Label>
                  <p className="text-sm text-muted-foreground">
                    Encrypt all sensitive data at rest and in transit
                  </p>
                </div>
                <Switch
                  id="data-encryption"
                  checked={dataPolicies.dataEncryption}
                  onCheckedChange={() => handlePolicyToggle('dataEncryption')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-retention" className="text-base">Data Retention Limits</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically delete data after retention period
                  </p>
                </div>
                <Switch
                  id="data-retention"
                  checked={dataPolicies.dataRetention}
                  onCheckedChange={() => handlePolicyToggle('dataRetention')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="access-control" className="text-base">Strict Access Controls</Label>
                  <p className="text-sm text-muted-foreground">
                    Limit data access to authorized personnel only
                  </p>
                </div>
                <Switch
                  id="access-control"
                  checked={dataPolicies.accessControl}
                  onCheckedChange={() => handlePolicyToggle('accessControl')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="third-party-sharing" className="text-base">Third-Party Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow sharing data with third-party services
                  </p>
                </div>
                <Switch
                  id="third-party-sharing"
                  checked={dataPolicies.thirdPartySharing}
                  onCheckedChange={() => handlePolicyToggle('thirdPartySharing')}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5 text-primary" />
                Regulatory Frameworks
              </CardTitle>
              <CardDescription>
                Compliance with data protection regulations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="gdpr">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      GDPR Compliance
                      <Badge variant="outline" className="ml-2">Required</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>
                        The General Data Protection Regulation (GDPR) is a comprehensive data protection law in the EU.
                        Our platform implements the following GDPR requirements:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Right to access personal data</li>
                        <li>Right to rectification</li>
                        <li>Right to erasure (right to be forgotten)</li>
                        <li>Right to restrict processing</li>
                        <li>Right to data portability</li>
                        <li>Right to object to processing</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="ccpa">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      CCPA Compliance
                      <Badge variant="outline" className="ml-2">Required</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>
                        The California Consumer Privacy Act (CCPA) enhances privacy rights for California residents.
                        Our platform implements the following CCPA requirements:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Right to know what personal information is collected</li>
                        <li>Right to know whether personal information is sold or disclosed</li>
                        <li>Right to say no to the sale of personal information</li>
                        <li>Right to access personal information</li>
                        <li>Right to equal service and price</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="hipaa">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      HIPAA Compliance
                      <Badge variant="outline" className="ml-2">Optional</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>
                        The Health Insurance Portability and Accountability Act (HIPAA) sets standards for protecting sensitive patient health information.
                        Enable this only if your organization handles protected health information (PHI).
                      </p>
                      <Button variant="outline" size="sm">
                        Enable HIPAA Compliance
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Policy Documents
              </CardTitle>
              <CardDescription>
                Legal and compliance documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between items-center p-3 border rounded-md">
                  <span>Privacy Policy</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href="/privacy">View</a>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
                <li className="flex justify-between items-center p-3 border rounded-md">
                  <span>Terms of Service</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href="/legal">View</a>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
                <li className="flex justify-between items-center p-3 border rounded-md">
                  <span>Data Processing Agreement</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
                <li className="flex justify-between items-center p-3 border rounded-md">
                  <span>Breach Notification Policy</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Compliance Contact</CardTitle>
              <CardDescription>
                Designated data protection officer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Data Protection Officer</h3>
                  <p className="text-sm text-muted-foreground">Jane Smith</p>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">dpo@allora-ai.com</p>
                </div>
                <div>
                  <h3 className="font-medium">Response Time</h3>
                  <p className="text-sm text-muted-foreground">Within 48 hours</p>
                </div>
                <Button className="w-full">Contact DPO</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ComplianceLayout>
  );
}
