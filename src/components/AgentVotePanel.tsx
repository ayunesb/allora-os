import React from 'react';
import { supabase } from '@/utils/supabaseClient';

export function AgentVotePanel({ logId, agentId, xp, version, onVote }: any) {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold">Agent Details</h2>
      <p>XP: {xp}</p>
      <p>Version: {version}</p>
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded mr-2"
          onClick={() => onVote('up')}
        >
          Upvote
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => onVote('down')}
        >
          Downvote
        </button>
      </div>
    </div>
  );
}
