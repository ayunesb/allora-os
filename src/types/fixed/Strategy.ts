export interface Strategy {
	id: string;
	title: string;
	riskLevel?: 'Low' | 'Medium' | 'High' | string;
	[key: string]: any;
}

export interface PatchedStrategy extends Strategy {
	riskLevel: 'Low' | 'Medium' | 'High';
}
