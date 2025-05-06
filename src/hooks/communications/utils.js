"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpcomingCommunications = getUpcomingCommunications;
exports.getPastCommunications = getPastCommunications;
// Get upcoming communications
function getUpcomingCommunications(communications) {
  return communications
    .filter(function (comm) {
      return (
        comm.status === "scheduled" &&
        comm.scheduled_at &&
        new Date(comm.scheduled_at) > new Date()
      );
    })
    .sort(function (a, b) {
      if (!a.scheduled_at || !b.scheduled_at) return 0;
      return (
        new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
      );
    });
}
// Get past communications
function getPastCommunications(communications) {
  return communications
    .filter(function (comm) {
      return (
        comm.status !== "scheduled" ||
        (comm.scheduled_at && new Date(comm.scheduled_at) <= new Date())
      );
    })
    .sort(function (a, b) {
      // Default to created_at if scheduled_at is not available
      var dateA = a.ended_at || a.scheduled_at || a.created_at;
      var dateB = b.ended_at || b.scheduled_at || b.created_at;
      return new Date(dateB).getTime() - new Date(dateA).getTime(); // Descending
    });
}
