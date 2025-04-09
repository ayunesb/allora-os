
import { executiveBots } from '../executiveBots';
import { formatRoleTitle, getBotExpertise } from '@/utils/consultation';
import { DebateParticipant } from '@/utils/consultation/types';

// Initialize debate participants from executive bots
export const getInitialParticipants = (count: number = 4): DebateParticipant[] => {
  return Object.entries(executiveBots)
    .slice(0, count) // Start with top roles
    .map(([role, names], index) => ({
      id: `bot-${index + 1}`,
      name: names[0], // Take first name from each role
      role,
      title: formatRoleTitle(role),
      specialty: getBotExpertise(role),
      avatar: `/avatars/${names[0].toLowerCase().replace(/\s+/g, '-')}.png`
    }));
};
