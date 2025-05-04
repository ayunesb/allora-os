import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { executiveBots } from '@/backend/executiveBots';
import { formatRoleTitle } from '@/utils/consultation';
import { supabase } from '@/backend/supabase';
import { useUserPreferences } from './useUserPreferences';
export default function useExecutiveBoardroom() {
    const [participants, setParticipants] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isDebating, setIsDebating] = useState(false);
    const [debateTitle, setDebateTitle] = useState('');
    const [debateTopic, setDebateTopic] = useState('');
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [reactions, setReactions] = useState([]);
    const [votes, setVotes] = useState([]);
    const [debateSummary, setDebateSummary] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    const [suggestedTopic, setSuggestedTopic] = useState('');
    const { profile } = useAuth();
    const { preferences } = useUserPreferences();
    useEffect(() => {
        const defaultExecutives = [
            'Elon Musk',
            'Jeff Bezos',
            'Satya Nadella',
            'Warren Buffett',
            'Sheryl Sandberg'
        ].slice(0, 5).map((name, index) => {
            const role = Object.entries(executiveBots).find(([_, names]) => names.includes(name))?.[0] || 'ceo';
            return {
                id: `exec-${index}`,
                name,
                role,
                title: formatRoleTitle(role),
                specialty: getExecutiveSpecialty(role),
                avatar: `/avatars/${name.toLowerCase().replace(/\s+/g, '-')}.png`
            };
        });
        setParticipants(defaultExecutives);
    }, []);
    useEffect(() => {
        if (profile?.industry) {
            generateSuggestedTopic(profile.industry);
        }
    }, [profile?.industry]);
    const getExecutiveSpecialty = (role) => {
        switch (role) {
            case 'ceo': return 'Strategic Vision, Innovation, Leadership';
            case 'cfo': return 'Financial Analysis, Risk Management, Investment Strategy';
            case 'coo': return 'Operations, Process Optimization, Execution';
            case 'cmo': return 'Marketing Strategy, Brand Development, Customer Insights';
            case 'strategy': return 'Competitive Analysis, Market Positioning, Growth Strategy';
            default: return 'Business Strategy, Leadership, Innovation';
        }
    };
    const generateSuggestedTopic = async (industry) => {
        try {
            const mockTopics = {
                'Technology': [
                    'AI implementation for customer service automation',
                    'Balancing innovation with cybersecurity concerns',
                    'Web3 integration for traditional business models'
                ],
                'Finance': [
                    'Blockchain adoption in traditional banking',
                    'Fintech partnerships vs in-house development',
                    'Regulatory compliance while maintaining innovation'
                ],
                'Healthcare': [
                    'Telehealth expansion strategy',
                    'AI in medical diagnostics: opportunities and risks',
                    'Healthcare data monetization while ensuring privacy'
                ],
                'Retail': [
                    'Omnichannel integration strategy',
                    'Competing with Amazon\'s logistics advantage',
                    'Balancing brick-and-mortar with e-commerce expansion'
                ]
            };
            const topics = mockTopics[industry] || mockTopics['Technology'];
            setSuggestedTopic(topics[Math.floor(Math.random() * topics.length)]);
        }
        catch (error) {
            console.error('Error generating suggested topic:', error);
        }
    };
    const startDebate = useCallback(async (topic) => {
        if (!topic.trim()) {
            toast.error('Please provide a debate topic');
            return;
        }
        setDebateTitle(`Executive Strategy Session: ${topic}`);
        setDebateTopic(topic);
        setIsDebating(true);
        setIsLoadingMessages(true);
        setMessages([]);
        setReactions([]);
        setVotes([]);
        setDebateSummary(null);
        try {
            const { data, error } = await supabase
                .from('debates')
                .insert({
                topic,
                user_id: profile?.id,
                participants: participants.map(p => ({ name: p.name, role: p.role })),
                context: {
                    industry: profile?.industry || 'Technology',
                    riskAppetite: preferences?.riskAppetite || 'medium'
                }
            })
                .select('id')
                .single();
            if (error)
                throw error;
            setSessionId(data.id);
            const initialMessage = {
                id: `msg-${Date.now()}-system`,
                sender: 'System',
                senderId: 'system',
                content: `Executive debate on: ${topic}. Each executive will provide their strategic perspective based on their expertise and background.`,
                timestamp: new Date(),
                isUser: false,
                votes: 0,
                isFavorite: false
            };
            setMessages([initialMessage]);
            setTimeout(() => {
                simulateExecutiveResponses(topic);
            }, 1500);
        }
        catch (error) {
            console.error('Error starting debate:', error);
            toast.error('Failed to start debate. Please try again.');
            setIsDebating(false);
        }
    }, [participants, profile, preferences]);
    const simulateExecutiveResponses = async (topic) => {
        const riskAppetite = preferences?.riskAppetite || 'medium';
        const responses = [];
        try {
            for (let i = 0; i < participants.length; i++) {
                const exec = participants[i];
                await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500));
                const response = generateMockResponse(exec, topic, riskAppetite);
                responses.push({
                    id: `msg-${Date.now()}-${exec.id}`,
                    sender: exec.name,
                    senderId: exec.id,
                    content: response,
                    timestamp: new Date(),
                    isUser: false,
                    votes: 0,
                    isFavorite: false
                });
                setMessages(prev => [...prev, responses[responses.length - 1]]);
                if (Math.random() > 0.5 && i > 0) {
                    generateThoughtReaction(exec, participants[i - 1], topic);
                }
            }
            setTimeout(() => {
                simulateDebateInteractions(topic, responses);
            }, 2000);
        }
        catch (error) {
            console.error('Error simulating responses:', error);
        }
        finally {
            setIsLoadingMessages(false);
        }
    };
    const simulateDebateInteractions = async (topic, previousResponses) => {
        try {
            for (let i = 0; i < 3; i++) {
                await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
                const challengerIndex = Math.floor(Math.random() * participants.length);
                const respondentIndex = (challengerIndex + 1 + Math.floor(Math.random() * (participants.length - 1))) % participants.length;
                const challenger = participants[challengerIndex];
                const respondent = participants[respondentIndex];
                const previousMessage = previousResponses.find(m => m.senderId === respondent.id);
                if (!previousMessage)
                    continue;
                const challenge = generateMockChallenge(challenger, respondent, previousMessage.content);
                const challengeMessage = {
                    id: `msg-${Date.now()}-${challenger.id}-challenge`,
                    sender: challenger.name,
                    senderId: challenger.id,
                    content: challenge,
                    timestamp: new Date(),
                    isUser: false,
                    votes: 0,
                    isFavorite: false
                };
                setMessages(prev => [...prev, challengeMessage]);
                const observersIndices = Array.from(Array(participants.length).keys())
                    .filter(idx => idx !== challengerIndex && idx !== respondentIndex);
                if (observersIndices.length > 0) {
                    const observerIndex = observersIndices[Math.floor(Math.random() * observersIndices.length)];
                    const observer = participants[observerIndex];
                    generateThoughtReaction(challenger, observer, topic);
                }
                await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
                const response = generateMockResponse(respondent, challenge, preferences?.riskAppetite || 'medium');
                const responseMessage = {
                    id: `msg-${Date.now()}-${respondent.id}-response`,
                    sender: respondent.name,
                    senderId: respondent.id,
                    content: response,
                    timestamp: new Date(),
                    isUser: false,
                    votes: 0,
                    isFavorite: false
                };
                setMessages(prev => [...prev, responseMessage]);
            }
            setTimeout(() => {
                generateExecutiveVotes(topic);
                generateDebateSummary(topic);
            }, 3000);
        }
        catch (error) {
            console.error('Error simulating debate interactions:', error);
        }
    };
    const generateThoughtReaction = (speaker, observer, topic) => {
        const thoughts = [
            "Interesting point.",
            "Not sure I agree with that approach.",
            "This could disrupt the entire industry.",
            "Worth considering the financial implications.",
            "We should analyze the operational challenges.",
            "The market might not be ready for this.",
            "Bold strategy, but risky.",
            "This aligns with my thinking.",
            "We need more data on this.",
            "The competition is already doing this."
        ];
        const thought = thoughts[Math.floor(Math.random() * thoughts.length)];
        const reaction = {
            executiveId: observer.id,
            executiveName: observer.name,
            thought,
            timestamp: new Date()
        };
        setReactions(prev => [...prev, reaction]);
        setTimeout(() => {
            setReactions(prev => prev.filter(r => r !== reaction));
        }, 4000);
    };
    const generateExecutiveVotes = (topic) => {
        const options = {
            option_a: `Aggressive expansion into ${topic}`,
            option_b: `Cautious, phased approach to ${topic}`
        };
        const newVotes = participants.map(exec => {
            const isBold = ['ceo', 'strategy', 'cmo'].includes(exec.role);
            const isConservative = ['cfo', 'chro', 'coo'].includes(exec.role);
            const userRiskIsBold = preferences?.riskAppetite === 'high';
            const userRiskIsCautious = preferences?.riskAppetite === 'low';
            let choice;
            if (userRiskIsBold && !isConservative) {
                choice = 'option_a';
            }
            else if (userRiskIsCautious && !isBold) {
                choice = 'option_b';
            }
            else {
                choice = Math.random() < (isBold ? 0.8 : isConservative ? 0.2 : 0.5) ? 'option_a' : 'option_b';
            }
            return {
                executiveId: exec.id,
                executiveName: exec.name,
                choice,
                confidence: Math.floor(70 + Math.random() * 30),
                rationale: choice === 'option_a'
                    ? `This aligns with our growth strategy and offers significant market advantage.`
                    : `This minimizes risk while allowing us to test market response.`
            };
        });
        setVotes(newVotes);
        const votesForA = newVotes.filter(v => v.choice === 'option_a').length;
        const votesForB = newVotes.filter(v => v.choice === 'option_b').length;
        const votingMessage = {
            id: `msg-${Date.now()}-voting`,
            sender: 'System',
            senderId: 'system',
            content: `Executive vote results:
      • ${options.option_a}: ${votesForA} votes (${Math.round((votesForA / participants.length) * 100)}%)
      • ${options.option_b}: ${votesForB} votes (${Math.round((votesForB / participants.length) * 100)}%)
      
      ${votesForA > votesForB ? 'The aggressive approach wins.' :
                votesForB > votesForA ? 'The cautious approach wins.' :
                    'The vote is tied - further discussion needed.'}`,
            timestamp: new Date(),
            isUser: false,
            votes: 0,
            isFavorite: false
        };
        setMessages(prev => [...prev, votingMessage]);
    };
    const generateDebateSummary = (topic) => {
        const summary = {
            winningStrategy: votes.filter(v => v.choice === 'option_a').length >
                votes.filter(v => v.choice === 'option_b').length ?
                `Aggressive expansion into ${topic}` :
                `Cautious, phased approach to ${topic}`,
            keyDisagreements: [
                `Timeline for implementation: Some executives favor immediate action while others recommend a phased approach.`,
                `Resource allocation: Disagreement on how much to invest initially versus scaling based on results.`,
                `Risk assessment: Different perspectives on the potential downside risks and how to mitigate them.`
            ],
            alternativeIdeas: [
                `Partnership strategy instead of direct investment`,
                `Acquisition of smaller players in the space`,
                `Development of a separate innovation lab to explore the opportunity`
            ],
            safeMove: `Conduct a detailed market analysis and run a small pilot program for 3 months before committing significant resources.`,
            boldMove: `Immediately allocate 20% of R&D budget to this initiative and aim to be first-to-market with an aggressive 6-month timeline.`,
            executivePerformance: participants.reduce((acc, exec) => {
                acc[exec.id] = {
                    boldnessScore: Math.floor(50 + Math.random() * 50),
                    riskAlignment: Math.floor(70 + Math.random() * 30),
                    innovationScore: Math.floor(60 + Math.random() * 40)
                };
                return acc;
            }, {})
        };
        setDebateSummary(summary);
        const summaryMessage = {
            id: `msg-${Date.now()}-summary`,
            sender: 'System',
            senderId: 'system',
            content: `Debate Summary:
      
      Winning Strategy: ${summary.winningStrategy}
      
      Key Disagreements:
      ${summary.keyDisagreements.map(d => `• ${d}`).join('\n')}
      
      Alternative Ideas:
      ${summary.alternativeIdeas.map(d => `• ${d}`).join('\n')}
      
      Safe Move: ${summary.safeMove}
      
      Bold Move: ${summary.boldMove}`,
            timestamp: new Date(),
            isUser: false,
            votes: 0,
            isFavorite: false
        };
        setMessages(prev => [...prev, summaryMessage]);
        setTimeout(() => {
            generateNextTopicSuggestion(topic);
        }, 2000);
    };
    const generateNextTopicSuggestion = (currentTopic) => {
        const suggestions = [
            `Want to brainstorm your go-to-market strategy for this initiative?`,
            `Should we discuss the operational requirements for implementing this strategy?`,
            `Would you like to debate potential partnerships that could accelerate this strategy?`,
            `Shall we analyze the financial projections and ROI timeline for this approach?`,
            `Would you like to explore customer acquisition strategies related to this initiative?`
        ];
        const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        const suggestionMessage = {
            id: `msg-${Date.now()}-suggestion`,
            sender: 'System',
            senderId: 'system',
            content: `Next Debate Suggestion: ${suggestion}`,
            timestamp: new Date(),
            isUser: false,
            votes: 0,
            isFavorite: false
        };
        setMessages(prev => [...prev, suggestionMessage]);
        toast.info('New Debate Suggestion Ready!');
    };
    const generateMockResponse = (executive, topic, riskAppetite) => {
        const responses = {
            ceo: {
                high: `From my perspective as a CEO focused on innovation, I see tremendous potential in ${topic}. We should be bold and move quickly - the market rewards first movers and those willing to disrupt. I envision allocating significant resources to this initiative and making it a central part of our growth strategy.`,
                medium: `As CEO, I believe ${topic} presents a strategic opportunity that deserves focused attention. We should pursue this with a balanced approach - aggressive enough to capture market advantage while maintaining responsible risk management. I recommend a well-funded pilot program with clear success metrics.`,
                low: `Looking at ${topic} from the CEO chair, I see potential value but also significant unknowns. I recommend we explore this carefully with a small, dedicated team to validate assumptions before making substantial commitments. Proper due diligence now will save resources and minimize disruption later.`
            },
            cfo: {
                high: `From a financial perspective, ${topic} could deliver exceptional ROI if we execute properly. While it requires significant upfront investment, my analysis suggests the potential returns justify the risk. I propose allocating budget in stages tied to clear performance milestones.`,
                medium: `My financial analysis of ${topic} indicates moderate risk with promising ROI potential. We should allocate resources carefully, focusing on high-leverage activities first. I recommend a phased funding approach with quarterly reviews to adjust our financial commitment based on measurable outcomes.`,
                low: `The numbers on ${topic} concern me. The upfront costs are substantial and the ROI timeline is longer than our usual threshold. If we proceed, I strongly advise a minimal initial investment with strict performance requirements before committing additional resources.`
            },
            coo: {
                high: `Operationally, implementing ${topic} at scale is ambitious but achievable. I propose we reorganize our resources to prioritize this initiative, potentially reassigning top talent from other projects to ensure successful execution.`,
                medium: `From an operations standpoint, ${topic} will require careful integration with our existing processes. I recommend creating a dedicated implementation team that works alongside our current operations to minimize disruption while driving the initiative forward.`,
                low: `The operational complexity of ${topic} shouldn't be underestimated. My recommendation is to start with a limited pilot that keeps our core operations insulated from any potential disruption. We can scale gradually as we solve implementation challenges.`
            },
            strategy: {
                high: `Strategically, ${topic} aligns perfectly with emerging market trends and positions us ahead of competitors. We should move aggressively to establish a dominant position in this space before others recognize the opportunity.`,
                medium: `From a strategic perspective, ${topic} represents a significant opportunity to differentiate ourselves. We should develop a comprehensive roadmap that balances first-mover advantage with thoughtful market positioning.`,
                low: `My strategic assessment of ${topic} suggests caution. While there's potential, market signals are mixed, and competitor movements don't indicate immediate urgency. I recommend a focused exploration phase to refine our understanding before committing to a full strategy.`
            }
        };
        const roleResponses = responses[executive.role] || responses.strategy;
        return roleResponses[riskAppetite] || roleResponses.medium;
    };
    const generateMockChallenge = (challenger, respondent, previousStatement) => {
        const challenges = [
            `I respectfully disagree with ${respondent.name}'s assessment. The approach outlined doesn't adequately address the competitive pressures we're facing. We need to be more aggressive in our positioning.`,
            `While I appreciate ${respondent.name}'s perspective, I have concerns about the financial viability. Have we fully analyzed the cost implications and ROI timeline?`,
            `I'd like to challenge the assumption in ${respondent.name}'s point about market readiness. Our research indicates customer expectations are evolving faster than this approach accounts for.`,
            `${respondent.name} raises good points, but I'm not convinced about the execution timeline. The operational challenges are more significant than represented.`,
            `Building on ${respondent.name}'s thinking, I believe we need to consider a more innovative approach. The traditional methods suggested might not deliver the differentiation we need.`
        ];
        return challenges[Math.floor(Math.random() * challenges.length)];
    };
    const saveStrategyToLibrary = async () => {
        if (!debateSummary || !sessionId || !profile?.company_id) {
            toast.error('No strategy available to save');
            return;
        }
        try {
            const { data, error } = await supabase
                .from('strategies')
                .insert({
                title: `Strategy for ${debateTopic}`,
                description: debateSummary.winningStrategy,
                company_id: profile.company_id,
                risk_level: preferences?.riskAppetite || 'Medium'
            })
                .select('id')
                .single();
            if (error)
                throw error;
            await supabase
                .from('debates')
                .update({ status: 'completed' })
                .eq('id', sessionId);
            toast.success('Strategy saved to your library');
            return data.id;
        }
        catch (error) {
            console.error('Error saving strategy:', error);
            toast.error('Failed to save strategy');
            return null;
        }
    };
    const resetDebate = () => {
        setDebateTopic('');
        setDebateTitle('');
        setIsDebating(false);
        setMessages([]);
        setReactions([]);
        setVotes([]);
        setDebateSummary(null);
        setSessionId(null);
        if (profile?.industry) {
            generateSuggestedTopic(profile.industry);
        }
    };
    return {
        participants,
        setParticipants,
        messages,
        isDebating,
        debateTitle,
        debateTopic,
        isLoadingMessages,
        reactions,
        votes,
        debateSummary,
        suggestedTopic,
        startDebate,
        saveStrategyToLibrary,
        resetDebate
    };
}
