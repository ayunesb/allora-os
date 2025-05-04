export function handleError(err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const stack = err instanceof Error ? err.stack : "No stack trace available";
    console.error("Error:", message);
    console.error("Stack trace:", stack);
}
