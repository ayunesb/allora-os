import { DebateSession } from "@/utils/consultation/types";
export declare const saveDebateSession: (
  session: Omit<DebateSession, "id" | "created_at">,
) => Promise<string | null>;
export declare const getCompanyDebateSessions: (
  companyId: string,
) => Promise<DebateSession[]>;
