export * from "./tableVerification";
export * from "./rlsVerification";
export * from "./functionVerification";
export * from "./displayResults";
export declare function checkVerificationAccess(): Promise<
  | {
      canAccess: boolean;
      reason: string;
      message: string;
    }
  | {
      canAccess: boolean;
      reason?: undefined;
      message?: undefined;
    }
>;
