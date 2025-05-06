"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDebateState;
var react_1 = require("react");
var sonner_1 = require("sonner");
var debateManager_1 = require("@/backend/debateManager");
function useDebateState() {
  var _a = (0, react_1.useState)(""),
    newMessage = _a[0],
    setNewMessage = _a[1];
  var _b = (0, react_1.useState)("setup"),
    activeTab = _b[0],
    setActiveTab = _b[1];
  // Handle form input changes
  var handleNewMessageChange = (0, react_1.useCallback)(function (value) {
    setNewMessage(value);
  }, []);
  // Handle tab changes
  var handleTabChange = (0, react_1.useCallback)(function (value) {
    setActiveTab(value);
  }, []);
  // Functions for debate actions
  var exportDebate = (0, react_1.useCallback)(function (messages, debateTitle) {
    // Create a text version of the debate
    var debateText = messages
      .map(function (msg) {
        return ""
          .concat(msg.sender, " (")
          .concat(new Date(msg.timestamp).toLocaleString(), "):\n")
          .concat(msg.content, "\n\n");
      })
      .join("");
    // Create a blob and download it
    var blob = new Blob([debateText], { type: "text/plain" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "".concat(
      debateTitle.replace(/\s+/g, "-").toLowerCase(),
      "-debate.txt",
    );
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    sonner_1.toast.success("Debate exported to text file");
  }, []);
  var saveDebate = (0, react_1.useCallback)(function () {
    // In a real app, this would save to the database
    sonner_1.toast.success("Debate saved successfully");
  }, []);
  var exportSummary = (0, react_1.useCallback)(function () {
    sonner_1.toast.success("Summary exported successfully");
  }, []);
  var saveToReports = (0, react_1.useCallback)(function () {
    sonner_1.toast.success("Summary saved to reports");
  }, []);
  return {
    newMessage: newMessage,
    activeTab: activeTab,
    debateTopics: debateManager_1.debateTopics,
    handleNewMessageChange: handleNewMessageChange,
    handleTabChange: handleTabChange,
    setNewMessage: setNewMessage,
    exportDebate: exportDebate,
    saveDebate: saveDebate,
    exportSummary: exportSummary,
    saveToReports: saveToReports,
  };
}
