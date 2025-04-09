
import { Users, Filter, Download, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Leads() {
  const leads = [
    {
      name: "Sarah Johnson",
      company: "Innovate Tech",
      email: "sjohnson@innovatetech.com",
      source: "AI Cold Call",
      stage: "Qualified",
    },
    {
      name: "Michael Chen",
      company: "Growth Solutions",
      email: "mchen@growthsolutions.com",
      source: "Email Campaign",
      stage: "New Lead",
    },
    {
      name: "Jessica Rodriguez",
      company: "Summit Partners",
      email: "jrodriguez@summitpartners.com",
      source: "Marketing Campaign",
      stage: "Meeting Scheduled",
    },
    {
      name: "David Kim",
      company: "Nexus Systems",
      email: "dkim@nexussystems.com",
      source: "AI Cold Call",
      stage: "New Lead",
    },
  ];

  return (
    <div>
      <div className="flex items-center mb-8">
        <Users className="h-8 w-8 text-primary mr-3" />
        <h1 className="text-3xl font-bold">Generated Leads</h1>
      </div>
      
      <p className="text-xl text-gray-300 mb-10">
        Leads captured through AI strategies, campaigns, and cold calls
      </p>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Leads</h2>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="allora-button">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>
      </div>
      
      <div className="bg-secondary/40 border border-border/50 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Company</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Source</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Stage</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-secondary/60">
                  <td className="px-4 py-3 text-sm">{lead.name}</td>
                  <td className="px-4 py-3 text-sm">{lead.company}</td>
                  <td className="px-4 py-3 text-sm">{lead.email}</td>
                  <td className="px-4 py-3 text-sm">{lead.source}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lead.stage === "Qualified" 
                        ? "bg-green-500/20 text-green-400" 
                        : lead.stage === "Meeting Scheduled"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}>
                      {lead.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
