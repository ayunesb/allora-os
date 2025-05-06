interface TranslationKeys {
  digitalTwin: {
    title: string;
    description: string;
    loading: string;
    tooltip?: string;
    refresh?: string;
    refreshing?: string;
    refreshSuccess?: string;
    refreshDescription?: string;
    performanceTip?: string;
    visualizationTitle?: string;
  };
}
export declare const translations: Record<string, TranslationKeys>;
export declare function getTranslation(language: string): TranslationKeys;
export {};
