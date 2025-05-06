import { useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSelfLearning } from "@/hooks/useSelfLearning";
import { toast } from "sonner";

export function useCallScriptTracking() {
  const { user } = useAuth();
  const { trackAction } = useSelfLearning();

  /**
   * Track when a user views a call script
   */
  const trackScriptView = useCallback(
    (scriptId: string, title: string, type: "call" | "message") => {
      if (!user?.id) return;

      trackAction("view_script", "script_view", scriptId, `${type}_script`, {
        title,
        type,
      });
    },
    [user, trackAction],
  );

  /**
   * Track when a user uses a script
   */
  const trackScriptUse = useCallback(
    (
      scriptId: string,
      title: string,
      type: "call" | "message",
      primaryBot?: any,
    ) => {
      if (!user?.id) return;

      trackAction("use_script", "script_usage", scriptId, `${type}_script`, {
        title,
        type,
        primaryBot: primaryBot?.name,
      });

      toast.success(
        `${type === "call" ? "Call" : "Message"} script loaded successfully!`,
      );
    },
    [user, trackAction],
  );

  /**
   * Track feedback on a script
   */
  const trackScriptFeedback = useCallback(
    (
      scriptId: string,
      title: string,
      type: "call" | "message",
      isPositive: boolean,
      primaryBot?: any,
      reason?: string,
    ) => {
      if (!user?.id) return;

      trackAction(
        isPositive ? "script_approve" : "script_reject",
        "script_feedback",
        scriptId,
        `${type}_script`,
        {
          title,
          type,
          primaryBot: primaryBot?.name,
          rating: isPositive ? "positive" : "negative",
          reason,
        },
      );

      toast.success(
        isPositive
          ? "Thanks for your positive feedback!"
          : "Feedback recorded. We'll improve our scripts.",
      );
    },
    [user, trackAction],
  );

  return {
    trackScriptView,
    trackScriptUse,
    trackScriptFeedback,
    isLoggedIn: !!user?.id,
  };
}
