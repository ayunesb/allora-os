
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Users } from 'lucide-react';
import useAdminFunctions from '@/hooks/useAdminFunctions';

export default function AdminCompanies() {
  const { 
    companies, 
    loadCompanies, 
    isLoading, 
    updateCompany, 
    deleteCompany,
    loadCompanyUsers,
    selectedCompany,
    setSelectedCompany,
    companyUsers
  } = useAdminFunctions();

  useEffect(() => {
    // Load companies when component mounts
    loadCompanies();
  }, [loadCompanies]);

  const handleViewUsers = (companyId: string) => {
    if (selectedCompany === companyId) {
      setSelectedCompany(null);
    } else {
      loadCompanyUsers(companyId);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-6 pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Company Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage all registered companies
          </p>
        </div>
        <Button>Add New Company</Button>
      </div>
      
      <Card className="border-primary/10 shadow-md mb-8">
        <CardHeader className="pb-2">
          <CardTitle>Registered Companies</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && companies.length === 0 ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No companies found
                    </TableCell>
                  </TableRow>
                ) : (
                  companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{company.industry}</Badge>
                      </TableCell>
                      <TableCell>{new Date(company.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewUsers(company.id)}
                          >
                            <Users className="mr-1 h-4 w-4" />
                            {selectedCompany === company.id ? 'Hide Users' : 'View Users'}
                          </Button>
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive/90"
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete company ${company.name}?`)) {
                                deleteCompany(company.id);
                              }
                            }}
                          >
                            Delete
                          </Button>
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

      {/* Company Users Table (shown when a company is selected) */}
      {selectedCompany && (
        <Card className="border-primary/10 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle>
              {companies.find(c => c.id === selectedCompany)?.name} - Users
            </CardTitle>
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
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companyUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No users found for this company
                      </TableCell>
                    </TableRow>
                  ) : (
                    companyUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? "default" : "secondary"}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
