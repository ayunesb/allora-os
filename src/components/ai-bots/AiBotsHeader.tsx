import React from "react";
import UserPreferencesDialog from "@/components/UserPreferencesDialog";
import { HelpButton } from "@/components/help/HelpButton";
import { BrainCog, Sparkles, Zap, Target, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
export function AiBotsHeader({ isMobileView }) {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <BrainCog className="h-8 w-8 text-primary relative z-10" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-primary">
                AI Executive Team
              </span>
            </h1>
            <Badge
              variant="outline"
              className="bg-black/30 text-primary border-primary/30 px-2 py-1 backdrop-blur-md"
            >
              <Sparkles className="h-3 w-3 mr-1" /> Advanced
            </Badge>
          </div>
          <p className="text-muted-foreground ml-11">
            Your elite team of AI executives for strategic business guidance and
            insights
          </p>
        </motion.div>

        <HelpButton contextId="ai-bots" variant="premium" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full relative"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600/20 to-blue-400/5 rounded-xl">
              <BrainCog className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h2
                className={`${isMobileView ? "text-xl" : "text-2xl"} font-bold tracking-tight`}
              >
                Executive Boardroom
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Advanced AI-driven strategic analysis and business insights
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            <Badge
              variant="outline"
              className="bg-blue-500/10 border-blue-500/30 text-blue-400 flex items-center gap-1"
            >
              <Target className="h-3 w-3" /> Strategic Planning
            </Badge>
            <Badge
              variant="outline"
              className="bg-purple-500/10 border-purple-500/30 text-purple-400 flex items-center gap-1"
            >
              <Zap className="h-3 w-3" /> Operational Excellence
            </Badge>
            <Badge
              variant="outline"
              className="bg-amber-500/10 border-amber-500/30 text-amber-400 flex items-center gap-1"
            >
              <Sparkles className="h-3 w-3" /> Innovation
            </Badge>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <UserPreferencesDialog
            triggerLabel={
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                {isMobileView ? "AI Settings" : "AI Response Settings"}
              </div>
            }
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
