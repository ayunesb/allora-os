import { fetchApi } from "@/utils/api/fetchApi"; // Adjust the path as needed

const params = {}; // Define or import 'params' as needed

await fetchApi("/api/endpoint", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(params), // Ensures the body is a string
});

export {};
