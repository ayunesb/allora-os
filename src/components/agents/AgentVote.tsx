import { ThumbsUp, ThumbsDown } from "lucide-react";
export default function AgentVote({ onVote }) {
  return (
    <div className="flex space-x-2">
      <button onClick={() => onVote(true)} className="hover:text-green-400">
        <ThumbsUp />
      </button>
      <button onClick={() => onVote(false)} className="hover:text-red-400">
        <ThumbsDown />
      </button>
    </div>
  );
}
