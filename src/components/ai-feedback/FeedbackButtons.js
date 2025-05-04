import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, MessageCircle, Brain } from 'lucide-react';
import { useAiLearning } from '@/hooks/useAiLearning';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
export default function FeedbackButtons({ messageId, interactionId, botName, botRole, topic, model, onFeedbackSubmitted }) {
    const { trackFeedback, isLoading } = useAiLearning();
    const [feedbackComment, setFeedbackComment] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [feedbackType, setFeedbackType] = useState(null);
    const handleQuickFeedback = async (isPositive) => {
        await trackFeedback(interactionId, messageId, botName, botRole, isPositive, undefined, // No comment
        { topic, model });
        toast.success(isPositive ? 'Positive feedback recorded' : 'Feedback recorded');
        if (onFeedbackSubmitted) {
            onFeedbackSubmitted(isPositive);
        }
    };
    const openFeedbackDialog = (isPositive) => {
        setFeedbackType(isPositive ? 'positive' : 'negative');
        setDialogOpen(true);
    };
    const submitDetailedFeedback = async () => {
        if (!feedbackType)
            return;
        await trackFeedback(interactionId, messageId, botName, botRole, feedbackType === 'positive', feedbackComment, { topic, model });
        toast.success('Detailed feedback submitted');
        setDialogOpen(false);
        setFeedbackComment('');
        if (onFeedbackSubmitted) {
            onFeedbackSubmitted(feedbackType === 'positive');
        }
    };
    return (<>
      <div className="flex items-center gap-2 mt-2">
        <div className="mr-2 flex items-center">
          {model && (<Badge variant="outline" className="mr-2 text-xs">
              <Brain className="h-3 w-3 mr-1"/>
              {model}
            </Badge>)}
        </div>
        
        <Button variant="outline" size="sm" className="h-8 px-3 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200" onClick={() => handleQuickFeedback(true)} disabled={isLoading}>
          <ThumbsUp className="h-4 w-4 mr-1"/>
          <span className="text-xs">Helpful</span>
        </Button>
        
        <Button variant="outline" size="sm" className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200" onClick={() => handleQuickFeedback(false)} disabled={isLoading}>
          <ThumbsDown className="h-4 w-4 mr-1"/>
          <span className="text-xs">Not helpful</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => openFeedbackDialog(true)}>
          <MessageCircle className="h-4 w-4 mr-1"/>
          <span className="text-xs">Comment</span>
        </Button>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {feedbackType === 'positive' ? 'What was helpful?' : 'What could be improved?'}
            </DialogTitle>
          </DialogHeader>
          
          <Textarea placeholder="Please provide more details about your feedback..." value={feedbackComment} onChange={(e) => setFeedbackComment(e.target.value)} rows={5} className="mt-2"/>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={submitDetailedFeedback} disabled={isLoading}>
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>);
}
