"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCeoSelection = useCeoSelection;
var react_1 = require("react");
var AuthContext_1 = require("@/context/AuthContext");
function useCeoSelection() {
  var profile = (0, AuthContext_1.useAuth)().profile;
  var _a = (0, react_1.useState)({
      name: "Elon Musk",
      role: "ceo",
    }),
    selectedCeo = _a[0],
    setSelectedCeo = _a[1];
  (0, react_1.useEffect)(
    function () {
      // Select a CEO based on the user's industry or preferences
      if (profile) {
        var industry = profile.industry || "Technology";
        var ceoBotName = "Elon Musk"; // Default
        // Customize CEO bot selection based on industry
        if (industry === "Finance" || industry === "Banking") {
          ceoBotName = "Warren Buffett";
        } else if (industry === "Retail" || industry === "E-commerce") {
          ceoBotName = "Jeff Bezos";
        } else if (industry === "Software" || industry === "Technology") {
          ceoBotName = "Satya Nadella";
        } else if (industry === "Manufacturing" || industry === "Hardware") {
          ceoBotName = "Tim Cook";
        }
        setSelectedCeo({
          name: ceoBotName,
          role: "ceo",
        });
      }
    },
    [profile],
  );
  return { selectedCeo: selectedCeo };
}
