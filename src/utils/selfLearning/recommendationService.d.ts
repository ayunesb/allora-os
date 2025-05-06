/**
 * Get personalized recommendations based on user behavior
 */
export declare function getPersonalizedRecommendations(
  userId: string,
): Promise<{
  strategies: {
    id: string;
    title: string;
    description: string;
    executiveBot: {
      name: string;
      role: string;
      weight: number;
    };
    confidence: number;
  }[];
  executives: {
    name: string;
    role: string;
    weight: number;
  }[];
  topics: {
    id: string;
    title: string;
    relevance: number;
    executiveBot: {
      name: string;
      role: string;
      weight: number;
    };
  }[];
}>;
