import { fetchApi } from '@/services/api/fetchApi';

const params = {}; // Defined params or fetch via queryParams/props

await fetchApi('/api/plugin-event', {
  method: 'POST',
  body: JSON.stringify(params)
});

// ...existing code...