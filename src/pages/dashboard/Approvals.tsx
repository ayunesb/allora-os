
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

export default function Approvals() {
  const navigate = useNavigate();
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
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Pending Approvals</h1>
          <p className="text-muted-foreground">Review and approve AI-generated recommendations</p>
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
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>Proposed by {item.author}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="capitalize">
                      {item.type}
                    </Badge>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                      {item.createdAt}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{item.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex space-x-2">
                  <Button onClick={() => handleApprove(item.id)} className="bg-green-600 hover:bg-green-700">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button variant="outline" onClick={() => handleDecline(item.id)}>
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Decline
                  </Button>
                </div>
                <Button variant="ghost" asChild>
                  <Link to={`/dashboard/${item.type === 'strategy' ? 'strategies' : item.type === 'campaign' ? 'campaigns' : 'calls'}`}>
                    View Details
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
