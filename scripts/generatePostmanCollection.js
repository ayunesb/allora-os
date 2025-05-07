var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
import { glob } from "glob";
const baseUrl = "https://your-api-url.com"; // Replace with your API base URL
const collection = {
    info: {
        name: "Allora API Endpoints",
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    item: [],
};
function generate() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiFiles = yield glob("src/api/**/*.ts");
        const supabaseFunctions = yield glob("supabase/functions/**/*.ts");
        const allFiles = [...apiFiles, ...supabaseFunctions];
        for (const file of allFiles) {
            const content = fs.readFileSync(file, "utf-8");
            const matches = [
                ...content.matchAll(/(?:GET|POST|PUT|DELETE)\s*['"`](.*?)['"`]/gi),
            ];
            const endpoint = file
                .replace(/^.*\/(api|functions)\//, "")
                .replace(/\.ts$/, "");
            for (const [, route] of matches) {
                collection.item.push({
                    name: `${endpoint} - ${route}`,
                    request: {
                        method: matches[0][0], // Extracted HTTP verb
                        url: {
                            raw: `${baseUrl}${route}`,
                            host: [baseUrl],
                            path: route.split("/"),
                        },
                        header: [],
                    },
                });
            }
        }
        fs.writeFileSync("postman-collection.json", JSON.stringify(collection, null, 2));
        console.log("✅ postman-collection.json generated.");
    });
}
generate();
