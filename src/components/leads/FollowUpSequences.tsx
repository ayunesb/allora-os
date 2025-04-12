
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, Save, Calendar, Clock, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';
import { Lead } from '@/models/lead';

type FollowUpStep = {
  id: string;
  content: string;
  delayDays: number;
  type: 'email' | 'call' | 'message' | 'task';
};

type FollowUpSequence = {
  id: string;
  name: string;
  description: string;
  steps: FollowUpStep[];
  aiGenerated: boolean;
  targetAudience: string;
};

const predefinedSequences: FollowUpSequence[] = [
  {
    id: '1',
    name: 'New Lead Nurturing',
    description: 'A sequence for new leads to introduce your company and services',
    aiGenerated: true,
    targetAudience: 'new',
    steps: [
      { id: '1-1', content: 'Thank you for your interest in our services. Here\'s more information about how we can help your business.', delayDays: 0, type: 'email' },
      { id: '1-2', content: 'Following up on our previous email. Would you be interested in scheduling a quick call to discuss your needs?', delayDays: 3, type: 'email' },
      { id: '1-3', content: 'Schedule a phone call to discuss their requirements and how our services can address their needs.', delayDays: 5, type: 'call' },
      { id: '1-4', content: 'Send a personalized proposal based on the previous call discussion.', delayDays: 7, type: 'email' },
    ]
  },
  {
    id: '2',
    name: 'Proposal Follow-Up',
    description: 'A sequence for following up after sending a proposal',
    aiGenerated: true,
    targetAudience: 'proposal',
    steps: [
      { id: '2-1', content: 'I wanted to check if you had a chance to review the proposal I sent. Would you like to discuss any specific details?', delayDays: 2, type: 'email' },
      { id: '2-2', content: 'Follow up with a phone call to address any questions about the proposal.', delayDays: 4, type: 'call' },
      { id: '2-3', content: 'Send case studies of similar clients who have achieved great results with our services.', delayDays: 7, type: 'email' },
      { id: '2-4', content: 'Final follow-up with a special offer or incentive to make a decision.', delayDays: 10, type: 'email' },
    ]
  },
  {
    id: '3',
    name: 'Re-engagement Campaign',
    description: 'A sequence for re-engaging cold leads',
    aiGenerated: true,
    targetAudience: 'cold',
    steps: [
      { id: '3-1', content: 'We haven\'t connected in a while. I thought you might be interested in our latest industry report.', delayDays: 0, type: 'email' },
      { id: '3-2', content: 'Following up on the industry report. Did you find the insights valuable for your business?', delayDays: 5, type: 'email' },
      { id: '3-3', content: 'Invitation to an upcoming webinar on industry trends and strategies.', delayDays: 10, type: 'email' },
      { id: '3-4', content: 'Schedule a reassessment call to understand current needs and challenges.', delayDays: 15, type: 'call' },
    ]
  }
];

export const FollowUpSequences = ({ lead, onApply }: { lead?: Lead, onApply?: (sequenceId: string) => void }) => {
  const [activeTab, setActiveTab] = useState('predefined');
  const [sequences, setSequences] = useState<FollowUpSequence[]>(predefinedSequences);
  const [generating, setGenerating] = useState(false);
  const [newSequence, setNewSequence] = useState<Partial<FollowUpSequence>>({
    name: '',
    description: '',
    steps: [],
    aiGenerated: false,
    targetAudience: 'new'
  });
  const [isEditing, setIsEditing] = useState(false);
  
  const generateAISequence = async () => {
    try {
      setGenerating(true);
      
      // This would normally call an AI service to generate a sequence
      // For demo purposes, we'll simulate a delay and return a predefined sequence
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newAISequence: FollowUpSequence = {
        id: `ai-${Date.now()}`,
        name: `AI Generated Sequence for ${lead?.status || 'Leads'}`,
        description: `Personalized follow-up sequence for ${lead?.name || 'leads'} based on their profile and status`,
        aiGenerated: true,
        targetAudience: lead?.status || 'new',
        steps: [
          { id: `ai-${Date.now()}-1`, content: 'AI generated first contact message tailored to the lead\'s industry and needs.', delayDays: 0, type: 'email' },
          { id: `ai-${Date.now()}-2`, content: 'AI generated follow-up message addressing specific pain points and offering solutions.', delayDays: 3, type: 'email' },
          { id: `ai-${Date.now()}-3`, content: 'AI recommended phone call to discuss personalized solution options.', delayDays: 5, type: 'call' },
          { id: `ai-${Date.now()}-4`, content: 'AI generated message with custom resources and next steps.', delayDays: 7, type: 'email' },
        ]
      };
      
      setSequences(prev => [...prev, newAISequence]);
      toast.success('AI sequence generated successfully');
      setActiveTab('custom');
    } catch (error: any) {
      toast.error(`Failed to generate sequence: ${error.message}`);
    } finally {
      setGenerating(false);
    }
  };
  
  const handleAddStep = () => {
    const newStep: FollowUpStep = {
      id: `new-${Date.now()}`,
      content: '',
      delayDays: 1,
      type: 'email'
    };
    
    setNewSequence(prev => ({
      ...prev,
      steps: [...(prev.steps || []), newStep]
    }));
  };
  
  const handleRemoveStep = (stepId: string) => {
    setNewSequence(prev => ({
      ...prev,
      steps: (prev.steps || []).filter(step => step.id !== stepId)
    }));
  };
  
  const handleUpdateStep = (stepId: string, field: keyof FollowUpStep, value: any) => {
    setNewSequence(prev => ({
      ...prev,
      steps: (prev.steps || []).map(step => 
        step.id === stepId ? { ...step, [field]: value } : step
      )
    }));
  };
  
  const handleSaveSequence = () => {
    if (!newSequence.name) {
      toast.error('Please enter a name for the sequence');
      return;
    }
    
    if (!(newSequence.steps || []).length) {
      toast.error('Please add at least one step to the sequence');
      return;
    }
    
    const completeSequence: FollowUpSequence = {
      id: `custom-${Date.now()}`,
      name: newSequence.name || 'Custom Sequence',
      description: newSequence.description || '',
      steps: newSequence.steps || [],
      aiGenerated: false,
      targetAudience: newSequence.targetAudience || 'new'
    };
    
    setSequences(prev => [...prev, completeSequence]);
    setNewSequence({
      name: '',
      description: '',
      steps: [],
      aiGenerated: false,
      targetAudience: 'new'
    });
    
    toast.success('Sequence saved successfully');
    setIsEditing(false);
  };
  
  const handleApplySequence = (sequenceId: string) => {
    // In a real application, this would apply the sequence to the selected lead
    if (onApply) {
      onApply(sequenceId);
    }
    toast.success('Follow-up sequence applied successfully');
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Follow-Up Sequences</CardTitle>
        <CardDescription>
          Create and manage automated follow-up sequences for your leads
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="predefined">Predefined Sequences</TabsTrigger>
            <TabsTrigger value="custom">Custom Sequences</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="predefined" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">AI-Generated Templates</h3>
              {lead && (
                <Button
                  onClick={generateAISequence}
                  disabled={generating}
                  size="sm"
                >
                  {generating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate for {lead.name}
                    </>
                  )}
                </Button>
              )}
            </div>
            
            <div className="space-y-4">
              {sequences
                .filter(seq => seq.aiGenerated)
                .map(sequence => (
                  <div key={sequence.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium flex items-center">
                          {sequence.name}
                          {sequence.aiGenerated && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                              AI Generated
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground">{sequence.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Target: <span className="font-medium capitalize">{sequence.targetAudience}</span> leads
                        </p>
                      </div>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleApplySequence(sequence.id)}
                      >
                        Apply
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      {sequence.steps.map((step, index) => (
                        <div key={step.id} className="flex items-start gap-3 p-2 rounded-md bg-muted/50">
                          <div className="min-w-[30px] h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{step.content}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs flex items-center text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {step.delayDays === 0 ? 'Immediately' : `After ${step.delayDays} day${step.delayDays > 1 ? 's' : ''}`}
                              </span>
                              <span className="text-xs capitalize bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                                {step.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Your Custom Sequences</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditing(true);
                  setActiveTab('create');
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </div>
            
            <div className="space-y-4">
              {sequences
                .filter(seq => !seq.aiGenerated)
                .map(sequence => (
                  <div key={sequence.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{sequence.name}</h4>
                        <p className="text-sm text-muted-foreground">{sequence.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Target: <span className="font-medium capitalize">{sequence.targetAudience}</span> leads
                        </p>
                      </div>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => handleApplySequence(sequence.id)}
                      >
                        Apply
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      {sequence.steps.map((step, index) => (
                        <div key={step.id} className="flex items-start gap-3 p-2 rounded-md bg-muted/50">
                          <div className="min-w-[30px] h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{step.content}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs flex items-center text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {step.delayDays === 0 ? 'Immediately' : `After ${step.delayDays} day${step.delayDays > 1 ? 's' : ''}`}
                              </span>
                              <span className="text-xs capitalize bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                                {step.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              
              {sequences.filter(seq => !seq.aiGenerated).length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 px-4 border rounded-md bg-muted/20">
                  <p className="text-muted-foreground mb-2">You haven't created any custom sequences yet</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditing(true);
                      setActiveTab('create');
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Sequence
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="create" className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sequence-name">Sequence Name</Label>
                  <Input
                    id="sequence-name"
                    placeholder="e.g., Product Demo Follow-Up"
                    value={newSequence.name}
                    onChange={(e) => setNewSequence(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sequence-description">Description</Label>
                  <Textarea
                    id="sequence-description"
                    placeholder="Describe what this sequence is for"
                    value={newSequence.description}
                    onChange={(e) => setNewSequence(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="target-audience">Target Audience</Label>
                  <Select
                    value={newSequence.targetAudience}
                    onValueChange={(value) => setNewSequence(prev => ({ ...prev, targetAudience: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select lead status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Leads</SelectItem>
                      <SelectItem value="contacted">Contacted Leads</SelectItem>
                      <SelectItem value="qualified">Qualified Leads</SelectItem>
                      <SelectItem value="proposal">Proposal Sent</SelectItem>
                      <SelectItem value="negotiation">In Negotiation</SelectItem>
                      <SelectItem value="cold">Cold Leads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Sequence Steps</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddStep}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Step
                  </Button>
                </div>
                
                {(newSequence.steps || []).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 px-4 border rounded-md bg-muted/20">
                    <p className="text-muted-foreground mb-2">No steps added yet</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddStep}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Step
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(newSequence.steps || []).map((step, index) => (
                      <div key={step.id} className="border rounded-md p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Step {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveStep(step.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`step-type-${step.id}`}>Type</Label>
                            <Select
                              value={step.type}
                              onValueChange={(value) => handleUpdateStep(step.id, 'type', value)}
                            >
                              <SelectTrigger id={`step-type-${step.id}`}>
                                <SelectValue placeholder="Select step type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="call">Phone Call</SelectItem>
                                <SelectItem value="message">Message</SelectItem>
                                <SelectItem value="task">Task</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`step-content-${step.id}`}>Content</Label>
                            <Textarea
                              id={`step-content-${step.id}`}
                              placeholder="Enter the content or description of this step"
                              value={step.content}
                              onChange={(e) => handleUpdateStep(step.id, 'content', e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`step-delay-${step.id}`}>Delay (days)</Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id={`step-delay-${step.id}`}
                                type="number"
                                min="0"
                                value={step.delayDays}
                                onChange={(e) => handleUpdateStep(step.id, 'delayDays', parseInt(e.target.value))}
                              />
                              <div className="text-sm text-muted-foreground">
                                {step.delayDays === 0 
                                  ? 'Immediately' 
                                  : step.delayDays === 1 
                                    ? 'After 1 day' 
                                    : `After ${step.delayDays} days`}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setNewSequence({
                      name: '',
                      description: '',
                      steps: [],
                      aiGenerated: false,
                      targetAudience: 'new'
                    });
                    setIsEditing(false);
                    setActiveTab('custom');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveSequence}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Sequence
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
