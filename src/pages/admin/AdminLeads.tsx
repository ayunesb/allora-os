import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Phone,
  Mail,
  ArrowUpDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLeadOperations } from "@/hooks/admin/useLeadOperations";
import { useAdvancedLeadScoring } from "@/hooks/useAdvancedLeadScoring";

// Extend the Lead type with additional properties used in the code
type Lead = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  status: string;
  score?: number;
  created_at: string;
};

export default function AdminLeads() {
  const { fetchLeads, updateLeadStatus, deleteLead, isLoading } =
    useLeadOperations();
  const { getLeadScoreCategory, getNextBestAction } = useAdvancedLeadScoring();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("score");
  const [sortOrder, setSortOrder] = useState("desc");
  useEffect(() => {
    const loadLeads = async () => {
      const fetchedLeads = await fetchLeads();
      setLeads(fetchedLeads);
      setFilteredLeads(fetchedLeads);
    };
    loadLeads();
  }, [fetchLeads]);
  useEffect(() => {
    let result = [...leads];
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(query) ||
          lead.email?.toLowerCase().includes(query) ||
          lead.company?.toLowerCase().includes(query),
      );
    }
    // Apply status filter
    if (activeFilter !== "all") {
      result = result.filter((lead) => lead.status === activeFilter);
    }
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "score") {
        const scoreA = a.score || 0;
        const scoreB = b.score || 0;
        comparison = scoreA - scoreB;
      } else if (sortBy === "created_at") {
        comparison =
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
    setFilteredLeads(result);
  }, [leads, searchQuery, activeFilter, sortBy, sortOrder]);

  // Explicitly type the handleSort parameter
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  // Explicitly type the parameters for handleStatusUpdate
  const handleStatusUpdate = async (leadId: string, status: string) => {
    const success = await updateLeadStatus(leadId, status);
    if (success) {
      setLeads((prev) =>
        prev.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)),
      );
    }
    return success;
  };

  // Explicitly type the parameters for handleDelete
  const handleDelete = async (leadId: string) => {
    const success = await deleteLead(leadId);
    if (success) {
      setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
    }
    return success;
  };

  // Fix the spread type issue by ensuring the object is of the correct type
  const handleUpdateLead = (leadId: string, updatedData: Partial<Lead>) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, ...updatedData } : lead,
      ),
    );
  };

  // Explicitly type the parameters
  const handleDeleteLead = (leadId: string) => {
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
  };

  const handleStatusChange = (status: string) => {
    // ...existing code...
  };

  // Explicitly type the renderStatusBadge parameter
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30">
            {status}
          </Badge>
        );
      case "contacted":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30">
            {status}
          </Badge>
        );
      case "qualified":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30">
            {status}
          </Badge>
        );
      case "proposal":
        return (
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30">
            {status}
          </Badge>
        );
      case "negotiation":
        return (
          <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30">
            {status}
          </Badge>
        );
      case "closed":
        return <Badge variant="secondary">{status}</Badge>;
      case "lost":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30">
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Explicitly type the renderLeadScore parameter
  const renderLeadScore = (lead: Lead) => {
    const scoreCategory = getLeadScoreCategory(lead);
    let colorClass = "";
    if (scoreCategory === "hot") {
      colorClass = "text-red-600 dark:text-red-400";
    } else if (scoreCategory === "warm") {
      colorClass = "text-yellow-600 dark:text-yellow-400";
    } else {
      colorClass = "text-blue-600 dark:text-blue-400";
    }
    return (
      <div className="flex flex-col">
        <span className={`font-medium ${colorClass}`}>
          {scoreCategory.toUpperCase()}
        </span>
        <span className="text-xs text-muted-foreground">
          {lead.score || 0} pts
        </span>
      </div>
    );
  };
  const scoreHeaderRender = () => (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => handleSort("score")}
    >
      Score
      <ArrowUpDown className="ml-1 h-4 w-4" />
    </div>
  );
  const columns = [
    {
      key: "name",
      title: "Name",
      sortable: true,
      render: (item) => (
        <div className="flex flex-col">
          <span className="font-medium">{item.name}</span>
          {item.company && (
            <span className="text-xs text-muted-foreground">
              {item.company}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "email",
      title: "Contact",
      hideOnMobile: true,
      render: (item) => (
        <div className="flex flex-col">
          {item.email && <span className="text-sm">{item.email}</span>}
          {item.phone && (
            <span className="text-xs text-muted-foreground">{item.phone}</span>
          )}
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (item) => renderStatusBadge(item.status),
    },
    {
      key: "score",
      title: "Score",
      titleRender: scoreHeaderRender,
      sortable: true,
      render: (item) => renderLeadScore(item),
    },
    {
      key: "action",
      title: "Next Action",
      hideOnMobile: true,
      render: (item) => (
        <div className="max-w-[200px] truncate text-sm">
          {getNextBestAction(item)}
        </div>
      ),
    },
  ];
  const mobileColumns = [
    {
      key: "name",
      title: "Lead",
      render: (item) => (
        <div>
          <div className="font-medium">{item.name}</div>
          <div className="text-xs text-muted-foreground">{item.company}</div>
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (item) => renderStatusBadge(item.status),
    },
    {
      key: "score",
      title: "Score",
      render: (item) => renderLeadScore(item),
    },
  ];

  // Explicitly type the actions parameter
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
      <Button
        size="icon"
        variant="ghost"
        className="text-destructive hover:text-destructive"
        onClick={() => handleDelete(item.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TypographyH1>Lead Management</TypographyH1>
        <Button variant="primary" className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </div>

      <Tabs
        defaultValue="all"
        value={activeFilter}
        onValueChange={setActiveFilter}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="contacted">Contacted</TabsTrigger>
            <TabsTrigger value="qualified">Qualified</TabsTrigger>
            <TabsTrigger value="proposal">Proposal</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeFilter} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  {activeFilter === "all"
                    ? "All Leads"
                    : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Leads`}
                </span>
                {isLoading && (
                  <span className="text-sm text-muted-foreground">
                    Loading...
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveTable
                data={filteredLeads}
                columns={columns}
                mobileColumns={mobileColumns}
                actions={actions}
                emptyState={
                  <div className="py-8 text-center">
                    <TypographyP>
                      No leads found matching your criteria.
                    </TypographyP>
                  </div>
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
