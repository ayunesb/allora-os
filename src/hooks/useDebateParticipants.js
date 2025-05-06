"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDebateParticipants;
var react_1 = require("react");
var debate_1 = require("@/backend/debate");
var executiveBots_1 = require("@/backend/executiveBots");
// Executive profiles with expertise areas and backgrounds
var executiveProfiles = {
  "Elon Musk": {
    role: "CEO",
    expertise: ["Innovation", "Product Development", "Risk-Taking"],
    background: "Founded Tesla, SpaceX, and multiple cutting-edge companies",
    avatar: "/avatars/elon.jpg",
  },
  "Jeff Bezos": {
    role: "CEO",
    expertise: ["Scaling", "Customer Obsession", "Long-term Thinking"],
    background: "Founded Amazon, revolutionized e-commerce and cloud computing",
    avatar: "/avatars/bezos.jpg",
  },
  "Satya Nadella": {
    role: "CEO",
    expertise: [
      "Digital Transformation",
      "Cloud Strategy",
      "Corporate Culture",
    ],
    background:
      "Transformed Microsoft into a cloud-first company, driving massive growth",
    avatar: "/avatars/nadella.jpg",
  },
  "Warren Buffett": {
    role: "CFO",
    expertise: ["Investment Strategy", "Value Assessment", "Risk Management"],
    background: "Legendary investor and CEO of Berkshire Hathaway",
    avatar: "/avatars/buffett.jpg",
  },
  "Sheryl Sandberg": {
    role: "COO",
    expertise: ["Operations", "Team Building", "Scaling Organizations"],
    background:
      "Former COO of Facebook/Meta, helped grow it into a global giant",
    avatar: "/avatars/sandberg.jpg",
  },
};
function useDebateParticipants() {
  var _a = (0, react_1.useState)([]),
    participants = _a[0],
    setParticipants = _a[1];
  var _b = (0, react_1.useState)([]),
    availableExecutives = _b[0],
    setAvailableExecutives = _b[1];
  // Get all available executives for selection
  (0, react_1.useEffect)(function () {
    var allExecutives = [];
    var _loop_1 = function (role, names) {
      names.forEach(function (name) {
        if (executiveProfiles[name]) {
          allExecutives.push({
            id: "exec-".concat(name.toLowerCase().replace(/\s+/g, "-")),
            name: name,
            role:
              executiveProfiles[name].role ||
              role.toUpperCase().replace("_", " "),
            expertise: executiveProfiles[name].expertise || [],
            background: executiveProfiles[name].background || "",
            avatar: executiveProfiles[name].avatar || "/avatars/default.jpg",
          });
        }
      });
    };
    // Combine all executive bots from different categories
    for (
      var _i = 0, _a = Object.entries(executiveBots_1.executiveBots);
      _i < _a.length;
      _i++
    ) {
      var _b = _a[_i],
        role = _b[0],
        names = _b[1];
      _loop_1(role, names);
    }
    setAvailableExecutives(allExecutives);
  }, []);
  // Initialize participants from executive bots
  (0, react_1.useEffect)(function () {
    var initialParticipants = (0, debate_1.getInitialParticipants)(4);
    // Enhance participants with additional information if available
    var enhancedParticipants = initialParticipants.map(function (participant) {
      var executiveInfo = executiveProfiles[participant.name];
      if (executiveInfo) {
        return __assign(__assign({}, participant), {
          expertise: executiveInfo.expertise || [],
          background: executiveInfo.background || "",
          avatar: executiveInfo.avatar || "/avatars/default.jpg",
        });
      }
      return participant;
    });
    setParticipants(enhancedParticipants);
  }, []);
  return {
    participants: participants,
    setParticipants: setParticipants,
    availableExecutives: availableExecutives,
  };
}
