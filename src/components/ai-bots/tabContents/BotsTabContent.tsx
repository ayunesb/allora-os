import React, { useState } from "react";
import {
  formatRoleTitle,
  getBotExpertise,
  getBotOutputLocation,
  getBotExampleAction,
} from "@/utils/consultation";
import { executiveBots } from "@/backend/executiveBots";
import { BotSearchAndFilter } from "../BotSearchAndFilter";
import { BotsList } from "../BotsList";
export const BotsTabContent = ({ onSelectBot, setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const allBots = Object.entries(executiveBots).flatMap(([role, names]) =>
    names.map((name) => ({
      name,
      role,
      title: formatRoleTitle(role),
      specialty: getBotExpertise(role),
      outputLocation: getBotOutputLocation(role),
      exampleAction: getBotExampleAction(role),
      avatar: `/avatars/${name.toLowerCase().replace(/\s+/g, "-")}.png`,
    })),
  );
  const filteredBots = allBots.filter((bot) => {
    const matchesSearch =
      bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bot.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bot.outputLocation &&
        bot.outputLocation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (bot.exampleAction &&
        bot.exampleAction.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = roleFilter === "all" || bot.role === roleFilter;
    return matchesSearch && matchesRole;
  });
  const handleSelectBot = (bot) => {
    onSelectBot(bot);
    setActiveTab("chat");
  };
  return (
    <>
      <BotSearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />
      <BotsList filteredBots={filteredBots} onSelectBot={handleSelectBot} />
    </>
  );
};
