import React from "react";
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
declare const PolicyToggles: React.FC<PolicyTogglesProps>;
export default PolicyToggles;
