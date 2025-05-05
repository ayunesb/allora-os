import React, { useState } from 'react';
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useLeads } from '@/hooks/admin/useLeads';
export const AddLeadDialog = ({ onLeadAdded, campaigns, isMobileView }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [campaignId, setCampaignId] = useState('');
    const [status, setStatus] = useState('new');
    const { addLead, isAddingLead } = useLeads();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const lead = await addLead({
            name,
            email,
            phone,
            campaign_id: campaignId,
            status
        });
        if (lead) {
            resetForm();
            setOpen(false);
            onLeadAdded();
        }
    };
    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setCampaignId('');
        setStatus('new');
    };
    return (<Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusCircle className="h-4 w-4 mr-2"/>
          {isMobileView ? 'Add' : 'Add Lead'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
            <DialogDescription>
              Create a new lead in the system. Fill out the required information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="col-span-3"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign" className="text-right">
                Campaign
              </Label>
              <Select value={campaignId} onValueChange={setCampaignId} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a campaign"/>
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map(campaign => (<SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={status} onValueChange={(value) => setStatus(value)} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isAddingLead}>
              {isAddingLead ? 'Adding...' : 'Add Lead'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>);
};
