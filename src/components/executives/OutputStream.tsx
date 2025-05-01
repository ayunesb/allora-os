
import React from 'react';

interface OutputStreamProps {
  text: string;
  executive?: string;
}

export const OutputStream: React.FC<OutputStreamProps> = ({ text, executive = 'AI Assistant' }) => {
  return (
    <div className="bg-muted/30 p-4 rounded-md border overflow-auto max-h-[400px]">
      <div className="mb-2 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-xs text-white font-medium">
          {executive.charAt(0)}
        </div>
        <span className="font-medium">{executive}</span>
      </div>
      <div className="whitespace-pre-wrap text-sm">
        {text.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < text.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
