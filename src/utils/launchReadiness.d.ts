export type ApiStatus = "connected" | "error" | "not_configured";
export interface LaunchReadinessStatus {
  apis: {
    heygen: ApiStatus;
    postmark: ApiStatus;
    stripe: ApiStatus;
    twilio: ApiStatus;
    openai: ApiStatus;
    zapier?: ApiStatus;
  };
  database: {
    status: "ready" | "error";
    message?: string;
  };
  features: {
    authentication: boolean;
    onboarding: boolean;
    strategies: boolean;
    campaigns: boolean;
    aiDebate: boolean;
    welcomeVideo: boolean;
    billing: boolean;
  };
  compliance: {
    whatsappOptIn: boolean;
    emailUnsubscribe: boolean;
    billingCompliance: boolean;
    apiSecurityLevel: "high" | "medium" | "low";
  };
  overallStatus: "ready" | "warning" | "not_ready";
}
export declare function checkLaunchReadiness(): Promise<LaunchReadinessStatus>;
