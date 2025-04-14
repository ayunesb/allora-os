
import { useState, useEffect } from "react";
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
import { Upload, ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
  const [brandStylePreview, setBrandStylePreview] = useState<string>("This is how your brand message will appear to users.");

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
          logoUrl: dataUrl, // In a real implementation, this would be the actual URL
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear the logo
  const handleClearLogo = () => {
    setPreviewLogo(null);
    updateCompanyDetails({
      ...companyDetails,
      logoUrl: "",
    });
  };

  // Update preview based on selected brand tone and colors
  useEffect(() => {
    let styleDescription = "This is how your brand message will appear.";
    
    switch(companyDetails.brandTone) {
      case "formal":
        styleDescription = "Your brand uses professional, straightforward language.";
        break;
      case "friendly":
        styleDescription = "Your brand uses approachable, conversational language.";
        break;
      case "bold":
        styleDescription = "Your brand makes strong statements with confidence.";
        break;
      case "creative":
        styleDescription = "Your brand uses imaginative language to inspire.";
        break;
      case "innovative":
        styleDescription = "Your brand focuses on future-oriented, progressive messaging.";
        break;
      case "premium":
        styleDescription = "Your brand emphasizes quality and exclusivity.";
        break;
      default:
        styleDescription = "Select a brand tone to see a preview.";
    }
    
    setBrandStylePreview(styleDescription);
  }, [companyDetails.brandTone]);

  // Set up initial preview logo if logoUrl exists
  useEffect(() => {
    if (companyDetails.logoUrl) {
      setPreviewLogo(companyDetails.logoUrl);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="logo-upload">Company Logo</Label>
          <div className="flex items-center gap-4">
            <div 
              className="w-24 h-24 border-2 border-dashed border-muted rounded-md flex items-center justify-center overflow-hidden bg-muted/10"
            >
              {previewLogo ? (
                <img src={previewLogo} alt="Logo preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
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
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById("logo-upload")?.click()}
                  type="button"
                  size="sm"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </Button>
                {previewLogo && (
                  <Button
                    variant="outline"
                    onClick={handleClearLogo}
                    type="button"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Recommended: Square image, at least 200x200px
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

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
            <p className="text-xs text-muted-foreground">
              Used for buttons, links, and important UI elements
            </p>
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
            <p className="text-xs text-muted-foreground">
              Used for accents, highlights, and supporting elements
            </p>
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
          <p className="text-xs text-muted-foreground">
            Defines how your brand communicates with your audience
          </p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-2">
          <Label>Brand Style Preview</Label>
          <Card className="overflow-hidden">
            <div 
              className="h-2" 
              style={{ backgroundColor: companyDetails.primaryColor || "#4F46E5" }}
            ></div>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                {previewLogo ? (
                  <img src={previewLogo} alt="Logo" className="h-8 w-8 object-contain" />
                ) : (
                  <div 
                    className="h-8 w-8 rounded flex items-center justify-center" 
                    style={{ backgroundColor: companyDetails.secondaryColor || "#10B981" }}
                  >
                    <span className="text-xs font-bold text-white">
                      {companyDetails.name?.substring(0, 1) || "A"}
                    </span>
                  </div>
                )}
                <span className="font-medium">{companyDetails.name || "Your Company"}</span>
              </div>
              
              <p className="text-sm mb-3">{brandStylePreview}</p>
              
              <div className="flex flex-wrap gap-2">
                <Badge 
                  style={{ 
                    backgroundColor: companyDetails.primaryColor || "#4F46E5", 
                    color: "#ffffff" 
                  }}
                >
                  Primary Button
                </Badge>
                <Badge 
                  variant="outline" 
                  style={{ 
                    borderColor: companyDetails.secondaryColor || "#10B981",
                    color: companyDetails.secondaryColor || "#10B981"
                  }}
                >
                  Secondary Button
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
