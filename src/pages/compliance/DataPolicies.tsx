
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { FileText, Lock, Shield } from "lucide-react";
import ComplianceLayout from "@/components/ComplianceLayout";
import PolicyToggles, { DataPoliciesState } from "@/components/compliance/data-policies/PolicyToggles";
import RegulatoryFrameworks from "@/components/compliance/data-policies/RegulatoryFrameworks";
import PolicyDocuments from "@/components/compliance/data-policies/PolicyDocuments";
import ComplianceContact from "@/components/compliance/data-policies/ComplianceContact";
import { logComplianceChange } from "@/utils/auditLogger";

export default function DataPolicies() {
  const [dataPolicies, setDataPolicies] = useState<DataPoliciesState>({
    dataDeletion: true,
    dataMinimization: false,
    dataEncryption: true,
    dataRetention: true,
    accessControl: true,
    thirdPartySharing: false
  });
  
  const handlePolicyToggle = (policy: keyof DataPoliciesState) => {
    const newValue = !dataPolicies[policy];
    
    setDataPolicies({
      ...dataPolicies,
      [policy]: newValue
    });
    
    // Log the policy change to the audit log
    logComplianceChange(
      'admin', // In a real app, this would be the actual user ID
      `Changed ${policy} setting to ${newValue}`,
      { policyType: policy, newValue }
    );
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
            <CardContent>
              <PolicyToggles 
                policies={dataPolicies} 
                onPolicyToggle={handlePolicyToggle} 
              />
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
              <RegulatoryFrameworks />
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
              <PolicyDocuments />
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
              <ComplianceContact />
            </CardContent>
          </Card>
        </div>
      </div>
    </ComplianceLayout>
  );
}
