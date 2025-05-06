export const translations = {
    en: {
        digitalTwin: {
            title: "Digital Twin Dashboard",
            description: "3D visualization of your company's key performance indicators",
            loading: "Loading Digital Twin...",
            tooltip: "Hover over spheres to see detailed KPI information. Drag to rotate, scroll to zoom.",
            refresh: "Refresh Data",
            refreshing: "Refreshing...",
            refreshSuccess: "Data refreshed successfully",
            refreshDescription: "Latest KPI data has been loaded",
            performanceTip: "Higher FPS means smoother visualization",
            visualizationTitle: "Real-time KPI Visualization",
        },
    },
    es: {
        digitalTwin: {
            title: "Panel de Gemelo Digital",
            description: "Visualización 3D de los indicadores clave de rendimiento de su empresa",
            loading: "Cargando Gemelo Digital...",
            tooltip: "Pase el cursor sobre las esferas para ver información detallada del KPI. Arrastre para rotar, desplácese para hacer zoom.",
            refresh: "Actualizar Datos",
            refreshing: "Actualizando...",
            refreshSuccess: "Datos actualizados con éxito",
            refreshDescription: "Se han cargado los datos más recientes de los KPI",
            performanceTip: "Mayor FPS significa una visualización más fluida",
            visualizationTitle: "Visualización de KPI en tiempo real",
        },
    },
    fr: {
        digitalTwin: {
            title: "Tableau de Bord du Jumeau Numérique",
            description: "Visualisation 3D des indicateurs clés de performance de votre entreprise",
            loading: "Chargement du Jumeau Numérique...",
            tooltip: "Survolez les sphères pour voir les informations détaillées des KPI. Faites glisser pour pivoter, défilez pour zoomer.",
            refresh: "Actualiser les données",
            refreshing: "Actualisation...",
            refreshSuccess: "Données actualisées avec succès",
            refreshDescription: "Les dernières données KPI ont été chargées",
            performanceTip: "Un FPS plus élevé signifie une visualisation plus fluide",
            visualizationTitle: "Visualisation des KPI en temps réel",
        },
    },
};
export function getTranslation(language) {
    return translations[language] || translations.en;
}
