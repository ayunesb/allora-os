import { Headers } from "node-fetch";
const headers = new Headers();
// Ensure headers.entries() returns [string, any][]
const headersObject = Object.fromEntries(headers.entries());
if (headers && headers instanceof Headers) {
    Object.fromEntries(Array.from(headers.entries()));
}
// ...existing code...
