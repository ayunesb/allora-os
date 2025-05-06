var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, MessageCircle, Brain } from "lucide-react";
import { useAiLearning } from "@/hooks/useAiLearning";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
export default function FeedbackButtons({ messageId, interactionId, botName, botRole, topic, model, onFeedbackSubmitted, }) {
    const { trackFeedback, isLoading } = useAiLearning();
    const [feedbackComment, setFeedbackComment] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [feedbackType, setFeedbackType] = useState(null);
    const handleQuickFeedback = (isPositive) => __awaiter(this, void 0, void 0, function* () {
        yield trackFeedback(interactionId, messageId, botName, botRole, isPositive, undefined, // No comment
        { topic, model });
        toast.success(isPositive ? "Positive feedback recorded" : "Feedback recorded");
        if (onFeedbackSubmitted) {
            onFeedbackSubmitted(isPositive);
        }
    });
    const openFeedbackDialog = (isPositive) => {
        setFeedbackType(isPositive ? "positive" : "negative");
        setDialogOpen(true);
    };
    const submitDetailedFeedback = () => __awaiter(this, void 0, void 0, function* () {
        if (!feedbackType)
            return;
        yield trackFeedback(interactionId, messageId, botName, botRole, feedbackType === "positive", feedbackComment, { topic, model });
        toast.success("Detailed feedback submitted");
        setDialogOpen(false);
        setFeedbackComment("");
        if (onFeedbackSubmitted) {
            onFeedbackSubmitted(feedbackType === "positive");
        }
    });
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx("div", { className: "mr-2 flex items-center", children: model && (_jsxs(Badge, { variant: "outline", className: "mr-2 text-xs", children: [_jsx(Brain, { className: "h-3 w-3 mr-1" }), model] })) }), _jsxs(Button, { variant: "outline", size: "sm", className: "h-8 px-3 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200", onClick: () => handleQuickFeedback(true), disabled: isLoading, children: [_jsx(ThumbsUp, { className: "h-4 w-4 mr-1" }), _jsx("span", { className: "text-xs", children: "Helpful" })] }), _jsxs(Button, { variant: "outline", size: "sm", className: "h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200", onClick: () => handleQuickFeedback(false), disabled: isLoading, children: [_jsx(ThumbsDown, { className: "h-4 w-4 mr-1" }), _jsx("span", { className: "text-xs", children: "Not helpful" })] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50", onClick: () => openFeedbackDialog(true), children: [_jsx(MessageCircle, { className: "h-4 w-4 mr-1" }), _jsx("span", { className: "text-xs", children: "Comment" })] })] }), _jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: feedbackType === "positive"
                                    ? "What was helpful?"
                                    : "What could be improved?" }) }), _jsx(Textarea, { placeholder: "Please provide more details about your feedback...", value: feedbackComment, onChange: (e) => setFeedbackComment(e.target.value), rows: 5, className: "mt-2" }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setDialogOpen(false), children: "Cancel" }), _jsx(Button, { onClick: submitDetailedFeedback, disabled: isLoading, children: "Submit Feedback" })] })] }) })] }));
}
