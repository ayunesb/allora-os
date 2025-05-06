export declare function useCallScriptTracking(): {
  trackScriptView: (
    scriptId: string,
    title: string,
    type: "call" | "message",
  ) => void;
  trackScriptUse: (
    scriptId: string,
    title: string,
    type: "call" | "message",
    primaryBot?: any,
  ) => void;
  trackScriptFeedback: (
    scriptId: string,
    title: string,
    type: "call" | "message",
    isPositive: boolean,
    primaryBot?: any,
    reason?: string,
  ) => void;
  isLoggedIn: boolean;
};
