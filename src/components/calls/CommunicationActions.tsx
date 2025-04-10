
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Video, MessageSquare } from "lucide-react";
import ZoomScheduler from "./ZoomScheduler";
import WhatsAppSender from "./WhatsAppSender";
import PhoneDialer from "./PhoneDialer";

export default function CommunicationActions() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [activeTab, setActiveTab] = useState<"phone" | "zoom" | "whatsapp">("phone");
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Communication Tools</CardTitle>
        <CardDescription>Call, message, or schedule meetings with leads</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="phone" value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="phone" className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>Call</span>
            </TabsTrigger>
            <TabsTrigger value="zoom" className="flex items-center space-x-1">
              <Video className="h-4 w-4" />
              <span>Zoom</span>
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="phone">
            <PhoneDialer 
              phoneNumber={phoneNumber} 
              onPhoneNumberChange={setPhoneNumber}
            />
          </TabsContent>
          
          <TabsContent value="zoom">
            <ZoomScheduler />
          </TabsContent>
          
          <TabsContent value="whatsapp">
            <WhatsAppSender 
              phoneNumber={phoneNumber} 
              onPhoneNumberChange={setPhoneNumber}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
