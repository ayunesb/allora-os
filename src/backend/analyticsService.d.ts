export interface CompanyAnalytics {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    usersByRole: Record<string, number>;
}
export interface ConsultationAnalytics {
    totalConsultations: number;
    consultationsByBot: Record<string, number>;
    consultationsByTopic: Record<string, number>;
    averageConsultationLength: number;
}
export interface DebateAnalytics {
    totalDebates: number;
    debatesByTopic: Record<string, number>;
    averageParticipants: number;
    averageMessages: number;
}
export interface SystemAnalytics {
    apiCalls: number;
    errorRate: number;
    averageResponseTime: number;
    activeSubscriptions: number;
}
export interface LeadAnalytics {
    totalLeads: number;
    leadsBySource: Record<string, number>;
    leadsByStatus: Record<string, number>;
    conversionRate: number;
    averageLeadScore: number;
}
export interface PredictiveAnalytics {
    leadForecast: any[];
    revenueForecast: any[];
    engagementForecast: any[];
}
export declare const getCompanyUserAnalytics: (companyId: string) => Promise<CompanyAnalytics>;
export declare const getConsultationAnalytics: (companyId: string) => Promise<ConsultationAnalytics>;
export declare const getDebateAnalytics: (companyId: string) => Promise<DebateAnalytics>;
export declare const getLeadAnalytics: (companyId: string) => Promise<LeadAnalytics>;
export declare const getPredictiveAnalytics: (companyId: string) => Promise<PredictiveAnalytics>;
export declare const getSystemAnalytics: () => Promise<SystemAnalytics>;
export declare const getCompanyDashboardAnalytics: (companyId: string) => Promise<{
    userAnalytics: CompanyAnalytics;
    consultationAnalytics: ConsultationAnalytics;
    debateAnalytics: DebateAnalytics;
    leadAnalytics: LeadAnalytics;
    predictiveAnalytics: PredictiveAnalytics;
}>;
