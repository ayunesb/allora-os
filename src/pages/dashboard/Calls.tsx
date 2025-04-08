
import Navbar from "@/components/Navbar";
import { Phone, Play, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Calls() {
  const callScripts = [
    {
      title: "B2B SaaS Introduction",
      target: "Tech Startups",
      duration: "2-3 min",
      status: "Ready",
    },
    {
      title: "Follow-up Script",
      target: "Previous Contacts",
      duration: "1-2 min",
      status: "Ready",
    },
    {
      title: "Enterprise Solution Pitch",
      target: "Fortune 500",
      duration: "4-5 min",
      status: "In Progress",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      
      <div className="flex-1 container mx-auto px-4 py-24">
        <div className="flex items-center mb-8">
          <Phone className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Cold Call Scripts</h1>
        </div>
        
        <p className="text-xl text-gray-300 mb-10">
          AI creates full cold call scripts for outreach and lead generation
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {callScripts.map((script, index) => (
            <div key={index} className="dashboard-card">
              <h3 className="text-xl font-bold mb-4">{script.title}</h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Target:</span>
                  <span>{script.target}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span>{script.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={script.status === "Ready" ? "text-green-400" : "text-amber-400"}>
                    {script.status}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {script.status === "Ready" ? (
                  <>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </>
                ) : (
                  <Button disabled variant="outline" size="sm" className="w-full">
                    Coming Soon
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-secondary/40 border border-border/50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Generate New Call Script</h2>
          <p className="text-gray-300 mb-4">
            Our AI will create a persuasive cold call script tailored to your target audience.
          </p>
          <Button className="allora-button">
            <FileText className="mr-2 h-4 w-4" />
            Create New Script
          </Button>
        </div>
      </div>
    </div>
  );
}
