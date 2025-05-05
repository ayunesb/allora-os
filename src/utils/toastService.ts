import { showToast } from './toast';

export const toastService = {
	success: (message: string) =>
		showToast({ title: message, type: 'success' }),
	error: (message: string) =>
		showToast({ title: message, type: 'error' }),
	info: (message: string) =>
		showToast({ title: message, type: 'info' }),
	warning: (message: string) =>
		showToast({ title: message, type: 'warning' }),
	default: (message: string) =>
		showToast({ title: message, type: 'default' }),
};

function loadPluginsByStrategy(strategy_id: any): Promise<any[]> {
	// Mock implementation: Replace with actual logic to load plugins
	return Promise.resolve([
		{
			id: 1,
			executeHandler: async (context: any) => ({
				metricType: 'exampleMetric',
				value: 100,
			}),
		},
	]);
}

function persistKpiMetrics(arg0: { plugin_id: any; campaign_id: any; metric_type: any; value: any; }) {
    throw new Error('Function not implemented.');
}

function appendPluginLog(arg0: { plugin_id: any; campaign_id: any; timestamp: Date; output: any; }) {
    throw new Error('Function not implemented.');
}

function appendAdminLog(arg0: { context: string; campaign_id: any; summary: string; }) {
    throw new Error('Function not implemented.');
}

