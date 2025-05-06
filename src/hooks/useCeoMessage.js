var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect } from "react";
import { toast } from "sonner";
export function useCeoMessage(riskAppetite, industry, companyName) {
    const [message, setMessage] = useState({
        greeting: "",
        strategicOverview: "",
        tags: [],
        actionSteps: "",
        closingStatement: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const generateMessage = () => __awaiter(this, void 0, void 0, function* () {
            setIsLoading(true);
            try {
                // In a real application, this would call an API endpoint
                // For this demo, we'll generate the message client-side
                setTimeout(() => {
                    const companyNameSafe = companyName || "Your Company";
                    const industrySafe = industry || "Technology";
                    // Customize message based on risk appetite
                    let generatedMessage;
                    if (riskAppetite === "high") {
                        generatedMessage = {
                            greeting: `Team ${companyNameSafe},`,
                            strategicOverview: `I've reviewed our current position in the ${industrySafe} market, and I see tremendous opportunities for ambitious growth. The competitive landscape is shifting rapidly, and we need to position ourselves for accelerated expansion. Our disruptive approach will allow us to capture significant market share if we move decisively now.`,
                            tags: [
                                "Disruptive Innovation",
                                "First-Mover Advantage",
                                "Accelerated Growth",
                                "Market Leadership",
                            ],
                            actionSteps: `I recommend we immediately allocate resources to our most innovative product lines, pursue key strategic acquisitions, and aggressively enter emerging markets. Let's schedule a strategic planning session to map out our ambitious growth trajectory for the next quarter.`,
                            closingStatement: `The biggest risk is not taking enough risk. Let's think big and execute with precision. The future belongs to the bold.`,
                        };
                    }
                    else if (riskAppetite === "medium") {
                        generatedMessage = {
                            greeting: `Dear ${companyNameSafe} Team,`,
                            strategicOverview: `After analyzing our market position and industry trends in ${industrySafe}, I believe we're well-positioned for balanced growth. We have several promising opportunities that combine reasonable risk with attractive upside potential. Our approach should balance innovation with operational excellence.`,
                            tags: [
                                "Strategic Growth",
                                "Balanced Portfolio",
                                "Calculated Risks",
                                "Market Expansion",
                            ],
                            actionSteps: `I suggest we focus on optimizing our core products while gradually expanding into adjacent markets. Let's also invest in R&D for future innovations, but with clear milestones and evaluation points to manage our risk exposure.`,
                            closingStatement: `By balancing ambition with prudence, we'll build a resilient and growing business for the long term. I look forward to our continued success together.`,
                        };
                    }
                    else {
                        generatedMessage = {
                            greeting: `Dear Valued ${companyNameSafe} Team,`,
                            strategicOverview: `I've carefully assessed our position within the ${industrySafe} industry, and believe we should focus on stability and sustainable growth. Current market uncertainties require a cautious approach that preserves our core strengths while making measured improvements to our product and service offerings.`,
                            tags: [
                                "Steady Growth",
                                "Risk Mitigation",
                                "Operational Excellence",
                                "Customer Retention",
                            ],
                            actionSteps: `My recommendation is to prioritize enhancing our existing product lines, focus on increasing customer retention, and improve operational efficiencies. Let's also build our cash reserves while looking for low-risk expansion opportunities.`,
                            closingStatement: `Consistent, careful progress is the path to enduring success. Let's continue building our foundation for stable long-term growth.`,
                        };
                    }
                    setMessage(generatedMessage);
                    setIsLoading(false);
                }, 1000);
            }
            catch (error) {
                console.error("Error generating CEO message:", error);
                toast.error("Failed to generate CEO message");
                setIsLoading(false);
            }
        });
        generateMessage();
    }, [riskAppetite, industry, companyName]);
    return { message, isLoading };
}
