
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "closed";
  score: number;
};

const mockLeads: Lead[] = [
  { 
    id: "1", 
    name: "Alex Johnson", 
    company: "TechCorp Inc.", 
    email: "alex@techcorp.com", 
    phone: "(555) 123-4567", 
    status: "new", 
    score: 85 
  },
  { 
    id: "2", 
    name: "Sarah Williams", 
    company: "Global Solutions", 
    email: "sarah@globalsolutions.com", 
    phone: "(555) 234-5678", 
    status: "contacted", 
    score: 72 
  },
  { 
    id: "3", 
    name: "David Miller", 
    company: "Innovative Systems", 
    email: "david@innovative.com", 
    phone: "(555) 345-6789", 
    status: "qualified", 
    score: 91 
  },
  { 
    id: "4", 
    name: "Jessica Brown", 
    company: "Future Enterprises", 
    email: "jessica@future.com", 
    phone: "(555) 456-7890", 
    status: "proposal", 
    score: 68 
  },
];

export default function AdminLeads() {
  const renderStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30">{status}</Badge>;
      case 'contacted':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30">{status}</Badge>;
      case 'qualified':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30">{status}</Badge>;
      case 'proposal':
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30">{status}</Badge>;
      case 'closed':
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderLeadScore = (score: number) => {
    let colorClass = "";
    
    if (score >= 80) {
      colorClass = "text-green-600 dark:text-green-400";
    } else if (score >= 60) {
      colorClass = "text-yellow-600 dark:text-yellow-400";
    } else {
      colorClass = "text-red-600 dark:text-red-400";
    }
    
    return <span className={`font-medium ${colorClass}`}>{score}</span>;
  };

  const columns = [
    {
      key: "name",
      title: "Name",
      render: (item: Lead) => <span className="font-medium">{item.name}</span>,
    },
    {
      key: "company",
      title: "Company",
      render: (item: Lead) => <span>{item.company}</span>,
    },
    {
      key: "email",
      title: "Email",
      hideOnMobile: true,
      render: (item: Lead) => <span className="text-sm">{item.email}</span>,
    },
    {
      key: "status",
      title: "Status",
      render: (item: Lead) => renderStatusBadge(item.status),
    },
    {
      key: "score",
      title: "Score",
      render: (item: Lead) => renderLeadScore(item.score),
    },
  ];

  const mobileColumns = [
    {
      key: "name",
      title: "Lead",
      render: (item: Lead) => (
        <div>
          <div className="font-medium">{item.name}</div>
          <div className="text-xs text-muted-foreground">{item.company}</div>
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (item: Lead) => renderStatusBadge(item.status),
    },
    {
      key: "score",
      title: "Score",
      render: (item: Lead) => renderLeadScore(item.score),
    },
  ];

  const actions = (item: Lead) => (
    <div className="flex gap-2 justify-end">
      <Button size="icon" variant="ghost">
        <Phone className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Mail className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Edit className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TypographyH1>Lead Management</TypographyH1>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search leads..." 
            className="pl-8" 
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">All Leads</Button>
          <Button variant="outline" size="sm">New</Button>
          <Button variant="outline" size="sm">Contacted</Button>
          <Button variant="outline" size="sm">Qualified</Button>
          <Button variant="outline" size="sm">Proposal</Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveTable 
            data={mockLeads}
            columns={columns}
            mobileColumns={mobileColumns}
            actions={actions}
          />
        </CardContent>
      </Card>
    </div>
  );
}
