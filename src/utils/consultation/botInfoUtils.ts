
import { executiveBots } from '@/backend/executiveBots';
import { formatRoleTitle, getBotExpertise } from './botRoleUtils';

export function getBotByNameAndRole(name: string, role: string) {
  // Validate that this bot exists in our roster
  const roleExists = Object.keys(executiveBots).includes(role);
  const nameExists = roleExists && executiveBots[role as keyof typeof executiveBots].includes(name);
  
  if (!nameExists) {
    return null;
  }
  
  return {
    name,
    role,
    title: formatRoleTitle(role),
    expertise: getBotExpertise(role)
  };
}
