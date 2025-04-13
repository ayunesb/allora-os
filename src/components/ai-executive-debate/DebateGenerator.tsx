
import { useState } from 'react';
import { useAIExecutiveDebate } from '@/hooks/useAIExecutiveDebate';
import { getExecutiveSuggestions } from '@/utils/ai-executives';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Loader2, MessageSquare, Users, Brain, SendHorizontal } from 'lucide-react';

interface Executive {
  id: string;
  name: string;
  role: string;
  title: string;
  specialty: string;
  avatar: string;
}

export function DebateGenerator() {
  const [topic, setTopic] = useState('');
  const [companyContext, setCompanyContext] = useState('');
  const [riskAppetite, setRiskAppetite] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedExecutives, setSelectedExecutives] = useState<Record<string, boolean>>({});
  
  const { generateDebate, isLoading, debate, error } = useAIExecutiveDebate();
  
  // Get executive suggestions based on risk appetite
  const executives = getExecutiveSuggestions(riskAppetite);
  
  // Count selected executives
  const selectedCount = Object.values(selectedExecutives).filter(Boolean).length;
  
  const handleExecutiveToggle = (execId: string) => {
    setSelectedExecutives(prev => ({
      ...prev,
      [execId]: !prev[execId]
    }));
  };
  
  const handleGenerateDebate = async () => {
    if (!topic) {
      return;
    }
    
    // Get the selected executives
    const selected = executives.filter(exec => selectedExecutives[exec.id]);
    
    if (selected.length < 2) {
      return;
    }
    
    const executivesForDebate = selected.map(exec => ({
      name: exec.name,
      role: exec.title
    }));
    
    await generateDebate(topic, companyContext, executivesForDebate);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Generate Executive Debate</CardTitle>
            <CardDescription>
              Get strategic insights from AI-powered executive debate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="topic" className="text-sm font-medium">Debate Topic</label>
              <Input
                id="topic"
                placeholder="Enter a business challenge or opportunity"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="context" className="text-sm font-medium">Company Context (Optional)</label>
              <Textarea
                id="context"
                placeholder="Brief description of your company and current situation"
                value={companyContext}
                onChange={(e) => setCompanyContext(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="riskAppetite" className="text-sm font-medium">Risk Appetite</label>
              <Select 
                value={riskAppetite} 
                onValueChange={(value) => setRiskAppetite(value as 'low' | 'medium' | 'high')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Conservative</SelectItem>
                  <SelectItem value="medium">Balanced</SelectItem>
                  <SelectItem value="high">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Select Executives</label>
                <Badge variant="outline">{selectedCount} selected</Badge>
              </div>
              
              <ScrollArea className="h-[200px] rounded-md border p-4">
                <div className="space-y-4">
                  {executives.map((exec) => (
                    <div key={exec.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={exec.id}
                        checked={selectedExecutives[exec.id] || false}
                        onCheckedChange={() => handleExecutiveToggle(exec.id)}
                      />
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={exec.avatar} alt={exec.name} />
                          <AvatarFallback>{exec.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <label
                            htmlFor={exec.id}
                            className="text-sm font-medium cursor-pointer"
                          >
                            {exec.name}
                          </label>
                          <p className="text-xs text-muted-foreground">{exec.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            <Button 
              onClick={handleGenerateDebate} 
              disabled={isLoading || !topic || selectedCount < 2}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Debate...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Generate Executive Debate
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              {debate ? `Debate: ${debate.topic}` : 'Executive Debate Results'}
            </CardTitle>
            {debate && (
              <div className="flex flex-wrap gap-2 mt-2">
                {debate.executives.map((exec, idx) => (
                  <Badge key={idx} variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {exec.name} ({exec.role})
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-red-500">{error}</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={handleGenerateDebate}
                >
                  Try Again
                </Button>
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Generating executive debate...</p>
                <p className="text-xs text-muted-foreground mt-2">This may take a minute or two</p>
              </div>
            ) : debate ? (
              <ScrollArea className="h-[500px] pr-4">
                <div className="whitespace-pre-line">
                  {debate.content}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Debate Generated Yet</h3>
                <p className="max-w-md mx-auto mb-6">
                  Select a topic and at least two executives to generate an AI-powered strategic debate.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
