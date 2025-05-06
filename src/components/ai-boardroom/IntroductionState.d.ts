import React from "react";
interface IntroductionStateProps {
  sampleDebate: {
    topic: string;
    summary: string;
  };
  onStartNewDebate: () => void;
}
export declare const IntroductionState: React.FC<IntroductionStateProps>;
export {};
