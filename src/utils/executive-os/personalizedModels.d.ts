/**
 * Personalized Cognitive Boosts and Mental Models for AI Executives
 */
export interface CognitiveBoost {
  name: string;
  description: string;
  application: string;
}
export interface MentalModel {
  name: string;
  description: string;
  application: string;
}
export declare const ceoCognitiveBoosts: Record<string, CognitiveBoost>;
export declare const cfoCognitiveBoosts: Record<string, CognitiveBoost>;
export declare const techCognitiveBoosts: Record<string, CognitiveBoost>;
export declare const cmoCognitiveBoosts: Record<string, CognitiveBoost>;
export declare const salesCognitiveBoosts: Record<string, CognitiveBoost>;
export declare const cooCognitiveBoosts: Record<string, CognitiveBoost>;
export declare const strategyCognitiveBoosts: Record<string, CognitiveBoost>;
export declare const additionalMentalModels: Record<string, MentalModel>;
export declare const executiveEnhancements: Record<
  string,
  {
    boost: CognitiveBoost;
    model: MentalModel;
  }
>;
export declare const getExecutiveEnhancements: (executiveName: string) => {
  boost: CognitiveBoost;
  model: MentalModel;
};
