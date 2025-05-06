/**
 * Get user learning insights based on their interaction history
 */
export declare function getLearningInsights(userId: string): Promise<
  {
    title: string;
    value: string;
    description: string;
  }[]
>;
