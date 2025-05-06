// Get upcoming communications
export function getUpcomingCommunications(communications) {
    return communications
        .filter((comm) => comm.status === "scheduled" &&
        comm.scheduled_at &&
        new Date(comm.scheduled_at) > new Date())
        .sort((a, b) => {
        if (!a.scheduled_at || !b.scheduled_at)
            return 0;
        return (new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());
    });
}
// Get past communications
export function getPastCommunications(communications) {
    return communications
        .filter((comm) => comm.status !== "scheduled" ||
        (comm.scheduled_at && new Date(comm.scheduled_at) <= new Date()))
        .sort((a, b) => {
        // Default to created_at if scheduled_at is not available
        const dateA = a.ended_at || a.scheduled_at || a.created_at;
        const dateB = b.ended_at || b.scheduled_at || b.created_at;
        return new Date(dateB).getTime() - new Date(dateA).getTime(); // Descending
    });
}
