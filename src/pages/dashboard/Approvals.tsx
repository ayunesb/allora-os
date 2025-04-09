
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, ArrowLeft, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useBreakpoint } from "@/hooks/use-mobile";

export default function Approvals() {
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'mobile'].includes(breakpoint);
  
  const [approvals, setApprovals] = useState([
    {
      id: '1',
      title: 'Market Expansion Strategy',
      description: 'Expand operations to three new metropolitan areas with high growth potential.',
      type: 'strategy',
      author: 'Elon Musk, AI CEO',
      createdAt: '2 days ago'
    },
    {
      id: '2',
      title: 'LinkedIn Ad Campaign',
      description: 'Target decision-makers in the finance sector with personalized ads highlighting cost benefits.',
      type: 'campaign',
      author: 'Antonio Lucio, AI CMO',
      createdAt: '3 days ago'
    },
    {
      id: '3',
      title: 'Cold Call Script Update',
      description: 'New script emphasizing ROI metrics and competitive advantages.',
      type: 'call',
      author: 'Grant Cardone, AI Sales Expert',
      createdAt: '1 day ago'
    }
  ]);

  const handleApprove = (id: string) => {
    setApprovals(approvals.filter(item => item.id !== id));
    toast.success("Item approved successfully");
    
    // If all items are approved, go back to dashboard
    if (approvals.length === 1) {
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  };

  const handleDecline = (id: string) => {
    setApprovals(approvals.filter(item => item.id !== id));
    toast.info("Item declined");
    
    // If all items are declined, go back to dashboard
    if (approvals.length === 1) {
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  };

  return (
    <div className="w-full max-w-full px-4 sm:px-6 md:px-8 mx-auto pb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-0 sm:mr-4 w-fit" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Pending Approvals</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Review and approve AI-generated recommendations</p>
        </div>
      </div>

      {approvals.length === 0 ? (
        <Card>
          <CardContent className="pt-6 pb-6 text-center">
            <p className="mb-4">No pending approvals.</p>
            <Button asChild>
              <Link to="/dashboard">Return to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {approvals.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <div>
                    <CardTitle className="text-lg sm:text-xl break-words">{item.title}</CardTitle>
                    <CardDescription className="text-sm">Proposed by {item.author}</CardDescription>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                    <Badge variant="outline" className="capitalize">
                      {item.type}
                    </Badge>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                      {item.createdAt}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <p className="text-sm sm:text-base">{item.description}</p>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 border-t p-4 sm:p-6">
                <div className="flex w-full sm:w-auto space-x-2">
                  <Button 
                    onClick={() => handleApprove(item.id)} 
                    className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDecline(item.id)}
                    className="flex-1 sm:flex-none"
                  >
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Decline
                  </Button>
                </div>
                <Button variant="ghost" asChild className="w-full sm:w-auto">
                  <Link to={`/dashboard/${item.type === 'strategy' ? 'strategies' : item.type === 'campaign' ? 'campaigns' : 'calls'}`}>
                    View Details
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
