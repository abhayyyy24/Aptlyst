import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private supabaseService: SupabaseService) {}

  async getHeaderStats(userId: string) {
    // Get the supabase client instance
    const supabase = (this.supabaseService as any).supabase;

    // Get number of listings for the logged-in user from the listings table
    const listingsQ = supabase
      .from('listings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get number of groups the user is part of from group_members table
    const groupsQ = supabase
      .from('group_members')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get the user's name from the profiles table
    const profileQ = supabase
      .from('profiles')
      .select('name')
      .eq('id', userId)
      .single();

    const [listingsRes, groupsRes, profileRes] = await Promise.all([
      listingsQ,
      groupsQ,
      profileQ
    ]);

    return {
      userName: profileRes.data?.name ?? 'User',
      totalListings: listingsRes.count ?? 0,
      totalGroups: groupsRes.count ?? 0
    };
  }
}

