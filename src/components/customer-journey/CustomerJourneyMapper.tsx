
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  PlusCircle, 
  Link, 
  ChevronRight, 
  Edit, 
  Trash, 
  MoveVertical,
  PlusSquare, 
  FilePlus,
  ArrowDown,
  UserPlus,
  BarChart,
  Target
} from "lucide-react";
import { toast } from "sonner";

// Types for journey mapping
interface JourneyStage {
  id: string;
  title: string;
  description: string;
  touchpoints: JourneyTouchpoint[];
}

interface JourneyTouchpoint {
  id: string;
  title: string;
  channel: string;
  content: string;
  metrics: string[];
  status: 'active' | 'inactive' | 'draft';
}

// Sample data
const DEFAULT_JOURNEY: JourneyStage[] = [
  {
    id: 'awareness',
    title: 'Awareness',
    description: 'Customer becomes aware of a need or problem and discovers your brand',
    touchpoints: [
      {
        id: 'social_ad',
        title: 'Social Media Ad',
        channel: 'Facebook',
        content: 'Awareness campaign highlighting industry challenges',
        metrics: ['Impressions', 'Reach', 'Frequency'],
        status: 'active'
      },
      {
        id: 'blog_post',
        title: 'Blog Post',
        channel: 'Website',
        content: 'Educational content about industry trends',
        metrics: ['Page Views', 'Time on Page', 'Bounce Rate'],
        status: 'active'
      }
    ]
  },
  {
    id: 'consideration',
    title: 'Consideration',
    description: 'Customer evaluates your solution against alternatives',
    touchpoints: [
      {
        id: 'email_nurture',
        title: 'Email Sequence',
        channel: 'Email',
        content: 'Product features and benefits',
        metrics: ['Open Rate', 'Click Rate', 'Responses'],
        status: 'active'
      },
      {
        id: 'case_study',
        title: 'Case Study',
        channel: 'Website',
        content: 'Success stories from similar customers',
        metrics: ['Downloads', 'Form Fills', 'Follow-up Requests'],
        status: 'draft'
      }
    ]
  },
  {
    id: 'conversion',
    title: 'Conversion',
    description: 'Customer makes purchase decision',
    touchpoints: [
      {
        id: 'sales_call',
        title: 'Sales Call',
        channel: 'Phone',
        content: 'Personalized presentation and proposal',
        metrics: ['Call Duration', 'Next Steps', 'Close Rate'],
        status: 'active'
      }
    ]
  },
  {
    id: 'retention',
    title: 'Retention',
    description: 'Customer continues using your product/service',
    touchpoints: [
      {
        id: 'onboarding',
        title: 'Onboarding Sequence',
        channel: 'Email/In-app',
        content: 'Getting started guides and tips',
        metrics: ['Completion Rate', 'Feature Adoption', 'Support Tickets'],
        status: 'active'
      }
    ]
  }
];

export function CustomerJourneyMapper() {
  const [journeyStages, setJourneyStages] = useState<JourneyStage[]>(DEFAULT_JOURNEY);
  const [selectedJourney, setSelectedJourney] = useState<string>('default');
  const [activeView, setActiveView] = useState<'flow' | 'metrics'>('flow');
  const [editingStage, setEditingStage] = useState<JourneyStage | null>(null);
  const [editingTouchpoint, setEditingTouchpoint] = useState<JourneyTouchpoint | null>(null);
  const [openStageDialog, setOpenStageDialog] = useState(false);
  const [openTouchpointDialog, setOpenTouchpointDialog] = useState(false);
  
  // Handle stage editing
  const handleAddStage = () => {
    setEditingStage({
      id: '',
      title: '',
      description: '',
      touchpoints: []
    });
    setOpenStageDialog(true);
  };
  
  const handleEditStage = (stage: JourneyStage) => {
    setEditingStage({...stage});
    setOpenStageDialog(true);
  };
  
  const handleSaveStage = (formData: any) => {
    if (editingStage?.id) {
      // Update existing stage
      setJourneyStages(prev => 
        prev.map(stage => 
          stage.id === editingStage.id ? {...stage, ...formData} : stage
        )
      );
      toast.success("Stage updated successfully");
    } else {
      // Add new stage
      const newStage: JourneyStage = {
        id: `stage_${Date.now()}`,
        title: formData.title,
        description: formData.description,
        touchpoints: []
      };
      setJourneyStages(prev => [...prev, newStage]);
      toast.success("New stage added successfully");
    }
    setOpenStageDialog(false);
  };
  
  // Handle touchpoint editing
  const handleAddTouchpoint = (stageId: string) => {
    setEditingTouchpoint({
      id: '',
      title: '',
      channel: '',
      content: '',
      metrics: [],
      status: 'draft'
    });
    setEditingStage(journeyStages.find(stage => stage.id === stageId) || null);
    setOpenTouchpointDialog(true);
  };
  
  const handleEditTouchpoint = (stageId: string, touchpoint: JourneyTouchpoint) => {
    setEditingTouchpoint({...touchpoint});
    setEditingStage(journeyStages.find(stage => stage.id === stageId) || null);
    setOpenTouchpointDialog(true);
  };
  
  const handleSaveTouchpoint = (formData: any) => {
    if (!editingStage) return;
    
    const updatedTouchpoint: JourneyTouchpoint = {
      id: editingTouchpoint?.id || `touchpoint_${Date.now()}`,
      title: formData.title,
      channel: formData.channel,
      content: formData.content,
      metrics: formData.metrics.split(',').map((m: string) => m.trim()),
      status: formData.status
    };
    
    if (editingTouchpoint?.id) {
      // Update existing touchpoint
      setJourneyStages(prev => 
        prev.map(stage => 
          stage.id === editingStage.id 
            ? {
                ...stage, 
                touchpoints: stage.touchpoints.map(tp => 
                  tp.id === updatedTouchpoint.id ? updatedTouchpoint : tp
                )
              }
            : stage
        )
      );
      toast.success("Touchpoint updated successfully");
    } else {
      // Add new touchpoint
      setJourneyStages(prev => 
        prev.map(stage => 
          stage.id === editingStage.id 
            ? {
                ...stage, 
                touchpoints: [...stage.touchpoints, updatedTouchpoint]
              }
            : stage
        )
      );
      toast.success("New touchpoint added successfully");
    }
    setOpenTouchpointDialog(false);
  };
  
  const handleDeleteTouchpoint = (stageId: string, touchpointId: string) => {
    setJourneyStages(prev => 
      prev.map(stage => 
        stage.id === stageId 
          ? {
              ...stage, 
              touchpoints: stage.touchpoints.filter(tp => tp.id !== touchpointId)
            }
          : stage
      )
    );
    toast.success("Touchpoint removed");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Customer Journey Mapper</CardTitle>
            <CardDescription>
              Visualize and optimize your customer's path to purchase
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select 
              value={selectedJourney} 
              onValueChange={setSelectedJourney}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Journey" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default Journey</SelectItem>
                <SelectItem value="b2b_saas">B2B SaaS Journey</SelectItem>
                <SelectItem value="ecommerce">E-commerce Journey</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => { /* Download/export functionality */ }}
            >
              <FilePlus className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <div className="border-b px-6">
            <TabsList className="mb-0">
              <TabsTrigger value="flow">Journey Flow</TabsTrigger>
              <TabsTrigger value="metrics">Journey Metrics</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-6">
            {/* Journey Flow View */}
            <TabsContent value="flow" className="mt-0">
              <div className="grid grid-cols-1 gap-8">
                {journeyStages.map((stage, index) => (
                  <div key={stage.id} className="relative">
                    {/* Stage details */}
                    <div className="flex justify-between items-start bg-muted/30 p-4 rounded-lg mb-2">
                      <div>
                        <h3 className="text-lg font-semibold flex items-center">
                          <div className="flex items-center justify-center bg-primary/10 text-primary font-bold rounded-full w-6 h-6 mr-2 text-sm">
                            {index + 1}
                          </div>
                          {stage.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{stage.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditStage(stage)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleAddTouchpoint(stage.id)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Touchpoints */}
                    <div className="grid grid-cols-1 gap-3 pl-8">
                      {stage.touchpoints.map(touchpoint => (
                        <Card 
                          key={touchpoint.id} 
                          className={`relative border-l-4 ${
                            touchpoint.status === 'active' 
                              ? 'border-l-green-500' 
                              : touchpoint.status === 'draft' 
                                ? 'border-l-amber-500' 
                                : 'border-l-red-500'
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{touchpoint.title}</h4>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <span className="bg-muted px-2 py-0.5 rounded text-xs mr-2">
                                    {touchpoint.channel}
                                  </span>
                                  {touchpoint.content}
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {touchpoint.metrics.map((metric, i) => (
                                    <span 
                                      key={i} 
                                      className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                                    >
                                      {metric}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                  onClick={() => handleEditTouchpoint(stage.id, touchpoint)}
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                  onClick={() => handleDeleteTouchpoint(stage.id, touchpoint.id)}
                                >
                                  <Trash className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      {/* Add touchpoint button */}
                      {stage.touchpoints.length === 0 && (
                        <Button
                          variant="outline"
                          className="border-dashed"
                          onClick={() => handleAddTouchpoint(stage.id)}
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add First Touchpoint
                        </Button>
                      )}
                    </div>
                    
                    {/* Connector line to next stage */}
                    {index < journeyStages.length - 1 && (
                      <div className="flex justify-center my-4">
                        <ArrowDown className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Add new stage button */}
                <Button 
                  variant="outline" 
                  className="mt-4 border-dashed"
                  onClick={handleAddStage}
                >
                  <PlusSquare className="h-4 w-4 mr-2" />
                  Add New Stage
                </Button>
              </div>
            </TabsContent>
            
            {/* Journey Metrics View */}
            <TabsContent value="metrics" className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <Target className="h-4 w-4 mr-2 text-primary" />
                        Journey Completion
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">68%</div>
                      <p className="text-sm text-muted-foreground">
                        Average journey completion rate
                      </p>
                      <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                        <div className="bg-primary h-2.5 rounded-full" style={{width: '68%'}}></div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <MoveVertical className="h-4 w-4 mr-2 text-primary" />
                        Conversion Points
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">12</div>
                      <p className="text-sm text-muted-foreground">
                        Total conversion points across journey
                      </p>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs">Awareness: 3</span>
                        <span className="text-xs">Consideration: 5</span>
                        <span className="text-xs">Conversion: 4</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <UserPlus className="h-4 w-4 mr-2 text-primary" />
                        Customer Acquisition
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">$42</div>
                      <p className="text-sm text-muted-foreground">
                        Average cost per acquisition
                      </p>
                      <div className="flex items-center text-green-500 text-xs mt-2">
                        <ArrowDown className="h-3 w-3 mr-1 rotate-180" /> 
                        12% lower than previous period
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BarChart className="h-5 w-5 mr-2 text-primary" />
                      Journey Performance by Stage
                    </CardTitle>
                    <CardDescription>
                      Track engagement and conversion metrics across your customer journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {journeyStages.map((stage, index) => (
                        <div key={stage.id}>
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">{stage.title}</h3>
                            <div className="flex items-center">
                              <span className="text-sm mr-2">
                                {index === 0 ? '100%' : index === 1 ? '72%' : index === 2 ? '45%' : '28%'}
                              </span>
                              <Link className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{width: index === 0 ? '100%' : index === 1 ? '72%' : index === 2 ? '45%' : '28%'}}
                            ></div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            {stage.touchpoints.map(touchpoint => (
                              <div 
                                key={touchpoint.id}
                                className="text-xs flex justify-between bg-muted/40 p-2 rounded"
                              >
                                <span>{touchpoint.title}</span>
                                <span className="font-medium">
                                  {touchpoint.status === 'active' ? '+24%' : touchpoint.status === 'draft' ? 'N/A' : '-5%'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
      
      {/* Stage Dialog */}
      <Dialog open={openStageDialog} onOpenChange={setOpenStageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingStage?.id ? 'Edit Journey Stage' : 'Add Journey Stage'}
            </DialogTitle>
            <DialogDescription>
              Define a stage in your customer journey
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSaveStage({
              title: formData.get('title'),
              description: formData.get('description')
            });
          }}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Stage Name</Label>
                <Input 
                  id="title" 
                  name="title"
                  placeholder="e.g. Awareness, Consideration" 
                  defaultValue={editingStage?.title || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  placeholder="Describe this stage in the customer journey"
                  defaultValue={editingStage?.description || ''}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {editingStage?.id ? 'Update Stage' : 'Add Stage'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Touchpoint Dialog */}
      <Dialog open={openTouchpointDialog} onOpenChange={setOpenTouchpointDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTouchpoint?.id ? 'Edit Touchpoint' : 'Add Touchpoint'}
            </DialogTitle>
            <DialogDescription>
              Define a customer interaction point in the {editingStage?.title} stage
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSaveTouchpoint({
              title: formData.get('title'),
              channel: formData.get('channel'),
              content: formData.get('content'),
              metrics: formData.get('metrics'),
              status: formData.get('status')
            });
          }}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Touchpoint Name</Label>
                <Input 
                  id="title" 
                  name="title"
                  placeholder="e.g. Welcome Email, Product Demo" 
                  defaultValue={editingTouchpoint?.title || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="channel">Channel</Label>
                <Select 
                  name="channel" 
                  defaultValue={editingTouchpoint?.channel || ''}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="In-app">In-app</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="Direct Mail">Direct Mail</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content/Message</Label>
                <Textarea 
                  id="content" 
                  name="content"
                  placeholder="What message does this touchpoint deliver?"
                  defaultValue={editingTouchpoint?.content || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metrics">Key Metrics (comma separated)</Label>
                <Input 
                  id="metrics" 
                  name="metrics"
                  placeholder="e.g. Open Rate, CTR, Conversion Rate"
                  defaultValue={editingTouchpoint?.metrics?.join(', ') || ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  name="status" 
                  defaultValue={editingTouchpoint?.status || 'draft'}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {editingTouchpoint?.id ? 'Update Touchpoint' : 'Add Touchpoint'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default CustomerJourneyMapper;
