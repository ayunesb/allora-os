import fs from "fs";
import path from "path";
import { glob } from "glob";

const baseUrl = "https://your-api-url.com"; // Replace with your API base URL
const collection = {
  info: {
    name: "Allora API Endpoints",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  },
  item: [],
};

async function generate() {
  const apiFiles = await glob("src/api/**/*.ts");
  const supabaseFunctions = await glob("supabase/functions/**/*.ts");

  const allFiles = [...apiFiles, ...supabaseFunctions];
  for (const file of allFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const matches = [...content.matchAll(/(?:GET|POST|PUT|DELETE)\s*['"`](.*?)['"`]/gi)];
    const endpoint = file.replace(/^.*\/(api|functions)\//, "").replace(/\.ts$/, "");

    for (const [, route] of matches) {
      collection.item.push({
        name: `${endpoint} - ${route}`,
        request: {
          method: matches[0][0], // Extracted HTTP verb
          url: { raw: `${baseUrl}${route}`, host: [baseUrl], path: route.split("/") },
          header: [],
        },
      });
    }
  }

  fs.writeFileSync("postman-collection.json", JSON.stringify(collection, null, 2));
  console.log("✅ postman-collection.json generated.");
}

generate();
