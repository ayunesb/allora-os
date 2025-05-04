import { useState, useEffect } from 'react';
import { getInitialParticipants } from '@/backend/debate';
import { executiveBots } from '@/backend/executiveBots';
// Executive profiles with expertise areas and backgrounds
const executiveProfiles = {
    'Elon Musk': {
        role: 'CEO',
        expertise: ['Innovation', 'Product Development', 'Risk-Taking'],
        background: 'Founded Tesla, SpaceX, and multiple cutting-edge companies',
        avatar: '/avatars/elon.jpg'
    },
    'Jeff Bezos': {
        role: 'CEO',
        expertise: ['Scaling', 'Customer Obsession', 'Long-term Thinking'],
        background: 'Founded Amazon, revolutionized e-commerce and cloud computing',
        avatar: '/avatars/bezos.jpg'
    },
    'Satya Nadella': {
        role: 'CEO',
        expertise: ['Digital Transformation', 'Cloud Strategy', 'Corporate Culture'],
        background: 'Transformed Microsoft into a cloud-first company, driving massive growth',
        avatar: '/avatars/nadella.jpg'
    },
    'Warren Buffett': {
        role: 'CFO',
        expertise: ['Investment Strategy', 'Value Assessment', 'Risk Management'],
        background: 'Legendary investor and CEO of Berkshire Hathaway',
        avatar: '/avatars/buffett.jpg'
    },
    'Sheryl Sandberg': {
        role: 'COO',
        expertise: ['Operations', 'Team Building', 'Scaling Organizations'],
        background: 'Former COO of Facebook/Meta, helped grow it into a global giant',
        avatar: '/avatars/sandberg.jpg'
    }
};
export default function useDebateParticipants() {
    const [participants, setParticipants] = useState([]);
    const [availableExecutives, setAvailableExecutives] = useState([]);
    // Get all available executives for selection
    useEffect(() => {
        const allExecutives = [];
        // Combine all executive bots from different categories
        for (const [role, names] of Object.entries(executiveBots)) {
            names.forEach(name => {
                if (executiveProfiles[name]) {
                    allExecutives.push({
                        id: `exec-${name.toLowerCase().replace(/\s+/g, '-')}`,
                        name: name,
                        role: executiveProfiles[name].role || role.toUpperCase().replace('_', ' '),
                        expertise: executiveProfiles[name].expertise || [],
                        background: executiveProfiles[name].background || '',
                        avatar: executiveProfiles[name].avatar || '/avatars/default.jpg'
                    });
                }
            });
        }
        setAvailableExecutives(allExecutives);
    }, []);
    // Initialize participants from executive bots
    useEffect(() => {
        const initialParticipants = getInitialParticipants(4);
        // Enhance participants with additional information if available
        const enhancedParticipants = initialParticipants.map(participant => {
            const executiveInfo = executiveProfiles[participant.name];
            if (executiveInfo) {
                return {
                    ...participant,
                    expertise: executiveInfo.expertise || [],
                    background: executiveInfo.background || '',
                    avatar: executiveInfo.avatar || '/avatars/default.jpg'
                };
            }
            return participant;
        });
        setParticipants(enhancedParticipants);
    }, []);
    return {
        participants,
        setParticipants,
        availableExecutives
    };
}
