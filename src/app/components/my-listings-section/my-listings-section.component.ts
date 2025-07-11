import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ListingService, Listing } from '../../services/listing.service';
import { SupabaseService } from '../../services/supabase.service';
import { Subscription, finalize, firstValueFrom, timeout } from 'rxjs';

@Component({
  selector: 'my-listings-section',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './my-listings-section.component.html',
  styleUrl: './my-listings-section.component.css'
})
export class MyListingsSectionComponent implements OnInit, OnDestroy {
  listings: Listing[] = [];
  loading: boolean = true;
  error: string | null = null;
  private subscription: Subscription | null = null;
  private realtimeSubscription: any;

  constructor(
    private listingService: ListingService,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    await this.reloadListings();
    this.subscribeToRealtime();
  }

  subscribeToRealtime() {
    // Ensure supabase is initialized and client is available
    if (!('supabase' in this.supabaseService)) return;
    // @ts-ignore
    const client = this.supabaseService['supabase'];
    if (!client) return;
    this.realtimeSubscription = client
      .channel('public:listings')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'listings' }, payload => {
        setTimeout(() => {
          this.reloadListings();
        }, 500);
      })
      .subscribe();
  }

  async reloadListings() {
    try {
      this.loading = true;
      this.error = null;

      const session = await this.supabaseService.waitForSession();
      if (!session) {
        this.error = 'Please log in to view your listings.';
        this.loading = false;
        return;
      }

      const listings$ = this.listingService.getListings().pipe(
        timeout(10000), // 10 second timeout
        finalize(() => {
          this.loading = false;
        })
      );

      try {
        this.listings = await firstValueFrom(listings$);
        this.error = null;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load listings. Please try again.';
        console.error('Error loading listings:', error);
      }
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'An unexpected error occurred.';
      console.error('Error in initialization:', err);
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy() {
    if (this.realtimeSubscription) {
      // @ts-ignore
      this.supabaseService['supabase'].removeChannel(this.realtimeSubscription);
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}