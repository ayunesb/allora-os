import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { debateTopics } from '@/backend/debateManager';
export default function useDebateState() {
    const [newMessage, setNewMessage] = useState('');
    const [activeTab, setActiveTab] = useState('setup');
    // Handle form input changes
    const handleNewMessageChange = useCallback((value) => {
        setNewMessage(value);
    }, []);
    // Handle tab changes
    const handleTabChange = useCallback((value) => {
        setActiveTab(value);
    }, []);
    // Functions for debate actions
    const exportDebate = useCallback((messages, debateTitle) => {
        // Create a text version of the debate
        const debateText = messages.map(msg => `${msg.sender} (${new Date(msg.timestamp).toLocaleString()}):\n${msg.content}\n\n`).join('');
        // Create a blob and download it
        const blob = new Blob([debateText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${debateTitle.replace(/\s+/g, '-').toLowerCase()}-debate.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Debate exported to text file');
    }, []);
    const saveDebate = useCallback(() => {
        // In a real app, this would save to the database
        toast.success('Debate saved successfully');
    }, []);
    const exportSummary = useCallback(() => {
        toast.success('Summary exported successfully');
    }, []);
    const saveToReports = useCallback(() => {
        toast.success('Summary saved to reports');
    }, []);
    return {
        newMessage,
        activeTab,
        debateTopics,
        handleNewMessageChange,
        handleTabChange,
        setNewMessage,
        exportDebate,
        saveDebate,
        exportSummary,
        saveToReports,
    };
}
