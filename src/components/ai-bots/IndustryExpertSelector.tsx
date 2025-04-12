
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  industrySpecificExecutives,
  executiveIndustryExpertise 
} from "@/backend/executiveBots";

interface IndustryExpertSelectorProps {
  onSelectExpert: (expert: { name: string; role: string; industry: string }) => void;
}

export const IndustryExpertSelector: React.FC<IndustryExpertSelectorProps> = ({ onSelectExpert }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  
  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
    setSelectedRole("");
  };
  
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };
  
  const handleExpertSelect = (name: string) => {
    if (selectedIndustry && selectedRole) {
      onSelectExpert({
        name,
        role: selectedRole,
        industry: selectedIndustry
      });
    }
  };

  // Get available roles for selected industry
  const getAvailableRoles = () => {
    if (!selectedIndustry) return [];
    return Object.keys(industrySpecificExecutives[selectedIndustry as keyof typeof industrySpecificExecutives] || {});
  };
  
  // Get available executives for selected industry and role
  const getAvailableExperts = () => {
    if (!selectedIndustry || !selectedRole) return [];
    const industry = industrySpecificExecutives[selectedIndustry as keyof typeof industrySpecificExecutives];
    if (!industry) return [];
    return industry[selectedRole as keyof typeof industry] || [];
  };
  
  // Get expertise areas for selected industry
  const getExpertiseAreas = () => {
    if (!selectedIndustry) return [];
    return executiveIndustryExpertise[selectedIndustry as keyof typeof executiveIndustryExpertise] || [];
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Industry-Specific Executive Experts</h3>
        <p className="text-sm text-muted-foreground">
          Select an executive with specialized knowledge in your industry
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="industry">Select Industry</Label>
            <Select 
              value={selectedIndustry} 
              onValueChange={handleIndustryChange}
            >
              <SelectTrigger id="industry">
                <SelectValue placeholder="Choose an industry" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(industrySpecificExecutives).map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry.charAt(0).toUpperCase() + industry.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedIndustry && (
            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <Select 
                value={selectedRole} 
                onValueChange={handleRoleChange}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Choose a role" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableRoles().map(role => (
                    <SelectItem key={role} value={role}>
                      {role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {selectedIndustry && (
            <div className="pt-2">
              <Label className="text-sm mb-2 block">Industry Expertise</Label>
              <div className="flex flex-wrap gap-2">
                {getExpertiseAreas().map(expertise => (
                  <Badge key={expertise} variant="outline" className="bg-primary/10">
                    {expertise}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {selectedRole && selectedIndustry && (
          <Card className="border border-muted">
            <CardContent className="pt-6">
              <h4 className="font-medium mb-2">Available Experts</h4>
              <Separator className="my-2" />
              <ul className="space-y-2 mt-4">
                {getAvailableExperts().map(expert => (
                  <li key={expert}>
                    <button
                      onClick={() => handleExpertSelect(expert)}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-primary/10 transition-colors"
                    >
                      {expert}
                    </button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
