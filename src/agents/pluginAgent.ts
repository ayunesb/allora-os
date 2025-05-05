import { loadPluginsByStrategy, persistKpiMetrics, appendPluginLog, appendAdminLog } from '../utils/pluginUtils';

export async function executePlugins(strategy_id: any, campaign_id: any) {
	const plugins = await loadPluginsByStrategy(strategy_id);

	for (const plugin of plugins) {
		try {
			const result = await plugin.executeHandler({ campaign_id });
			await persistKpiMetrics({
				plugin_id: plugin.id,
				campaign_id,
				metric_type: result.metricType,
				value: result.value,
			});
			await appendPluginLog({
				plugin_id: plugin.id,
				campaign_id,
				timestamp: new Date(),
				output: result,
			});
		} catch (error) {
			await appendAdminLog({
				context: 'Plugin Execution',
				campaign_id,
				summary: `Error executing plugin ${plugin.id}: ${error.message}`,
			});
		}
	}
}
