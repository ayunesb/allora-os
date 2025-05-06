import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Check, Rocket, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

interface LaunchProps {
  title: string;
  description: string;
  // Removed unused `onClickConfirm` prop
}

const Launch: React.FC<LaunchProps> = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

const features = [
  "AI CEO Strategy Generator",
  "Campaign Deployment: WhatsApp, TikTok, Meta, Email",
  "Plugin ROI Tracking",
  "Public Vault + Strategy Remix",
  "Agent Wins + Tweet Automation",
  "Visual Campaign Builder",
  "Conversational AI Shopping Assistant",
];
export default function LaunchPage() {
  const { user } = useUser();
  const [stats, setStats] = useState(null);
  useEffect(() => {
    if (user) {
      fetch("/api/galaxy/usage") // 👈 Replace with real endpoint
        .then((res) => res.json())
        .then((data) => setStats(data));
    }
  }, [user]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-black/60 to-background text-white px-6 py-12 flex flex-col items-center">
      <Rocket className="h-12 w-12 text-primary mb-4 animate-pulse" />
      <h1 className="text-4xl font-bold tracking-tight text-center mb-2">
        Allora OS Galaxy v2.5 is Live
      </h1>
      <p className="text-lg text-muted-foreground text-center max-w-xl mb-6">
        The 90% AI business operating system — strategy, execution, and
        analytics, all in one.
      </p>

      <div className="aspect-video w-full max-w-3xl rounded-xl overflow-hidden shadow-xl mb-6">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE"
          title="Allora OS Launch Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="mb-6 text-left space-y-2 w-full max-w-md">
        {features.map((f) => (
          <div
            key={f}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Check className="text-green-400 h-4 w-4" />
            {f}
          </div>
        ))}
      </div>

      <Link to="/onboarding">
        <Button
          size="lg"
          className="text-white text-lg px-6 py-4 font-semibold"
        >
          Get Started
        </Button>
      </Link>

      {user && stats && (
        <div className="mt-8 w-full max-w-2xl border border-white/10 bg-white/5 rounded-xl p-6 space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="w-5 h-5" /> Galaxy Usage Stats
          </h3>
          <ul className="text-sm text-muted-foreground">
            <li>🧠 AI Strategies Run: {stats.totalStrategies}</li>
            <li>📦 Plugins Installed: {stats.totalPlugins}</li>
            <li>🚀 Campaigns Launched: {stats.totalCampaigns}</li>
            <li>🏆 Agent Wins Published: {stats.totalAgentWins}</li>
          </ul>
        </div>
      )}

      <div className="mt-10">
        <script
          async
          defer
          src="https://buttons.github.io/buttons.tsx"
        ></script>
        <iframe
          src="https://www.producthunt.com/widgets/embed.tsx"
          width="100%"
          height="70"
          style={{ border: "none", overflow: "hidden" }}
          title="Product Hunt Widget"
        ></iframe>
      </div>

      <p className="mt-10 text-xs text-muted-foreground text-center">
        Built with Supabase, Vite, OpenAI, ShadCN, and pure vision.
      </p>
    </div>
  );
}
