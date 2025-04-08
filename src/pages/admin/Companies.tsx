
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Company } from "@/models/company";

export default function AdminCompanies() {
  // Mock company data - in a real application, this would come from Supabase
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "Acme Corp",
      industry: "Technology",
      created_at: "2023-01-01T00:00:00Z"
    },
    {
      id: "2",
      name: "Globex Industries",
      industry: "Manufacturing",
      created_at: "2023-02-01T00:00:00Z"
    },
    {
      id: "3",
      name: "Stark Enterprises",
      industry: "Energy",
      created_at: "2023-03-01T00:00:00Z"
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Company Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage all registered companies
            </p>
          </div>
          <Button>Add New Company</Button>
        </div>
        
        <Card className="border-primary/10 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle>Registered Companies</CardTitle>
          </CardHeader>
          <CardContent>
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
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{company.industry}</Badge>
                    </TableCell>
                    <TableCell>{new Date(company.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
