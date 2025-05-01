
import { supabase } from '@/integrations/supabase/client';

// Mock the executives table for development/testing
const executivesTable = {
  executives: [
    { 
      id: '1',
      name: 'Elon Musk',
      role: 'CEO',
      resource_points: 100,
      star_rating: 4,
      level: 'Senior',
      successful_actions: 10,
      failed_actions: 2
    },
    { 
      id: '2',
      name: 'Sheryl Sandberg',
      role: 'COO',
      resource_points: 90,
      star_rating: 4,
      level: 'Senior',
      successful_actions: 8,
      failed_actions: 1
    },
    { 
      id: '3',
      name: 'Warren Buffett',
      role: 'CFO',
      resource_points: 120,
      star_rating: 5,
      level: 'Senior',
      successful_actions: 12,
      failed_actions: 0
    }
  ],
  
  // Mock methods for development/testing
  findByName: function(name: string) {
    return this.executives.find(exec => exec.name === name);
  },
  
  update: function(name: string, updates: Record<string, any>) {
    const index = this.executives.findIndex(exec => exec.name === name);
    if (index >= 0) {
      this.executives[index] = { ...this.executives[index], ...updates };
      return { data: this.executives[index], error: null };
    }
    return { data: null, error: { message: 'Executive not found' } };
  }
};

// Monkey patch the supabase from method to handle 'executives' table
const originalFrom = supabase.from;
supabase.from = function(tableName: string) {
  if (tableName === 'executives') {
    return {
      select: () => ({
        eq: (field: string, value: any) => ({
          single: () => {
            const exec = executivesTable.findByName(value);
            return Promise.resolve({ 
              data: exec, 
              error: exec ? null : { message: 'Executive not found' } 
            });
          }
        })
      }),
      update: (updates: Record<string, any>) => ({
        eq: (field: string, value: any) => {
          return Promise.resolve(executivesTable.update(value, updates));
        }
      }),
      insert: (data: any) => {
        executivesTable.executives.push(data);
        return Promise.resolve({ data, error: null });
      }
    };
  }
  
  // Return the original implementation for other tables
  return originalFrom(tableName);
};

export { executivesTable };
