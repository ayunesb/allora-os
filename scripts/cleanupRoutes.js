import fs from "fs";
const audit = JSON.parse(fs.readFileSync("route-audit.json", "utf-8"));
console.log("\n🧹 Duplicate Routes:\n");
for (const { route, files } of audit.duplicateRoutes || []) {
    console.log(`→ ${route} (in: ${files.join(", ")})`);
}
console.log("\n🧼 Unused Routes:\n");
for (const { route, files } of audit.unusedRoutes || []) {
    console.log(`→ ${route} (in: ${files.join(", ")})`);
}
