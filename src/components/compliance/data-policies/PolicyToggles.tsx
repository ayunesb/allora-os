
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PolicyToggleProps {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const PolicyToggle = ({ 
  id, 
  label, 
  description, 
  checked, 
  onCheckedChange 
}: PolicyToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Label htmlFor={id} className="text-base">{label}</Label>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};

export interface DataPoliciesState {
  dataDeletion: boolean;
  dataMinimization: boolean;
  dataEncryption: boolean;
  dataRetention: boolean;
  accessControl: boolean;
  thirdPartySharing: boolean;
}

interface PolicyTogglesProps {
  policies: DataPoliciesState;
  onPolicyToggle: (policy: keyof DataPoliciesState) => void;
}

export default function PolicyToggles({ policies, onPolicyToggle }: PolicyTogglesProps) {
  return (
    <div className="space-y-6">
      <PolicyToggle
        id="data-deletion"
        label="Data Deletion Requests"
        description="Automatically process data deletion requests"
        checked={policies.dataDeletion}
        onCheckedChange={() => onPolicyToggle('dataDeletion')}
      />
      
      <PolicyToggle
        id="data-minimization"
        label="Data Minimization"
        description="Only collect necessary data for business purposes"
        checked={policies.dataMinimization}
        onCheckedChange={() => onPolicyToggle('dataMinimization')}
      />
      
      <PolicyToggle
        id="data-encryption"
        label="Data Encryption"
        description="Encrypt all sensitive data at rest and in transit"
        checked={policies.dataEncryption}
        onCheckedChange={() => onPolicyToggle('dataEncryption')}
      />
      
      <PolicyToggle
        id="data-retention"
        label="Data Retention Limits"
        description="Automatically delete data after retention period"
        checked={policies.dataRetention}
        onCheckedChange={() => onPolicyToggle('dataRetention')}
      />
      
      <PolicyToggle
        id="access-control"
        label="Strict Access Controls"
        description="Limit data access to authorized personnel only"
        checked={policies.accessControl}
        onCheckedChange={() => onPolicyToggle('accessControl')}
      />
      
      <PolicyToggle
        id="third-party-sharing"
        label="Third-Party Data Sharing"
        description="Allow sharing data with third-party services"
        checked={policies.thirdPartySharing}
        onCheckedChange={() => onPolicyToggle('thirdPartySharing')}
      />
    </div>
  );
}
