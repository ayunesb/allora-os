
import React, { useState, useEffect, useRef } from 'react';
import { formatRoleTitle, getBotExpertise } from '@/utils/consultation';
import { executiveBots } from '@/backend/executiveBots';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bot, 
  Send, 
  Save, 
  Download, 
  Copy, 
  FileText, 
  MoreHorizontal,
  Video, 
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

// Types for messages and participants
type BotParticipant = {
  id: string;
  name: string;
  role: string;
  title: string;
  specialty: string;
  avatar: string;
};

type MessageType = {
  id: string;
  sender: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isUser?: boolean;
};

type DebateOption = {
  id: string;
  topic: string;
  description: string;
};

const debateTopics: DebateOption[] = [
  { 
    id: 'growth-strategy', 
    topic: 'Growth Strategy', 
    description: 'Debate various approaches to company growth in the current market conditions.' 
  },
  { 
    id: 'market-expansion', 
    topic: 'Market Expansion', 
    description: 'Evaluate different markets and regions for potential business expansion.' 
  },
  { 
    id: 'product-development', 
    topic: 'Product Development', 
    description: 'Discuss priorities for new product features and improvements.' 
  },
  { 
    id: 'cost-reduction', 
    topic: 'Cost Reduction', 
    description: 'Analyze areas where operational costs can be reduced without impacting quality.' 
  },
  { 
    id: 'talent-acquisition', 
    topic: 'Talent Acquisition', 
    description: 'Debate strategies for recruiting and retaining top talent in a competitive market.' 
  },
];

const BotDebate: React.FC = () => {
  // Set up participants from executive bots
  const [participants, setParticipants] = useState<BotParticipant[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isDebateActive, setIsDebateActive] = useState(false);
  const [debateTitle, setDebateTitle] = useState('');
  const [debateObjective, setDebateObjective] = useState('');
  const [debateDuration, setDebateDuration] = useState<string>('5');
  const [activeTab, setActiveTab] = useState<string>('setup');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize participants from executive bots
  useEffect(() => {
    const initialParticipants = Object.entries(executiveBots)
      .slice(0, 4) // Start with top 4 roles
      .map(([role, names], index) => ({
        id: `bot-${index + 1}`,
        name: names[0], // Take first name from each role
        role,
        title: formatRoleTitle(role),
        specialty: getBotExpertise(role),
        avatar: `/avatars/${names[0].toLowerCase().replace(/\s+/g, '-')}.png`
      }));
    
    setParticipants(initialParticipants);
  }, []);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startDebate = () => {
    if (!selectedTopic || !debateTitle || !debateObjective) {
      toast.error('Please complete all debate setup fields');
      return;
    }

    setIsLoading(true);
    setIsDebateActive(true);
    setActiveTab('debate');
    setMessages([]);

    // Simulate initial bot messages with setTimeout to make it look realistic
    setTimeout(() => {
      const selectedTopicDetails = debateTopics.find(t => t.id === selectedTopic);
      
      // First message from system (debate setup)
      const initialMessage: MessageType = {
        id: `msg-${Date.now()}`,
        sender: 'System',
        senderId: 'system',
        content: `Debate started: ${debateTitle}\n\nObjective: ${debateObjective}\n\nTopic: ${selectedTopicDetails?.topic || selectedTopic}`,
        timestamp: new Date(),
      };
      
      setMessages([initialMessage]);
      setIsLoading(false);
      
      // Schedule first round of bot messages
      simulateBotResponses();
    }, 1500);
  };

  const simulateBotResponses = () => {
    // Simulate bot messages with slight delays between each
    participants.forEach((bot, index) => {
      setTimeout(() => {
        const botMessage = generateBotMessage(bot);
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, (index + 1) * 2500); // Stagger responses
    });
  };

  const generateBotMessage = (bot: BotParticipant): MessageType => {
    // This would connect to an AI service in a real app
    // For now, we'll use mock responses based on the bot's role
    
    const topicDetails = debateTopics.find(t => t.id === selectedTopic);
    const topic = topicDetails?.topic || selectedTopic;
    
    let content = '';
    
    // Generate different responses based on bot role
    if (bot.role === 'ceo') {
      content = `From a strategic perspective, I believe we should approach ${topic} by focusing on the long-term vision. We need to consider how this aligns with our mission and core values while delivering shareholder value.`;
    } else if (bot.role === 'cfo') {
      content = `Looking at the financial implications, ${topic} will require careful budgeting and ROI analysis. We should prioritize initiatives that provide the strongest return on investment while managing cash flow responsibly.`;
    } else if (bot.role === 'cto') {
      content = `From a technical standpoint, ${topic} presents opportunities for innovation. We should leverage emerging technologies to gain competitive advantage while ensuring scalable and secure implementation.`;
    } else if (bot.role === 'cmo') {
      content = `From a marketing perspective, ${topic} needs to be aligned with our brand positioning. We should consider customer insights and market trends to ensure we're delivering value that resonates with our target audience.`;
    } else if (bot.role === 'coo') {
      content = `From an operational standpoint, executing on ${topic} will require careful resource allocation and process optimization. We need to ensure we have the right team structure and workflows in place.`;
    } else {
      content = `I'd like to contribute to the discussion on ${topic} from my perspective as ${bot.title}. We need to consider how this impacts our organization holistically.`;
    }
    
    return {
      id: `msg-${Date.now()}-${bot.id}`,
      sender: bot.name,
      senderId: bot.id,
      content,
      timestamp: new Date()
    };
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: MessageType = {
      id: `msg-${Date.now()}-user`,
      sender: 'You',
      senderId: 'user',
      content: newMessage,
      timestamp: new Date(),
      isUser: true
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage('');
    
    // Trigger bot responses
    setTimeout(() => {
      simulateBotResponses();
    }, 1000);
  };

  const saveDebate = () => {
    // In a real app, this would save to the database
    toast.success('Debate saved successfully');
  };

  const exportDebate = () => {
    // Create a text version of the debate
    const debateText = messages.map(msg => 
      `${msg.sender} (${new Date(msg.timestamp).toLocaleString()}):\n${msg.content}\n\n`
    ).join('');
    
    // Create a blob and download it
    const blob = new Blob([debateText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${debateTitle.replace(/\s+/g, '-').toLowerCase()}-debate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Debate exported to text file');
  };

  const generateSummary = () => {
    // This would connect to an AI service in a real app
    toast.success('Generating executive summary...');
    
    // For demo purposes, we'll just switch to the summary tab
    setTimeout(() => {
      setActiveTab('summary');
    }, 1500);
  };

  const handleTopicChange = (value: string) => {
    setSelectedTopic(value);
    
    // Auto-fill title and objective based on selected topic
    const topic = debateTopics.find(t => t.id === value);
    if (topic) {
      setDebateTitle(`${topic.topic} Discussion`);
      setDebateObjective(`Evaluate and decide on the best approach for ${topic.topic.toLowerCase()}`);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1">
        <TabsList className="mb-4">
          <TabsTrigger value="setup" disabled={isDebateActive && activeTab !== 'setup'}>
            Setup
          </TabsTrigger>
          <TabsTrigger value="debate" disabled={!isDebateActive}>
            Debate
          </TabsTrigger>
          <TabsTrigger value="summary" disabled={!isDebateActive || messages.length < 5}>
            Summary
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="setup" className="flex-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Debate Setup</CardTitle>
              <CardDescription>
                Configure the AI executive debate parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Debate Topic</Label>
                <Select value={selectedTopic} onValueChange={handleTopicChange}>
                  <SelectTrigger id="topic">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {debateTopics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedTopic && (
                  <p className="text-sm text-muted-foreground">
                    {debateTopics.find(t => t.id === selectedTopic)?.description}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Debate Title</Label>
                <Input 
                  id="title" 
                  value={debateTitle} 
                  onChange={(e) => setDebateTitle(e.target.value)} 
                  placeholder="Enter a title for this debate" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="objective">Debate Objective</Label>
                <Textarea 
                  id="objective" 
                  value={debateObjective} 
                  onChange={(e) => setDebateObjective(e.target.value)} 
                  placeholder="What should this debate achieve?" 
                  rows={3} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Approximate Duration (minutes)</Label>
                <Select value={debateDuration} onValueChange={setDebateDuration}>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Participants</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {participants.map((bot) => (
                    <div key={bot.id} className="flex items-center space-x-3 p-3 border rounded-md">
                      <Avatar>
                        <AvatarImage src={bot.avatar} />
                        <AvatarFallback>{bot.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{bot.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{bot.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={startDebate} 
                disabled={!selectedTopic || !debateTitle || !debateObjective || isLoading}
                className="ml-auto"
              >
                {isLoading ? 'Starting Debate...' : 'Start Debate'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="debate" className="flex-1 flex flex-col">
          <Card className="flex flex-col flex-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{debateTitle || 'Executive Debate'}</CardTitle>
                  <CardDescription>
                    {debateObjective || 'AI executives discussing strategies'}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={saveDebate}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={exportDebate}>
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" onClick={generateSummary}>
                    <FileText className="h-4 w-4 mr-1" />
                    Summary
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ScrollArea className="h-[calc(100vh-350px)] pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] ${message.isUser ? 'order-1' : 'order-2'}`}>
                        {!message.isUser && message.senderId !== 'system' && (
                          <div className="flex items-center mb-1 space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage 
                                src={participants.find(p => p.id === message.senderId)?.avatar} 
                                alt={message.sender} 
                              />
                              <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{message.sender}</span>
                            {message.senderId !== 'system' && message.senderId !== 'user' && (
                              <span className="text-xs text-muted-foreground">
                                {participants.find(p => p.id === message.senderId)?.title}
                              </span>
                            )}
                          </div>
                        )}
                        <div 
                          className={`p-3 rounded-lg ${
                            message.isUser 
                              ? 'bg-primary text-primary-foreground' 
                              : message.senderId === 'system'
                                ? 'bg-muted text-muted-foreground'
                                : 'bg-card border'
                          }`}
                        >
                          {message.content.split('\n').map((line, i) => (
                            <p key={i}>{line || <br />}</p>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {!message.isUser && message.senderId !== 'system' && (
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Video className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MessageSquare className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="pt-4">
              <form onSubmit={sendMessage} className="flex space-x-2 w-full">
                <Input
                  placeholder="Ask a question or provide guidance..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={!newMessage.trim() || isLoading}>
                  <Send className="h-4 w-4 mr-1" />
                  Send
                </Button>
              </form>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="summary" className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
              <CardDescription>
                AI-generated summary of the key points and decisions from the debate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <h3 className="text-lg font-medium mb-2">{debateTitle}</h3>
                <div className="space-y-3">
                  <p>This executive summary provides an overview of the key points discussed during the {debateTitle} debate.</p>
                  
                  <h4 className="font-medium">Key Insights:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>The CEO emphasized the importance of aligning our strategy with long-term vision and mission.</li>
                    <li>The CFO highlighted the need for careful budgeting and ROI analysis for all initiatives.</li>
                    <li>The CTO suggested leveraging emerging technologies to gain competitive advantage.</li>
                    <li>The CMO stressed the importance of aligning with our brand positioning and customer needs.</li>
                  </ul>
                  
                  <h4 className="font-medium">Recommendations:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Develop a comprehensive roadmap that balances short-term results with long-term goals.</li>
                    <li>Establish clear metrics for measuring success and ROI for all initiatives.</li>
                    <li>Create cross-functional teams to ensure holistic implementation of strategies.</li>
                    <li>Regularly review and adjust approaches based on market feedback and performance data.</li>
                  </ul>
                  
                  <h4 className="font-medium">Next Steps:</h4>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Schedule follow-up meeting to assign action items and responsibilities.</li>
                    <li>Prepare detailed implementation plan with timelines and resource requirements.</li>
                    <li>Develop communication strategy for stakeholders.</li>
                    <li>Set up regular review cycles to track progress and make adjustments.</li>
                  </ol>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab('debate')}>
                Return to Debate
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Export Summary
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-1" />
                  Save to Reports
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BotDebate;
