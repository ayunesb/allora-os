interface ForecastCardProps {
  title: string;
  subtitle: string;
  currentValue: number;
  targetValue: number;
  growth: number;
  variant?: "default" | "success" | "warning" | "danger";
}
export default function ForecastCards({
  forecasts,
}: {
  forecasts: ForecastCardProps[];
}): JSX.Element;
export {};
