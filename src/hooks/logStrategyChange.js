export async function logStrategyChange(strategyId, changes, version) {
    await fetch('/api/logStrategyVersion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ strategy_id: strategyId, changes, version }),
    });
}
