
import { ExecutivePersona } from '@/types/executives';

export const chiefOperationsOfficer: ExecutivePersona = {
  id: 'chief-operations-officer',
  name: 'Michael Patel',
  title: 'Chief Operations Officer',
  shortTitle: 'COO',
  avatar: '/assets/avatars/coo-avatar.jpg',
  color: '#FF8C00', // Dark orange
  introduction: 'Michael Patel is the Chief Operations Officer at Allora AI, with expertise in operational efficiency, process optimization, and supply chain management.',
  expertise: [
    'Operational Efficiency',
    'Process Optimization',
    'Supply Chain Management',
    'Quality Management',
    'Organizational Design',
    'Project Management',
    'Business Continuity',
    'Vendor Management'
  ],
  leadership: {
    style: 'Methodical and results-driven',
    strengths: 'System optimization and continuous improvement',
    philosophy: 'Creating efficient operations that deliver consistent quality at scale'
  },
  background: {
    education: 'MBA, INSEAD Business School',
    experience: '18+ years in operations across manufacturing and technology sectors'
  },
  approach: 'I design operational systems that maximize efficiency without compromising quality. My focus is on creating scalable processes that support sustainable growth.',
  communicationStyle: 'Structured, practical, and solution-oriented',
  questionExamples: [
    'How can we optimize our operational processes?',
    'What bottlenecks are limiting our growth?',
    'How should we structure our team for maximum efficiency?',
    'What metrics should we track to monitor operational health?',
    'How can we improve our supply chain resilience?'
  ]
};
