"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var headers = new node_fetch_1.Headers();
// Ensure headers.entries() returns [string, any][]
var headersObject = Object.fromEntries(headers.entries());
if (headers && headers instanceof node_fetch_1.Headers) {
  Object.fromEntries(Array.from(headers.entries()));
}
// ...existing code...
