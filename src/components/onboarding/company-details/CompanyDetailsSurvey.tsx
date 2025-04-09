
import { useState } from "react";
import { PartialCompanyDetails } from "@/models/companyDetails";
import { 
  Accordion,
} from "@/components/ui/accordion";
import * as Sections from './sections';

type CompanyDetailsSurveyProps = {
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
  error?: string;
}

export default function CompanyDetailsSurvey({ 
  companyDetails, 
  updateCompanyDetails,
  error 
}: CompanyDetailsSurveyProps) {
  
  // Generic handler for updating string fields
  const handleTextChange = (field: keyof PartialCompanyDetails, value: string) => {
    updateCompanyDetails({ ...companyDetails, [field]: value });
  };

  // Function to handle array updates
  const [newItem, setNewItem] = useState<{ [key: string]: string }>({});
  
  const addToArray = (field: keyof PartialCompanyDetails) => {
    if (!newItem[field] || newItem[field].trim() === '') return;
    
    const currentArray = companyDetails[field] as string[] || [];
    updateCompanyDetails({ 
      ...companyDetails, 
      [field]: [...currentArray, newItem[field]] 
    });
    
    // Clear the input
    setNewItem({ ...newItem, [field]: '' });
  };
  
  const removeFromArray = (field: keyof PartialCompanyDetails, index: number) => {
    const currentArray = companyDetails[field] as string[] || [];
    const newArray = [...currentArray];
    newArray.splice(index, 1);
    
    updateCompanyDetails({ ...companyDetails, [field]: newArray });
  };

  const handleNumberChange = (field: keyof PartialCompanyDetails, value: string) => {
    const numValue = value === '' ? undefined : parseInt(value, 10);
    if (!isNaN(numValue as number) || value === '') {
      updateCompanyDetails({ ...companyDetails, [field]: numValue });
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
    handleNumberChange
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Company Details Survey</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Fill in the details below to help our AI better understand your business.
        The more information you provide, the more tailored our insights will be.
      </p>
      
      <Accordion type="multiple" className="w-full">
        <Sections.CompanyFundamentals {...sectionProps} />
        <Sections.MarketAnalysis {...sectionProps} />
        <Sections.GrowthTraction {...sectionProps} />
        <Sections.ProductTechnology {...sectionProps} />
        <Sections.TeamLeadership {...sectionProps} />
        <Sections.MarketingSales {...sectionProps} />
        <Sections.AiReadiness {...sectionProps} />
        <Sections.FinancialOverview {...sectionProps} />
        <Sections.StrategicGoals {...sectionProps} />
        <Sections.SpecialInfo {...sectionProps} />
      </Accordion>
      
      <div className="text-sm text-muted-foreground italic mt-4">
        <p>* You can continue with basic information only and update these details later.</p>
      </div>
    </div>
  );
}

export { CompanyDetailsSurvey };
