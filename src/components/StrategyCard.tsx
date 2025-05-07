interface StrategyCardProps {
  title: string;
  description?: string;
  status?: "active" | "paused" | "completed";
}

export const StrategyCard: React.FC<StrategyCardProps> = ({
  title,
  description = "No description",
  status = "active",
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>Status: {status}</span>
    </div>
  );
};
