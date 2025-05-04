import { fetchApi } from '@/services/api/fetchApi';

// ...existing code...

await fetchApi('/api/plugin-event', {
  method: 'POST',
  body: JSON.stringify(params)
});

// ...existing code...