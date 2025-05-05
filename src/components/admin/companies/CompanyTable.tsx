import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Users, Pencil, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export function CompanyTable({ companies, isLoading, onViewUsers, onEditCompany, onDeleteCompany }) {
    if (isLoading) {
        return (<div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary"/>
      </div>);
    }
    return (<TooltipProvider>
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
          {companies.length === 0 ? (<TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                No companies found. Add your first company to get started.
              </TableCell>
            </TableRow>) : (companies.map((company) => (<TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.industry || 'Not specified'}</TableCell>
                <TableCell>{new Date(company.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => onViewUsers(company.id)}>
                          <Users className="h-4 w-4 mr-1"/>
                          Users
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        View company users
                      </TooltipContent>
                    </Tooltip>
                    
                    {onEditCompany && (<Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => onEditCompany(company)}>
                            <Pencil className="h-4 w-4 mr-1"/>
                            Edit
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Edit company details
                        </TooltipContent>
                      </Tooltip>)}
                    
                    {onDeleteCompany && (<Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => onDeleteCompany(company.id)}>
                            <Trash2 className="h-4 w-4 mr-1"/>
                            Delete
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Delete this company
                        </TooltipContent>
                      </Tooltip>)}
                  </div>
                </TableCell>
              </TableRow>)))}
        </TableBody>
      </Table>
    </TooltipProvider>);
}
