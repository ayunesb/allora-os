
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/services/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { audio } = req.body;
    
    if (!audio) {
      return res.status(400).json({ error: 'No audio data provided' });
    }

    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('voice-to-text', {
      body: { audio },
    });

    if (error) {
      console.error('Error calling voice-to-text function:', error);
      return res.status(500).json({ error: error.message || 'Failed to transcribe audio' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in voice-to-text API route:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    });
  }
}
