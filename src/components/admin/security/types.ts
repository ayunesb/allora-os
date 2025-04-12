
export interface SecuritySettingsType {
  twoFactorEnabled: boolean;
  extendedSessionTimeout: boolean;
  strictContentSecurity: boolean;
  enhancedApiProtection: boolean;
}

export interface SaveSecuritySettingsParams {
  settings: SecuritySettingsType;
}
