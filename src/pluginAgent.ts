import type { ExecutiveBot } from "@/models/campaign";
import { PluginTask } from "@/types/Plugin";
import { fetchApi } from "@/utils/api/fetchApi";

export async function fetchApi(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  return await fetch(url, options);
}

export async function executePluginTask(task: PluginTask): Promise<void> {
  try {
    await fetchApi("/api/plugin-execute", {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    if (err instanceof Error) console.error("Plugin exec error:", err.message);
  }
}

try {
  // ...existing code...
} catch (error) {
  console.error(error instanceof Error ? error.message : "Unknown error");
}
