import React from "react";
import { DebateTopic } from "@/utils/consultation/types";
interface TopicSelectorProps {
  selectedTopic: string;
  debateTopics: DebateTopic[];
  onTopicChange: (value: string) => void;
}
declare const TopicSelector: React.FC<TopicSelectorProps>;
export default TopicSelector;
