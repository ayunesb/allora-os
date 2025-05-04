import { Plugin } from './plugin';
import { PluginManager } from './pluginManager';

export class PluginAgent {
  private pluginManager: PluginManager;

  constructor(pluginManager: PluginManager) {
    this.pluginManager = pluginManager;
  }

  async executePlugin(pluginName: string, data: any): Promise<{ success: boolean; error?: string }> {
    try {
      const plugin: Plugin = this.pluginManager.getPlugin(pluginName);
      await plugin.execute(data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}