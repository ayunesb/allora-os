/**
 * Analyze user behavior to update preferences
 */
import { UserPreferences } from "../types";
export declare const analyzeUserBehavior: (
  actions: any[],
  currentPreferences?: any,
) => Partial<UserPreferences> | null;
