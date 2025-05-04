import { Strategy } from './strategy';
import { StrategyResult } from './strategyResult';

export class StrategyInsights {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public async execute(): Promise<StrategyResult> {
    try {
      const result = await this.strategy.run();
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}