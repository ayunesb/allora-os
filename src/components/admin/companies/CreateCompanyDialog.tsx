
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface CreateCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateCompany: (companyData: { name: string; industry: string }) => Promise<void>;
}

export function CreateCompanyDialog({ open, onOpenChange, onCreateCompany }: CreateCompanyDialogProps) {
  const [newCompany, setNewCompany] = useState({
    name: '',
    industry: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCompany = async () => {
    if (!newCompany.name) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onCreateCompany(newCompany);
      // Reset form after successful creation
      setNewCompany({
        name: '',
        industry: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Company</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name*</Label>
            <Input 
              id="name" 
              value={newCompany.name}
              onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
              placeholder="Acme Inc." 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input 
              id="industry" 
              value={newCompany.industry}
              onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
              placeholder="Technology" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleCreateCompany}
            disabled={isSubmitting || !newCompany.name}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Company"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
