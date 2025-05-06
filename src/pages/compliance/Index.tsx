import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import PolicyToggles from "@/components/compliance/data-policies/PolicyToggles";
import { useCompliance } from "@/hooks/useCompliance";
export default function ComplianceIndex() {
  const compliance = useCompliance();
  const handleToggle = (policy) => {
    if (compliance && compliance.updatePreference) {
      compliance.updatePreference(
        `policies.${policy}`,
        !compliance.policies?.[policy],
      );
    }
  };
  // Create a safe policies object that meets the DataPoliciesState requirements
  const defaultPolicies = {
    dataDeletion: false,
    dataMinimization: false,
    dataEncryption: false,
    dataRetention: false,
    ccpa: false,
    gdpr: false,
  };
  // Merge the compliance policies with our default structure
  const policies = {
    ...defaultPolicies,
    ...(compliance?.policies || {}),
  };
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TypographyH1>Compliance Center</TypographyH1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Policies</CardTitle>
          <CardDescription>
            Configure your organization's data handling policies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TypographyP>
            Enable or disable various data handling policies to align with
            regulatory requirements and internal standards.
          </TypographyP>

          <div className="mt-4">
            <PolicyToggles policies={policies} onPolicyToggle={handleToggle} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
