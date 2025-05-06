"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageProvider = LanguageProvider;
exports.useLanguage = useLanguage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var languageDetector_1 = require("@/utils/languageDetector");
var LanguageContext = (0, react_1.createContext)({
  language: "en",
  setLanguage: function () {},
});
function LanguageProvider(_a) {
  var children = _a.children;
  var _b = (0, react_1.useState)("en"),
    language = _b[0],
    setLanguage = _b[1];
  (0, react_1.useEffect)(function () {
    // Try to detect user's language from browser
    var browserLanguage = (0, languageDetector_1.detectUserLanguage)(
      navigator.languages
        ? navigator.languages.join(",")
        : navigator.language || navigator.userLanguage || "",
    );
    // Only set language if it's one we support
    if (["en", "es", "fr"].includes(browserLanguage)) {
      setLanguage(browserLanguage);
    }
    // Store the language preference
    localStorage.setItem("preferredLanguage", browserLanguage);
  }, []);
  var handleSetLanguage = function (lang) {
    setLanguage(lang);
    localStorage.setItem("preferredLanguage", lang);
  };
  return (0, jsx_runtime_1.jsx)(LanguageContext.Provider, {
    value: { language: language, setLanguage: handleSetLanguage },
    children: children,
  });
}
function useLanguage() {
  return (0, react_1.useContext)(LanguageContext);
}
