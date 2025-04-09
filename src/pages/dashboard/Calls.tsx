
import { useState } from "react";
import { Phone, Play, Download, FileText, PhoneCall, User, Loader2, Send as SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sendSMS } from "@/utils/twilioHelpers";
import { toast } from "sonner";
import { makeCall } from "@/utils/callHelpers";

export default function Calls() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isCallingLoading, setIsCallingLoading] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [activeTab, setActiveTab] = useState("scripts");

  const callScripts = [
    {
      title: "B2B SaaS Introduction",
      target: "Tech Startups",
      duration: "2-3 min",
      status: "Ready",
    },
    {
      title: "Follow-up Script",
      target: "Previous Contacts",
      duration: "1-2 min",
      status: "Ready",
    },
    {
      title: "Enterprise Solution Pitch",
      target: "Fortune 500",
      duration: "4-5 min",
      status: "In Progress",
    },
  ];

  const handleCall = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    setIsCallingLoading(true);
    try {
      await makeCall(phoneNumber);
      toast.success("Call initiated successfully");
    } catch (error) {
      console.error("Call error:", error);
      toast.error("Failed to initiate call");
    } finally {
      setIsCallingLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    setIsSendingMessage(true);
    try {
      const result = await sendSMS(phoneNumber, message);
      if (result) {
        toast.success("Message sent successfully");
        setMessage("");
      }
    } catch (error) {
      console.error("SMS error:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-8">
        <Phone className="h-8 w-8 text-primary mr-3" />
        <h1 className="text-3xl font-bold">Call Center</h1>
      </div>
      
      <p className="text-xl text-gray-300 mb-6">
        Make calls, send messages, and manage call scripts
      </p>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="scripts">
            <FileText className="mr-2 h-4 w-4" />
            Call Scripts
          </TabsTrigger>
          <TabsTrigger value="dialer">
            <PhoneCall className="mr-2 h-4 w-4" />
            Call & Message
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="scripts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {callScripts.map((script, index) => (
              <div key={index} className="dashboard-card">
                <h3 className="text-xl font-bold mb-4">{script.title}</h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target:</span>
                    <span>{script.target}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span>{script.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={script.status === "Ready" ? "text-green-400" : "text-amber-400"}>
                      {script.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {script.status === "Ready" ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setActiveTab("dialer")}>
                        <Play className="mr-2 h-4 w-4" />
                        Use
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </>
                  ) : (
                    <Button disabled variant="outline" size="sm" className="w-full">
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-secondary/40 border border-border/50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Generate New Call Script</h2>
            <p className="text-gray-300 mb-4">
              Our AI will create a persuasive cold call script tailored to your target audience.
            </p>
            <Button className="allora-button">
              <FileText className="mr-2 h-4 w-4" />
              Create New Script
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="dialer">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Make a Call</CardTitle>
                <CardDescription>Call potential customers or leads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="call-phone">Phone Number</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="call-phone" 
                      placeholder="+1 (555) 123-4567" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <Button onClick={handleCall} disabled={isCallingLoading}>
                      {isCallingLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Calling...
                        </>
                      ) : (
                        <>
                          <PhoneCall className="mr-2 h-4 w-4" />
                          Call
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>Calls are made using your connected Twilio account.</p>
                  <p>Standard rates apply based on your Twilio plan.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Send SMS</CardTitle>
                <CardDescription>Send text messages to leads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sms-phone">Phone Number</Label>
                  <Input 
                    id="sms-phone" 
                    placeholder="+1 (555) 123-4567" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-message">Message</Label>
                  <div className="flex flex-col space-y-2">
                    <textarea 
                      id="sms-message" 
                      rows={3} 
                      className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      placeholder="Enter your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={isSendingMessage}
                      className="self-end"
                    >
                      {isSendingMessage ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <SendIcon className="mr-2 h-4 w-4" />
                          Send
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
