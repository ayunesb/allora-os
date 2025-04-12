
export interface AnalyticsData {
  summary: AnalyticsMetrics;
  timeSeries: TimeSeriesDataPoint[];
  channelPerformance: ChannelPerformance[];
  conversionTypes?: ConversionType[];
  audienceData?: AudienceData;
}

export interface AnalyticsMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  conversionRate: number;
  costPerConversion: number;
  revenue: number;
  roi: number;
  leads?: number;
  opportunities?: number;
  cost?: number;
}

export interface TimeSeriesDataPoint {
  date: string;
  metrics: AnalyticsMetrics;
}

export interface ChannelPerformance {
  channelName: string;
  metrics: AnalyticsMetrics;
}

export interface ConversionType {
  type: string;
  count: number;
}

export interface AudienceData {
  ageGroups: AgeGroup[];
  genderDistribution: GenderDistribution[];
  topRegions: Region[];
  deviceDistribution: DeviceDistribution[];
  topInterests: Interest[];
}

export interface AgeGroup {
  group: string;
  percentage: number;
}

export interface GenderDistribution {
  gender: string;
  percentage: number;
}

export interface Region {
  region: string;
  percentage: number;
}

export interface DeviceDistribution {
  device: string;
  percentage: number;
}

export interface Interest {
  interest: string;
  percentage: number;
}
