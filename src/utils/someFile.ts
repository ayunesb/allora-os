import { Headers } from 'node-fetch';

// ...existing code...

if (headers && headers instanceof Headers) {
  Object.fromEntries(Array.from(headers.entries()));
}

// ...existing code...