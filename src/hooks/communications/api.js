import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
// Fetch all communications
export async function fetchCommunications() {
    try {
        const { data, error } = await supabase
            .from('communications')
            .select('*, leads(name, email, phone, status)')
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        return data;
    }
    catch (error) {
        console.error('Error fetching communications:', error.message);
        throw error;
    }
}
// Create a new Zoom meeting
export async function createZoomMeeting(leadId, meetingData) {
    try {
        const { data: result, error } = await supabase.functions.invoke('communications', {
            body: {
                action: 'create-zoom-meeting',
                leadId,
                meetingData
            }
        });
        if (error)
            throw error;
        if (result.error)
            throw new Error(result.error);
        toast.success('Zoom meeting created successfully');
        return result;
    }
    catch (error) {
        console.error('Error creating Zoom meeting:', error);
        toast.error(`Failed to create Zoom meeting: ${error.message}`);
        throw error;
    }
}
// Log a communication
export async function logCommunication(leadId, communicationData) {
    try {
        const { data: result, error } = await supabase.functions.invoke('communications', {
            body: {
                action: 'log-communication',
                leadId,
                communicationData
            }
        });
        if (error)
            throw error;
        if (result.error)
            throw new Error(result.error);
        toast.success(`${communicationData.type} communication logged successfully`);
        return result;
    }
    catch (error) {
        console.error('Error logging communication:', error);
        toast.error(`Failed to log communication: ${error.message}`);
        throw error;
    }
}
// Generate AI summary for a communication
export async function generateAISummary(communicationId, transcriptText) {
    try {
        const { data: result, error } = await supabase.functions.invoke('communications', {
            body: {
                action: 'generate-summary',
                communicationId,
                transcriptText
            }
        });
        if (error)
            throw error;
        if (result.error)
            throw new Error(result.error);
        toast.success('AI summary generated successfully');
        return result;
    }
    catch (error) {
        console.error('Error generating AI summary:', error);
        toast.error(`Failed to generate AI summary: ${error.message}`);
        throw error;
    }
}
// Update communication status
export async function updateCommunicationStatus(id, status, notes, outcome) {
    try {
        const updateData = { status };
        if (notes !== undefined)
            updateData.notes = notes;
        if (outcome !== undefined)
            updateData.outcome = outcome;
        if (status === 'completed')
            updateData.ended_at = new Date().toISOString();
        const { error } = await supabase
            .from('communications')
            .update(updateData)
            .eq('id', id);
        if (error)
            throw error;
        toast.success(`Communication marked as ${status}`);
        return true;
    }
    catch (error) {
        console.error('Error updating communication status:', error);
        toast.error(`Failed to update status: ${error.message}`);
        throw error;
    }
}
