import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Observable, from, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

export interface Listing {
  id: number;
  type: string;
  society_name: string;
  locality: string;
  floor: number;
  rent: number;
  deposit: number;
  carpet_area: number;
  'available from': string;
  image_url: string;
}

export interface CreateListingData {
  type: string;
  society_name: string;
  locality: string;
  floor: number;
  rent: number;
  deposit: number;
  carpet_area: number;
  available_from: string;
  image_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private readonly TIMEOUT_MS = 10000; // 10 seconds timeout

  constructor(private supabaseService: SupabaseService) {}

  getListings(): Observable<Listing[]> {
    return from(this.supabaseService.getUserListings()).pipe(
      timeout(this.TIMEOUT_MS),
      catchError(error => {
        console.error('Error fetching listings:', error);
        return throwError(() => new Error('Failed to fetch listings. Please try again.'));
      })
    );
  }

  createListing(listingData: CreateListingData): Observable<Listing> {
    return from(this.supabaseService.createListing(listingData)).pipe(
      timeout(this.TIMEOUT_MS),
      catchError(error => {
        console.error('Error creating listing:', error);
        return throwError(() => new Error('Failed to create listing. Please try again.'));
      })
    );
  }
} 