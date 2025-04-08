
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { BotConsultation, getUserConsultationHistory } from "@/utils/botConsultationHelper";

export default function ConsultationHistory() {
  const [consultations, setConsultations] = useState<BotConsultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      setLoading(true);
      try {
        const history = await getUserConsultationHistory();
        setConsultations(history);
      } catch (error) {
        console.error("Failed to fetch consultation history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  // For demo purposes, let's add some sample consultations if none exist
  useEffect(() => {
    if (!loading && consultations.length === 0) {
      // Add sample data for demonstration
      setConsultations([
        {
          id: '1',
          botName: 'Elon Musk',
          botRole: 'ceo',
          messages: [
            {
              type: 'user',
              content: 'How can I scale my startup more efficiently?',
              timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              type: 'bot',
              content: 'Focus on what creates real value for customers and ruthlessly eliminate everything else. Time and resources are your most precious assets.',
              timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 60000).toISOString()
            }
          ]
        },
        {
          id: '2',
          botName: 'Warren Buffett',
          botRole: 'cfo',
          messages: [
            {
              type: 'user',
              content: 'What investment strategy would you recommend for my business reserves?',
              timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              type: 'bot',
              content: 'Be fearful when others are greedy, and greedy when others are fearful. Look for businesses with strong fundamentals and a durable competitive advantage.',
              timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 90000).toISOString()
            }
          ]
        }
      ]);
    }
  }, [loading, consultations]);

  if (loading) {
    return <div className="text-center py-8">Loading your consultation history...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Previous Consultations</h2>
      
      {consultations.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          <MessageSquare className="mx-auto h-12 w-12 mb-2 opacity-50" />
          <p>No previous consultations found</p>
          <p className="text-sm">Consult with an AI executive to get personalized advice</p>
        </div>
      ) : (
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <Card key={consultation.id}>
                <CardHeader>
                  <CardTitle>{consultation.botName}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    <span>
                      {formatDistanceToNow(new Date(consultation.messages[0].timestamp), { addSuffix: true })}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">You asked:</p>
                    <p className="text-muted-foreground text-sm">
                      {consultation.messages[0].content}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Continue Consultation
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
