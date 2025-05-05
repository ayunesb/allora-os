import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Video, Users, MessageSquare, Copy } from "lucide-react";
const zoomMeetingSchema = z.object({
    topic: z.string().min(3, { message: "Meeting topic is required" }),
    agenda: z.string().optional(),
    duration: z.string().min(1, { message: "Duration is required" }),
    date: z.string().min(1, { message: "Date is required" }),
    time: z.string().min(1, { message: "Time is required" }),
    timezone: z.string().optional()
});
export default function AiZoomAssistant() {
    const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
    const [meetingLink, setMeetingLink] = useState(null);
    const [botPrompt, setBotPrompt] = useState("");
    const [botMessages, setBotMessages] = useState([
        {
            sender: "AI Assistant",
            content: "I'm your Zoom co-host AI. I can help you set up meetings and prepare talking points based on your company materials. What would you like to discuss with your lead?"
        }
    ]);
    const [isLoadingBot, setIsLoadingBot] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(zoomMeetingSchema),
        defaultValues: {
            topic: "",
            agenda: "",
            duration: "30",
            date: new Date().toISOString().split('T')[0],
            time: "10:00",
            timezone: "America/New_York"
        }
    });
    const onSubmit = async (data) => {
        setIsCreatingMeeting(true);
        try {
            // Simulating creating a Zoom meeting
            // In a real app, this would call a backend function that uses the Zoom API
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Mock success response
            const mockMeetingLink = `https://zoom.us/j/${Math.floor(100000000 + Math.random() * 900000000)}`;
            setMeetingLink(mockMeetingLink);
            toast.success("Zoom meeting created successfully!");
        }
        catch (error) {
            console.error("Error creating Zoom meeting:", error);
            toast.error("Failed to create Zoom meeting");
        }
        finally {
            setIsCreatingMeeting(false);
        }
    };
    const sendMessage = async () => {
        if (!botPrompt.trim())
            return;
        const userMessage = { sender: "You", content: botPrompt };
        setBotMessages(prev => [...prev, userMessage]);
        setBotPrompt("");
        setIsLoadingBot(true);
        try {
            // In a real app, this would call OpenAI or another AI service
            // Here we're simulating a response
            await new Promise(resolve => setTimeout(resolve, 1200));
            const botResponse = {
                sender: "AI Assistant",
                content: "Based on your input, I recommend focusing on the product's ROI and time-saving features during your meeting. Would you like me to prepare some specific talking points based on your company's use cases?"
            };
            setBotMessages(prev => [...prev, botResponse]);
        }
        catch (error) {
            console.error("Error getting AI response:", error);
            toast.error("Failed to get AI response");
        }
        finally {
            setIsLoadingBot(false);
        }
    };
    const copyToClipboard = () => {
        if (meetingLink) {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Meeting link copied to clipboard");
        }
    };
    return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5 text-blue-600"/>
            Create Zoom Meeting
          </CardTitle>
          <CardDescription>
            Schedule a Zoom meeting and get AI assistance during the call
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="topic" className="text-sm font-medium">Meeting Topic</label>
              <Controller control={control} name="topic" render={({ field }) => (<Input id="topic" placeholder="Product Demo with Client" {...field}/>)}/>
              {errors.topic && (<p className="text-xs text-destructive">{errors.topic.message}</p>)}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="agenda" className="text-sm font-medium">Agenda (Optional)</label>
              <Controller control={control} name="agenda" render={({ field }) => (<Textarea id="agenda" placeholder="Discuss product features, pricing, and implementation timeline" {...field}/>)}/>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">Date</label>
                <Controller control={control} name="date" render={({ field }) => (<Input id="date" type="date" {...field}/>)}/>
                {errors.date && (<p className="text-xs text-destructive">{errors.date.message}</p>)}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium">Time</label>
                <Controller control={control} name="time" render={({ field }) => (<Input id="time" type="time" {...field}/>)}/>
                {errors.time && (<p className="text-xs text-destructive">{errors.time.message}</p>)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="duration" className="text-sm font-medium">Duration (minutes)</label>
                <Controller control={control} name="duration" render={({ field }) => (<Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>)}/>
                {errors.duration && (<p className="text-xs text-destructive">{errors.duration.message}</p>)}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="timezone" className="text-sm font-medium">Timezone</label>
                <Controller control={control} name="timezone" render={({ field }) => (<Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      </SelectContent>
                    </Select>)}/>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            {meetingLink ? (<div className="w-full space-y-3">
                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                  <Input value={meetingLink} readOnly className="bg-background"/>
                  <Button type="button" variant="outline" size="icon" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4"/>
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setMeetingLink(null)}>
                    Create Another
                  </Button>
                  <Button type="button">
                    Add to Calendar
                  </Button>
                </div>
              </div>) : (<Button type="submit" className="w-full" disabled={isCreatingMeeting}>
                {isCreatingMeeting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                Create Zoom Meeting
              </Button>)}
          </CardFooter>
        </form>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600"/>
            AI Zoom Co-host
          </CardTitle>
          <CardDescription>
            Your AI assistant will help during Zoom calls with leads
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {botMessages.map((message, index) => (<div key={index} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] ${message.sender === 'You'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'}`}>
                  <p className="text-xs font-medium mb-1">{message.sender}</p>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>))}
            {isLoadingBot && (<div className="flex justify-start">
                <div className="rounded-lg px-4 py-2 bg-muted">
                  <Loader2 className="h-4 w-4 animate-spin"/>
                </div>
              </div>)}
          </div>
          
          <div className="flex gap-2">
            <Input value={botPrompt} onChange={(e) => setBotPrompt(e.target.value)} placeholder="Ask your AI co-host..." onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        }}/>
            <Button type="button" onClick={sendMessage} disabled={isLoadingBot || !botPrompt.trim()}>
              {isLoadingBot ? <Loader2 className="h-4 w-4 animate-spin"/> : <MessageSquare className="h-4 w-4"/>}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <p className="text-xs text-muted-foreground">
            Your AI co-host can introduce your company, follow up with questions, and summarize meetings. 
            It learns from your company documents and previous interactions.
          </p>
        </CardFooter>
      </Card>
    </div>);
}
