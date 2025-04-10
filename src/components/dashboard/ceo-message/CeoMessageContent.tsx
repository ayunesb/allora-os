
import { useAuth } from "@/context/AuthContext";

interface CeoMessageContentProps {
  riskAppetite: 'low' | 'medium' | 'high';
}

export function CeoMessageContent({ riskAppetite }: CeoMessageContentProps) {
  const { profile } = useAuth();

  return (
    <>
      <p className="mb-4">
        Based on the information you've provided about {profile?.company || "your company"} during onboarding,
        I recommend focusing on a <strong>{riskAppetite} risk</strong> growth strategy for the next quarter.
        Our analysis shows significant opportunity in the {profile?.industry || "your industry"} sector, especially
        with the current market conditions.
      </p>
      <p>
        I've generated several targeted strategies and campaign ideas that align with your business objectives.
        Review and approve them below to begin implementation with the help of your AI executive team.
      </p>
    </>
  );
}
