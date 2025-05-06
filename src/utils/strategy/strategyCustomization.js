/**
 * Helper function to customize strategy title
 */
export function customizeTitle(baseTitle, industryContext, primaryGoal) {
    if (!industryContext && !primaryGoal)
        return baseTitle;
    let title = baseTitle;
    if (primaryGoal) {
        const goalPrefix = {
            Growth: "Growth-Oriented",
            Profitability: "Profit-Focused",
            Innovation: "Innovation-Driven",
            Stability: "Sustainability-Centered",
        }[primaryGoal];
        title = `${goalPrefix} ${title}`;
    }
    if (industryContext) {
        title = `${title} for ${industryContext}`;
    }
    return title;
}
/**
 * Helper function to customize strategy description
 */
export function customizeDescription(baseDescription, industryContext, companySize) {
    let description = baseDescription;
    if (industryContext) {
        description += ` Specifically tailored for the ${industryContext} industry.`;
    }
    if (companySize) {
        const sizeContext = {
            Startup: "early-stage companies looking to establish market presence",
            Small: "small businesses seeking sustainable growth",
            Medium: "mid-sized organizations aiming to scale operations",
            Enterprise: "established enterprises focusing on maintaining competitive advantage",
        }[companySize];
        description += ` Optimized for ${sizeContext}.`;
    }
    return description;
}
/**
 * Helper function to customize ROI expectations
 */
export function customizeROI(baseROI, companySize) {
    if (!companySize)
        return baseROI;
    // Adjust ROI expectations based on company size
    switch (companySize) {
        case "Startup":
            return baseROI.replace(/\d+%/g, (match) => {
                const num = parseInt(match);
                return `${num + 10}%`;
            });
        case "Small":
            return baseROI;
        case "Medium":
            return baseROI.replace(/(\d+)-(\d+)%/g, (_, min, max) => {
                return `${parseInt(min) - 5}-${parseInt(max)}%`;
            });
        case "Enterprise":
            return baseROI.replace(/(\d+)-(\d+)%/g, (_, min, max) => {
                return `${parseInt(min) - 10}-${parseInt(max) - 5}%`;
            });
        default:
            return baseROI;
    }
}
/**
 * Helper function to customize metrics based on industry
 */
export function customizeMetrics(baseMetrics, industryContext) {
    if (!industryContext)
        return baseMetrics;
    // Add industry-specific metrics
    const industryMetrics = {
        Technology: "Increased user engagement by 25%",
        Healthcare: "Improved patient outcomes by 15%",
        Retail: "Enhanced customer lifetime value by 20%",
        Manufacturing: "Reduced production defects by 30%",
        Finance: "Decreased risk exposure by 25%",
        Education: "Improved learning outcomes by 20%",
    };
    const metrics = [...baseMetrics];
    // Add industry-specific metric if available
    Object.keys(industryMetrics).forEach((industry) => {
        if (industryContext.toLowerCase().includes(industry.toLowerCase())) {
            metrics.push(industryMetrics[industry]);
        }
    });
    // If no specific industry match, add a generic one
    if (metrics.length === baseMetrics.length) {
        metrics.push(`Achieved industry-specific benchmarks for ${industryContext}`);
    }
    return metrics;
}
