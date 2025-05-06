"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExecutiveBoard = useExecutiveBoard;
var react_1 = require("react");
var executiveBots_1 = require("@/backend/executiveBots");
var consultation_1 = require("@/utils/consultation");
function useExecutiveBoard() {
  var _a = (0, react_1.useState)([]),
    executives = _a[0],
    setExecutives = _a[1];
  var _b = (0, react_1.useState)([]),
    filteredExecutives = _b[0],
    setFilteredExecutives = _b[1];
  var _c = (0, react_1.useState)(""),
    searchQuery = _c[0],
    setSearchQuery = _c[1];
  var _d = (0, react_1.useState)("all"),
    roleFilter = _d[0],
    setRoleFilter = _d[1];
  var _e = (0, react_1.useState)("all"),
    riskFilter = _e[0],
    setRiskFilter = _e[1];
  // Generate extended executive bots with more metadata
  (0, react_1.useEffect)(function () {
    var allBots = Object.entries(executiveBots_1.executiveBots).flatMap(
      function (_a) {
        var role = _a[0],
          names = _a[1];
        return names.map(function (name, index) {
          // Custom specializations based on the AI system documentation
          var specialization = [];
          var optimization = "";
          var riskAppetite = "Medium";
          // Assign specializations based on documented data
          switch (name) {
            case "Elon Musk":
              specialization = [
                "Disruptive innovation",
                "AI/space",
                "Sustainability",
              ];
              optimization = "Pushes high-risk bold strategies";
              riskAppetite = "High";
              break;
            case "Jeff Bezos":
              specialization = ["Customer obsession", "Data-driven scaling"];
              optimization =
                "Focused on operational excellence + customer retention";
              riskAppetite = "Medium";
              break;
            case "Satya Nadella":
              specialization = ["Digital transformation", "Cloud leadership"];
              optimization = "Automates and enhances enterprise processes";
              riskAppetite = "Medium";
              break;
            case "Tim Cook":
              specialization = ["Operational excellence", "Product scaling"];
              optimization = "Optimizes logistics, manufacturing, supply chain";
              riskAppetite = "Low";
              break;
            case "Sheryl Sandberg":
              specialization = ["Scaling operations", "Team growth"];
              optimization = "Scales internal processes and collaboration";
              riskAppetite = "Medium";
              break;
            case "Gwynne Shotwell":
              specialization = ["Aerospace project scaling"];
              optimization = "Risk management for tech innovation launches";
              riskAppetite = "High";
              break;
            case "Warren Buffett":
              specialization = [
                "Investment strategy",
                "Value assessment",
                "Risk management",
              ];
              optimization =
                "Allocates capital efficiently based on long-term value";
              riskAppetite = "Low";
              break;
            case "Ruth Porat":
              specialization = ["Financial modeling", "Risk management"];
              optimization = "Allocates budgets efficiently based on KPIs";
              riskAppetite = "Low";
              break;
            case "Clayton Christensen":
              specialization = ["Disruptive innovation", "Market analysis"];
              optimization = "Detects early market disruptors";
              riskAppetite = "High";
              break;
            case "Reed Hastings":
              specialization = ["Streaming and content", "Subscription models"];
              optimization = "Optimizes recurring digital revenue";
              riskAppetite = "Medium";
              break;
            case "Marc Benioff":
              specialization = ["CRM", "Sales automation", "Cloud strategy"];
              optimization = "Sales cycle optimization";
              riskAppetite = "Medium";
              break;
            default:
              specialization = ["Business strategy", "Leadership"];
              optimization = "Balanced approach to business challenges";
              riskAppetite = "Medium";
          }
          return {
            id: "exec-".concat(role, "-").concat(index),
            name: name,
            role: role,
            title: (0, consultation_1.formatRoleTitle)(role),
            specialization: specialization,
            optimization: optimization,
            avatar: "/avatars/".concat(
              name.toLowerCase().replace(/\s+/g, "-"),
              ".jpg",
            ),
            riskAppetite: riskAppetite,
          };
        });
      },
    );
    setExecutives(allBots);
    setFilteredExecutives(allBots);
  }, []);
  // Filter executives based on search, role, and risk
  (0, react_1.useEffect)(
    function () {
      var filtered = executives.filter(function (exec) {
        var matchesSearch =
          exec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exec.specialization.some(function (spec) {
            return spec.toLowerCase().includes(searchQuery.toLowerCase());
          }) ||
          exec.optimization.toLowerCase().includes(searchQuery.toLowerCase());
        var matchesRole = roleFilter === "all" || exec.role === roleFilter;
        var matchesRisk =
          riskFilter === "all" || exec.riskAppetite === riskFilter;
        return matchesSearch && matchesRole && matchesRisk;
      });
      setFilteredExecutives(filtered);
    },
    [searchQuery, roleFilter, riskFilter, executives],
  );
  // Get executives by role
  var getExecutivesByRole = (0, react_1.useCallback)(
    function (role) {
      return executives.filter(function (exec) {
        return exec.role === role;
      });
    },
    [executives],
  );
  // Get executives by risk appetite
  var getExecutivesByRisk = (0, react_1.useCallback)(
    function (risk) {
      return executives.filter(function (exec) {
        return exec.riskAppetite === risk;
      });
    },
    [executives],
  );
  return {
    executives: executives,
    filteredExecutives: filteredExecutives,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    roleFilter: roleFilter,
    setRoleFilter: setRoleFilter,
    riskFilter: riskFilter,
    setRiskFilter: setRiskFilter,
    getExecutivesByRole: getExecutivesByRole,
    getExecutivesByRisk: getExecutivesByRisk,
  };
}
