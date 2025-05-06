import { useState, useEffect, useCallback } from "react";
import { executiveBots } from "@/backend/executiveBots";
import { formatRoleTitle } from "@/utils/consultation";
export function useExecutiveBoard() {
    const [executives, setExecutives] = useState([]);
    const [filteredExecutives, setFilteredExecutives] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [riskFilter, setRiskFilter] = useState("all");
    // Generate extended executive bots with more metadata
    useEffect(() => {
        const allBots = Object.entries(executiveBots).flatMap(([role, names]) => names.map((name, index) => {
            // Custom specializations based on the AI system documentation
            let specialization = [];
            let optimization = "";
            let riskAppetite = "Medium";
            // Assign specializations based on documented data
            switch (name) {
                case "Elon Musk":
                    specialization = [
                        "Disruptive innovation",
                        "AI/space",
                        "Sustainability",
                    ];
                    optimization = "Pushes high-risk bold strategies";
                    riskAppetite = "High";
                    break;
                case "Jeff Bezos":
                    specialization = ["Customer obsession", "Data-driven scaling"];
                    optimization =
                        "Focused on operational excellence + customer retention";
                    riskAppetite = "Medium";
                    break;
                case "Satya Nadella":
                    specialization = ["Digital transformation", "Cloud leadership"];
                    optimization = "Automates and enhances enterprise processes";
                    riskAppetite = "Medium";
                    break;
                case "Tim Cook":
                    specialization = ["Operational excellence", "Product scaling"];
                    optimization = "Optimizes logistics, manufacturing, supply chain";
                    riskAppetite = "Low";
                    break;
                case "Sheryl Sandberg":
                    specialization = ["Scaling operations", "Team growth"];
                    optimization = "Scales internal processes and collaboration";
                    riskAppetite = "Medium";
                    break;
                case "Gwynne Shotwell":
                    specialization = ["Aerospace project scaling"];
                    optimization = "Risk management for tech innovation launches";
                    riskAppetite = "High";
                    break;
                case "Warren Buffett":
                    specialization = [
                        "Investment strategy",
                        "Value assessment",
                        "Risk management",
                    ];
                    optimization =
                        "Allocates capital efficiently based on long-term value";
                    riskAppetite = "Low";
                    break;
                case "Ruth Porat":
                    specialization = ["Financial modeling", "Risk management"];
                    optimization = "Allocates budgets efficiently based on KPIs";
                    riskAppetite = "Low";
                    break;
                case "Clayton Christensen":
                    specialization = ["Disruptive innovation", "Market analysis"];
                    optimization = "Detects early market disruptors";
                    riskAppetite = "High";
                    break;
                case "Reed Hastings":
                    specialization = ["Streaming and content", "Subscription models"];
                    optimization = "Optimizes recurring digital revenue";
                    riskAppetite = "Medium";
                    break;
                case "Marc Benioff":
                    specialization = ["CRM", "Sales automation", "Cloud strategy"];
                    optimization = "Sales cycle optimization";
                    riskAppetite = "Medium";
                    break;
                default:
                    specialization = ["Business strategy", "Leadership"];
                    optimization = "Balanced approach to business challenges";
                    riskAppetite = "Medium";
            }
            return {
                id: `exec-${role}-${index}`,
                name,
                role,
                title: formatRoleTitle(role),
                specialization,
                optimization,
                avatar: `/avatars/${name.toLowerCase().replace(/\s+/g, "-")}.jpg`,
                riskAppetite,
            };
        }));
        setExecutives(allBots);
        setFilteredExecutives(allBots);
    }, []);
    // Filter executives based on search, role, and risk
    useEffect(() => {
        const filtered = executives.filter((exec) => {
            const matchesSearch = exec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exec.specialization.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
                exec.optimization.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = roleFilter === "all" || exec.role === roleFilter;
            const matchesRisk = riskFilter === "all" || exec.riskAppetite === riskFilter;
            return matchesSearch && matchesRole && matchesRisk;
        });
        setFilteredExecutives(filtered);
    }, [searchQuery, roleFilter, riskFilter, executives]);
    // Get executives by role
    const getExecutivesByRole = useCallback((role) => {
        return executives.filter((exec) => exec.role === role);
    }, [executives]);
    // Get executives by risk appetite
    const getExecutivesByRisk = useCallback((risk) => {
        return executives.filter((exec) => exec.riskAppetite === risk);
    }, [executives]);
    return {
        executives,
        filteredExecutives,
        searchQuery,
        setSearchQuery,
        roleFilter,
        setRoleFilter,
        riskFilter,
        setRiskFilter,
        getExecutivesByRole,
        getExecutivesByRisk,
    };
}
