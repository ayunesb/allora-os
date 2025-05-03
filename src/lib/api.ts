export async function fetchAILogs() {
  const res = await fetch('/api/ai-logs');
  return res.json();
}

export async function saveVote(logId: string, success: boolean) {
  await fetch(`/api/ai-logs/${logId}/vote`, {
    method: 'POST',
    body: JSON.stringify({ success }),
    headers: { 'Content-Type': 'application/json' }
  });
}
