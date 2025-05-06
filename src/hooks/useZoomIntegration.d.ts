export interface ZoomIntegration {
  created_at: string;
  updated_at: string;
  user_id?: string;
  account_id?: string;
  status?: string;
}
export interface ZoomCallbackResult {
  success: boolean;
  data?: any;
  error?: {
    message: string;
    code?: string;
  };
}
export declare function useZoomIntegration(): {
  isConnecting: boolean;
  isConnected: boolean;
  error: string;
  integration: ZoomIntegration;
  initiateZoomConnection: () => Promise<string>;
  handleCallback: (
    code: string,
    state: string,
    redirectUri: string,
  ) => Promise<ZoomCallbackResult>;
  disconnectZoom: () => Promise<{
    success: boolean;
  }>;
  connectZoom: () => Promise<void>;
  checkConnection: () => Promise<{
    connected: boolean;
    integration?: ZoomIntegration;
  }>;
};
