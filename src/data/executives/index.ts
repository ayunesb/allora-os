
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

export const allExecutives: Record<string, ExecutivePersona> = {
  'ceo': chiefExecutiveOfficer,
  'cfo': chiefFinancialOfficer,
  'cmo': chiefMarketingOfficer,
  'coo': chiefOperationsOfficer,
  'cpo': chiefProductOfficer,
  'cso': chiefSalesOfficer,
  'cto': chiefTechnologyOfficer,
  'cdo': chiefDataOfficer,
  'cro': chiefRiskOfficer
};

export const executivesList: ExecutivePersona[] = Object.values(allExecutives);

export const getExecutiveById = (id: string): ExecutivePersona | undefined => {
  return allExecutives[id] || executivesList.find(exec => exec.id === id);
};

export {
  chiefExecutiveOfficer,
  chiefFinancialOfficer,
  chiefMarketingOfficer,
  chiefOperationsOfficer,
  chiefProductOfficer,
  chiefSalesOfficer,
  chiefTechnologyOfficer,
  chiefDataOfficer,
  chiefRiskOfficer
};
