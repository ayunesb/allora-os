export interface DocumentVersion {
  id: string;
  name: string;
  version: string;
  lastUpdated: string;
  nextReviewDate: string;
  status: "current" | "outdated" | "update-available";
  regulatoryFrameworks: string[];
  autoUpdateEnabled: boolean;
}
export declare const documentIdToName: Record<string, string>;
interface UpdateCheckResult {
  documentsNeedingUpdate: string[];
  latestVersions: Record<string, string>;
  regulatoryChanges: Record<string, string[]>;
}
export declare const checkForDocumentUpdates: () => Promise<UpdateCheckResult>;
export declare const applyDocumentUpdate: (
  documentId: string,
) => Promise<boolean>;
export declare const setupAutomaticUpdates: (
  onUpdateAvailable: (documents: string[]) => void,
) => () => void;
export declare const scheduleRegularComplianceCheck: (
  intervalDays: number,
  onUpdateAvailable: (documents: string[]) => void,
) => Promise<void>;
export declare const enableAutoUpdatesForDocument: (
  documentId: string,
  enabled: boolean,
) => Promise<boolean>;
export declare const getDocumentVersionHistory: (
  documentId: string,
) => Promise<any[]>;
export {};
