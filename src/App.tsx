
import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/dashboard/Dashboard";
import Campaigns from "@/pages/dashboard/Campaigns";
import CampaignDashboard from "@/pages/dashboard/CampaignDashboard";
import CampaignCreate from "@/pages/dashboard/CampaignCreate";
import MarketingTools from "@/pages/dashboard/MarketingTools";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/campaigns" element={<Campaigns />} />
      <Route path="/dashboard/campaign-dashboard" element={<CampaignDashboard />} />
      <Route path="/dashboard/campaigns/create" element={<CampaignCreate />} />
      <Route path="/dashboard/marketing-tools" element={<MarketingTools />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
