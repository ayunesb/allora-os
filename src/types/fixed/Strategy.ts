export interface Strategy {
	id: string;
	title: string;
	riskLevel?: 'Low' | 'Medium' | 'High' | string;
	[key: string]: any;
}

export interface PatchedStrategy extends Strategy {
	riskLevel: 'Low' | 'Medium' | 'High';
}

export type GeneratedStrategy = any; // Replace `any` with the actual type if known
