
import { ExecutivePersona } from '@/types/executives';
import { chiefExecutiveOfficer } from './chiefExecutiveOfficer';
import { chiefFinancialOfficer } from './chiefFinancialOfficer';
import { chiefMarketingOfficer } from './chiefMarketingOfficer';
import { chiefOperationsOfficer } from './chiefOperationsOfficer';
import { chiefProductOfficer } from './chiefProductOfficer';
import { chiefSalesOfficer } from './chiefSalesOfficer';
import { chiefTechnologyOfficer } from './chiefTechnologyOfficer';
import { chiefDataOfficer } from './chiefDataOfficer';
import { chiefRiskOfficer } from './chiefRiskOfficer';

export const executiveTeam: ExecutivePersona[] = [
  chiefExecutiveOfficer,
  chiefFinancialOfficer,
  chiefMarketingOfficer,
  chiefOperationsOfficer,
  chiefProductOfficer,
  chiefSalesOfficer,
  chiefTechnologyOfficer,
  chiefDataOfficer,
  chiefRiskOfficer
];

// Helper function to get an executive by ID
export function getExecutiveById(id: string): ExecutivePersona | undefined {
  return executiveTeam.find(exec => exec.id === id);
}

// Helper function to get an executive by title
export function getExecutiveByTitle(title: string): ExecutivePersona | undefined {
  return executiveTeam.find(exec => 
    exec.title.toLowerCase() === title.toLowerCase() || 
    exec.shortTitle.toLowerCase() === title.toLowerCase()
  );
}
