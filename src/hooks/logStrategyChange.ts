export async function logStrategyChange(strategyId: string, changes: any, version: number) {
  await fetch('/api/logStrategyVersion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ strategy_id: strategyId, changes, version }),
  });
}
