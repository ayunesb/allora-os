
/**
 * Supabase API wrapper
 * Provides helper functions to adapt Supabase queries to work with our apiClient
 */

import { supabase } from '@/backend/supabase';

/**
 * Wraps a Supabase query function to make it compatible with apiRequest
 * @param queryFunction The Supabase query function to wrap
 * @returns A function that returns a Promise with a Response-like structure
 */
export const wrapSupabaseQuery = <T>(
  queryFunction: () => Promise<{ data: T; error: any }>
): (() => Promise<Response>) => {
  return async () => {
    const result = await queryFunction();
    
    // Convert Supabase response to something Response-like
    return {
      ok: !result.error,
      status: result.error ? 400 : 200,
      statusText: result.error ? result.error.message : 'OK',
      json: async () => result.data,
      headers: new Headers(),
      redirected: false,
      type: 'basic',
      url: '',
      clone: function() { return this; },
      body: null,
      bodyUsed: false,
      arrayBuffer: async () => new ArrayBuffer(0),
      blob: async () => new Blob(),
      formData: async () => new FormData(),
      text: async () => JSON.stringify(result.data)
    } as Response;
  };
};
