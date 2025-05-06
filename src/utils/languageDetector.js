"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectUserLanguage = detectUserLanguage;
var accept_language_parser_1 = require("accept-language-parser");
function detectUserLanguage(acceptLanguageHeader) {
  if (!acceptLanguageHeader) {
    return "en"; // Default to English
  }
  var languages = accept_language_parser_1.default.parse(acceptLanguageHeader);
  if (languages.length > 0) {
    return languages[0].code; // e.g., "en", "es", "fr"
  }
  return "en"; // Default to English
}
