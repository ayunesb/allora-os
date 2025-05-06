import React from "react";

interface SomeComponentProps {
  selectedPluginName: string | null;
}

const SomeComponent: React.FC<SomeComponentProps> = ({
  selectedPluginName,
}) => {
  return (
    <div>
      <h1>Selected Plugin</h1>
      <p>{selectedPluginName ? selectedPluginName : "No plugin selected"}</p>
      <input type="text" value={selectedPluginName ?? undefined} />
    </div>
  );
};

export default SomeComponent;
