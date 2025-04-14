
interface TranslationKeys {
  digitalTwin: {
    title: string;
    description: string;
    loading: string;
  }
}

export const translations: Record<string, TranslationKeys> = {
  en: {
    digitalTwin: {
      title: "Digital Twin Dashboard",
      description: "3D visualization of your company's key performance indicators",
      loading: "Loading Digital Twin..."
    }
  },
  es: {
    digitalTwin: {
      title: "Panel de Gemelo Digital",
      description: "Visualización 3D de los indicadores clave de rendimiento de su empresa",
      loading: "Cargando Gemelo Digital..."
    }
  },
  fr: {
    digitalTwin: {
      title: "Tableau de Bord du Jumeau Numérique",
      description: "Visualisation 3D des indicateurs clés de performance de votre entreprise",
      loading: "Chargement du Jumeau Numérique..."
    }
  }
};

export function getTranslation(language: string): TranslationKeys {
  return translations[language] || translations.en;
}
