import React, { ReactNode } from "react";
interface ApiKeys {
  stripe: string;
  twilio_sid: string;
  twilio_token: string;
  heygen: string;
}
interface SecuritySettings {
  twoFactorEnabled: boolean;
  extendedSessionTimeout: boolean;
  strictContentSecurity: boolean;
  enhancedApiProtection: boolean;
}
interface AdminSettingsContextProps {
  companyId: string | null;
  isLoading: boolean;
  apiKeys: ApiKeys;
  securitySettings: SecuritySettings;
}
interface AdminSettingsProviderProps {
  children: (context: AdminSettingsContextProps) => ReactNode;
}
declare const AdminSettingsProvider: React.FC<AdminSettingsProviderProps>;
export default AdminSettingsProvider;
