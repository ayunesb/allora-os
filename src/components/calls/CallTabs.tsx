
import React from "react";
import { FileText, Send as SendIcon, PhoneCall } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CallTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export default function CallTabs({ activeTab, onTabChange }: CallTabsProps) {
  return (
    <TabsList className="grid w-full md:w-auto grid-cols-3">
      <TabsTrigger value="scripts">
        <FileText className="mr-2 h-4 w-4" />
        Call Scripts
      </TabsTrigger>
      <TabsTrigger value="messages">
        <SendIcon className="mr-2 h-4 w-4" />
        Message Templates
      </TabsTrigger>
      <TabsTrigger value="dialer">
        <PhoneCall className="mr-2 h-4 w-4" />
        Call & Message
      </TabsTrigger>
    </TabsList>
  );
}
