import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import * as Sections from "./sections";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
export default function CompanyDetailsSurvey({ companyDetails, updateCompanyDetails, error, onNext, }) {
    // State to control the open accordion items
    const [openSections, setOpenSections] = useState(["fundamentals"]);
    // Generic handler for updating string fields
    const handleTextChange = (field, value) => {
        updateCompanyDetails(Object.assign(Object.assign({}, companyDetails), { [field]: value }));
    };
    // Function to handle array updates
    const [newItem, setNewItem] = useState({});
    const addToArray = (field) => {
        if (!newItem[field] || newItem[field].trim() === "")
            return;
        const currentArray = companyDetails[field] || [];
        updateCompanyDetails(Object.assign(Object.assign({}, companyDetails), { [field]: [...currentArray, newItem[field]] }));
        // Clear the input
        setNewItem(Object.assign(Object.assign({}, newItem), { [field]: "" }));
    };
    const removeFromArray = (field, index) => {
        const currentArray = companyDetails[field] || [];
        const newArray = [...currentArray];
        newArray.splice(index, 1);
        updateCompanyDetails(Object.assign(Object.assign({}, companyDetails), { [field]: newArray }));
    };
    const handleNumberChange = (field, value) => {
        const numValue = value === "" ? undefined : parseInt(value, 10);
        if (!isNaN(numValue) || value === "") {
            updateCompanyDetails(Object.assign(Object.assign({}, companyDetails), { [field]: numValue }));
        }
    };
    const handleSaveAndContinue = () => {
        if (onNext) {
            onNext();
        }
    };
    // Array with the order of sections
    const sectionOrder = [
        "fundamentals",
        "market",
        "growth",
        "product",
        "team",
        "marketing",
        "ai",
        "financial",
        "goals",
        "special",
    ];
    // Function to navigate to the next section
    const navigateToNextSection = (section) => {
        if (!section)
            return;
        const currentIndex = sectionOrder.indexOf(section);
        if (currentIndex < sectionOrder.length - 1) {
            const nextSection = sectionOrder[currentIndex + 1];
            setOpenSections([nextSection]);
            // Scroll to the next section
            setTimeout(() => {
                const element = document.querySelector(`[data-value="${nextSection}"]`);
                element === null || element === void 0 ? void 0 : element.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
        else {
            // If we're at the last section, call the onNext prop
            if (onNext) {
                onNext();
            }
        }
    };
    // Common props for all section components
    const sectionProps = {
        companyDetails,
        updateCompanyDetails,
        newItem,
        setNewItem,
        addToArray,
        removeFromArray,
        handleTextChange,
        handleNumberChange,
        onNext: navigateToNextSection,
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "text-lg font-medium", children: "Company Details Survey" }), _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Fill in the details below to help our AI better understand your business. The more information you provide, the more tailored our insights will be." }), _jsxs(Accordion, { type: "multiple", className: "w-full", value: openSections, onValueChange: setOpenSections, children: [_jsx(Sections.CompanyFundamentals, Object.assign({}, sectionProps)), _jsx(Sections.MarketAnalysis, Object.assign({}, sectionProps)), _jsx(Sections.GrowthTraction, Object.assign({}, sectionProps)), _jsx(Sections.ProductTechnology, Object.assign({}, sectionProps)), _jsx(Sections.TeamLeadership, Object.assign({}, sectionProps)), _jsx(Sections.MarketingSales, Object.assign({}, sectionProps)), _jsx(Sections.AiReadiness, Object.assign({}, sectionProps)), _jsx(Sections.FinancialOverview, Object.assign({}, sectionProps)), _jsx(Sections.StrategicGoals, Object.assign({}, sectionProps)), _jsx(Sections.SpecialInfo, Object.assign({}, sectionProps))] }), _jsxs("div", { className: "flex justify-between items-center mt-6", children: [_jsx("div", { className: "text-sm text-muted-foreground italic", children: _jsx("p", { children: "* You can continue with basic information only and update these details later." }) }), _jsxs(Button, { onClick: handleSaveAndContinue, className: "gap-2", children: ["Save & Continue", _jsx(ArrowRight, { className: "h-4 w-4" })] })] })] }));
}
export { CompanyDetailsSurvey };
