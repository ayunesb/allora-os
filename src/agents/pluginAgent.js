var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loadPluginsByStrategy, persistKpiMetrics, appendPluginLog, appendAdminLog, } from "../utils/pluginUtils";
export function executePlugins(strategy_id, campaign_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const plugins = yield loadPluginsByStrategy(strategy_id);
        for (const plugin of plugins) {
            try {
                const result = yield plugin.executeHandler({ campaign_id });
                yield persistKpiMetrics({
                    plugin_id: plugin.id,
                    campaign_id,
                    metric_type: result.metricType,
                    value: result.value,
                });
                yield appendPluginLog({
                    plugin_id: plugin.id,
                    campaign_id,
                    timestamp: new Date(),
                    output: result,
                });
            }
            catch (error) {
                yield appendAdminLog({
                    context: "Plugin Execution",
                    campaign_id,
                    summary: `Error executing plugin ${plugin.id}: ${error.message}`,
                });
            }
        }
    });
}
