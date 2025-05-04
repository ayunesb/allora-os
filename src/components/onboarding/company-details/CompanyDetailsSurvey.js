import { useState } from "react";
import { Accordion, } from "@/components/ui/accordion";
import * as Sections from './sections';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
export default function CompanyDetailsSurvey({ companyDetails, updateCompanyDetails, error, onNext }) {
    // State to control the open accordion items
    const [openSections, setOpenSections] = useState(['fundamentals']);
    // Generic handler for updating string fields
    const handleTextChange = (field, value) => {
        updateCompanyDetails({ ...companyDetails, [field]: value });
    };
    // Function to handle array updates
    const [newItem, setNewItem] = useState({});
    const addToArray = (field) => {
        if (!newItem[field] || newItem[field].trim() === '')
            return;
        const currentArray = companyDetails[field] || [];
        updateCompanyDetails({
            ...companyDetails,
            [field]: [...currentArray, newItem[field]]
        });
        // Clear the input
        setNewItem({ ...newItem, [field]: '' });
    };
    const removeFromArray = (field, index) => {
        const currentArray = companyDetails[field] || [];
        const newArray = [...currentArray];
        newArray.splice(index, 1);
        updateCompanyDetails({ ...companyDetails, [field]: newArray });
    };
    const handleNumberChange = (field, value) => {
        const numValue = value === '' ? undefined : parseInt(value, 10);
        if (!isNaN(numValue) || value === '') {
            updateCompanyDetails({ ...companyDetails, [field]: numValue });
        }
    };
    const handleSaveAndContinue = () => {
        if (onNext) {
            onNext();
        }
    };
    // Array with the order of sections
    const sectionOrder = [
        'fundamentals',
        'market',
        'growth',
        'product',
        'team',
        'marketing',
        'ai',
        'financial',
        'goals',
        'special'
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
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        onNext: navigateToNextSection
    };
    return (<div className="space-y-6">
      <h3 className="text-lg font-medium">Company Details Survey</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Fill in the details below to help our AI better understand your business.
        The more information you provide, the more tailored our insights will be.
      </p>
      
      <Accordion type="multiple" className="w-full" value={openSections} onValueChange={setOpenSections}>
        <Sections.CompanyFundamentals {...sectionProps}/>
        <Sections.MarketAnalysis {...sectionProps}/>
        <Sections.GrowthTraction {...sectionProps}/>
        <Sections.ProductTechnology {...sectionProps}/>
        <Sections.TeamLeadership {...sectionProps}/>
        <Sections.MarketingSales {...sectionProps}/>
        <Sections.AiReadiness {...sectionProps}/>
        <Sections.FinancialOverview {...sectionProps}/>
        <Sections.StrategicGoals {...sectionProps}/>
        <Sections.SpecialInfo {...sectionProps}/>
      </Accordion>
      
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-muted-foreground italic">
          <p>* You can continue with basic information only and update these details later.</p>
        </div>
        
        <Button onClick={handleSaveAndContinue} className="gap-2">
          Save & Continue
          <ArrowRight className="h-4 w-4"/>
        </Button>
      </div>
    </div>);
}
export { CompanyDetailsSurvey };
