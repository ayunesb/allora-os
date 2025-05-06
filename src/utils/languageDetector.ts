import acceptLanguageParser from "accept-language-parser";

export function detectUserLanguage(acceptLanguageHeader: string): string {
  if (!acceptLanguageHeader) {
    return "en"; // Default to English
  }

  const languages = acceptLanguageParser.parse(acceptLanguageHeader);

  if (languages.length > 0) {
    return languages[0].code; // e.g., "en", "es", "fr"
  }

  return "en"; // Default to English
}
