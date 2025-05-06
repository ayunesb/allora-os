import { supabase } from "./supabase";
import { toast } from "sonner";

// Types for analytics data
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

// Get company user analytics (mock implementation)
export const getCompanyUserAnalytics = async (
  companyId: string,
): Promise<CompanyAnalytics> => {
  try {
    // In a real implementation, this would query the Supabase database
    // For now, return mock data
    return {
      totalUsers: 12,
      activeUsers: 8,
      inactiveUsers: 4,
      usersByRole: {
        admin: 2,
        user: 10,
      },
    };
  } catch (error: any) {
    console.error("Error fetching company user analytics:", error.message);
    toast.error(`Analytics error: ${error.message}`);

    // Return empty data on error
    return {
      totalUsers: 0,
      activeUsers: 0,
      inactiveUsers: 0,
      usersByRole: {},
    };
  }
};

// Get AI consultation analytics (mock implementation)
export const getConsultationAnalytics = async (
  companyId: string,
): Promise<ConsultationAnalytics> => {
  try {
    // In a real implementation, this would query the Supabase database
    // For now, return mock data
    return {
      totalConsultations: 24,
      consultationsByBot: {
        "Elon Musk": 8,
        "Warren Buffett": 6,
        "Satya Nadella": 4,
        "Ruth Porat": 3,
        "Sheryl Sandberg": 2,
        Other: 1,
      },
      consultationsByTopic: {
        Strategy: 10,
        Finance: 8,
        Operations: 4,
        Marketing: 2,
      },
      averageConsultationLength: 12, // minutes
    };
  } catch (error: any) {
    console.error("Error fetching consultation analytics:", error.message);
    toast.error(`Analytics error: ${error.message}`);

    // Return empty data on error
    return {
      totalConsultations: 0,
      consultationsByBot: {},
      consultationsByTopic: {},
      averageConsultationLength: 0,
    };
  }
};

// Get AI debate analytics (mock implementation)
export const getDebateAnalytics = async (
  companyId: string,
): Promise<DebateAnalytics> => {
  try {
    // In a real implementation, this would query the Supabase database
    // For now, return mock data
    return {
      totalDebates: 8,
      debatesByTopic: {
        "Growth Strategy": 3,
        "Market Expansion": 2,
        "Product Development": 2,
        "Cost Reduction": 1,
      },
      averageParticipants: 4.5,
      averageMessages: 28,
    };
  } catch (error: any) {
    console.error("Error fetching debate analytics:", error.message);
    toast.error(`Analytics error: ${error.message}`);

    // Return empty data on error
    return {
      totalDebates: 0,
      debatesByTopic: {},
      averageParticipants: 0,
      averageMessages: 0,
    };
  }
};

// Get lead analytics (mock implementation)
export const getLeadAnalytics = async (
  companyId: string,
): Promise<LeadAnalytics> => {
  try {
    // In a real implementation, this would query the Supabase database
    // For now, return mock data
    return {
      totalLeads: 183,
      leadsBySource: {
        Website: 85,
        LinkedIn: 48,
        Referral: 25,
        Event: 15,
        Other: 10,
      },
      leadsByStatus: {
        new: 52,
        contacted: 68,
        qualified: 32,
        proposal: 15,
        negotiation: 10,
        closed: 6,
      },
      conversionRate: 3.28,
      averageLeadScore: 42,
    };
  } catch (error: any) {
    console.error("Error fetching lead analytics:", error.message);
    toast.error(`Analytics error: ${error.message}`);

    // Return empty data on error
    return {
      totalLeads: 0,
      leadsBySource: {},
      leadsByStatus: {},
      conversionRate: 0,
      averageLeadScore: 0,
    };
  }
};

// Get predictive analytics (mock implementation)
export const getPredictiveAnalytics = async (
  companyId: string,
): Promise<PredictiveAnalytics> => {
  try {
    // In a real implementation, this would use an ML model
    // For now, return mock data

    // Generate lead forecast data
    const leadForecast = generateForecastData("leads");

    // Generate revenue forecast data
    const revenueForecast = generateForecastData("revenue");

    // Generate engagement forecast data
    const engagementForecast = generateForecastData("engagement");

    return {
      leadForecast,
      revenueForecast,
      engagementForecast,
    };
  } catch (error: any) {
    console.error("Error generating predictive analytics:", error.message);
    toast.error(`Predictive analytics error: ${error.message}`);

    // Return empty data on error
    return {
      leadForecast: [],
      revenueForecast: [],
      engagementForecast: [],
    };
  }
};

// Helper to generate forecast data
function generateForecastData(type: string): any[] {
  const data = [];
  const now = new Date();

  // Historical data (6 months)
  for (let i = 6; i > 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);

    let value: number;
    switch (type) {
      case "leads":
        value = 50 + (6 - i) * 10 + Math.random() * 20;
        break;
      case "revenue":
        value = 10000 + (6 - i) * 1500 + Math.random() * 2000;
        break;
      case "engagement":
        value = 40 + (6 - i) * 5 + Math.random() * 10;
        break;
      default:
        value = 100 + Math.random() * 50;
    }

    data.push({
      date: date.toISOString().split("T")[0],
      actual: value,
      predicted: value,
    });
  }

  // Forecast data (6 months)
  const lastValue = data[data.length - 1].actual;

  for (let i = 1; i <= 6; i++) {
    const date = new Date(now);
    date.setMonth(date.getMonth() + i);

    let predictedValue: number;
    let confidenceInterval: number;

    switch (type) {
      case "leads":
        predictedValue = lastValue * (1 + 0.08 * i) - Math.sin(i) * 10;
        confidenceInterval = 10 * i;
        break;
      case "revenue":
        predictedValue = lastValue * (1 + 0.05 * i);
        confidenceInterval = 1000 * i;
        break;
      case "engagement":
        predictedValue = lastValue * (1 + 0.03 * i) + Math.cos(i) * 5;
        confidenceInterval = 5 * i;
        break;
      default:
        predictedValue = lastValue * (1 + 0.05 * i);
        confidenceInterval = 20 * i;
    }

    data.push({
      date: date.toISOString().split("T")[0],
      predicted: predictedValue,
      upperBound: predictedValue + confidenceInterval,
      lowerBound: Math.max(0, predictedValue - confidenceInterval),
    });
  }

  return data;
}

// Get system analytics for administrators (mock implementation)
export const getSystemAnalytics = async (): Promise<SystemAnalytics> => {
  try {
    // In a real implementation, this would query system logs and metrics
    // For now, return mock data
    return {
      apiCalls: 2458,
      errorRate: 0.023, // 2.3%
      averageResponseTime: 246, // ms
      activeSubscriptions: 48,
    };
  } catch (error: any) {
    console.error("Error fetching system analytics:", error.message);
    toast.error(`Analytics error: ${error.message}`);

    // Return empty data on error
    return {
      apiCalls: 0,
      errorRate: 0,
      averageResponseTime: 0,
      activeSubscriptions: 0,
    };
  }
};

// Get analytics dashboard data for company admins
export const getCompanyDashboardAnalytics = async (companyId: string) => {
  try {
    const [
      userAnalytics,
      consultationAnalytics,
      debateAnalytics,
      leadAnalytics,
      predictiveAnalytics,
    ] = await Promise.all([
      getCompanyUserAnalytics(companyId),
      getConsultationAnalytics(companyId),
      getDebateAnalytics(companyId),
      getLeadAnalytics(companyId),
      getPredictiveAnalytics(companyId),
    ]);

    return {
      userAnalytics,
      consultationAnalytics,
      debateAnalytics,
      leadAnalytics,
      predictiveAnalytics,
    };
  } catch (error: any) {
    console.error("Error fetching dashboard analytics:", error.message);
    toast.error(`Dashboard analytics error: ${error.message}`);
    throw error;
  }
};
