import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { createClient, SupabaseClient, AuthError, Session } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase!: SupabaseClient;
  private _session = new BehaviorSubject<Session | null>(null);
  private initialized = false;
  private initializationPromise: Promise<void> | null = null;
  private memoryStorage: { [key: string]: string } = {};
  private sessionPromise: Promise<Session | null> | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private getStorage() {
    if (isPlatformBrowser(this.platformId)) {
      return {
        getItem: (key: string) => {
          try {
            return localStorage.getItem(key);
          } catch (error) {
            console.error('Error accessing localStorage:', error);
            return this.memoryStorage[key] || null;
          }
        },
        setItem: (key: string, value: string) => {
          try {
            localStorage.setItem(key, value);
          } catch (error) {
            console.error('Error setting localStorage:', error);
            this.memoryStorage[key] = value;
          }
        },
        removeItem: (key: string) => {
          try {
            localStorage.removeItem(key);
          } catch (error) {
            console.error('Error removing from localStorage:', error);
            delete this.memoryStorage[key];
          }
        }
      };
    }
    return {
      getItem: (key: string) => this.memoryStorage[key] || null,
      setItem: (key: string, value: string) => {
        this.memoryStorage[key] = value;
      },
      removeItem: (key: string) => {
        delete this.memoryStorage[key];
      }
    };
  }

  private async initializeSupabase() {
    if (this.initialized) return;
    
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = (async () => {
      try {
        const storage = this.getStorage();
        
        this.supabase = createClient(
          environment.supabase.url,
          environment.supabase.anonKey,
          {
            auth: {
              autoRefreshToken: true,
              persistSession: true,
              detectSessionInUrl: true,
              storage: storage,
              flowType: 'pkce',
              debug: false
            },
            global: {
              headers: {
                'apikey': environment.supabase.anonKey
              }
            },
            db: {
              schema: 'public'
            },
            realtime: {
              params: {
                eventsPerSecond: 10
              }
            }
          }
        );

        // Set up auth state change listener
        this.supabase.auth.onAuthStateChange((event, session) => {
          this._session.next(session);
        });

        // Initial session check
        try {
          const { data: { session }, error: sessionError } = await this.supabase.auth.getSession();
          if (sessionError) {
            console.error('Session retrieval error:', sessionError);
            this._session.next(null);
          } else {
            this._session.next(session);
          }
        } catch (error) {
          console.error('Error getting initial session:', error);
          this._session.next(null);
        }

        this.initialized = true;
      } catch (error) {
        console.error('Supabase initialization error:', error);
        this.initialized = false;
        this.initializationPromise = null;
        throw new Error('Failed to initialize Supabase client. Please check your internet connection and try again.');
      }
    })();

    return this.initializationPromise;
  }

  public async waitForSession(): Promise<Session | null> {
    try {
      await this.initializeSupabase();
      
      // If we already have a session in the BehaviorSubject, return it
      const currentSession = this._session.getValue();
      if (currentSession) {
        return currentSession;
      }

      // If we have an ongoing session promise, return that
      if (this.sessionPromise) {
        return this.sessionPromise;
      }

      // Create a new session promise
      this.sessionPromise = (async () => {
        try {
          const { data: { session }, error } = await this.supabase.auth.getSession();
          if (error) {
            console.error('Error getting session:', error);
            return null;
          }
          return session;
        } catch (error) {
          console.error('Error in session retrieval:', error);
          return null;
        } finally {
          this.sessionPromise = null;
        }
      })();

      return this.sessionPromise;
    } catch (error) {
      console.error('Error in waitForSession:', error);
      return null;
    }
  }

  private async retryOperation<T>(operation: () => Promise<T>, maxRetries = 3): Promise<T> {
    let lastError: any;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        lastError = error;
        if (error.message?.includes('Failed to fetch') && attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, attempt * 1000));
          continue;
        }
        break;
      }
    }
    throw lastError;
  }

  get session(): Observable<Session | null> {
    return this._session.asObservable();
  }

  waitForSession$(): Observable<Session | null> {
    return this._session.asObservable();
  }

  async signUp(email: string, password: string, userData: any = {}) {
    await this.initializeSupabase();

    return this.retryOperation(async () => {
      try {
        const { data, error } = await this.supabase.auth.signUp({
          email,
          password,
          options: {
            data: userData,
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });

        if (error) throw this.handleAuthError(error);
        return data;
      } catch (error) {
        throw this.handleAuthError(error as AuthError);
      }
    });
  }

  async signIn(email: string, password: string) {
    await this.initializeSupabase();

    return this.retryOperation(async () => {
      try {
        const { data, error } = await this.supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw this.handleAuthError(error);
        return data;
      } catch (error) {
        throw this.handleAuthError(error as AuthError);
      }
    });
  }

  async signOut() {
    await this.initializeSupabase();

    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw this.handleAuthError(error);
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  async resetPassword(email: string) {
    await this.initializeSupabase();

    try {
      const { error } = await this.supabase.auth.resetPasswordForEmail(email);
      if (error) throw this.handleAuthError(error);
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  async updateProfile(userData: any) {
    await this.initializeSupabase();

    try {
      const { data: { user }, error } = await this.supabase.auth.updateUser({
        data: userData
      });

      if (error) throw this.handleAuthError(error);
      return user;
    } catch (error) {
      throw this.handleAuthError(error as AuthError);
    }
  }

  async getUserListings(): Promise<any[]> {
    try {
      await this.initializeSupabase();
      const session = await this.waitForSession();
      const user = session?.user;
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await this.supabase
        .from('listings')
        .select('*')
        .eq('user_id', user.id)
        .order('id', { ascending: false });

      if (error) throw error;
      return data ?? [];
    } catch (error) {
      console.error('Error in getUserListings:', error);
      throw error;
    }
  }

  async createListing(listingData: {
    type: string;
    society_name: string;
    locality: string;
    floor: number;
    rent: number;
    deposit: number;
    carpet_area: number;
    available_from: string;
    image_url: string;
  }): Promise<any> {
    await this.initializeSupabase();
    const session = await this.waitForSession();
    const user = session?.user;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await this.supabase
      .from('listings')
      .insert([
        {
          type: listingData.type,
          society_name: listingData.society_name,
          locality: listingData.locality,
          floor: listingData.floor,
          rent: listingData.rent,
          deposit: listingData.deposit,
          carpet_area: listingData.carpet_area,
          'available from': listingData.available_from,
          image_url: listingData.image_url,
          user_id: user.id
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private handleAuthError(error: AuthError | any): Error {
    if ('message' in error) {
      return new Error(this.getReadableErrorMessage(error.message));
    }
    return new Error('An unexpected error occurred. Please try again.');
  }

  private getReadableErrorMessage(message: string): string {
    const errorMap: { [key: string]: string } = {
      'Invalid login credentials': 'Invalid email or password. Please try again.',
      'Email not confirmed': 'Please verify your email address before logging in.',
      'Password is too short': 'Password must be at least 6 characters long.',
      'User already registered': 'An account with this email already exists.',
      'Rate limit exceeded': 'Too many attempts. Please try again later.',
      'Failed to fetch': 'Network error. Please check your internet connection and try again.',
      'Invalid email': 'Please enter a valid email address.',
      'Weak password': 'Password is too weak. Please use a stronger password.',
      'Network request failed': 'Network error. Please check your internet connection and try again.',
      'Invalid phone number format': 'Please enter a valid phone number.',
      'Email link is invalid or has expired': 'The verification link is invalid or has expired. Please request a new one.',
      'Database connection error': 'Server error. Please try again later.',
      'User not found': 'Account not found. Please check your email or sign up.',
      'Auth session missing': 'Your session has expired. Please log in again.',
      'Invalid JWT': 'Your session has expired. Please log in again.',
      'JWT expired': 'Your session has expired. Please log in again.'
    };

    for (const [key, value] of Object.entries(errorMap)) {
      if (message.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }

    return message || 'An unexpected error occurred. Please try again.';
  }
}
