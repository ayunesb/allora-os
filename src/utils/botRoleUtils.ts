export type BotRoleKey = "ceo" | "coo" | "cfo" | "cio" | "cto" | "cmo" | string;

const botSpecialSkills: Record<string, string> = {
  ceo: "visionary",
  coo: "ops",
  admin: "manageUsers",
  moderator: "banUsers",
  user: "postMessages",
};

export function getBotSpecialSkill(role: string): string | undefined {
  return botSpecialSkills[role as keyof typeof botSpecialSkills];
}
