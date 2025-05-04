import { SaveSecuritySettingsParams, SecuritySettingsType } from './types';
export declare const saveSecuritySettings: ({ settings }: SaveSecuritySettingsParams) => Promise<boolean>;
export declare const fetchSecuritySettings: () => Promise<SecuritySettingsType>;
