
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface UserProfile {
  id: string;
  user_id?: string;
  name?: string;
  email?: string;
  avatar_url?: string;
  company?: string;
  company_id?: string;
  role?: string;
  industry?: string;
  company_size?: string;
  risk_appetite?: string;
  goals?: string[];
  phone?: string;
  location?: string;
  website?: string;
  bio?: string;
  personal_api_keys?: Record<string, string> | string | null | Json;
  created_at?: string;
  updated_at?: string;
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Omit<UserProfile, 'id' | 'created_at'>>
): Promise<boolean> {
  try {
    // Implementation would go here in a real app
    console.log('Updating profile for user:', userId, updates);
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
}

export function getUserDisplayName(profile: UserProfile | null): string {
  if (!profile) return 'User';
  return profile.name || profile.email || 'User';
}
