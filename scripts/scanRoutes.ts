import fs from "fs";
import path from "path";
import { glob } from "glob";

const args = process.argv.slice(2);
const outputJson = args.includes("--json");

const routesDir = path.resolve("src/routes");
const routerFile = path.resolve("src/AppRoutes.tsx");

async function scanRoutes() {
  const files = await glob(`${routesDir}/**/*.{ts,tsx}`);
  const routerContents = fs.readFileSync(routerFile, "utf-8");

  const routerMatches = [
    ...routerContents.matchAll(/path:\s*["'`](.*?)["'`]/g),
    ...routerContents.matchAll(/<Route\s+path=["'`](.*?)["'`]/g),
  ];

  const routerPaths = new Set(routerMatches.map(([, route]) => route));

  const allRoutes = new Map<string, string[]>();
  const duplicateRoutes = new Set<string>();

  for (const file of files) {
    const contents = fs.readFileSync(file, "utf-8");
    const matches = [
      ...contents.matchAll(/path:\s*["'`](.*?)["'`]/g),
      ...contents.matchAll(/<Route\s+path=["'`](.*?)["'`]/g),
    ];

    matches.forEach(([, routePath]) => {
      if (!routePath || routePath.trim() === "") return;
      const existing = allRoutes.get(routePath) || [];
      existing.push(file);
      allRoutes.set(routePath, existing);
      if (existing.length > 1) duplicateRoutes.add(routePath);
    });
  }

  const isWildcardOrDynamic = (r: string) =>
    r === "*" || r.includes(":") || r.startsWith("/:");

  const unusedRoutes = Array.from(allRoutes.entries())
    .filter(([route]) => !routerPaths.has(route) && !isWildcardOrDynamic(route))
    .map(([route, files]) => ({ route, files }));

  const duplicateRouteList = Array.from(duplicateRoutes).map((route) => ({
    route,
    files: allRoutes.get(route) || [],
  }));

  // Output
  if (outputJson) {
    fs.writeFileSync(
      "route-audit.json",
      JSON.stringify({ unusedRoutes, duplicateRoutes: duplicateRouteList }, null, 2)
    );
    console.log("✅ route-audit.json generated.");
  } else {
    console.log(`\n🔍 Analysis Results:\n`);
    if (unusedRoutes.length > 0) {
      console.log(`❌ Unused Routes:`);
      unusedRoutes.forEach(({ route, files }) =>
        console.log(`   → ${route} (in: ${files.join(", ")})`)
      );
    } else {
      console.log("✅ No unused routes found.");
    }

    if (duplicateRouteList.length > 0) {
      console.log(`\n⚠️ Duplicate Routes:`);
      duplicateRouteList.forEach(({ route, files }) =>
        console.log(`   → ${route} (in: ${files.join(", ")})`)
      );
    } else {
      console.log("✅ No duplicate routes found.");
    }

    // Summary
    console.log(`\n📊 Summary:`);
    console.log(`   Total unused routes: ${unusedRoutes.length}`);
    console.log(`   Total duplicate routes: ${duplicateRouteList.length}`);
  }
}

scanRoutes();
