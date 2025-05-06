export declare function useWebhooks(): {
  stripeWebhook: string;
  setStripeWebhook: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  zapierWebhook: string;
  setZapierWebhook: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  githubWebhook: string;
  setGithubWebhook: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  slackWebhook: string;
  setSlackWebhook: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  customWebhook: string;
  setCustomWebhook: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  isSaving: boolean;
  testLoading: boolean;
  testingWebhook: string;
  handleSaveWebhooks: (
    isStripeValid: boolean,
    isZapierValid: boolean,
    isGithubValid: boolean,
    isSlackValid: boolean,
    isCustomValid: boolean,
  ) => Promise<void>;
  handleTestStripeWebhook: (isValid: boolean) => Promise<boolean>;
  handleTestZapierWebhook: (isValid: boolean) => Promise<boolean>;
  handleTestGithubWebhook: (isValid: boolean) => Promise<boolean>;
  handleTestSlackWebhook: (isValid: boolean) => Promise<boolean>;
  handleTestCustomWebhook: (isValid: boolean) => Promise<boolean>;
};
