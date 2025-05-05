import { useState, useEffect } from "react";
import { getUserConsultationHistory } from "@/utils/consultation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Calendar, User, Bot } from "lucide-react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
export default function ConsultationHistory() {
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadConsultations() {
            setLoading(true);
            try {
                const history = await getUserConsultationHistory();
                setConsultations(history);
            }
            catch (error) {
                console.error("Failed to load consultation history:", error);
            }
            finally {
                setLoading(false);
            }
        }
        loadConsultations();
    }, []);
    if (loading) {
        return (<div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>);
    }
    if (consultations.length === 0) {
        return (<Card>
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4"/>
          <h3 className="text-lg font-medium mb-2">No consultations yet</h3>
          <p className="text-muted-foreground">
            Your conversations with executive advisors will appear here
          </p>
        </CardContent>
      </Card>);
    }
    return (<div className="space-y-6">
      {consultations.map((consultation) => (<Card key={consultation.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>{consultation.botName}</span>
              <span className="text-xs text-muted-foreground">
                ({consultation.botRole})
              </span>
            </CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3"/>
              <span>
                {format(new Date(consultation.messages[0].timestamp), "MMM d, yyyy")}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              {consultation.messages.map((message, index) => (<div key={index} className="mb-4 last:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    {message.type === "user" ? (<User className="h-4 w-4 text-primary"/>) : (<Bot className="h-4 w-4 text-primary"/>)}
                    <span className="text-xs font-medium">
                      {message.type === "user" ? "You" : consultation.botName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(message.timestamp), "h:mm a")}
                    </span>
                  </div>
                  <p className="text-sm pl-6">{message.content}</p>
                  {index < consultation.messages.length - 1 && (<Separator className="my-2"/>)}
                </div>))}
            </ScrollArea>
          </CardContent>
        </Card>))}
    </div>);
}
