import React from "react";
import { getSystemServices } from "../services/systemService";

type ServiceStatus = { name: string; status: string };

const SystemHealth: React.FC = () => {
  const items: ServiceStatus[] = getSystemServices(); // ✅ Typed items

  return (
    <div>
      {items.map(
        (
          item: ServiceStatus, // Explicitly type `item`
        ) => (
          <InfoCard key={item.name}>
            <h2>{item.name}</h2>
            <p>Status: {item.status}</p>
          </InfoCard>
        ),
      )}
    </div>
  );
};

interface Props {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const Panel: React.FC<Props> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const InfoCard = (
  { children, className }: { children: React.ReactNode; className?: string }, // Fix `children` prop type
) => <div className={className}>{children}</div>;

export default SystemHealth;
