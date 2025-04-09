
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Company } from "@/models/company";
import { Loader2, Plus, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import useAdminFunctions from '@/hooks/useAdminFunctions';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function AdminCompanies() {
  const { loadCompanyUsers, setSelectedCompany } = useAdminFunctions();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '',
    industry: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    setIsLoading(true);
    try {
      // Get all companies
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setCompanies(data || []);
    } catch (error: any) {
      console.error('Error loading companies:', error);
      toast.error('Failed to load companies: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCompany = async () => {
    if (!newCompany.name) {
      toast.error('Company name is required');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('companies')
        .insert([
          {
            name: newCompany.name,
            industry: newCompany.industry
          }
        ])
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success('Company created successfully');
      setCompanies([data, ...companies]);
      setOpenAddDialog(false);
      setNewCompany({
        name: '',
        industry: ''
      });
    } catch (error: any) {
      console.error('Error creating company:', error);
      toast.error('Failed to create company: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewUsers = (companyId: string) => {
    setSelectedCompany(companyId);
    loadCompanyUsers(companyId);
    // Navigate to company users view or show a modal
    // For this example, let's assume we just redirect to the users tab
    window.location.href = '/admin/users';
  };

  return (
    <div className="container mx-auto px-4 pt-6 pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Company Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage organizations in the platform
          </p>
        </div>
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </DialogTrigger>
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
      </div>
      
      <Card className="border-primary/10 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Companies</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No companies found. Add your first company to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.industry || 'Not specified'}</TableCell>
                      <TableCell>{new Date(company.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewUsers(company.id)}
                          >
                            <Users className="h-4 w-4 mr-1" />
                            Users
                          </Button>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
