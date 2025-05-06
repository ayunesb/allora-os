const {
  id,
  webhook_id,
  eventType,
  status,
  created_at,
  payload,
  targetUrl,
  response,
  resource
} = data;

export function getMockWebhook() {
  return {
    eventType: 'mock',
    id: '123',
    // ...other mock data...
  };
}

return {
  id,
  webhook_id,
  eventType,
  status,
  created_at,
  payload,
  targetUrl,
  response,
  resource
};
