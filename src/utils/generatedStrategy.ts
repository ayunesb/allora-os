function GeneratedStrategy(strategyData: { name: string; isActive: boolean }) {
  // Ensure the type matches the expected structure
  return {
    name: strategyData.name,
    isActive: strategyData.isActive,
  };
}
