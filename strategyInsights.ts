import { Strategy } from './strategy';
import { StrategyResult } from './strategyResult';

export class StrategyInsights {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public async execute(): Promise<StrategyResult> {
    try {
      const riskLevel = (this.strategy as any)?.riskLevel ?? (this.strategy as any)?.risk_level ?? 'Medium';
      const result = await this.strategy.run();
      return { success: true, data: result, riskLevel };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}