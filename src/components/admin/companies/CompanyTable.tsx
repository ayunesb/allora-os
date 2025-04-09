
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Users } from 'lucide-react';
import { Company } from "@/models/company";

interface CompanyTableProps {
  companies: Company[];
  isLoading: boolean;
  onViewUsers: (companyId: string) => void;
}

export function CompanyTable({ companies, isLoading, onViewUsers }: CompanyTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
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
                    onClick={() => onViewUsers(company.id)}
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
  );
}
