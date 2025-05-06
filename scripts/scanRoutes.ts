import fs from "fs";
import path from "path";
import { glob } from "glob";

const args: string[] = process.argv.slice(2);
const outputJson: boolean = args.includes("--json");

const routesDir: string = path.resolve("src/routes");
const routerFile: string = path.resolve("src/AppRoutes.tsx");

async function scanRoutes(): Promise<void> {
  const files: string[] = await glob(`${routesDir}/**/*.{ts,tsx}`);
  const routerContents: string = fs.readFileSync(routerFile, "utf-8");

  const routerMatches: RegExpMatchArray[] = [
    ...routerContents.matchAll(/path:\s*["'`](.*?)["'`]/g),
    ...routerContents.matchAll(/<Route\s+path=["'`](.*?)["'`]/g),
  ];

  const routerPaths: Set<string> = new Set(
    routerMatches.map(([, route]) => route),
  );

  const allRoutes: Map<string, string[]> = new Map();
  const duplicateRoutes: Set<string> = new Set();

  for (const file of files) {
    const contents: string = fs.readFileSync(file, "utf-8");
    const matches: RegExpMatchArray[] = [
      ...contents.matchAll(/path:\s*["'`](.*?)["'`]/g),
      ...contents.matchAll(/<Route\s+path=["'`](.*?)["'`]/g),
    ];

    matches.forEach(([, routePath]) => {
      if (!routePath || routePath.trim() === "") return;
      const existing: string[] = allRoutes.get(routePath) || [];
      existing.push(file);
      allRoutes.set(routePath, existing);
      if (existing.length > 1) duplicateRoutes.add(routePath);
    });
  }

  const isWildcardOrDynamic = (r: string): boolean =>
    r === "*" || r.includes(":") || r.startsWith("/:");

  const unusedRoutes: { route: string; files: string[] }[] = Array.from(
    allRoutes.entries(),
  )
    .filter(([route]) => !routerPaths.has(route) && !isWildcardOrDynamic(route))
    .map(([route, files]) => ({ route, files }));

  const duplicateRouteList: { route: string; files: string[] }[] = Array.from(
    duplicateRoutes,
  ).map((route) => ({
    route,
    files: allRoutes.get(route) || [],
  }));

  // Output
  if (outputJson) {
    fs.writeFileSync(
      "route-audit.json",
      JSON.stringify(
        { unusedRoutes, duplicateRoutes: duplicateRouteList },
        null,
        2,
      ),
    );
    console.log("✅ route-audit.json generated.");
  } else {
    console.log(`\n🔍 Analysis Results:\n`);
    if (unusedRoutes.length > 0) {
      console.log(`❌ Unused Routes:`);
      unusedRoutes.forEach(({ route, files }) =>
        console.log(`   → ${route} (in: ${files.join(", ")})`),
      );
    } else {
      console.log("✅ No unused routes found.");
    }

    if (duplicateRouteList.length > 0) {
      console.log(`\n⚠️ Duplicate Routes:`);
      duplicateRouteList.forEach(({ route, files }) =>
        console.log(`   → ${route} (in: ${files.join(", ")})`),
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
