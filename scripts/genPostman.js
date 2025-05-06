import fs from "fs";
const routes = fs
    .readdirSync("./src/pages/api")
    .filter((file) => file.endsWith(".ts"))
    .map((file) => `/api/${file.replace(".ts", "")}`);
const collection = {
    info: {
        name: "Allora OS API",
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    item: routes.map((route) => ({
        name: route,
        request: {
            method: "GET",
            url: {
                raw: `http://localhost:3000${route}`,
                host: ["localhost"],
                port: "3000",
                path: route.split("/").filter(Boolean),
            },
        },
    })),
};
fs.writeFileSync("allora-postman.json", JSON.stringify(collection, null, 2));
console.log("✅ Postman collection generated: allora-postman.json");
