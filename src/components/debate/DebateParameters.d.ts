import React from "react";
interface DebateParametersProps {
  debateTitle: string;
  debateObjective: string;
  debateDuration: string;
  onTitleChange: (value: string) => void;
  onObjectiveChange: (value: string) => void;
  onDurationChange: (value: string) => void;
}
declare const DebateParameters: React.FC<DebateParametersProps>;
export default DebateParameters;
