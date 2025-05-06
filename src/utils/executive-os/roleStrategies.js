// Default strategic focuses for various executive roles
export const defaultStrategicFocuses = {
    ceo: "Aligning company vision with market opportunities",
    cfo: "Optimizing capital allocation for growth and stability",
    cmo: "Enhancing brand positioning and customer acquisition channels",
    cio: "Accelerating digital transformation initiatives",
    cto: "Developing technological competitive advantages",
    chro: "Building high-performance organizational culture",
    strategy: "Identifying new market opportunities and competitive advantages",
    sales: "Optimizing sales pipeline and conversion processes",
    operations: "Streamlining operational efficiency and scalability",
};
/**
 * Determines the strategic focus based on the executive's role
 */
export function determineStrategicFocus(role) {
    const roleLower = role.toLowerCase();
    let strategicFocus = "Optimizing business performance and innovation";
    for (const [roleKey, focus] of Object.entries(defaultStrategicFocuses)) {
        if (roleLower.includes(roleKey)) {
            strategicFocus = focus;
            break;
        }
    }
    return strategicFocus;
}
