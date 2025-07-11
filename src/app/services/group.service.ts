import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface Group {
  id: string;
  name: string;
  description: string;
  created_by: string;
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private supabaseService: SupabaseService) {}

  async getUserGroups(): Promise<Group[]> {
    const session = await this.supabaseService.waitForSession();
    const userId = session?.user?.id;
    if (!userId) return [];

    // Get group_ids where user is a member
    const { data: groupMembers, error: groupMembersError } = await (this.supabaseService as any).supabase
      .from('group_members')
      .select('group_id')
      .eq('user_id', userId);
    if (groupMembersError || !groupMembers) return [];
    const groupIds = groupMembers.map((gm: any) => gm.group_id);
    if (!groupIds.length) return [];

    // Get group details
    const { data: groups, error: groupsError } = await (this.supabaseService as any).supabase
      .from('groups')
      .select('id, name, description, created_by')
      .in('id', groupIds);
    if (groupsError || !groups) return [];
    return groups;
  }
} 