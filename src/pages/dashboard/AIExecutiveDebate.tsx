
import { DebateGenerator } from "@/components/ai-executive-debate/DebateGenerator";

export default function AIExecutiveDebate() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Executive Boardroom</h1>
        <p className="text-muted-foreground mt-2">
          Generate strategic insights through AI-powered executive debates
        </p>
      </div>
      
      <DebateGenerator />
    </div>
  );
}
