import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Panel } from '@/components/ui/GlassPanel';

interface InspectorSidebarProps {
  data: any;
  onClose: () => void;
  onNodeHover: (node: any) => void;
}

export const InspectorSidebar: React.FC<InspectorSidebarProps> = ({ data, onClose, onNodeHover }) => {
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="w-full h-full p-4 bg-black/80 text-white overflow-y-auto">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  return (
    <aside className="fixed right-0 top-0 w-[400px] h-full bg-card border-l border-border z-50 shadow-xl">
      <Panel className="p-6 h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{data.name || 'Inspector'}</h2>
          <button onClick={onClose} className="text-muted hover:text-white">✕</button>
        </div>
        <h2 className="text-lg font-semibold">{data.name}</h2>
        <p className="text-sm text-muted mt-1">{data.description}</p>

        <div className="mt-4">
          <h3 className="text-sm uppercase tracking-wide text-muted">Linked Strategies</h3>
          <ul className="mt-2 space-y-1">
            {data.strategies?.map((strategy: any) => (
              <li
                key={strategy.id}
                onClick={() => navigate(`/strategy/${strategy.id}`)}
                onMouseEnter={() => onNodeHover(strategy)}
                onMouseLeave={() => onNodeHover(null)}
                className="cursor-pointer hover:text-primary transition"
              >
                ↳ {strategy.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="text-sm uppercase tracking-wide text-muted">Linked Plugins</h3>
          <ul className="mt-2 space-y-1">
            {data.plugins?.map((plugin: any) => (
              <li
                key={plugin.id}
                onClick={() => navigate(`/plugin/${plugin.id}`)}
                onMouseEnter={() => onNodeHover(plugin)}
                onMouseLeave={() => onNodeHover(null)}
                className="cursor-pointer hover:text-primary transition"
              >
                ↳ {plugin.title}
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    </aside>
  );
};
