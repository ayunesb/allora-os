export interface Strategy {
	id: string;
	title: string;
	riskLevel?: 'Low' | 'Medium' | 'High' | string;
	[key: string]: any;
}

export type PatchedStrategy = Strategy & {
	riskLevel: 'Low' | 'Medium' | 'High';
};
