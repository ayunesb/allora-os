export interface Plugin {
	id: number;
	executeHandler: (context: any) => Promise<{ metricType: string; value: any }>;
}

export interface SocialMediaPost {
	platform: string;
	content: string;
}
