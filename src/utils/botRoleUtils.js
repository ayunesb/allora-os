const botSpecialSkills = {
    ceo: "visionary",
    coo: "ops",
    admin: "manageUsers",
    moderator: "banUsers",
    user: "postMessages",
};
export function getBotSpecialSkill(role) {
    return botSpecialSkills[role];
}
