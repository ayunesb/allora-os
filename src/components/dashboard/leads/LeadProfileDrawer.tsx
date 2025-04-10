
import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  UserCircle, 
  MailPlus, 
  Phone, 
  MessageSquare, 
  Video, 
  Clock, 
  FileText,
  ClipboardList,
  Lightbulb,
  Sparkles,
  Calendar,
  BarChart,
  FileUp,
  Trash
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Lead } from '@/models/lead';
import { LeadStatusBadge } from '@/components/admin/leads/LeadStatusBadge';
import { LeadScoreBadge } from './LeadScoreBadge';
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type LeadProfileDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead;
  onStatusUpdate: (leadId: string, status: Lead['status']) => Promise<void>;
  onDelete: (leadId: string) => Promise<void>;
  getLeadScore: (lead: Lead) => 'hot' | 'warm' | 'cold';
  getNextBestAction: (lead: Lead) => string;
};

export const LeadProfileDrawer: React.FC<LeadProfileDrawerProps> = ({
  open,
  onOpenChange,
  lead,
  onStatusUpdate,
  onDelete,
  getLeadScore,
  getNextBestAction
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleDelete = async () => {
    try {
      await onDelete(lead.id);
      onOpenChange(false);
      toast.success(`Lead ${lead.name} deleted successfully`);
    } catch (error) {
      toast.error('Failed to delete lead');
      console.error(error);
    }
  };
  
  const handleStatusChange = async (status: Lead['status']) => {
    try {
      await onStatusUpdate(lead.id, status);
      toast.success(`Lead status updated to ${status}`);
    } catch (error) {
      toast.error('Failed to update lead status');
      console.error(error);
    }
  };
  
  // Mock communication data - would come from API in real implementation
  const mockCommunications = [
    { id: '1', type: 'call', date: '2023-04-08T14:30:00Z', status: 'completed', notes: 'Discussed product features' },
    { id: '2', type: 'zoom', date: '2023-04-15T10:00:00Z', status: 'scheduled' },
    { id: '3', type: 'whatsapp', date: '2023-04-05T09:15:00Z', status: 'completed', notes: 'Sent pricing info' }
  ];
  
  const score = getLeadScore(lead);
  
  // Mock conversion score - would be calculated by AI in real implementation
  const getConversionScore = () => {
    if (score === 'hot') return 85;
    if (score === 'warm') return 60;
    return 30;
  };
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md lg:max-w-lg">
        <SheetHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">{lead.name}</SheetTitle>
            <div className="flex gap-2">
              <LeadStatusBadge status={lead.status} />
              <LeadScoreBadge score={score} />
            </div>
          </div>
          <SheetDescription className="flex flex-col">
            {lead.email && (
              <div className="flex items-center gap-2 text-sm">
                <MailPlus className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${lead.email}`} className="hover:underline">
                  {lead.email}
                </a>
              </div>
            )}
            {lead.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${lead.phone}`} className="hover:underline">
                  {lead.phone}
                </a>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Added on {new Date(lead.created_at).toLocaleDateString()}</span>
            </div>
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 flex space-x-2">
          <Button size="sm" onClick={() => window.open(`tel:${lead.phone}`)}>
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button size="sm" variant="outline" onClick={() => {
            if (lead.phone) {
              window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`);
            }
          }}>
            <MessageSquare className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
          <Button size="sm" variant="outline">
            <Video className="h-4 w-4 mr-2" />
            Zoom
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">AI Recommendations</CardTitle>
                <CardDescription>Personalized next steps</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Next Best Action</p>
                      <p className="text-sm text-muted-foreground">{getNextBestAction(lead)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Key Talking Points</p>
                      <ul className="text-sm text-muted-foreground list-disc pl-4">
                        <li>Focus on ROI benefits</li>
                        <li>Address pricing concerns early</li>
                        <li>Mention case studies in their industry</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Lead Details</CardTitle>
                <CardDescription>Campaign and conversion information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Campaign</p>
                      <p className="text-sm text-muted-foreground">
                        {lead.campaigns?.name || "No campaign"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Lead Source</p>
                      <p className="text-sm text-muted-foreground">Website Contact Form</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <LeadStatusBadge status={lead.status} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Score</p>
                      <LeadScoreBadge score={score} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Conversion Probability</span>
                      <span className="text-sm font-medium">{getConversionScore()}%</span>
                    </div>
                    <Progress value={getConversionScore()} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recent Communications</CardTitle>
                <CardDescription>Latest interactions with this lead</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCommunications.slice(0, 3).map(comm => (
                    <div key={comm.id} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        {comm.type === 'call' && <Phone className="h-4 w-4 text-blue-600" />}
                        {comm.type === 'zoom' && <Video className="h-4 w-4 text-purple-600" />}
                        {comm.type === 'whatsapp' && <MessageSquare className="h-4 w-4 text-green-600" />}
                        <div>
                          <p className="text-sm font-medium capitalize">{comm.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(comm.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant={comm.status === 'scheduled' ? 'outline' : 'secondary'}>
                        {comm.status === 'scheduled' ? (
                          <Clock className="mr-1 h-3 w-3" />
                        ) : null}
                        {comm.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Communication Timeline</CardTitle>
                <CardDescription>History of all interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 border-l">
                  {mockCommunications.map((comm, index) => (
                    <div 
                      key={comm.id} 
                      className={`relative pb-6 ${index === mockCommunications.length - 1 ? '' : ''}`}
                    >
                      <div className="absolute -left-[22px] h-4 w-4 rounded-full bg-background border-2 border-primary"></div>
                      <div className="mb-1">
                        <div className="flex items-center gap-2">
                          {comm.type === 'call' && <Phone className="h-4 w-4 text-blue-600" />}
                          {comm.type === 'zoom' && <Video className="h-4 w-4 text-purple-600" />}
                          {comm.type === 'whatsapp' && <MessageSquare className="h-4 w-4 text-green-600" />}
                          <p className="text-sm font-medium capitalize">{comm.type}</p>
                          <Badge variant={comm.status === 'scheduled' ? 'outline' : 'secondary'} className="ml-auto">
                            {comm.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(comm.date).toLocaleString()}
                        </p>
                      </div>
                      {comm.notes && (
                        <div className="mt-1 text-sm p-2 bg-muted rounded-md">
                          {comm.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notes & Attachments</CardTitle>
                <CardDescription>Add notes or upload files</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Add Note
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileUp className="h-4 w-4" />
                    Upload File
                  </Button>
                </div>
                
                <div className="space-y-4 pt-2">
                  <p className="text-sm text-muted-foreground text-center">
                    No notes or attachments yet
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Engagement Analytics</CardTitle>
                <CardDescription>Activity metrics and insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <p className="text-xs text-muted-foreground">Total Interactions</p>
                    <p className="text-2xl font-bold">{mockCommunications.length}</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-xs text-muted-foreground">Response Rate</p>
                    <p className="text-2xl font-bold">75%</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-xs text-muted-foreground">Avg. Response Time</p>
                    <p className="text-2xl font-bold">4.2h</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-xs text-muted-foreground">Last Activity</p>
                    <p className="text-2xl font-bold">2d ago</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Engagement Score</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Conversion Probability</span>
                    <span className="text-sm font-medium">{getConversionScore()}%</span>
                  </div>
                  <Progress value={getConversionScore()} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="absolute bottom-4 left-4 right-4">
          <SheetFooter className="flex-row justify-between items-center">
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete {lead.name} from your leads. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={() => handleStatusChange(lead.status === 'new' ? 'contacted' : 'qualified')}
              >
                {lead.status === 'new' ? 'Mark Contacted' : 'Mark Qualified'}
              </Button>
              
              <SheetClose asChild>
                <Button size="sm">Close</Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};
