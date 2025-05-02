
export interface ExecutivePersona {
  id: string;
  name: string;
  title: string;
  shortTitle: string;
  avatar: string;
  color: string;
  introduction: string;
  expertise: string[];
  leadership: {
    style: string;
    strengths: string;
    philosophy: string;
  };
  background: {
    education: string;
    experience: string;
  };
  approach: string;
  communicationStyle: string;
  questionExamples: string[];
}

export interface ExecutiveMessagesProps {
  executiveName: string;
  executiveRole?: string;
  avatarUrl?: string;
  executive?: {
    name: string;
    role: string;
    avatarUrl: string;
  };
}
