
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Copy, ThumbsUp, ThumbsDown, RotateCcw, Send } from "lucide-react";
import { toast } from "sonner";

type ContentType = 'adCopy' | 'emailTemplate' | 'socialPost' | 'productDescription' | 'landingPage';

interface ContentRequest {
  contentType: ContentType;
  toneOption: string;
  industry: string;
  targetAudience: string;
  keyPoints: string;
  length: number;
  isCreative: boolean;
}

interface ContentResponseItem {
  id: string;
  content: string;
  feedback?: 'positive' | 'negative';
}

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'authoritative', label: 'Authoritative' },
  { value: 'persuasive', label: 'Persuasive' },
  { value: 'humorous', label: 'Humorous' }
];

export function AIContentGenerator() {
  const [activeTab, setActiveTab] = useState<ContentType>('adCopy');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generations, setGenerations] = useState<ContentResponseItem[]>([]);
  
  // Form state
  const [contentRequest, setContentRequest] = useState<ContentRequest>({
    contentType: 'adCopy',
    toneOption: 'professional',
    industry: '',
    targetAudience: '',
    keyPoints: '',
    length: 150,
    isCreative: true
  });

  const handleInputChange = (field: keyof ContentRequest, value: string | number | boolean) => {
    setContentRequest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate API call for now
    try {
      // This would be replaced with a real API call to an AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newContent = {
        id: Date.now().toString(),
        content: generateSampleContent(contentRequest)
      };
      
      setGenerations([newContent, ...generations]);
      toast.success("Content generated successfully!");
    } catch (error) {
      toast.error("Failed to generate content. Please try again.");
      console.error("Error generating content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy content"));
  };

  const handleFeedback = (id: string, feedback: 'positive' | 'negative') => {
    setGenerations(prev => 
      prev.map(item => 
        item.id === id ? { ...item, feedback } : item
      )
    );
    
    // In a real implementation, you'd send this feedback to your backend
    toast.success(`Feedback recorded. Thank you!`);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as ContentType);
    setContentRequest(prev => ({
      ...prev,
      contentType: value as ContentType
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Content Generator
        </CardTitle>
        <CardDescription>
          Create marketing content with AI assistance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="adCopy">Ad Copy</TabsTrigger>
            <TabsTrigger value="emailTemplate">Email</TabsTrigger>
            <TabsTrigger value="socialPost">Social Posts</TabsTrigger>
            <TabsTrigger value="productDescription">Product Desc</TabsTrigger>
            <TabsTrigger value="landingPage">Landing Page</TabsTrigger>
          </TabsList>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  placeholder="e.g. Technology, Healthcare"
                  value={contentRequest.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tone">Tone of Voice</Label>
                <Select 
                  value={contentRequest.toneOption}
                  onValueChange={(value) => handleInputChange('toneOption', value)}
                >
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TONE_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                placeholder="e.g. Professionals aged 25-45, Small business owners"
                value={contentRequest.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="keyPoints">Key Points to Include</Label>
              <Textarea
                id="keyPoints"
                placeholder="Enter key messages, product features, or specific points to highlight"
                className="min-h-[100px]"
                value={contentRequest.keyPoints}
                onChange={(e) => handleInputChange('keyPoints', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="length">Content Length (words)</Label>
                <span className="text-sm text-muted-foreground">{contentRequest.length}</span>
              </div>
              <Slider
                id="length"
                min={50}
                max={500}
                step={25}
                value={[contentRequest.length]}
                onValueChange={(value) => handleInputChange('length', value[0])}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="creative"
                checked={contentRequest.isCreative}
                onCheckedChange={(checked) => handleInputChange('isCreative', checked)}
              />
              <Label htmlFor="creative">Use creative language and metaphors</Label>
            </div>
          </div>
        </Tabs>
        
        <Button 
          className="w-full mt-6" 
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Content
            </>
          )}
        </Button>
      </CardContent>
      
      {generations.length > 0 && (
        <CardFooter className="flex flex-col border-t pt-6">
          <h3 className="text-sm font-medium mb-4">Generated Content</h3>
          <div className="space-y-4 w-full">
            {generations.map((item) => (
              <Card key={item.id} className="w-full">
                <CardContent className="pt-4">
                  <div className="whitespace-pre-wrap text-sm mb-4">
                    {item.content}
                  </div>
                  <div className="flex justify-between">
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleFeedback(item.id, 'positive')}
                        className={item.feedback === 'positive' ? 'bg-primary/10' : ''}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Like
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleFeedback(item.id, 'negative')}
                        className={item.feedback === 'negative' ? 'bg-primary/10' : ''}
                      >
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        Improve
                      </Button>
                    </div>
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCopy(item.content)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {generations.length > 1 && (
              <Button 
                variant="ghost" 
                className="mt-2"
                onClick={() => setGenerations([])}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

// Helper function to generate sample content (would be replaced with AI API call)
function generateSampleContent(request: ContentRequest): string {
  const contentTypes = {
    adCopy: `Introducing our revolutionary solution for ${request.industry} professionals!

Are you a ${request.targetAudience} looking to improve your results? Our product delivers exceptional performance with industry-leading features.

${request.keyPoints}

Act now and experience the difference!`,
    
    emailTemplate: `Subject: Special Offer for ${request.targetAudience}

Hello [Customer Name],

We hope this email finds you well. As a valued customer in the ${request.industry} industry, we wanted to share some exciting news with you.

${request.keyPoints}

Best regards,
[Your Company] Team`,
    
    socialPost: `📣 Attention ${request.targetAudience}! 

Looking to solve your biggest challenges in the ${request.industry} space?

${request.keyPoints}

Click the link in our bio to learn more!
#IndustryTrends #Solution #Innovation`,
    
    productDescription: `Our premium solution for ${request.industry} professionals delivers unmatched performance and value.

Designed specifically for ${request.targetAudience}, this product addresses your most pressing needs with innovative features.

Key Benefits:
${request.keyPoints}

Available now with special introductory pricing.`,
    
    landingPage: `# Transform Your ${request.industry} Business

## The Ultimate Solution for ${request.targetAudience}

Are you facing challenges with efficiency, costs, or performance? Our comprehensive platform is designed to help you excel.

### Why Choose Us
${request.keyPoints}

### Ready to get started?
Book a demo today or start your free trial!`
  };
  
  return contentTypes[request.contentType];
}

export default AIContentGenerator;
