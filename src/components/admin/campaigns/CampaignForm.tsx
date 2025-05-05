import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
const CampaignForm = ({ data, onChange, onSubmit, companies, isSubmitting }) => {
    return (<div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Campaign Name*</Label>
        <Input id="name" value={data.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="Summer Promotion 2025"/>
      </div>
      <div className="space-y-2">
        <Label htmlFor="platform">Platform</Label>
        <Select value={data.platform} onValueChange={(value) => onChange({ platform: value })}>
          <SelectTrigger id="platform">
            <SelectValue placeholder="Select platform"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Email">Email</SelectItem>
            <SelectItem value="SMS">SMS</SelectItem>
            <SelectItem value="Facebook">Facebook</SelectItem>
            <SelectItem value="Google">Google</SelectItem>
            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            <SelectItem value="Twitter">Twitter</SelectItem>
            <SelectItem value="Instagram">Instagram</SelectItem>
            <SelectItem value="TikTok">TikTok</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget">Budget ($)</Label>
        <Input id="budget" type="number" value={data.budget.toString()} onChange={(e) => onChange({ budget: parseFloat(e.target.value) || 0 })} placeholder="1000"/>
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Company*</Label>
        <Select value={data.company_id} onValueChange={(value) => onChange({ company_id: value })}>
          <SelectTrigger id="company">
            <SelectValue placeholder="Select company"/>
          </SelectTrigger>
          <SelectContent>
            {companies.map(company => (<SelectItem key={company.id} value={company.id}>
                {company.name}
              </SelectItem>))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onSubmit} disabled={isSubmitting || !data.name || !data.company_id} className="w-full mt-4">
        {isSubmitting ? (<>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            Creating...
          </>) : ("Create Campaign")}
      </Button>
    </div>);
};
export default CampaignForm;
