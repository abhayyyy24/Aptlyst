import { Component, ViewChild, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { SupabaseService } from '../../services/supabase.service';
import { Chart, ChartType } from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { DashboardHeaderComponent } from "../dashboard-header/dashboard-header.component";
import { AboutScreenComponent } from "../../screens/about-screen/about-screen.component";
import { DashboardGroupsComponent } from "../dashboard-groups/dashboard-groups.component";
import { DashboardNotificationsComponent } from "../dashboard-notifications/dashboard-notifications.component";
import { DashboardAnalyticsComponent } from "../dashboard-analytics/dashboard-analytics.component";

interface Activity {
  type: string;
  icon: string;
  title: string;
  time: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    NgChartsModule,
    DashboardHeaderComponent,
    DashboardGroupsComponent,
    DashboardNotificationsComponent,
    DashboardAnalyticsComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  
  // Loading and error states
  isLoading = true;
  error: string | null = null;
  
  // User and metrics data
  userName = 'John';
  listingCount = 45;
  listingFrequency = 12;
  listingProgress = 75;
  responseRate = 92;
  responseRateTrend = 5.2;
  occupancyRate = 88;
  occupancyRateTrend = -2.1;
  avgTimeToRent = 15;
  avgTimeToRentTrend = -8.5;
  avgTimeToRentPercentage = 75;
  clientSatisfaction = 95;
  clientSatisfactionTrend = 3.8;
  selectedPeriod: 'week' | 'month' | 'year' = 'month';

  recentActivities: Activity[] = [
    { type: 'new-listing', icon: 'bx bx-building-house', title: 'New property listed in Downtown', time: '2 hours ago' },
    { type: 'message', icon: 'bx bx-message-square-detail', title: 'New inquiry for Sunset Apartments', time: '4 hours ago' },
    { type: 'viewing', icon: 'bx bx-calendar', title: 'Viewing scheduled for Ocean View', time: '6 hours ago' },
    { type: 'update', icon: 'bx bx-refresh', title: 'Price updated for Mountain Lodge', time: '8 hours ago' }
  ];

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Active Listings',
      data: [12, 19, 15, 25, 22, 30],
      borderColor: '#4299e1',
      tension: 0.4,
      fill: false
    }]
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e2e8f0'
        },
        ticks: {
          color: '#718096',
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#718096',
          font: {
            size: 11
          }
        }
      }
    }
  };

  // New properties for updated dashboard layout
  userListingCount = this.listingCount; // Use existing listingCount for now
  userGroupCount = 3; // Demo value, replace with real group count

  quickStatsChartData = {
    labels: ['Listings', 'Groups'],
    datasets: [
      {
        label: 'Stats',
        data: [this.userListingCount, this.userGroupCount],
        backgroundColor: ['#4299e1', '#48bb78'],
      }
    ]
  };
  quickStatsChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  };

  userGroups = [
    { name: 'Property Managers', members: ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank'], showInfo: false },
    { name: 'Maintenance', members: ['Grace', 'Heidi', 'Ivan'], showInfo: false },
    { name: 'Marketing', members: ['Judy', 'Mallory', 'Niaj', 'Olivia'], showInfo: false }
  ];

  notifications = [
    { message: 'New group invitation: Property Managers' },
    { message: 'Maintenance scheduled for Unit 12' },
    { message: 'You have 2 unread messages' }
  ];

  analyticsGraphs: { type: ChartType; data: any; options: any }[] = [
    {
      type: 'doughnut' as ChartType,
      data: {
        labels: ['Occupied', 'Vacant'],
        datasets: [{ data: [80, 20], backgroundColor: ['#48bb78', '#e53e3e'] }]
      },
      options: { plugins: { legend: { display: false } } }
    },
    {
      type: 'bar' as ChartType,
      data: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{ data: [12, 19, 15], backgroundColor: '#4299e1' }]
      },
      options: { plugins: { legend: { display: false } } }
    }
  ];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      this.isLoading = true;
      // Initialize Chart.js only in browser environment
      if (isPlatformBrowser(this.platformId)) {
        await import('chart.js').then(({ Chart, registerables }) => {
          Chart.register(...registerables);
        });
      }

      // Get user data from Supabase session
      const session = await this.supabaseService.waitForSession();
      if (session?.user) {
        const userData = session.user.user_metadata;
        this.userName = userData?.['name'] || session.user.email?.split('@')[0] || 'User';
      }
      await this.loadDashboardData();
    } catch (error) {
      console.error('Initialization error:', error);
      this.error = 'Failed to initialize dashboard. Please try refreshing the page.';
    } finally {
      this.isLoading = false;
    }
  }

  async loadDashboardData() {
    try {
      // Here you would typically fetch data from your Supabase tables
      // For now, we'll use demo data
      this.listingCount = 24;
      this.listingFrequency = 75;
      this.listingProgress = (this.listingCount / 50) * 100;

      // Load initial chart data
      this.updateChartPeriod(this.selectedPeriod);
      
      this.error = null;
    } catch (error) {
      console.error('Data loading error:', error);
      this.error = 'Failed to load dashboard data. Please try refreshing the page.';
      throw error;
    }
  }

  updateChartPeriod(period: 'week' | 'month' | 'year') {
    if (!isPlatformBrowser(this.platformId)) return;
    
    try {
      this.selectedPeriod = period;
      // Update chart data based on selected period
      switch (period) {
        case 'week':
          this.lineChartData.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          this.lineChartData.datasets[0].data = [10, 15, 8, 12, 9, 14, 11];
          break;
        case 'month':
          this.lineChartData.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
          this.lineChartData.datasets[0].data = [42, 38, 45, 40];
          break;
        case 'year':
          this.lineChartData.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          this.lineChartData.datasets[0].data = [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 75, 80];
          break;
      }
    } catch (error) {
      console.error('Chart update error:', error);
      this.error = 'Failed to update chart data. Please try refreshing the page.';
    }
  }

  calculateProgress(value: number): number {
    return 157 - (157 * value) / 100;
  }

  onAddGroup() {
    // Placeholder for add group logic
    alert('Add Group clicked!');
  }

  showGroupInfo(group: any) {
    this.userGroups.forEach(g => g.showInfo = false);
    group.showInfo = true;
  }

  hideGroupInfo() {
    this.userGroups.forEach(g => g.showInfo = false);
  }
}
