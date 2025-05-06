type LinkedInConnection = {
  id: string;
  name: string;
  email?: string;
  title?: string;
  company?: string;
};
export declare function useLinkedInIntegration(): {
  connectToLinkedIn: () => Promise<void>;
  handleAuthCallback: (code: string, state: string) => Promise<boolean>;
  searchConnections: (query: string) => Promise<any>;
  importConnections: (
    selectedConnections: LinkedInConnection[],
    campaignId: string,
  ) => Promise<boolean>;
  disconnect: () => void;
  connections: LinkedInConnection[];
  isAuthenticated: boolean;
  isConnecting: boolean;
  isSearching: boolean;
  isImporting: boolean;
};
export {};
