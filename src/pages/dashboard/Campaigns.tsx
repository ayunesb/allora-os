
import Navbar from "@/components/Navbar";
import { BarChart, Mail, Video, Globe, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Campaigns() {
  const campaigns = [
    {
      title: "Summer Product Launch",
      type: "Email",
      icon: <Mail className="h-5 w-5" />,
      stats: "Open rate: 32%",
    },
    {
      title: "Customer Testimonial Series",
      type: "Video",
      icon: <Video className="h-5 w-5" />,
      stats: "Views: 2,456",
    },
    {
      title: "SEO Content Strategy",
      type: "Web",
      icon: <Globe className="h-5 w-5" />,
      stats: "Traffic: +18%",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      
      <div className="flex-1 container mx-auto px-4 py-24">
        <div className="flex items-center mb-8">
          <BarChart className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Marketing Campaigns</h1>
        </div>
        
        <p className="text-xl text-gray-300 mb-10">
          See all your AI-created email, video, and ad campaigns here
        </p>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Active Campaigns</h2>
          <Button className="allora-button">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <div key={index} className="dashboard-card flex flex-col">
              <div className="flex items-center mb-4">
                <div className="bg-primary/20 rounded-full p-2 mr-3">
                  {campaign.icon}
                </div>
                <span className="text-sm font-medium text-gray-300">
                  {campaign.type}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{campaign.stats}</p>
              
              <div className="mt-auto flex justify-between">
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm">View Results</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
