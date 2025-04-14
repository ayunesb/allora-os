
interface TranslationKeys {
  digitalTwin: {
    title: string;
    description: string;
    loading: string;
    tooltip?: string;
  }
}

export const translations: Record<string, TranslationKeys> = {
  en: {
    digitalTwin: {
      title: "Digital Twin Dashboard",
      description: "3D visualization of your company's key performance indicators",
      loading: "Loading Digital Twin...",
      tooltip: "Hover over spheres to see detailed KPI information. Drag to rotate, scroll to zoom."
    }
  },
  es: {
    digitalTwin: {
      title: "Panel de Gemelo Digital",
      description: "Visualización 3D de los indicadores clave de rendimiento de su empresa",
      loading: "Cargando Gemelo Digital...",
      tooltip: "Pase el cursor sobre las esferas para ver información detallada del KPI. Arrastre para rotar, desplácese para hacer zoom."
    }
  },
  fr: {
    digitalTwin: {
      title: "Tableau de Bord du Jumeau Numérique",
      description: "Visualisation 3D des indicateurs clés de performance de votre entreprise",
      loading: "Chargement du Jumeau Numérique...",
      tooltip: "Survolez les sphères pour voir les informations détaillées des KPI. Faites glisser pour pivoter, défilez pour zoomer."
    }
  }
};

export function getTranslation(language: string): TranslationKeys {
  return translations[language] || translations.en;
}
