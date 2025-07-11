import { Component, type OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-dashboard-header',
  imports: [],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent implements OnInit {
  username: string = '';
  totalListings: number = 0;
  totalGroups: number = 0;

  constructor(
    private dashboardService: DashboardService,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit(): Promise<void> {
    // Wait for session to be initialized and get the user id
    let session = await this.supabaseService.waitForSession();
    let retries = 0;
    while ((!session || !session.user?.id) && retries < 5) {
      await new Promise(res => setTimeout(res, 500));
      session = await this.supabaseService.waitForSession();
      retries++;
    }
    const userId = session?.user?.id;
    if (!userId) {
      this.username = 'User';
      this.totalListings = 0;
      this.totalGroups = 0;
      return;
    }
    // Fetch header stats
    try {
      const stats = await this.dashboardService.getHeaderStats(userId);
      this.username = stats.userName;
      this.totalListings = stats.totalListings;
      this.totalGroups = stats.totalGroups;
    } catch (error) {
      this.username = 'User';
      this.totalListings = 0;
      this.totalGroups = 0;
    }
  }
}
