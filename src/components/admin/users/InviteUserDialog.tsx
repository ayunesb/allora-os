
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, UserPlus } from 'lucide-react';
import { inviteUserToCompany } from '@/utils/users'; // Import directly from users module
import { toast } from 'sonner';
import { useBreakpoint } from '@/hooks/use-mobile';

interface Company {
  id: string;
  name: string;
}

interface InviteUserDialogProps {
  companies: Company[];
  loadingCompanies: boolean;
  onSuccess: () => void;
}

export const InviteUserDialog = ({ companies, loadingCompanies, onSuccess }: InviteUserDialogProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);

  const handleInviteUser = async () => {
    if (!email) {
      toast.error('Email is required');
      return;
    }
    
    if (!company) {
      toast.error('Please select a company');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const success = await inviteUserToCompany(email, company, role);
      if (success) {
        toast.success('User invitation sent successfully');
        setOpen(false);
        setEmail('');
        setRole('user');
        onSuccess();
      }
    } catch (error) {
      console.error('Error inviting user:', error);
      toast.error('Failed to send invitation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`${isMobileView ? "w-full" : ""} bg-[#5A67D8] hover:bg-[#4C5BC7] text-white`}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className={`${isMobileView ? "w-[calc(100%-32px)] p-4" : "sm:max-w-md"} bg-[#1A1F2C] text-white border-white/10`}>
        <DialogHeader>
          <DialogTitle>Invite New User</DialogTitle>
          <DialogDescription className="text-gray-400">
            Send an invitation email to add a new user to the platform.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email Address</Label>
            <Input 
              id="email" 
              placeholder="user@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0F1729] border-white/10 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" className="text-gray-300">Company</Label>
            <Select 
              value={company} 
              onValueChange={setCompany}
              disabled={loadingCompanies}
            >
              <SelectTrigger className="w-full bg-[#0F1729] border-white/10 text-white">
                <SelectValue placeholder={loadingCompanies ? "Loading companies..." : "Select company"} />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-white/10 text-white">
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                ))}
                {companies.length === 0 && !loadingCompanies && (
                  <SelectItem value="no-companies" disabled>No companies available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-gray-300">User Role</Label>
            <Select 
              value={role} 
              onValueChange={(value) => setRole(value as 'admin' | 'user')}
            >
              <SelectTrigger className="w-full bg-[#0F1729] border-white/10 text-white">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1F2C] border-white/10 text-white">
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className={isMobileView ? "flex-col space-y-2" : ""}>
          <Button 
            type="submit" 
            onClick={handleInviteUser} 
            disabled={isSubmitting || !email || !company}
            className={`${isMobileView ? "w-full" : "w-full sm:w-auto"} bg-[#5A67D8] hover:bg-[#4C5BC7] text-white`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Invitation"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
