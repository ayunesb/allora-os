
export type RiskAssessmentInput = {
  ambition: number; // 1-5
  budget: number; // 1-5
  timeframe: number; // 1-5
};

export const assessRiskLevel = (answers: RiskAssessmentInput): 'Low' | 'Medium' | 'High' => {
  const score = answers.ambition + answers.budget + answers.timeframe;

  if (score <= 6) return 'Low';
  if (score <= 10) return 'Medium';
  return 'High';
};
