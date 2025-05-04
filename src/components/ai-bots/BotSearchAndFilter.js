import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
export const BotSearchAndFilter = ({ searchQuery, setSearchQuery, roleFilter, setRoleFilter, }) => {
    return (<Card className="p-4 mb-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="search-bots" className="mb-2 block">
            Search Executives
          </Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input id="search-bots" type="search" placeholder="Search by name, role or specialty..." className="pl-8" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>
        </div>

        <div>
          <Label htmlFor="role-filter" className="mb-2 block">
            Filter by Role
          </Label>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger id="role-filter">
              <SelectValue placeholder="Select a role"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              
              <SelectGroup>
                <SelectLabel>C-Suite</SelectLabel>
                <SelectItem value="ceo">CEO</SelectItem>
                <SelectItem value="coo">COO</SelectItem>
                <SelectItem value="cfo">CFO</SelectItem>
                <SelectItem value="cto">CTO</SelectItem>
                <SelectItem value="cio">CIO</SelectItem>
                <SelectItem value="cmo">CMO</SelectItem>
                <SelectItem value="chro">CHRO</SelectItem>
              </SelectGroup>
              
              <SelectGroup>
                <SelectLabel>Leadership</SelectLabel>
                <SelectItem value="vp_sales">VP of Sales</SelectItem>
                <SelectItem value="vp_product">VP of Product</SelectItem>
                <SelectItem value="vp_operations">VP of Operations</SelectItem>
                <SelectItem value="vp_marketing">VP of Marketing</SelectItem>
                <SelectItem value="sales_business_development">Sales & BD</SelectItem>
                <SelectItem value="strategy">Strategy</SelectItem>
              </SelectGroup>
              
              <SelectGroup>
                <SelectLabel>Technology</SelectLabel>
                <SelectItem value="data_scientist">Data Scientist</SelectItem>
                <SelectItem value="ml_engineer">ML Engineer</SelectItem>
                <SelectItem value="software_engineer">Software Engineer</SelectItem>
                <SelectItem value="cloud_architect">Cloud Architect</SelectItem>
                <SelectItem value="blockchain_developer">Blockchain Developer</SelectItem>
                <SelectItem value="vr_ar_developer">VR/AR Developer</SelectItem>
              </SelectGroup>
              
              <SelectGroup>
                <SelectLabel>Marketing & Growth</SelectLabel>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="digital_marketing">Digital Marketing</SelectItem>
                <SelectItem value="growth_hacker">Growth Hacker</SelectItem>
                <SelectItem value="seo_specialist">SEO Specialist</SelectItem>
                <SelectItem value="ppc_specialist">PPC Specialist</SelectItem>
                <SelectItem value="brand_strategist">Brand Strategy</SelectItem>
              </SelectGroup>
              
              <SelectGroup>
                <SelectLabel>Finance & Investment</SelectLabel>
                <SelectItem value="venture_capitalist">Venture Capital</SelectItem>
                <SelectItem value="investment_banker">Investment Banking</SelectItem>
                <SelectItem value="risk_manager">Risk Management</SelectItem>
                <SelectItem value="financial_advisor">Financial Advisor</SelectItem>
              </SelectGroup>
              
              <SelectGroup>
                <SelectLabel>Operations</SelectLabel>
                <SelectItem value="operations_efficiency">Operations</SelectItem>
                <SelectItem value="supply_chain_manager">Supply Chain</SelectItem>
                <SelectItem value="manufacturing_engineer">Manufacturing</SelectItem>
                <SelectItem value="transportation_manager">Transportation</SelectItem>
                <SelectItem value="aviation_manager">Aviation</SelectItem>
              </SelectGroup>
              
              <SelectGroup>
                <SelectLabel>Sales & Customer Success</SelectLabel>
                <SelectItem value="cold_calling">Cold Calling</SelectItem>
                <SelectItem value="lead_qualification">Lead Qualification</SelectItem>
                <SelectItem value="customer_success">Customer Success</SelectItem>
                <SelectItem value="call_center_manager">Call Center</SelectItem>
              </SelectGroup>
              
              <SelectGroup>
                <SelectLabel>Special Experts</SelectLabel>
                <SelectItem value="ai_ethics_researcher">AI Ethics</SelectItem>
                <SelectItem value="cybersecurity_specialist">Cybersecurity</SelectItem>
                <SelectItem value="sustainability_officer">Sustainability</SelectItem>
                <SelectItem value="legal_counsel">Legal</SelectItem>
                <SelectItem value="compliance_officer">Compliance</SelectItem>
                <SelectItem value="business_analyst">Business Analysis</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>);
};
