
import React from "react";
import { CallScript } from "@/hooks/useCallScripts";
import AiCallScript from "@/components/calls/AiCallScript";
import { Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScriptSectionProps {
  title: string;
  scripts: CallScript[];
  onUseScript: (scriptId: string, scriptTitle: string) => void;
  type: 'call' | 'message';
  isAiSection?: boolean;
}

export default function ScriptSection({
  title,
  scripts,
  onUseScript,
  type,
  isAiSection = false
}: ScriptSectionProps) {
  const filteredScripts = isAiSection 
    ? scripts.filter(script => script.aiGenerated)
    : scripts.filter(script => !script.aiGenerated);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isAiSection ? (
          // AI Generated scripts
          filteredScripts.map((script) => (
            <AiCallScript
              key={script.id}
              id={script.id}
              title={script.title}
              target={script.target}
              duration={script.duration}
              primaryBot={script.primaryBot}
              collaborators={script.collaborators}
              onUse={onUseScript}
              type={type}
            />
          ))
        ) : (
          // Standard scripts
          filteredScripts.map((script) => (
            <div key={script.id} className="dashboard-card">
              <h3 className="text-xl font-bold mb-4">{script.title}</h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Target:</span>
                  <span>{script.target}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span>{script.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={script.status === "Ready" ? "text-green-400" : "text-amber-400"}>
                    {script.status}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {script.status === "Ready" ? (
                  <>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => onUseScript(script.id, script.title)}>
                      <Play className="mr-2 h-4 w-4" />
                      Use
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </>
                ) : (
                  <Button disabled variant="outline" size="sm" className="w-full">
                    Coming Soon
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
