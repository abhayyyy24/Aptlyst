import { Injectable } from '@angular/core';
import { Observable, from, throwError, timeout, catchError, tap } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TIMEOUT_MS = 15000; // 15 seconds timeout

  constructor(private supabaseService: SupabaseService) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    console.log('AuthService: Starting login process');
    return from(this.supabaseService.signIn(credentials.email, credentials.password)).pipe(
      timeout(this.TIMEOUT_MS),
      catchError(error => {
        console.error('AuthService: Login error:', error);
        if (error.name === 'TimeoutError') {
          return throwError(() => new Error('Login request timed out. Please try again.'));
        }
        return throwError(() => error);
      }),
      tap(response => {
        if (response?.session?.access_token) {
          localStorage.setItem('token', response.session.access_token);
        }
      })
    );
  }

  signup(userData: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }): Observable<any> {
    console.log('AuthService: Starting signup process');
    const { email, password, name, phone } = userData;

    return from(
      this.supabaseService.signUp(email, password, {
        name,
        phone // passed to `user_metadata`, `name` goes to `profiles` inside supabase.service.ts
      })
    ).pipe(
      timeout(this.TIMEOUT_MS),
      catchError(error => {
        console.error('AuthService: Signup error:', error);
        if (error.name === 'TimeoutError') {
          return throwError(() => new Error('Signup request timed out. Please try again.'));
        }
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<void> {
    console.log('AuthService: Starting logout process');
    return from(this.supabaseService.signOut()).pipe(
      timeout(this.TIMEOUT_MS),
      catchError(error => {
        console.error('AuthService: Logout error:', error);
        if (error.name === 'TimeoutError') {
          return throwError(() => new Error('Logout request timed out. Please try again.'));
        }
        return throwError(() => error);
      })
    );
  }

  getSession(): Observable<any> {
    return this.supabaseService.session;
  }
}
