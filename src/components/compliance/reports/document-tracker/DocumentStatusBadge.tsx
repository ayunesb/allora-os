import { Badge } from "@/components/ui/badge";
export default function DocumentStatusBadge({ status }) {
  switch (status) {
    case "current":
      return <Badge className="bg-green-500">Current</Badge>;
    case "outdated":
      return <Badge variant="destructive">Outdated</Badge>;
    case "update-available":
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-500">
          Update Available
        </Badge>
      );
    default:
      return null;
  }
}
