import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { updateLeadStatus, deleteLead, createLead } from '@/utils/leadHelpers';
export function useLeadDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLead, setActiveLead] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // Add aliases for compatibility with the existing code
    const selectedLead = activeLead;
    const isDrawerOpen = isOpen;
    const openDrawer = useCallback((lead) => {
        if (lead) {
            setActiveLead(lead);
            setIsEditing(false);
            setIsCreating(false);
        }
        else {
            setActiveLead(null);
            setIsCreating(true);
            setIsEditing(false);
        }
        setIsOpen(true);
    }, []);
    const closeDrawer = useCallback(() => {
        setIsOpen(false);
        setTimeout(() => {
            setActiveLead(null);
            setIsEditing(false);
            setIsCreating(false);
        }, 300); // Delay to allow close animation
    }, []);
    // Add the handleViewLead function as an alias for openDrawer
    const handleViewLead = openDrawer;
    // Add the setIsDrawerOpen function as an alias for setIsOpen
    const setIsDrawerOpen = setIsOpen;
    const startEditing = useCallback(() => {
        setIsEditing(true);
    }, []);
    const cancelEditing = useCallback(() => {
        setIsEditing(false);
    }, []);
    const handleStatusChange = useCallback(async (leadId, newStatus) => {
        setIsLoading(true);
        try {
            const success = await updateLeadStatus(leadId, newStatus);
            if (success) {
                toast.success('Lead status updated successfully');
                if (activeLead) {
                    setActiveLead({
                        ...activeLead,
                        status: newStatus
                    });
                }
                return true;
            }
            else {
                toast.error('Failed to update lead status');
                return false;
            }
        }
        catch (error) {
            console.error('Error updating lead status:', error);
            toast.error('An unexpected error occurred');
            return false;
        }
        finally {
            setIsLoading(false);
        }
    }, [activeLead]);
    const handleDeleteLead = useCallback(async (leadId) => {
        setIsLoading(true);
        try {
            const success = await deleteLead(leadId);
            if (success) {
                toast.success('Lead deleted successfully');
                closeDrawer();
                return true;
            }
            else {
                toast.error('Failed to delete lead');
                return false;
            }
        }
        catch (error) {
            console.error('Error deleting lead:', error);
            toast.error('An unexpected error occurred');
            return false;
        }
        finally {
            setIsLoading(false);
        }
    }, [closeDrawer]);
    const handleCreateLead = useCallback(async (leadData) => {
        setIsLoading(true);
        try {
            const newLead = await createLead(leadData);
            if (newLead) {
                toast.success('Lead created successfully');
                closeDrawer();
                return newLead;
            }
            else {
                toast.error('Failed to create lead');
                return null;
            }
        }
        catch (error) {
            console.error('Error creating lead:', error);
            toast.error('An unexpected error occurred');
            return null;
        }
        finally {
            setIsLoading(false);
        }
    }, [closeDrawer]);
    return {
        isOpen,
        activeLead,
        isEditing,
        isCreating,
        isLoading,
        openDrawer,
        closeDrawer,
        startEditing,
        cancelEditing,
        handleStatusChange,
        handleDeleteLead,
        handleCreateLead,
        // Add the new aliases to the return object
        selectedLead,
        isDrawerOpen,
        handleViewLead,
        setIsDrawerOpen
    };
}
