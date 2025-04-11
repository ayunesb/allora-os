import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PartialCompanyDetails } from "@/models/companyDetails";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CommunicationPreferencesFormProps {
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
}

// Sales style preferences
const salesStyles = [
  { value: "consultative", label: "Consultative" },
  { value: "hard_selling", label: "Hard Selling" },
  { value: "inbound_focused", label: "Inbound Focused" },
  { value: "product_led", label: "Product-Led Growth" },
  { value: "relationship_based", label: "Relationship-Based Selling" },
];

// Communication channels options
const communicationChannels = [
  { id: "email", label: "Email", key: "emailEnabled" },
  { id: "whatsapp", label: "WhatsApp", key: "whatsAppEnabled" },
  { id: "phone", label: "Phone Calls", key: "phoneEnabled" },
  { id: "zoom", label: "Zoom Meetings", key: "zoomEnabled" },
];

export function CommunicationPreferencesForm({
  companyDetails,
  updateCompanyDetails,
}: CommunicationPreferencesFormProps) {
  // Handle toggling communication channels
  const toggleChannel = (channelKey: string) => {
    updateCompanyDetails({
      ...companyDetails,
      [channelKey]: !companyDetails[channelKey],
    });
    
    // Also update the channels array to keep both in sync
    const channels = companyDetails.communicationChannels || [];
    const channelId = channelKey.replace('Enabled', '').toLowerCase();
    
    if (!companyDetails[channelKey]) {
      updateCompanyDetails({
        communicationChannels: [...channels, channelId]
      });
    } else {
      updateCompanyDetails({
        communicationChannels: channels.filter(c => c !== channelId)
      });
    }
  };

  // Handle changing sales style
  const handleSalesStyleChange = (value: string) => {
    updateCompanyDetails({
      ...companyDetails,
      salesStylePreference: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Communication Preferences</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us how you prefer to communicate with your customers and partners.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-3">Preferred Communication Channels</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {communicationChannels.map((channel) => (
              <div key={channel.id} className="flex items-center space-x-2">
                <Checkbox
                  id={channel.id}
                  checked={!!companyDetails[channel.key]}
                  onCheckedChange={() => toggleChannel(channel.key)}
                />
                <label
                  htmlFor={channel.id}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {channel.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Label htmlFor="sales-style">Sales Style Preference</Label>
          <Select
            value={companyDetails.salesStylePreference || ""}
            onValueChange={handleSalesStyleChange}
          >
            <SelectTrigger id="sales-style">
              <SelectValue placeholder="Select sales style" />
            </SelectTrigger>
            <SelectContent>
              {salesStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
