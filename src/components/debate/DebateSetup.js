import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter, } from "@/components/ui/card";
import TopicSelector from "./TopicSelector";
import DebateParameters from "./DebateParameters";
import ParticipantsList from "./ParticipantsList";
import ExecutiveSelectionDialog from "./ExecutiveSelectionDialog";
const DebateSetup = ({ participants = [], // Add default for participants
selectedTopic = "", debateTopics = [], // Add default empty array for debateTopics
debateTitle = "", debateObjective = "", debateDuration = "", isLoading = false, onTopicChange, onTitleChange, onObjectiveChange, onDurationChange, onStartDebate, onParticipantsChange, }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleEditParticipants = () => {
        setIsDialogOpen(true);
    };
    const handleParticipantsChange = (newParticipants) => {
        if (onParticipantsChange) {
            onParticipantsChange(newParticipants);
        }
    };
    // Ensure debateTopics is an array
    const safeDebateTopics = Array.isArray(debateTopics) ? debateTopics : [];
    const handleStartDebate = () => {
        onStartDebate();
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Debate Setup" }), _jsx(CardDescription, { children: "Configure the AI executive debate parameters" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(TopicSelector, { selectedTopic: selectedTopic, debateTopics: safeDebateTopics, onTopicChange: onTopicChange }), _jsx(DebateParameters, { debateTitle: debateTitle, debateObjective: debateObjective, debateDuration: debateDuration, onTitleChange: onTitleChange, onObjectiveChange: onObjectiveChange, onDurationChange: onDurationChange }), _jsx(ParticipantsList, { participants: participants, onEditParticipants: handleEditParticipants }), _jsx(ExecutiveSelectionDialog, { isOpen: isDialogOpen, onClose: () => setIsDialogOpen(false), selectedExecutives: participants, onExecutivesChange: handleParticipantsChange })] }), _jsx(CardFooter, { children: _jsx(Button, { onClick: handleStartDebate, disabled: !selectedTopic || !debateTitle || !debateObjective || isLoading, className: "ml-auto", children: isLoading ? "Starting Debate..." : "Start Debate" }) })] }));
};
export default DebateSetup;
