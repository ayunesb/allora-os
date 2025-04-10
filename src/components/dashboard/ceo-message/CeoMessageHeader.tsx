
import { CardTitle, CardDescription } from "@/components/ui/card";
import { CeoMessageBadges } from "./CeoMessageBadges";

export function CeoMessageHeader() {
  return (
    <div className="flex justify-between">
      <div>
        <CardTitle className="text-xl">Message from Your AI CEO</CardTitle>
        <CardDescription>
          Strategy recommendation based on your company profile
        </CardDescription>
      </div>
      <CeoMessageBadges />
    </div>
  );
}
