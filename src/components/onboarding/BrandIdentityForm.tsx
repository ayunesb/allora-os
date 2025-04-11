
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PartialCompanyDetails } from "@/models/companyDetails";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BrandIdentityFormProps {
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
}

// Brand tone options
const brandTones = [
  { value: "formal", label: "Formal" },
  { value: "friendly", label: "Friendly" },
  { value: "bold", label: "Bold" },
  { value: "creative", label: "Creative" },
  { value: "innovative", label: "Innovative" },
  { value: "premium", label: "Premium" },
];

export function BrandIdentityForm({
  companyDetails,
  updateCompanyDetails,
}: BrandIdentityFormProps) {
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);

  // Handle color change
  const handleColorChange = (field: string, value: string) => {
    updateCompanyDetails({
      ...companyDetails,
      [field]: value,
    });
  };

  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // For a real implementation, you would upload this file to your storage
      // and get back a URL. For now, we'll just create a local preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreviewLogo(dataUrl);
        updateCompanyDetails({
          ...companyDetails,
          logoUrl: "upload_placeholder", // In a real implementation, this would be the actual URL
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Brand Identity</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Help us understand your brand style and visual identity.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="logo-upload">Company Logo</Label>
          <div className="flex items-center gap-4">
            <div 
              className="w-24 h-24 border-2 border-dashed border-muted rounded-md flex items-center justify-center overflow-hidden"
            >
              {previewLogo ? (
                <img src={previewLogo} alt="Logo preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <Upload className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
              <Button 
                variant="outline" 
                onClick={() => document.getElementById("logo-upload")?.click()}
                type="button"
              >
                Upload Logo
              </Button>
              <p className="text-xs text-muted-foreground mt-1">
                Recommended: Square image, at least 200x200px
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primary-color">Primary Brand Color</Label>
            <div className="flex gap-2">
              <Input
                id="primary-color"
                type="color"
                value={companyDetails.primaryColor || "#000000"}
                onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                value={companyDetails.primaryColor || "#000000"}
                onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondary-color">Secondary Brand Color</Label>
            <div className="flex gap-2">
              <Input
                id="secondary-color"
                type="color"
                value={companyDetails.secondaryColor || "#ffffff"}
                onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                value={companyDetails.secondaryColor || "#ffffff"}
                onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                placeholder="#ffffff"
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Label htmlFor="brand-tone">Brand Tone</Label>
          <Select
            value={companyDetails.brandTone || ""}
            onValueChange={(value) => updateCompanyDetails({ ...companyDetails, brandTone: value })}
          >
            <SelectTrigger id="brand-tone">
              <SelectValue placeholder="Select brand tone" />
            </SelectTrigger>
            <SelectContent>
              {brandTones.map((tone) => (
                <SelectItem key={tone.value} value={tone.value}>
                  {tone.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
