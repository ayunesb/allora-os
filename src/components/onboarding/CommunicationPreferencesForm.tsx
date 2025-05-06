import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAccessibility } from "@/context/AccessibilityContext";
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
}) {
  const { highContrast, screenReaderFriendly } = useAccessibility();
  // Handle toggling communication channels
  const toggleChannel = (channelKey) => {
    updateCompanyDetails({
      ...companyDetails,
      [channelKey]: !companyDetails[channelKey],
    });
    // Also update the channels array to keep both in sync
    const channels = companyDetails.communicationChannels || [];
    const channelId = channelKey.replace("Enabled", "").toLowerCase();
    if (!companyDetails[channelKey]) {
      updateCompanyDetails({
        communicationChannels: [...channels, channelId],
      });
      toast.success(
        `${channelId.charAt(0).toUpperCase() + channelId.slice(1)} channel enabled`,
      );
    } else {
      updateCompanyDetails({
        communicationChannels: channels.filter((c) => c !== channelId),
      });
      toast.info(
        `${channelId.charAt(0).toUpperCase() + channelId.slice(1)} channel disabled`,
      );
    }
  };
  // Handle changing sales style
  const handleSalesStyleChange = (value) => {
    updateCompanyDetails({
      ...companyDetails,
      salesStylePreference: value,
    });
    // Show success toast
    const selectedStyle = salesStyles.find((style) => style.value === value);
    if (selectedStyle) {
      toast.success(`Sales style updated to: ${selectedStyle.label}`);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Communication Preferences</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us how you prefer to communicate with your customers and
          partners.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-3">
            Preferred Communication Channels
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
            role={screenReaderFriendly ? "group" : undefined}
            aria-label={
              screenReaderFriendly ? "Communication channel options" : undefined
            }
          >
            {communicationChannels.map((channel) => (
              <div key={channel.id} className="flex items-center space-x-2">
                <Checkbox
                  id={channel.id}
                  checked={!!companyDetails[channel.key]}
                  onCheckedChange={() => toggleChannel(channel.key)}
                  aria-label={`Enable ${channel.label}`}
                />
                <label
                  htmlFor={channel.id}
                  className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${highContrast ? "text-foreground" : ""}`}
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
            aria-label="Select your sales style preference"
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

          {!companyDetails.salesStylePreference && (
            <p className="text-xs text-amber-500 mt-1">
              Please select a sales style preference to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
