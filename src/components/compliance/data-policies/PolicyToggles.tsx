
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export interface DataPoliciesState {
  dataDeletion: boolean;
  dataMinimization: boolean;
  dataEncryption: boolean;
  dataRetention: boolean;
  gdpr: boolean;
  ccpa: boolean;
}

interface PolicyTogglesProps {
  policies: DataPoliciesState;
  onPolicyToggle: (policy: keyof DataPoliciesState) => void;
}

const PolicyToggles: React.FC<PolicyTogglesProps> = ({ policies, onPolicyToggle }) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex items-center space-x-2">
          <Switch 
            id="dataDeletion"
            checked={policies.dataDeletion}
            onCheckedChange={() => onPolicyToggle('dataDeletion')}
          />
          <Label htmlFor="dataDeletion">Data Deletion Policy</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="dataMinimization"
            checked={policies.dataMinimization}
            onCheckedChange={() => onPolicyToggle('dataMinimization')}
          />
          <Label htmlFor="dataMinimization">Data Minimization</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="dataEncryption"
            checked={policies.dataEncryption}
            onCheckedChange={() => onPolicyToggle('dataEncryption')}
          />
          <Label htmlFor="dataEncryption">Data Encryption</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="dataRetention"
            checked={policies.dataRetention}
            onCheckedChange={() => onPolicyToggle('dataRetention')}
          />
          <Label htmlFor="dataRetention">Data Retention Limits</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="gdpr"
            checked={policies.gdpr}
            onCheckedChange={() => onPolicyToggle('gdpr')}
          />
          <Label htmlFor="gdpr">GDPR Compliance</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="ccpa"
            checked={policies.ccpa}
            onCheckedChange={() => onPolicyToggle('ccpa')}
          />
          <Label htmlFor="ccpa">CCPA Compliance</Label>
        </div>
      </div>
    </div>
  );
};

export default PolicyToggles;
